<template>
  <div class="ranking-container">
    <h2 class="ranking-title">得分榜</h2>
    <div class="ranking-list">
      <div
          v-for="(player, index) in rankedPlayers"
          :key="player.id"
          class="player-card"
          :class="{ 'top-three': index < 3 }">

        <!-- 排名序号 -->
        <div class="rank-number">{{ index + 1 }}</div>

        <!-- 左侧头像和姓名 -->
        <div class="player-info">
          <img :src="player.avatar" :alt="player.name" class="player-avatar">
          <div class="player-name">{{ player.name }}</div>
        </div>

        <!-- 右侧得分 -->
        <div class="player-scores">
          <div class="score-item" v-for="(value, key) in player.score" :key="key">
            <span class="score-label">{{ getScoreLabel(key) }}:</span>
            <span class="score-value">{{ value }}</span>
          </div>
          <div class="average-score">
            平均分: {{ calculateAverage(player.score).toFixed(1) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'playerRanking',
  props: {
    players: {
      type: Array,
      default: () => [
        {
          id: 1,
          name: '张三',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
          score: {
            goals: 8,
            assists: 5,
            defense: 7,
            passing: 6
          }
        },
        {
          id: 2,
          name: '李四',
          avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
          score: {
            goals: 6,
            assists: 9,
            defense: 8,
            passing: 7
          }
        },
        {
          id: 3,
          name: '王五',
          avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
          score: {
            goals: 10,
            assists: 4,
            defense: 6,
            passing: 5
          }
        },
        {
          id: 4,
          name: '赵六',
          avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
          score: {
            goals: 7,
            assists: 6,
            defense: 9,
            passing: 8
          }
        }
      ]
    }
  },
  computed: {
    // 排名计算函数 - 您可以替换这个函数来实现不同的排名算法
    rankedPlayers() {
      return [...this.players].sort((a, b) => {
        return this.calculateAverage(b.score) - this.calculateAverage(a.score)
      })
    }
  },
  methods: {
    // 计算平均分函数 - 当前使用简单平均，您可以修改
    calculateAverage(score) {
      const values = Object.values(score)
      return values.reduce((sum, val) => sum + val, 0) / values.length
    },

    // 将得分键转换为友好的显示标签
    getScoreLabel(key) {
      const labels = {
        goals: '进球',
        assists: '助攻',
        defense: '防守',
        passing: '传球'
      }
      return labels[key] || key
    }
  }
}
</script>

<style scoped>
.ranking-container {
  width: 400px;
  height: 100%;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box; /* 确保padding不影响总宽度 */
  display: flex;
  flex-direction: column;
}

.ranking-title {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e9ecef;
}

.ranking-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.player-card {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.player-card:hover {
  transform: translateY(-2px);
}

.player-card.top-three {
  border-left: 4px solid #ffc107;
}

.rank-number {
  font-size: 20px;
  font-weight: bold;
  color: #6c757d;
  width: 40px;
  text-align: center;
}

.player-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
}

.player-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 8px;
  border: 2px solid #dee2e6;
}

.player-name {
  font-weight: 500;
  color: #495057;
}

.player-scores {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.score-item {
  display: flex;
  justify-content: space-between;
}

.score-label {
  color: #6c757d;
  margin-right: 10px;
}

.score-value {
  font-weight: bold;
  color: #212529;
}

.average-score {
  grid-column: span 2;
  text-align: right;
  font-weight: bold;
  color: #dc3545;
  margin-top: 5px;
  padding-top: 5px;
  border-top: 1px dashed #dee2e6;
}
</style>