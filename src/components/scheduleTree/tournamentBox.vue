<template>
  <div class="tournament-box"
       :class="{ 'champion-box': isChampion }"
       @dragover.prevent
       @drop="addEvent">
    <div class="box-header">
      {{ title }}
    </div>
    <div class="box-content">
      <!-- 普通比赛 -->
      <template v-if="!isChampion">
        <div
            class="match-wrapper"
            v-for="(match, matchIndex) in matches"
            :key="matchIndex">
          <div
              class="match"
              :class="{
                'final-match': isFinal}">
            <!-- 单个比赛的删除遮罩层 -->
            <div class="match-overlay" v-if="isDeleting" @click="deleteEvent(match.event_id)">
              <i class="el-icon-delete delete-icon"></i>
            </div>

            <div class="team"
                 v-if="!match.team1 && !match.team2">
              暂无比赛
            </div>

            <div class="team" :class="{ 'winner': match.winner === match.team1 }"
                 v-if="match.team1">
              {{ match.team1 || '暂无队伍' }}
              <i class="el-icon-medal" v-if="match.winner === match.team1"></i>
            </div>

            <!-- 比分/时间显示区域 -->
            <div class="match-info" v-if="match.team2">
              <div class="score" v-if="match.team1_score">
                {{ match.team1_score }} : {{ match.team2_score }}
              </div>
              <div class="time" v-else>
                <i class="el-icon-time"></i>
                {{ match.time || '时间待定' }}
              </div>
            </div>

            <div
                class="team"
                :class="{ 'winner': match.winner === match.team2 }"
                v-if="match.team2">
              {{ match.team2 || '暂无队伍' }}
              <i class="el-icon-medal" v-if="match.winner === match.team2"></i>
            </div>
          </div>
        </div>
      </template>

      <!-- 冠军展示 -->
      <template v-else>
        <div class="match champion">
          <div class="champion-input">
            <el-input
                v-model="newChampion"
                v-show="isInUpdateChampion"
                @keyup.enter.native="updateChampion"
                ref="championInput"></el-input>
          </div>
          <!-- 冠军盒子的删除遮罩层 -->
          <div class="team winner"
               v-show="!isInUpdateChampion"
               @click="showInput">
            {{ champion || '暂无冠军' }}
            <i class="el-icon-trophy"></i>
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
    isChampion: {
      type: Boolean,
      default: false
    },
    isFinal: {
      type: Boolean,
      default: false
    },
    isAdd: {
      type: Boolean,
      default: false
    },
    isDeleting: {
      type: Boolean,
      default: true
    },
    value: {
      type: Array,
      default: () => []
    },
    champion: {
      type: String,
      default: ''
    },
    roundIndex: {
      type: Number,
      default: ''
    }
  },
  data() {
    return {
      isInUpdateChampion: false,
      newChampion: this.champion,
    }
  },
  methods: {
    showInput() {
      if (this.isAdd){
        this.isInUpdateChampion = true;
        this.$nextTick(() => {
          this.$refs.championInput.focus()
        })
      }
    },

    updateChampion() {
      if (this.newChampion !== this.champion) {
        this.$emit("updateChampion", this.newChampion);
      }
      this.isInUpdateChampion = false;
    },

    addEvent() {
      if (!this.isAdd || this.isDeleting) {
        return;
      }
      this.$emit("addEventToSchedule", this.roundIndex);
    },

    deleteEvent(event_id) {
      this.$emit("deleteEventToSchedule", event_id);
    }
  },

  computed: {
    matches: {
      get() {
        return this.value;
      },
      set(newVal) {
        this.$emit('input', newVal);
      }
    },

    title() {
      if (this.isChampion) {
        return '冠军';
      }
      if (this.value.length === 1) {
        return '决赛';
      }
      return this.value.length + '强赛';
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

/* 单个选择器搞定所有样式 */
::v-deep .champion-input .el-input__inner {
  /* 尺寸相关 */
  width: 180px !important;        /* 固定宽度匹配冠军盒子 */
  min-height: 40px;              /* 最小高度匹配 */
  box-sizing: border-box;         /* 关键：包含padding在宽高内 */

  /* 外观相关 */
  padding: 10px 15px;            /* 与冠军盒子相同内边距 */
  margin: 5px;                   /* 相同外边距 */
  background: white;             /* 相同背景色 */
  border: 1px solid #eee !important; /* 覆盖Element默认边框 */
  border-radius: 3px;            /* 相同圆角 */

  /* 文字相关 */
  line-height: normal;           /* 重置行高 */
  font-size: inherit;            /* 继承字体大小 */

  /* 交互状态 */
  transition: none !important;   /* 禁用Element默认动画 */
}

/* 特殊比赛样式 */
.final-match {
  background-color: #fff3cd;
  border-color: #ffeeba;
}

.champion {
  background-color: #ffd700;
  border-color: #ffc107;
  text-align: center;
  font-weight: bold;
  margin: 15px 0;
}

/* 冠军盒子特殊样式 */
.champion-box {
  border-color: #ffc107;
}

.champion-box .box-header {
  background-color: #ffc107;
}

.el-icon-medal,
.el-icon-trophy {
  margin-left: 8px;
  color: #f39c12;
}

/* 新增的删除遮罩层样式 */
.match-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.delete-icon {
  font-size: 24px;
  color: white;
  cursor: pointer;
}

.delete-icon:hover {
  color: #ff7875;
}
</style>