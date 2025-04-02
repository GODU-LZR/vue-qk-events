<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 10px">
      <el-breadcrumb-item :to="{ path: '/' }">赛事管理</el-breadcrumb-item>
      <el-breadcrumb-item>审核平台</el-breadcrumb-item>
    </el-breadcrumb>

    <h2>审核平台</h2>

    <auditTable></auditTable>
  </div>
</template>

<script>
import auditTable from "../components/auditTable/auditTable"
export default {
  name: "AuditEvent",
  components: {
    auditTable: auditTable
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