<template>
  <div class="container">
    <el-table
        :data="competitionData"
        style="width: 100%; min-height: 500px">
      <el-table-column
          label="赛程名称"
          prop="name">
      </el-table-column>
      <el-table-column
          label="赛程项目"
          prop="sport">
      </el-table-column>
      <el-table-column
          label="负责人">
        <template slot-scope="scope">
          {{ scope.row.responsiblePeople }}(<i class="el-icon-phone"></i>{{ scope.row.phone }})
        </template>
      </el-table-column>
      <el-table-column
          label="报名时间段"
          min-width="150">
        <template slot-scope="scope">
          {{ scope.row.register_start_time }} - {{ scope.row.register_end_time }}
        </template>
      </el-table-column>
      <el-table-column
          label="赛程时间段"
          min-width="150">
        <template slot-scope="scope">
          {{ scope.row.start_time }} - {{ scope.row.end_time }}
        </template>
      </el-table-column>
      <el-table-column
          label="状态">
        <template slot-scope="scope">
          <el-tag> {{ getEventStatus(scope.row) }} </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="toGame(scope.row.gameId)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "competitionTable",
  props: {
    competitionData: {
      type: Array,
      required: true
    }
  },
  data() {
    return{
    }
  },
  methods: {
    /* 前端路由方法 */
    // 选中赛事,请求路由至game页面
    toGame(gameId) {
      this.$emit("to-game", gameId);
    },

    /* 前端方法 */
    // 获取当前赛程的状态
    getEventStatus(row) {
      const now = new Date();
      const registerStart = new Date(row.register_start_time);
      const registerEnd = new Date(row.register_end_time);
      const eventStart = new Date(row.start_time);
      const eventEnd = new Date(row.end_time);

      if (now < registerStart) {
        return "不可报名";
      }else if (now >= registerStart && now <= registerEnd) {
        return "可报名";
      }else if (now > registerEnd && now < eventStart) {
        return "未开始";
      } else if (now >= eventStart && now <= eventEnd) {
        return "正在举行";
      } else {
        return "已结束";
      }
    },
  },
  computed: {

  }
}
</script>

<style scoped>
.container {
  padding: 0 10px;
  margin: 0;
  box-sizing: border-box;
}
</style>