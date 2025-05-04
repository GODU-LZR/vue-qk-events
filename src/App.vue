<!-- vue-qk-events/src/App.vue -->
<template>
  <div>

    <div class="line"></div>
    <el-menu
        default-active="/GetEvent"
        mode="horizontal"
        @select="handleSelect"
        router>
      <el-menu-item index="/sport">查询赛事</el-menu-item>
      <el-menu-item index="/GetReferee">裁判简介</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="/AddMatch">预约赛事</el-menu-item>
        <el-menu-item index="/my">我的赛事</el-menu-item>
        <el-menu-item index="/FollowEvent">我的关注比赛</el-menu-item>
      </el-submenu>

      <el-menu-item index="/AuditEvent" v-if="user === '赛事管理员' || user === '超级管理员'">审核平台</el-menu-item>
    </el-menu>


    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'EventsApp',
  data() {
    return {
      user: '超级管理员',
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
    }
  }
}

</script>

<style scoped>

</style>