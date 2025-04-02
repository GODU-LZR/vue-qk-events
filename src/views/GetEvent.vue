<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 10px">
      <el-breadcrumb-item :to="{ path: '/' }">赛事管理</el-breadcrumb-item>
      <el-breadcrumb-item>查询赛事</el-breadcrumb-item>
    </el-breadcrumb>

    <h2>查询赛事</h2>

    <eventTable></eventTable>
  </div>
</template>

<script>
import eventStatBoard from "../components/eventTable/eventStatBoard"
import eventTable from "../components/eventTable/eventTable"
export default {
  name: "GetEvent",
  components: {
    eventTable: eventTable,
    eventStatBoard: eventStatBoard
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
}
</style>