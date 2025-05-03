<template>
  <div class="schedule-container">
    <el-form :model="filter" :inline="true" class="filter-form">
      <el-row :gutter="40">
        <!-- 赛事名称 -->
        <el-col :span="5">
          <el-form-item label="赛事名称" prop="name">
            <el-input v-model="filter.name" placeholder="请输入赛事名称" clearable></el-input>
          </el-form-item>
        </el-col>

        <!-- 赛事状态 -->
        <el-col :span="5">
          <el-form-item label="赛事状态" prop="state">
            <el-select v-model="filter.state" placeholder="请选择">
              <el-option
                  v-for="item in [{label: '不可报名', value: 0}, {label: '可报名', value: 1}, {label: '未开始', value: 2}, {label: '正在举行', value: 3}, {label: '已结束', value: 4}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <!-- 报名时间 -->
        <el-col :span="5">
          <el-form-item label="报名时间" prop="registerTime">
            <el-date-picker
                v-model="filter.registerTime"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <!-- 举办时间 -->
        <el-col :span="5">
          <el-form-item label="举办时间" prop="time">
            <el-date-picker
                v-model="filter.time"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <!-- 操作按钮 -->
        <el-col :span="4" class="filter-actions">
          <el-button type="primary" @click="submitFilter">查询</el-button>
          <el-button @click="resetFilter">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "matchFilter",
  props: {
    value: {
      type: Object,
      required: true
    },
  },
  data() {
    return{
      // 使用深拷贝确保独立性
      filter: JSON.parse(JSON.stringify(this.value))
    }
  },
  methods: {
    resetFilter() {
      this.filter = {
        name: '',
        state: '',
        registerTime: '',
        time: ''
      }
      this.$nextTick(() => {
        this.submitFilter();
      });
    },

    submitFilter() {
      this.$emit("submit-filter");
    }
  },
  watch: {
    // 监听外部传入的 value prop 的变化
    value: {
      handler(newValue) {
        // 避免不必要的更新和循环触发
        if (JSON.stringify(newValue) !== JSON.stringify(this.filter)) {
          this.filter = JSON.parse(JSON.stringify(newValue));
        }
      },
      deep: true,
      immediate: true // 组件创建时立即执行一次,初始化form
    },
    // 监听内部 filter 数据的变化，并同步到外部 value
    filter: {
      handler(newValue) {
        // 避免不必要的更新和循环触发
        if (JSON.stringify(newValue) !== JSON.stringify(this.value)) {
          // 使用深拷贝传递给父组件
          this.$emit('input', JSON.parse(JSON.stringify(newValue)));
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.schedule-container {
  padding: 0 20px;
  box-sizing: border-box;
}

.filter-form {
  margin-bottom: 0 !important;
}

.el-form--inline .el-form-item {
  margin-right: 0 !important;
  vertical-align: top;
}

.filter-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.filter-actions .el-button:not(:first-child) {
  margin-left: 10px;
}
</style>
