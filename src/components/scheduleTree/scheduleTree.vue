<template>
  <div class="tournament-container">
    <div class="bracket">
      <!-- 动态生成各轮比赛 -->
      <div
          class="round"
          v-for="(round, roundIndex) in matchesData.schedule"
          :key="roundIndex">
        <tournamentBox
            v-model="matchesData.schedule[roundIndex]"
            :roundIndex="roundIndex"
            :is-final="roundIndex === matchesData.schedule.length - 1"
            :isAdd="isAdd"
            :isDeleting="isDeleting"
            @addEventToSchedule="addEventToSchedule"
            @deleteEventToSchedule="deleteEventToSchedule"/>
      </div>

      <!-- 冠军展示 -->
      <div class="round" v-if="matchesData.schedule.length > 0">
        <tournamentBox
            :isAdd="isAdd"
            :is-champion="true"
            :champion="champion"
            :isDeleting="isDeleting"
            @updateChampion="updateChampion"/>
      </div>
    </div>
  </div>
</template>

<script>
import tournamentBox from './tournamentBox.vue'

export default {
  name: 'scheduleTree',
  components: {
    tournamentBox: tournamentBox
  },
  props: {
    teamCount: {
      type: Number,
      // validator: value => [16, 8, 4, 2].includes(value)
    },
    title: {
      type: String,
      default: ''
    },
    champion: {
      type: String,
      default: ''
    },
    matchesData: {
      type: Object,
      default: () => []
    },
    isAdd: {
      type: Boolean,
      default: false
    },
    isDeleting: {
      type: Boolean,
      default: false
    }
  },
  computed: {

  },
  methods: {
    addEventToSchedule(roundIndex) {
      this.$emit("addEventToSchedule", roundIndex);
    },

    deleteEventToSchedule(event_id) {
      this.$emit("deleteEventToSchedule", event_id);
    },

    updateChampion(newChampion) {
      this.$emit("updateChampion", newChampion);
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

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
}

.bracket {
  display: flex;
  min-width: fit-content;
}

.round {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  position: relative;
}
</style>