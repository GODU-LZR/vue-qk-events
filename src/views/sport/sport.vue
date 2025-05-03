<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 10px">
      <template v-for="(item, index) in breadcrumbStack">
        <!--当处于type页面时,使赛事管理无法跳转,防止重定向问题-->
        <el-breadcrumb-item
            v-if="breadIndex === 1 && index === 0"
            :key="index">
          <span>{{ item.name }}</span>
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

    <h2>查询赛事</h2>

    <!--使用该标签，路由后的组件会自动出现在该标签内-->
    <router-view
        @to-competition="toCompetition"
        @to-game="toGame"
        @to-match="toMatch"
        @to-prev="toPrev"></router-view>
  </div>
</template>

<script>
export default {
  name: "sport",
  methods: {
    // 选中赛事项目后,申请路由到competition页面
    toCompetition(sportId) {
      // 向父组件发送消息,要求更换路由页面,并将赛事项目id作为参数
      this.$router.push('/sport/competition/' + sportId);
    },

    // 选中赛事后,申请路由到game页面
    toGame(gameId) {
      // 向父组件发送消息,要求更换路由页面,并将赛程id作为参数
      this.$router.push('/sport/game/' + gameId);
    },

    // 选中比赛后,申请路由到match页面
    toMatch(matchId) {
      // 向父组件发送消息,要求更换路由页面,并将比赛id作为参数
      this.$router.push('/sport/match/' + matchId);
    },

    // 请求跳转到上一页面
    toPrev() {
      this.$router.push(this.breadcrumbStack[this.breadIndex-1].path);
    }
  },
  data() {
    return{
      breadIndex: 1,
      breadcrumbStack: [
          { name: '赛事管理', path: '/'},
          { name: '查询赛事项目', path: '/sport/type'},
          { name: '查询赛事', path: '/sport/competition'},
          { name: '查询比赛', path: '/sport/game'},
          { name: '比赛详情', path: '/sport/match'},],
      pathToIndex: {
        '/sport/type': 1,
        '/sport/competition': 2,
        '/sport/game': 3,
        '/sport/match': 4,
      }
    }
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