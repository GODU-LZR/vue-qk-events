<template>
  <div style="height: 54px; display: flex; align-items: center;">
    <el-popover
        placement="bottom-end"
        width="200"
        trigger="click"
    >
      <!-- 触发元素 -->
      <template #reference>
        <el-button type="text" class="popover-trigger" ref="popoverTrigger" style="padding: 16px;">
          <i class="el-icon-setting" style="font-size: 30px"></i>
        </el-button>
      </template>

      <!-- 弹出内容 -->
      <div class="popover-content">
        <span>自动删除已结束、已撤销的赛事</span>
        <div class="switch-container">
          <el-switch
              v-model="value1"
              active-text="开启"
              inactive-text="取消"
              active-value="开启"
              inactive-value="取消"
              @change="confirmValue1"
          ></el-switch>
        </div>

        <el-divider class="custom-divider"></el-divider>

        <span>关注赛事开始前5分钟通知</span>
        <div class="switch-container">
          <el-switch
              v-model="value2"
              active-text="开启"
              inactive-text="取消"
              active-value="开启"
              inactive-value="取消"
              @change="handleNotice"
          ></el-switch>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {getFollowEvent} from "@/api/followEventTable/getFollowEvent";
import {handleAutoDeleted} from "@/api/followEventTable/handleAutoDeleted";
import {handleNotice} from "@/api/followEventTable/handleNotice";
export default {
  name: "FollowEventPopover",
  data() {
    return {
      value1: '取消', // 开关的初始状态
      value2: '取消'
    };
  },
  methods: {
    // vuex辅助修改函数
    ...mapMutations(['updateFollowEventTableData']),

    /* 静态资源使用的函数 */
    // 确认自动删除是否要开启的方法，如果确认开启就发生后端请求
    confirmValue1() {
      // 如果当前状态是 '取消'，直接返回
      if (this.value1 === '取消') {
        return;
      }

      // 弹出确认框
      this.$confirm('此操作将立刻删除已结束、已取消的比赛', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
          .then(() => {
            // 用户点击“确定”，调用 handleAutoDeleted 方法
            this.handleAutoDeleted();
          })
          .catch(() => {
            // 用户点击“取消”，重置状态
            this.value1 = '取消';
            this.$nextTick(() => {
              this.$refs.popoverTrigger.$el.focus(); // 聚焦到触发按钮
            });
          });
    },

    /* 用于后端交互并渲染数据的函数 */
    // 开启和关闭自动删除已结束、已撤销的赛事的功能
    async handleAutoDeleted() {
      try {
        await handleAutoDeleted(); // 调用后端接口
        this.$message.success('操作成功'); // 提示成功
      } catch (error) {
        this.value1 = '取消'; // 请求失败，重置状态
        this.$message.error('操作失败，请重试'); // 提示失败
        console.error('开启和关闭自动删除功能失败:', error);
      }
    },

    // 开启和关闭开始前5分钟通知的功能
    async handleNotice() {
      try {
        const data = await handleNotice();
        this.$message.success('操作成功'); // 提示成功
      } catch (error) {
        this.value2 = '取消';
        this.$message.error('操作失败，请重试'); // 提示失败
        console.error('开启和关闭通知功能失败:', error);
      }
    }
  },
};
</script>

<style scoped>
.popover-trigger {
  padding: 0;
  margin-right: 10px;
}

.popover-content {
  display: flex;
  flex-direction: column;
  gap: 10px; /* 设置内容间距 */
}

::v-deep .custom-divider {
  margin: 10px 0 !important; /* 提高优先级 */
}
</style>