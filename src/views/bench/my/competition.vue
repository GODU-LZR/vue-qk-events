<template>
  <div>
    <el-tabs v-model="review_status" style="padding: 0 10px 0 20px" @tab-click="page1AndGet">
      <el-tab-pane label="待审核" name="0"></el-tab-pane>
      <el-tab-pane label="已通过" name="1"></el-tab-pane>
      <el-tab-pane label="已否决" name="2"></el-tab-pane>
      <el-tab-pane label="已撤销" name="3"></el-tab-pane>
    </el-tabs>

    <competitionTable :competitionData="competitionData" @to-game="toGame" v-loading="competitionDataLoading"></competitionTable>

    <div class="pagination-container">
      <el-pagination
          background
          :current-page.sync="page"
          layout="prev, pager, next"
          :total="competitionPage"
          :page-size="10"
          @current-change="getCompetitionData"
          v-loading="pageLoading"
          ></el-pagination>
    </div>
  </div>
</template>

<script>
import {getCompetitionData} from "@/api/bench/my/competition/getCompetitionData";
import {getCompetitionPage} from "@/api/bench/my/competition/getCompetitionPage";

import competitionTable from '../../../components/bench/my/competition/competitionTable'
export default {
  name: "competition",
  components: {
    competitionTable: competitionTable
  },
  data() {
    return {
      page: 1,
      review_status: 0,
      competitionPage: 0,
      pageLoading: false,

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
    /* 前端路由函数 */
    // 选中赛事,请求路由至game页面
    toGame(gameId) {
      this.$emit("to-game", gameId);
    },

    // 页数置为1,并重新获取数据
    page1AndGet() {
      this.page = 1;
      this.getCompetitionData();
    },

    /* 后端函数 */
    // 获取赛事数据的统计结果(总页数)
    async getCompetitionNumber() {
      this.pageLoading = true;
      try{
        const response = await getCompetitionPage(this.review_status);
        this.competitionPage = response.data;
      }catch (error) {
        this.competitionPage = 0;
        this.$message.error('获取我的赛事总数量失败，请重试!');
        console.error('获取我的赛事总数量失败:', error);
      }finally {
        this.pageLoading = false;
      }
    },

    // 获取我创建的赛事列表数据
    async getCompetitionData() {
      this.competitionDataLoading = true;
      try {
        const response = await getCompetitionData(this.page, this.review_status);
        this.competitionData = response.data;
      }catch (error) {
        this.$message.error('获取我的赛事列表失败，请重试!');
        console.error('获取我的赛事列表失败:', error);
      }finally {
        this.competitionDataLoading = false;
      }
    }
  },
  async mounted() {
    await this.getCompetitionNumber();
    await this.getCompetitionData()
  }
}
</script>

<style scoped>
.pagination-container {
  margin-top: 20px; /* 添加顶部间距，让分页条与表格分开 */
  text-align: center; /* 关键：让内部的 inline/inline-block 元素居中 */
}
</style>