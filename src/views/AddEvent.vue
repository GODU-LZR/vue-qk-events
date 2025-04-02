<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 10px">
      <el-breadcrumb-item :to="{ path: '/' }">赛事管理</el-breadcrumb-item>
      <el-breadcrumb-item>我的工作台</el-breadcrumb-item>
      <el-breadcrumb-item>预约赛事</el-breadcrumb-item>
    </el-breadcrumb>

<!--    <h2>预约赛事</h2>-->
<!--    <eventAddForm></eventAddForm>-->
    <h2>预约赛事</h2>
      <eventAddForm></eventAddForm>
  </div>
</template>

<script>
import eventAddForm from "../components/eventAddForm/eventAddForm"
export default {
  name: "AddEvent",
  components: {
    eventAddForm: eventAddForm
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
}
</style>