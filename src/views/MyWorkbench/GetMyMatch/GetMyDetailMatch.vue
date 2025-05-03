<template>
  <div>
    <el-tabs v-model="review_status">
      <el-tab-pane label="待审核" name="0"></el-tab-pane>
      <el-tab-pane label="已通过" name="1"></el-tab-pane>
      <el-tab-pane label="已否决" name="2"></el-tab-pane>
      <el-tab-pane label="已撤销" name="3"></el-tab-pane>
    </el-tabs>

    <matchTable :myMatchTableData="myMatchTableData" @select-match="checkMatch"></matchTable>
  </div>
</template>

<script>
import matchTable from '../../../components/MyWorkbench/GetMyMatch/GetMyDetailMatch/matchTable'
export default {
  name: "GetMyDetailMatch",
  components: {
    matchTable: matchTable
  },
  data() {
    return {
      review_status: 0,
      myMatchTableData: [
        {
          matchId: 1,
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
          matchId: 2,
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
    // 选中赛事,请求路由至GetMyMatchSchedule页面
    checkMatch(matchId) {
      this.$emit("select-match", matchId);
    },
  }
}
</script>

<style scoped>

</style>