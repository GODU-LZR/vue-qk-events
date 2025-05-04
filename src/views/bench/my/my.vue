<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 10px; margin-left: 20px">
      <template v-for="(item, index) in breadcrumbStack">
        <!--当处于type页面时,使赛事管理无法跳转,防止重定向问题-->
        <el-breadcrumb-item
            v-if="breadIndex === 1 && index === 0"
            :key="index">
          <span style="font-weight: bold">{{ item.name }}</span>
        </el-breadcrumb-item>

        <el-breadcrumb-item
            v-if="breadIndex !== 1 && index < breadIndex"
            :key="index"
            :to="{ path: item.path}">
          <span>{{ item.name }}</span>
        </el-breadcrumb-item>

        <!--最后一项不带跳转,防止重定向问题-->
        <el-breadcrumb-item
            v-if="index === breadIndex"
            :key="index">
          <span>{{ item.name }}</span>
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>

    <h2>我的赛事</h2>

    <!--使用该标签，路由后的组件会自动出现在该标签内-->
    <router-view
      @to-game="toGame"
      @to-match="toMatch"></router-view>
  </div>
</template>

<script>
export default {
  name: "my",
  data() {
    return {
        breadIndex: 1,
        breadcrumbStack: [
          { name: '我的工作台', path: '/my'},
          { name: '我的赛事', path: '/my/competition'},
          { name: '赛事详情', path: '/my/game'},
          { name: '比赛详情', path: '/my/match'}],
      pathToIndex: {
        '/my/competition': 1,
        '/my/game': 2,
        '/my/match': 3,
      }
    }
  },
  methods: {
    /* 前端路由方法 */
    // 选中赛事,请求路由至game页面
    toGame(gameId) {
      this.$router.push('/my/game/' + gameId);
    },

    // 选中比赛,请求路由至match页面
    toMatch(matchId) {
      this.$router.push('/my/match/' + matchId);
    },

  },
  watch: {
    // 监听路由对象变化
    '$route': {
      handler: function (to, from) {
        const url = to.path;
        const prefixes = Object.keys(this.pathToIndex);
        const matchedPrefix = prefixes.find(prefix =>
            url.startsWith(prefix)
        );
        this.breadIndex = matchedPrefix ? this.pathToIndex[matchedPrefix] : 1;
        this.breadcrumbStack[this.breadIndex].path = url;
      },
      immediate: true, // 立即执行一次
    }
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
}
</style>