<template>
  <div
      class="sport-card"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      @click="toCompetition"
      ref="card">
    <div class="sport-type">
      {{ sport.name }}
    </div>
    <div class="schedule-list" v-if="list">
      <ul>
        <li v-for="(game, index) in sport.games" :key="index" @click.stop="toGame(game.gameId)">
          {{ game.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SportCard',
  props: {
    sport: {
      type: Object,
      default:()=>({})
    },
    list: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isHovered: false
    }
  },
  methods: {
    // 选中赛事项目后,查看该赛事项目的所有赛程列表
    toCompetition() {
      // 向父组件发送消息,要求更换路由页面,并将赛事项目id作为参数
      this.$emit("to-competition", this.sport.sportId);
    },

    // 选中赛事项目后,查看该赛事项目的所有赛程列表
    toGame(gameId) {
      // 向父组件发送消息,要求更换路由页面,并将赛事项目id作为参数
      this.$emit("to-game", gameId);
    },
  }
}
</script>

<style scoped>
.sport-card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 240px; /* 固定宽度 */
  background: white;
  border-radius: 8px;
  overflow: hidden;
  margin: 10px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  will-change: transform; /* 优化动画性能 */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.sport-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.sport-type {
  padding: 12px;
  background: #3498db;
  color: white;
  font-weight: bold;
  text-align: center;
  font-size: 18px;
}

.schedule-list {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  min-height: 160px;
}

.schedule-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.schedule-list li {
  padding: 8px 0;
  font-size: 14px;
}

/* 滚动条样式 */
.schedule-list::-webkit-scrollbar {
  width: 4px;
}

.schedule-list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.schedule-list::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 2px;
}

.schedule-list::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>