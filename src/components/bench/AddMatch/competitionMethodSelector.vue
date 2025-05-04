<template>
  <div class="competition-method-selector">
    <div
        v-for="option in options"
        :key="option.value"
        class="option-box"
        :class="{ 'selected': selectedMethod === option.value }"
        @click="selectMethod(option.value)">
      <h3 class="option-title">{{ option.title }}</h3>
      <p class="option-description">{{ option.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompetitionMethodSelector',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selectedMethod: this.value,
      options: [
        {
          value: 'time',
          title: '系统按时间匹配',
          description: '比赛由系统创建,系统根据获胜队伍的取胜时间来匹配比赛队伍'
        },
        {
          value: 'random',
          title: '系统按随机匹配',
          description: '比赛由系统创建,同一层比赛全部结束后，系统再对全部获胜队伍进行随机匹配比赛队伍'
        },
        {
          value: 'custom',
          title: '用户自定义',
          description: '比赛由用户创建,赛事创建者自行选择匹配比赛队伍'
        }
      ]
    }
  },
  methods: {
    selectMethod(method) {
      this.selectedMethod = method
      this.$emit('input', method)
    }
  },
  watch: {
    value(newVal) {
      this.selectedMethod = newVal
    }
  }
}
</script>

<style scoped>
.competition-method-selector {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.option-box {
  flex: 1;
  min-height: 180px;
  border-radius: 5px;
  padding: 20px;
  background-color: #f5f5f5;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.option-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.option-box.selected {
  background-color: #e3f2fd;
  outline: 2px solid #2196f3;
  box-sizing: border-box;
}

.option-title {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 15px;
  color: #333;
}

.option-description {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}
</style>
