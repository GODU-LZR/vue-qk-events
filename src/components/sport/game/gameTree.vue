<template>
  <div class="tournament-container">
    <div class="bracket">
      <!-- 正确的单层循环结构 -->
      <div
          class="round"
          v-for="(round, roundIndex) in groupedEvents"
          :key="roundIndex"
          :style="{ 'animation-delay': `${roundIndex * 0.3}s` }">
        <tournamentBox
            :matchesData="round"
            :roundIndex="roundIndex"
            :key="roundIndex"/>
      </div>
    </div>
  </div>
</template>

<script>
import tournamentBox from './tournamentBox.vue'

export default {
  name: 'gameTree',
  components: {
    tournamentBox
  },
  props: {
    matches: {
      type: Array,
      default: () => ({
        schedule: []  // 确保默认有schedule属性
      })
    }
  },
  computed: {
    groupedEvents() {
      const grouped = {};

      // 按 phase 分组
      this.matches.forEach(match => {
        const phase = match.phase;
        if (!grouped[phase]) {
          grouped[phase] = [];
        }
        grouped[phase].push(match);
      });

      // 按 phase 从小到大排序并返回二维数组
      return Object.keys(grouped)
          .sort((a, b) => parseInt(a) - parseInt(b)) // 确保按数字排序
          .map(phase => grouped[phase]);
    }
  }
}
</script>

<style scoped>
.tournament-container {
  max-width: 100%;
  margin: 0 auto;
  overflow-x: auto;
}

.bracket {
  display: flex;
  min-width: fit-content;
  padding: 20px 0;
}

.round {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  position: relative;
  animation: slideInFromLeft 0.5s ease-out forwards;
  opacity: 0;
}

@keyframes slideInFromLeft {
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes drawLine {
  to {
    transform: scaleX(1);
  }
}
</style>