<template>
  <div class="event-info-container">
    <!-- 比赛信息表单 -->
    <el-form ref="eventForm" :model="form" label-width="100px" style="margin-top: 20px">
      <!-- 体育项目 (disabled) -->
      <el-form-item label="比赛项目">
        <el-input v-model="form.event_sport" disabled></el-input>
      </el-form-item>

      <!-- 客队名称 客队得分 VS 主队得分 主队名称 -->
      <el-form-item label="队伍信息">
        <el-row type="flex" align="middle" :gutter="10">
          <!-- 客队部分 -->
          <el-col :span="7">
            <el-input v-model="form.awayTeam" disabled style="width: 100%;"></el-input>
          </el-col>
          <el-col :span="4">
            <el-input-number
                v-model="form.awayTeam_score"
                controls-position="right"
                :min="0"
                style="width: 100%;"></el-input-number>
          </el-col>

          <!-- VS 部分 -->
          <el-col :span="2" style="text-align: center;">
            <span style="font-weight: bold;">VS</span>
          </el-col>

          <!-- 主队部分 -->
          <el-col :span="4">
            <el-input-number
                v-model="form.homeTeam_score"
                controls-position="right"
                :min="0"
                style="width: 100%;"></el-input-number>
          </el-col>
          <el-col :span="7">
            <el-input v-model="form.homeTeam" disabled style="width: 100%;"></el-input>
          </el-col>
        </el-row>
      </el-form-item>

      <!-- 场馆名称 -->
      <el-form-item label="场地名称">
        <el-select v-model="form.venue_name" placeholder="请选择场馆">
          <el-option
              v-for="item in venueOptions"
              :key="item"
              :label="item"
              :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <!-- 裁判选择 -->
      <el-form-item label="裁判选择">
        <el-select
            v-model="form.referee_name"
            multiple
            placeholder="请选择裁判"
            style="width: 100%;">
          <el-option
              v-for="item in refereeOptions"
              :key="item"
              :label="item"
              :value="item">
          </el-option>
        </el-select>
      </el-form-item>

      <!-- 开始时间 -->
      <el-form-item label="开始时间">
        <el-date-picker
            v-model="form.start_time"
            type="datetime"
            placeholder="选择开始日期时间"
            value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>

      <!-- 结束时间 -->
      <el-form-item label="结束时间">
        <el-date-picker
            v-model="form.end_time"
            type="datetime"
            placeholder="选择结束日期时间"
            value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>

      <!-- 获胜队伍 -->
      <el-form-item label="获胜队伍">
        <el-select v-model="form.winner" placeholder="请选择获胜队伍">
          <!-- 选项只包括主队和客队 -->
          <el-option
              v-if="form.homeTeam"
              :label="form.homeTeam"
              :value="form.homeTeam">
          </el-option>
          <el-option
              v-if="form.awayTeam"
              :label="form.awayTeam"
              :value="form.awayTeam">
          </el-option>
          <!-- 再添加一个“待定”或“平局”选项 -->
          <el-option label="平局" value="平局"></el-option>
          <el-option label="待定" value="待定"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'eventInfo',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      venueOptions: [],
      refereeOptions: [],

      form: JSON.parse(JSON.stringify(this.value))
    };
  },
  watch: {
    // 监听 eventData 的变化，以便在父组件数据更新时同步到表单
    value: {
      handler(newValue) {
        if (JSON.stringify(newValue) !== JSON.stringify(this.form)) {
          this.form = JSON.parse(JSON.stringify(newValue));
        }
      },
      deep: true,
      immediate: true // 组件创建时立即执行一次,初始化form
    },
    form: {
      handler(newValue) {
        if (JSON.stringify(newValue) !== JSON.stringify(this.value)) {
          this.$emit('input', JSON.parse(JSON.stringify(newValue)));
        }
      },
      deep: true
    }
  },
  methods: {
  }
};
</script>

<style scoped>
.event-info-container {
  padding: 0 20px;
}

.el-input-number >>> input {
  text-align: center;
}

.score-input >>> input {
  text-align: center;
}

.el-form-item .el-select {
  width: 100%;
}

.el-form-item .el-date-editor {
  width: 100%;
}
</style>
