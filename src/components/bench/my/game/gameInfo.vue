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
            filterable
            :remote-method="getResponsiblePersonOptions">
          <el-option
              v-for="item in responsiblePersonOptions"
              :key="item.userId"
              :label="item.name"
              :value="item.userId"/>
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
      <el-descriptions-item label="报名时间">
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
            style="width: 100%"/>
      </el-descriptions-item>

      <el-descriptions-item label="匹配模式">
        <el-select
            v-model="localSchedule.mode"
            @change="handleInputChange"
            placeholder="请选择匹配模式"
            size="small"
            style="width: 100%">
          <el-option
              v-for="item in [{value: 0, label: '系统按时间分配'}, {value: 1, label: '系统按随机分配'}, {value: 2, label: '用户自定义'},]"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
        </el-select>
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

      <el-descriptions-item label="备注信息">
        <el-input
            v-model="localSchedule.note" size="small" type="textarea" :rows="3" resize="none"/>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import {getResponsiblePersonOptions} from "@/api/bench/my/game/gameInfo/getResponsiblePersonOptions";
export default {
  name: "gameInfo",
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
      responsiblePersonOptions: [{userId: 1, name: '张三'}, {userId: 2, name: '李四'}]
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
    /* 前端函数 */
    // 向父组件请求修改数据
    handleInputChange() {
      this.$emit('input', this.localSchedule)
    },

    handleTimeRangeChange(range) {
      this.localSchedule.register_start_time = range?.[0] || ''
      this.localSchedule.register_end_time = range?.[1] || ''
      this.handleInputChange()
    },

    /* 后端函数 */
    async getResponsiblePersonOptions(responsiblePerson) {
      if (responsiblePerson === '') {
        this.responsiblePersonOptions = [];
        return;
      }
      try {
        const response = await getResponsiblePersonOptions(responsiblePerson);
        this.responsiblePersonOptions = response.data;
      }catch (error) {
        this.$message.error('获取负责人待选选项失败，请重试!');
        console.error('获取负责人待选选项失败:', error);
      }
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


