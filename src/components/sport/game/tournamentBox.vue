<template>
  <div class="tournament-box">
    <div class="box-header">
      {{ title }}
    </div>
    <div class="box-content">
      <!-- 普通比赛 -->
      <template>
        <div
            class="match-wrapper"
            v-for="(match, matchIndex) in matchesData"
            :key="matchIndex">
          <div
              class="match">

            <div class="team"
                 v-if="!match.awayTeam && !match.homeTeam">
              暂无比赛
            </div>

            <div class="team" :class="{ 'winner': match.winner === match.awayTeam }"
                 v-if="match.awayTeam">
              {{ match.awayTeam || '暂无队伍' }}
              <i class="el-icon-medal" v-if="match.winner === match.awayTeam"></i>
            </div>

            <!-- 比分/时间显示区域 -->
            <div class="match-info" v-if="match.homeTeam">
              <div class="score" v-if="match.awayTeam_score &&match.homeTeam_score ">
                {{ match.awayTeam_score }} : {{ match.homeTeam_score }}
              </div>
              <div class="time" v-else>
                {{ match.start_time}}
                <el-row>
                  至
                </el-row>
                {{ match.end_time }}
              </div>
            </div>

            <div
                class="team"
                :class="{ 'winner': match.winner === match.homeTeam }"
                v-if="match.homeTeam">
              {{ match.homeTeam || '暂无队伍' }}
              <i class="el-icon-medal" v-if="match.winner === match.homeTeam"></i>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tournamentBox',
  props: {
    matchesData: {
      type: Array,
      default: () => []
    },
    roundIndex: {
      type: Number,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  methods: {

  },
    computed: {
      title() {
        if (this.matchesData.length === 1) {
          return '决赛';
        }
        return this.matchesData.length + '强赛';
      }
    }
}
</script>

<style scoped>
.tournament-box {
  border: 2px solid #3498db;
  border-radius: 8px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  width: 220px;
  min-height: 120px;
}

.tournament-box:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.box-header {
  padding: 10px 15px;
  background-color: #3498db;
  color: white;
  font-weight: bold;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  text-align: center;
}

.box-content {
  padding: 15px;
}

.match-wrapper {
  position: relative;
  margin: 15px 0;
}

.match {
  min-width: 180px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
  position: relative;
}

.team {
  padding: 10px 15px;
  margin: 5px;
  background-color: white;
  border: 1px solid #eee;
  border-radius: 3px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  min-width: 180px; /* 添加最小宽度以匹配输入框 */
  box-sizing: border-box; /* 确保padding不影响总宽度 */
}

.match-info {
  margin: 5px 0;
  text-align: center;
  font-size: 14px;
  color: #666;
}

.score {
  font-size: 15px;
  font-weight: bold;
  color: #e74c3c;
}

.time {
  font-size: 15px;
  color: #3498db;
}

.team.winner {
  background-color: #d4edda;
  border-color: #c3e6cb;
}

.team.winner::before {
  color: #28a745;
  position: absolute;
  left: 5px;
}

.champion-box .box-header {
  background-color: #ffc107;
}

.el-icon-medal,
.el-icon-trophy {
  margin-left: 8px;
  color: #f39c12;
}

.tournament-box {
   /* 原有样式保持不变 */
   animation: fadeIn 0.5s ease-out forwards;
   opacity: 0;
   margin-bottom: 20px;
}

@keyframes fadeIn {
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.match {
  /* 添加悬停效果 */
  transition: all 0.3s ease;
}

.match:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

/* 冠军特殊效果 */
.tournament-box:last-child .box-header {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(255,193,7,0.4); }
  70% { box-shadow: 0 0 0 10px rgba(255,193,7,0); }
  100% { box-shadow: 0 0 0 0 rgba(255,193,7,0); }
}
</style>