<template>
  <div style="margin-top: 20px">
    <div v-for="(group, index) in groupedEvents" :key="index" class="date-group">
      <div class="group-header">
        <div class="date-title">{{ formatDate(group.date) }}</div>
      </div>
      <el-table :data="group.events" style="width: 100%">
        <el-table-column label="比赛项目" prop="sport"></el-table-column>
        <el-table-column label="比赛队伍">
          <template slot-scope="scope">
            {{ scope.row.awayTeam }} VS {{ scope.row.homeTeam }}
          </template>
        </el-table-column>
        <el-table-column label="场地" prop="venue_name"></el-table-column>
        <el-table-column label="时间" width="300">
          <template slot-scope="scope">
            {{ scope.row.start_time }} - {{ scope.row.end_time }}
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="toMatch(scope.row.matchId)">
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "gameTable",
  props: {
    matches: {
      type: Array,
      required: true
    }
  },
  data() {
    return {

    };
  },
  methods: {
    /* 前端路由函数 */
    // 选中比赛,请求路由至match页面
    toMatch(matchId) {
      this.$emit("to-match", matchId);
    },

    /* 前端函数 */
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    },
    formatTime(timeStr) {
      return timeStr.split(" ")[1].substring(0, 5);
    },
  },
  computed: {
    groupedEvents() {
      const groups = {};

      // 按日期分组
      this.matches.forEach(event => {
        const date = event.start_time.split(" ")[0];
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(event);
      });

      // 转换为数组并按日期排序(最近的在前)
      return Object.entries(groups)
          .map(([date, events]) => ({
            date,
            events: events.sort((a, b) =>
                new Date(a.start_time) - new Date(b.start_time)
            )
          }))
          .sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  }
};
</script>

<style scoped>


.date-group {
  margin-bottom: 30px;
}

.group-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 0 10px;
}

.date-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}
</style>