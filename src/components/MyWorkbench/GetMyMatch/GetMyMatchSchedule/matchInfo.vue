<template>
  <div class="schedule-card">
    <el-descriptions :column="2" border size="medium" class="schedule-descriptions">
      <!-- 赛事名称 -->
      <el-descriptions-item label="赛事名称">
        <el-input
            v-model="localSchedule.name"
            @input="handleInputChange"
            placeholder="请输入赛事名称"
            clearable
            size="small"/>
      </el-descriptions-item>

      <!-- 运动类型（禁用） -->
      <el-descriptions-item label="运动类型">
        <el-input v-model="localSchedule.sport" disabled size="small" />
      </el-descriptions-item>

      <!-- 负责人 -->
      <el-descriptions-item label="负责人">
        <el-select
            v-model="localSchedule.responsiblePerson"
            @change="handleInputChange"
            placeholder="请选择"
            size="small"
            style="width: 100%"
            remote
            filterable>
          <el-option
              v-for="item in responsiblePersonData"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
        </el-select>
      </el-descriptions-item>

      <!-- 联系电话 -->
      <el-descriptions-item label="联系电话">
        <el-input
            v-model="localSchedule.phone"
            @input="handleInputChange"
            placeholder="请输入联系电话"
            clearable
            size="small"/>
      </el-descriptions-item>

      <!-- 报名时间 -->
      <el-descriptions-item label="报名时间" :span="2">
        <el-date-picker
            v-model="registerTimeRange"
            @change="handleTimeRangeChange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
            size="small"
            style="width: 40%"/>
      </el-descriptions-item>

      <!-- 赛事时间 -->
      <el-descriptions-item
          v-for="field in ['start_time', 'end_time']"
          :key="field"
          :label="`赛事${field.includes('start') ? '开始' : '结束'}时间`">
        <el-date-picker
            v-model="localSchedule[field]"
            @change="handleInputChange"
            type="datetime"
            :placeholder="`选择${field.includes('start') ? '开始' : '结束'}时间`"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
            size="small"
            style="width: 100%"/>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localSchedule: {},
      registerTimeRange: [],
      responsiblePersonData: []
    }
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(newVal) {
        this.localSchedule = JSON.parse(JSON.stringify({
          ...newVal,
          responsiblePerson: newVal.responsiblePerson || newVal.responsiblePeople || ''
        }))

        // 初始化时间范围
        this.registerTimeRange = [
          newVal.register_start_time || '',
          newVal.register_end_time || ''
        ].filter(Boolean)
      }
    }
  },
  methods: {
    handleInputChange() {
      this.$emit('input', this.localSchedule)
    },

    handleTimeRangeChange(range) {
      this.localSchedule.register_start_time = range?.[0] || ''
      this.localSchedule.register_end_time = range?.[1] || ''
      this.handleInputChange()
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


