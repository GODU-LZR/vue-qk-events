<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 10px">
      <el-breadcrumb-item :to="{ path: '/' }">赛事管理</el-breadcrumb-item>
      <el-breadcrumb-item>裁判简介</el-breadcrumb-item>
    </el-breadcrumb>

    <h2>裁判简介</h2>

    <refereeUL></refereeUL>
  </div>

</template>

<script>
import refereeUL from "../components/refereeUL/refereeUL"
export default {
  name: "GetReferee",
  components: {
    refereeUL: refereeUL
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
}
</style>