<!-- vue-qk-events/src/views/Home.vue -->
<template>
  <div>
    <h2>体育赛事模块首页</h2>
    <el-button type="primary" @click="showMessage">点击测试</el-button>
  </div>
</template>

<script>
export default {
  name: 'EventsHome',
  methods: {
    showMessage() {
      this.$message('体育赛事子应用的 ElementUI 按钮点击了！');
    }
  }
}
</script>