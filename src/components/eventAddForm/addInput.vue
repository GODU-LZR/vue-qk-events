<template>
  <div class="custom-transfer">
    <div v-if="isDeleting" class="delete-overlay" @click="deleteTeam">
      <i class="el-icon-delete"></i>
    </div>

    <!-- 上盒子：标题 -->
    <div class="header" @click="showInput" style="cursor: pointer;">
      <span v-if="!isEditing" class="title-text">{{ title }}</span>
      <el-input
          v-else
          v-model="newTitle"
          ref="titleInput"
          @keyup.enter.native="saveTitle"
          @blur="saveTitle"
          size="small"
          :class=" { 'title-input': true, 'is-error': isError.titleError }"
      ></el-input>
    </div>

    <!-- 中盒子：输入框 -->
    <div class="input-box">
      <el-input
          v-model="inputValue"
          placeholder="请输入参赛者"
          @keyup.enter.native="addItem"
          @blur="validatePlayer"
          size="small"
          :class=" { 'rounded-input': true, 'is-error': isError.listError }"
      ></el-input>
    </div>

    <!-- 下盒子：数据列表 -->
    <div class="list-box">
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <button class="delete-btn" type="button" @click="removeItem(index)"></button>
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "addInput",
  props: {
    title: {
      type: String,
      default: "自定义组件",
    },
    value: {
      type: Array,
      default: () => [],
    },
    index: {
      type: Number,
      required: true
    },
    isDeleting: {
      type: Boolean,
      default: true
    },
    isError: {
      type: Object,
      default: {titleError: false, listError: false}
    }
  },
  data() {
    return {
      inputValue: "", // 输入框的值
      isEditing: false, // 是否正在编辑标题
      newTitle: this.title, // 新标题
    };
  },
  computed: {
    list: {
      get() {
        return this.value; // 从父组件获取数组
      },
      set(newValue) {
        this.$emit("input", newValue); // 同步到父组件
      },
    },
  },
  methods: {
    // 添加数据
    addItem() {
      if (this.inputValue.trim()) {
        this.list.unshift(this.inputValue.trim()); // 添加到数组开头
        this.inputValue = ""; // 清空输入框
      }
    },
    // 删除数据
    removeItem(index) {
      this.list = this.list.filter((_, i) => i !== index); // 移除对应数据
    },
    // 显示输入框
    showInput() {
      this.isEditing = true;
      this.newTitle = this.title;
      this.$nextTick(() => {
        this.$refs.titleInput.focus(); // 自动聚焦输入框
      });
    },
    // 保存标题
    saveTitle() {
      if (this.newTitle.trim()) {
        this.$emit("update-team", this.newTitle.trim(), this.index);
      }
      this.isEditing = false; // 隐藏输入框
      this.validateTeamName();
    },
    // 删除队伍
    deleteTeam() {
      this.$emit("delete-team", this.index);
    },
    // 请求校验队伍名
    validateTeamName() {
      this.$emit("validate-teamName");
    },
    // 请求校验队伍成员
    validatePlayer() {
      this.$emit("validate-player");
    },
  },
};
</script>

<style scoped>
.custom-transfer {
  position: relative;
  width: 200px; /* 组件宽度 */
  border: 1px solid #dcdfe6; /* 边框 */
  border-radius: 4px; /* 圆角 */
  background-color: #fff; /* 背景色 */
  display: flex;
  flex-direction: column;
}

.header {
  text-align: center; /* 标题水平居中 */
  border-bottom: 1px solid #dcdfe6; /* 底部边框 */
  font-size: 18px;
  font-weight: bold;
  font-family:"Times New Roman",serif;
  background-color: #f5f7fa;
  padding: 5px 20px;
  height: 40px; /* 固定高度 */
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
}

.title-input >>> .el-input__inner {
  text-align: center; /* 输入框文字居中 */
  font-size: 18px;
  font-weight: bold;
  font-family:"Times New Roman",serif;
  height: 36px; /* 固定输入框高度 */
  line-height: 36px; /* 确保文字垂直居中 */
  padding: 0 10px; /* 调整内边距 */
}

.title-text {
  line-height: 36px; /* 与输入框高度一致 */
}

.input-box {
  padding: 10px;
  border-bottom: 1px solid #dcdfe6; /* 底部边框 */
}

.rounded-input >>> .el-input__inner {
  border-radius: 20px; /* 输入框圆角 */
}

.list-box {
  flex: 1;
  overflow-y: auto; /* 超出高度时显示滚动条 */
  padding: 10px;
  min-height: 180px;
}

.list-box ul {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 180px;
}

.list-box li {
  display: flex;
  align-items: center;
  height: 30px;
}

.list-box li span {
  flex: 1;
  font-size: 14px;
}

.delete-btn {
  width: 16px;
  height: 16px;
  background-color: #409EFF; /* 蓝色背景 */
  border: none;
  border-radius: 2px; /* 小圆角 */
  cursor: pointer;
  position: relative;
  margin-right: 8px;
}

.delete-btn::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 2px;
  background-color: #fff; /* 白色横线 */
  transform: translate(-50%, -50%);
}

/* 新增样式 */
.delete-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  cursor: pointer;
  border-radius: 4px; /* 匹配容器圆角 */
}

.delete-overlay .el-icon-delete {
  font-size: 24px;
  color: white;
}

.is-error >>> .el-input__inner  {
  border-color: #f56c6c !important;
}
</style>