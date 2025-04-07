<template>
  <div class="event-container">
    <!-- 上盒子 - 比赛时间和场地 -->
    <div class="top-box">
      <div class="time-info">
        <div class="time-range">
          <i class="el-icon-time"></i>
          {{ event.start_time }} 至 {{ event.end_time }}
        </div>
        <div class="separator">|</div>
        <div class="venue">
          <i class="el-icon-location-outline"></i>
          {{ event.venue_name }}
        </div>
      </div>
    </div>

    <!-- 中盒子 - 队伍信息 -->
    <div>
      <!--一支队伍-->
      <div class="middle-box">
        <el-row type="flex" justify="center" align="middle" v-if="event.participants.length === 1">
          <el-col :span="24">
            <div class="team-container">
              <div class="team-name">{{ event.participants[0].teamName }}</div>
              <div class="team-members">
                <div v-for="(player, index) in event.participants[0].players" :key="index" class="player">
                  {{ player.name }} : {{ player.person_score }}
                </div>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center" align="middle" v-if="event.participants.length === 2">
          <!-- 第一支队伍 -->
          <el-col :span="10">
            <div class="team-container">
              <div class="team-name">{{ event.participants[0].teamName }}</div>
              <div class="team-score">得分: {{ event.participants[0].team_score }}</div>
              <div class="team-members">
                <div v-for="(player, index) in event.participants[0].players" :key="index" class="player">
                  {{ player.name }} : {{ player.person_score }}
                </div>
              </div>
            </div>
          </el-col>
          <!-- VS标识 -->
          <el-col :span="4" class="vs-col">
            <div class="vs-container">
              <span class="vs-text">VS</span>
            </div>
          </el-col>
          <!-- 第二支队伍 -->
          <el-col :span="10">
            <div class="team-container">
              <div class="team-name">{{ event.participants[1].teamName }}</div>
              <div class="team-score">得分: {{ event.participants[1].team_score }}</div>
              <div class="team-members">
                <div v-for="(player, index) in event.participants[1].players" :key="index" class="player">
                  {{ player.name }} : {{ player.person_score }}
                </div>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20" v-if="event.participants.length >= 3">
          <el-col
              v-for="team in event.participants"
              :key="team.teamName"
              :xs="24" :sm="12" :md="8"
              style="margin-bottom: 20px">
            <div class="team-container">
              <div class="team-name">{{ team.teamName }}</div>
              <div class="team-score">得分: {{ team.team_score }}</div>
              <div class="team-members">
                <div v-for="(player, pIndex) in team.players" :key="pIndex" class="player">
                  {{ player.name }}
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 下盒子 - 赛事详情 -->
    <div class="bottom-box">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="比赛项目">{{ event.event_sport }}</el-descriptions-item>
        <el-descriptions-item label="赛程归属">
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <span>{{ event.schedule_id !== null && event.schedule_id !== '' ? "有" : "无" }}</span>
            <el-button
                size="mini"
                type="success"
                v-if="isSelectScheduleId && event.schedule_id !== null && event.schedule_id !== ''"
                @click="selectEventByScheduleId">
              查询赛程
            </el-button>
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="负责人">{{ event.responsible_person }}</el-descriptions-item>
        <el-descriptions-item label="联系方式">{{ event.phone }}</el-descriptions-item>
        <el-descriptions-item label="联系方式">{{ event.referee_name }}</el-descriptions-item>
        <el-descriptions-item label="备注">{{ event.note }}</el-descriptions-item>
        <el-descriptions-item label="审核状态">{{ getStatus(event.review_status) }}</el-descriptions-item>
        <el-descriptions-item label="关注状态" v-if="event.is_followed">
          <el-tag :type="event.is_followed ? 'success' : 'info'">
            {{ event.is_followed ? '已关注' : '未关注' }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
export default {
  name: 'eventInfo',
  props: {
    event: {
      type: Object,
      required: true
    },
    isSelectScheduleId: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    selectEventByScheduleId() {
      this.$emit("select-scheduleId", this.event.schedule_id);
    },

    getStatus(review_status) {
      if (review_status === 0) return '待审核';
      if (review_status === 1) return '已审核';
      if (review_status === 2) return '已否决';
      if (review_status === 3) return '已撤销';
    }
  }
}
</script>

<style scoped>
.event-container {
  width: 100%;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', Arial, sans-serif;
}

/* 上盒子样式 */
.top-box {
  background-color: #e6f7ff;
  padding: 15px;
  width: 100%;
}

.time-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.time-range, .venue {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
}

.separator {
  color: #c0c4cc;
}

/* 中盒子样式 - 使用el-row和el-col布局 */
.middle-box {
  padding: 20px;
}

.team-container {
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
}

.team-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.team-score {
  font-size: 14px;
  color: #606266;
  margin-bottom: 12px;
  width: 100%;
}

.team-members {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
}

.player {
  padding: 5px 0;
  border-bottom: 1px dashed #e4e7ed;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* VS标识样式 */
.vs-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.vs-container {
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.vs-text {
  font-size: 24px;
  font-weight: bold;
  color: #f56c6c;
  background: white;
  padding: 5px 10px;
  border-radius: 4px;
}
</style>