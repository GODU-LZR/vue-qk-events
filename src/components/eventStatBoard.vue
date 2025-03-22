<template>
  <div style="height: 54px;">
    <el-row :gutter="20" style="width: 100%">
      <el-col :span="6">
        <div>
          <el-statistic
              group-separator=","
              :precision="0"
              :value="$store.state.statData.totalEventCount"
              title="总共比赛数目"
          ></el-statistic>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-statistic
              group-separator=","
              :precision="0"
              :value="$store.state.statData.monthEventCount"
              title="本月比赛数目"
          ></el-statistic>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-statistic
              group-separator=","
              :precision="0"
              decimal-separator="."
              :value="$store.state.statData.todayEventCount"
              title="今日比赛数目"
          >
            <template slot="prefix">
              <i class="el-icon-s-flag" style="color: red"></i>
            </template>
            <template slot="suffix">
              <i class="el-icon-s-flag" style="color: blue"></i>
            </template>
          </el-statistic>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-statistic
              group-separator=","
              :precision="0"
              :value="$store.state.statData.todayWaitEventCount"
              title="今日待举办赛事数目"
          >
            <template slot="prefix">
              <i class="el-icon-s-flag" style="color: red"></i>
            </template>
            <template slot="suffix">
              <i class="el-icon-s-flag" style="color: blue"></i>
            </template></el-statistic>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {getStat} from "@/api/eventTable/getStat";
export default {
  name: "eventStatBoard",
  data() {
    return {
    };
  },
  methods: {
    // vuex辅助修改函数
    ...mapMutations(['updateStatData']),

    /* 用于后端交互并渲染数据的函数 */
    // 获取统计赛事数据
    async getStat() {
      try {
        const data = await getStat();
        this.updateStatData(data);
      } catch (error) {
        this.$message.error('获取统计赛事数据失败，请重试'); // 提示失败
        console.error('获取统计赛事数据失败:', error);
      }
    }
  }
}
</script>

<style scoped>

</style>