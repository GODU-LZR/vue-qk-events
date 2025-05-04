<template>
  <div class="schedule-card">
    <el-descriptions :column="2" border size="medium" class="schedule-descriptions">
      <!-- 赛事名称 -->
      <el-descriptions-item label="赛事名称">
        <el-input
            v-model="gameData.name" disabled size="small"/>
      </el-descriptions-item>

      <!-- 运动类型（禁用） -->
      <el-descriptions-item label="赛事类型">
        <el-input v-model="gameData.sport" disabled size="small" />
      </el-descriptions-item>

      <!-- 负责人 -->
      <el-descriptions-item label="负责人">
        <el-input
            v-model="gameData.responsiblePeople" disabled size="small"/>
      </el-descriptions-item>

      <!-- 联系电话 -->
      <el-descriptions-item label="联系电话">
        <el-input
            v-model="gameData.phone" disabled size="small"/>
      </el-descriptions-item>

      <!-- 报名时间 -->
      <el-descriptions-item label="报名时间" :span="2">
        <el-date-picker
            v-model="registerTimeRange"
            type="datetimerange"
            range-separator="至"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
            disabled
            size="small"
            style="width: 100%"/>
      </el-descriptions-item>

      <!-- 赛事时间 -->
      <el-descriptions-item :label="`赛事开始时间`">
        <el-date-picker
            v-model="gameData.start_time"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
            disabled
            size="small"
            style="width: 100%"/>
      </el-descriptions-item>

      <el-descriptions-item :label="`赛事结束时间`">
        <el-date-picker
            v-model="gameData.end_time"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
            disabled
            size="small"
            style="width: 100%"/>
      </el-descriptions-item>

      <el-descriptions-item label="备注信息">
        <el-input
            v-model="gameData.note" disabled size="small" type="textarea" :rows="3" resize="none"/>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: 'gameInfo',
  props: {
    gameData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {

    }
  },
  methods: {
  },
  computed: {
    registerTimeRange() {
      return [this.gameData.register_start_time, this.gameData.register_end_time];
    }
  }
}
</script>

<style scoped>
.schedule-card {
  width: 100%;
  margin-top: 20px
}
.schedule-descriptions {
  width: 100%;
}
</style>