<template>
  <div>
    <competitionFilter v-model="filter" @submit-filter="getMatchInFilter"></competitionFilter>

    <competitionTable
      :competitionData="competitionData"
      @to-game="toGame"
      v-loading="competitionDataLoading"></competitionTable>

    <!-- 分页条 -->
    <div class="pagination-container">
      <el-pagination
          v-loading="pageLoading"
          background
          :current-page.sync="page"
          layout="prev, pager, next"
          :total="competitionPage"
          :page-size="10"
          @current-change="getMatch"></el-pagination>
    </div>
  </div>
</template>

<script>
import {getCompetitionPage} from "@/api/sport/competition/getCompetitionPage";
import {getCompetitionData} from "@/api/sport/competition/getCompetitionData";
import competitionFilter from '../../components/sport/competition/competitionFilter'
import competitionTable from '../../components/sport/competition/competitionTable'
export default {
  name: "competition",
  components: {
    competitionFilter: competitionFilter,
    competitionTable: competitionTable
  },
  data() {
    return{
      sportId: null,

      page: 1,
      competitionPage: 0,
      pageLoading: false,

      filter: {
        name: '',
        state: '',
        registerTime: '',
        time: ''
      },

      competitionDataLoading: false,
      competitionData: [
        {
          gameId: 1,
          name: '春季联赛',
          sport: '篮球',
          responsiblePeople: '张三',
          phone: '12345678912',
          register_start_time: '2026-01-01 00:00',
          register_end_time: '2026-03-01 00:00',
          start_time: '2026-04-01 00:00',
          end_time: '2026-05-01 00:00',
        },
        {
          gameId: 2,
          name: '秋季联赛',
          sport: '篮球',
          responsiblePeople: '李四',
          phone: '12345678912',
          register_start_time: '2023-01-01 00:00',
          register_end_time: '2023-03-01 00:00',
          start_time: '2026-04-01 00:00',
          end_time: '2026-05-01 00:00',
        },
      ],
    }
  },
  methods: {
    // 选中赛程后,申请直接更换到对应赛程页面
    toGame(gameId) {
      // 向父组件发送消息,要求更换路由页面,并将赛程id作为参数
      this.$emit("to-game", gameId);
    },

    // 请求跳转到上一页面
    toPrev() {
      this.$emit("to-prev");
    },

    /* 后端函数 */
    // 获取赛事数据的统计结果(总页数)
    async getMatchNumber() {
      this.pageLoading = true;
      try{
        const data = await getCompetitionPage(this.sportId);
        this.competitionPage = data;
      }catch (error) {
        this.competitionPage = 0;
        this.$message.error('获取赛事总数量失败，请重试!');
        console.error('获取赛事总数量失败:', error);
      }finally {
        this.pageLoading = false;
      }
    },

    // 获取到完整赛事数据
    async getMatch() {
      this.competitionDataLoading = true;
      try{
        const data = await getCompetitionData(this.sportId, this.page, this.filter);
        this.competitionData = data;
      }catch (error) {
        this.$message.error('获取赛事数据失败，请重试!');
        console.error('获取赛事数据失败:', error);
      }finally {
        this.competitionDataLoading = false;
      }
    },

    // 使用过滤器进行赛事筛选,然后获取到赛事数据
    async getMatchInFilter() {
      this.page = 1;
      await this.getMatch();
    }
  },
  async created() {
    // 将url中的sportId初始化到sportId变量中,如果不存在，则直接返回到GetSport页面
    const id = this.$route.params.sportId;
    if(id === undefined || id === '') {
      this.toPrev();
    } else {
      this.sportId = id;
    }
  },
  async mounted() {
    // 由于生命周期的自动执行,在页面跳转前回进入mounted函数内。如果sportId不存在,则后面的执行的函数都没有意义。因此需要停止执行。
    if (!this.sportId) {
      return;
    }
    await this.getMatchNumber();
    await this.getMatch();
  }
}
</script>

<style scoped>
.pagination-container {
  margin-top: 20px; /* 添加顶部间距，让分页条与表格分开 */
  text-align: center; /* 关键：让内部的 inline/inline-block 元素居中 */
}
</style>