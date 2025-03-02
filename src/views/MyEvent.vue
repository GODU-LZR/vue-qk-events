<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 10px">
      <el-breadcrumb-item :to="{ path: '/' }">赛事管理</el-breadcrumb-item>
      <el-breadcrumb-item>我的工作台</el-breadcrumb-item>
      <el-breadcrumb-item>我的赛事</el-breadcrumb-item>
    </el-breadcrumb>

    <h2>我的赛事</h2>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="待审核" name="待审核"></el-tab-pane>
      <el-tab-pane label="待付款" name="待付款"></el-tab-pane>
      <el-tab-pane label="已通过" name="已通过"></el-tab-pane>
      <el-tab-pane label="已否决" name="已否决"></el-tab-pane>
    </el-tabs>

    <el-steps :space="200" :active="{ '待审核': 0, '待付款': 1, '已通过': 2}[activeName]" finish-status= "success" v-show="activeName !== '已否决'">
      <el-step title="待审核"></el-step>
      <el-step title="待付款"></el-step>
      <el-step title="已通过"></el-step>
    </el-steps>

    <el-steps :space="200" :active="1" finish-status="success" process-status="error" v-show="activeName === '已否决'">
      <el-step title="待审核"></el-step>
      <el-step title="已否决"></el-step>
    </el-steps>

    <myEventTable :tableState="activeName"></myEventTable>
  </div>

</template>

<script>
import myEventTable from "../components/myEventTable"
export default {
  name: "MyEvent",
  data() {
    return {
      activeName: '待审核',
    }
  },
  components: {
    myEventTable: myEventTable
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
}
</style>