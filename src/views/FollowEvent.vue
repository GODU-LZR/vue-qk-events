<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 10px">
      <el-breadcrumb-item :to="{ path: '/' }">赛事管理</el-breadcrumb-item>
      <el-breadcrumb-item>我的工作台</el-breadcrumb-item>
      <el-breadcrumb-item>我的关注</el-breadcrumb-item>
    </el-breadcrumb>

    <h2>我的关注</h2>

    <followEventDropdown></followEventDropdown>
    <followEventTable></followEventTable>

  </div>

</template>

<script>
import followEventTable from "../components/followEventTable"
import followEventDropdown from '../components/followEventDropdown'
export default {
  name: "FollowEvent",
  components: {
    followEventTable: followEventTable,
    followEventDropdown: followEventDropdown
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
}
</style>