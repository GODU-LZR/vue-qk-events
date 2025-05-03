<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 10px">
      <template v-for="(item, index) in breadcrumbStack">
        <el-breadcrumb-item
            v-if="index !== 1 && index < breadIndex"
            :key="index"
            :to="{ path: item.path + '?' + item.query }">
          <span>{{ item.name }}</span>
        </el-breadcrumb-item>

        <el-breadcrumb-item
            v-if="index === 1 && index < breadIndex"
            :key="index">
          <span>{{ item.name }}</span>
        </el-breadcrumb-item>

        <!--最后一项不带跳转,防止重定向问题-->
        <el-breadcrumb-item
            v-if="index !== 1 && index === breadIndex"
            :key="index">
          <span>{{ item.name }}</span>
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>

    <h2>我的赛事</h2>

    <!--使用该标签，路由后的组件会自动出现在该标签内-->
    <router-view
      @select-match="checkMatch"
      @select-event="checkEvent"></router-view>
  </div>
</template>

<script>
import GetMyDetailMatch from "./GetMyDetailMatch"
import GetMyMatchSchedule from "./GetMyMatchSchedule"
import GetMyMatchEvent from "./GetMyMatchEvent"
export default {
  name: "GetMyMatch",
  components: {
    GetMyDetailMatch: GetMyDetailMatch,
    GetMyMatchSchedule: GetMyMatchSchedule,
    GetMyMatchEvent: GetMyMatchEvent
  },
  data() {
    return {
        breadIndex: 2,
        breadcrumbStack: [
          { name: '赛事管理', path: '/', query: ''},
          { name: '我的工作台', path: '/', query: ''},
          { name: '我的赛事', path: '/GetMyMatch/GetMyDetailMatch', query: ''},
          { name: '赛事-赛程', path: '/GetMyMatch/GetMyMatchSchedule', query: ''},
          { name: '赛程-比赛', path: '/GetMyMatch/GetMyMatchEvent', query: ''}],
      pathToIndex: {
        '/GetMyMatch/GetMyDetailMatch': 2,
        '/GetMyMatch/GetMyMatchSchedule': 3,
        '/GetMyMatch/GetMyMatchEvent': 4,
      }
    }
  },
  methods: {
    /* 前端路由方法 */
    // 选中赛事,请求路由至GetMyMatchSchedule页面
    checkMatch(matchId) {
      this.$router.push('/GetMyMatch/GetMyMatchSchedule');
    },

    // 选中比赛,请求路由至GetMyMatchEvent页面
    checkEvent(eventId) {
      this.$router.push('/GetMyMatch/GetMyMatchEvent');
    },

  },
  watch: {
    // 监听路由对象变化
    '$route': {
      handler: function (to, from) {
        const url = to.fullPath.split('?');
        const item = this.breadcrumbStack.find(item => item.path === url[0]);
        if (item) {
          Object.assign(item, {query: url[1] ? url[1] : ''});
          this.breadIndex = this.pathToIndex[url[0]];
        }
      },
      immediate: true, // 如果你想在组件创建时立即执行一次，可以加上这一行
    }
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
}
</style>