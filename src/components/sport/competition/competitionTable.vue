<template>
  <div class="schedule-container">
    <el-table
        :data="competitionData"
        style="width: 100%;"
        height="480px">
      <el-table-column
          label="赛事名称"
          prop="name"
          min-width="150">
      </el-table-column>
      <el-table-column
          label="赛事项目"
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
          label="赛事时间段"
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
      <el-table-column
          align="right">
        <template slot-scope="scope">
          <el-button
              type="success"
              size="mini"
              @click="toGame(scope.row.gameId)">查看详情</el-button>
          <el-button
              type="primary"
              size="mini"
              :disabled="getEventStatus(scope.row) !== '可报名'">报名</el-button>
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
  methods: {
    /* 前端路由函数 */
    // 选中赛程后,请求路由到game页面
    toGame(gameId) {
      // 向父组件发送消息,要求更换路由页面,并将赛程id作为参数
      this.$emit("to-game", gameId);
    },

    /* 前端函数 */
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
  }
}
</script>

<style scoped>
.schedule-container {
  padding: 0 10px;
  margin: 0;
  box-sizing: border-box;
}
</style>