<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 10px">
      <el-breadcrumb-item :to="{ path: '/' }">赛事管理</el-breadcrumb-item>
      <el-breadcrumb-item>我的工作台</el-breadcrumb-item>
      <el-breadcrumb-item>我的赛事</el-breadcrumb-item>
    </el-breadcrumb>

    <h2>我的赛事</h2>

    <myEventTable></myEventTable>
  </div>

</template>

<script>
import myEventTable from "../components/myEventTable/myEventTable"
export default {
  name: "MyEvent",
  components: {
    myEventTable: myEventTable
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
}
</style>