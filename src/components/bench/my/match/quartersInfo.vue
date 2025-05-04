<template>
  <div class="quarters-info-container">
    <!-- 使用 el-form 包裹整个行 -->
    <el-form ref="quartersForm" :model="localQuartersData" label-width="100px" label-position="left">
      <div class="team-block">
        <h3>{{ localQuartersData.team }}</h3>
        <!-- 队伍名称输入框，disabled -->
        <el-form-item label="队伍名称">
          <el-input v-model="localQuartersData.team" disabled></el-input>
        </el-form-item>

        <el-form-item label="第一节">
          <el-input v-model.number="localQuartersData.one" type="number" class="score-input" min="0"></el-input>
        </el-form-item>
        <el-form-item label="第二节">
          <el-input v-model.number="localQuartersData.two" type="number" class="score-input" min="0"></el-input>
        </el-form-item>
        <el-form-item label="第三节">
          <el-input v-model.number="localQuartersData.three" type="number" class="score-input" min="0"></el-input>
        </el-form-item>
        <el-form-item label="第四节">
          <el-input v-model.number="localQuartersData.four" type="number" class="score-input" min="0"></el-input>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'quartersInfo', // 组件名称
  props: {
    // 使用 value prop 来支持 v-model
    value: {
      type: Array, // 期望传入的是一个数组
      required: true, // 数据是必须的
      default: () => [] // 数组/对象 prop 必须使用工厂函数返回默认值
    },
  },
  data() {
    return {
      // 创建一个本地的数据副本，用于在组件内部进行修改
      // 使用深拷贝避免直接修改 prop
      localQuartersData: JSON.parse(JSON.stringify(this.value))
    };
  },
  watch: {
    // 监听父组件传入的 value prop 的变化
    value: {
      handler(newValue) {
        // 当父组件数据更新时，同步到本地数据
        // 检查是否与当前本地数据不同，避免不必要的更新和潜在的无限循环
        if (JSON.stringify(newValue) !== JSON.stringify(this.localQuartersData)) {
          this.localQuartersData = JSON.parse(JSON.stringify(newValue));
        }
      },
      deep: true, // 深度监听数组内部对象的变化
      immediate: true // 组件创建时立即执行一次，用于初始化 localQuartersData
    },
    // 监听本地数据的变化 (用户在输入框中修改时触发)
    localQuartersData: {
      handler(newValue) {
        // 当本地数据变化时，通过 input 事件通知父组件
        // 检查是否与父组件的 value 数据不同，避免不必要的 emit 和潜在的无限循环
        if (JSON.stringify(newValue) !== JSON.stringify(this.value)) {
          // 发射 input 事件，将本地数据传回父组件，实现 v-model 的双向绑定
          this.$emit('input', JSON.parse(JSON.stringify(newValue)));
        }
      },
      deep: true // 深度监听本地数组内部对象的变化
    }
  },
  methods: {
    // 当前组件不需要额外的方法
  }
};
</script>

<style scoped>
.quarters-info-container {
  padding: 20px; /* 添加一些内边距 */
}

.team-block h3 {
  margin-top: 0; /* 移除默认顶部外边距 */
  margin-bottom: 15px; /* 标题下方添加一些外边距 */
  color: #333; /* 标题颜色 */
  border-bottom: 1px solid #eee; /* 标题下方添加一条浅色分隔线 */
  padding-bottom: 10px; /* 标题下方内边距 */
  text-align: center; /* 标题居中 */
}

.score-input >>> input {
  text-align: center;
}
</style>

