<template>
  <div class="match-form-container">
    <el-form label-position="top" class="match-form">

      <el-row type="flex" align="middle" :gutter="20">
        <!-- 主队选择 (左侧) -->
        <el-col :span="11">
          <el-form-item label="主队" required>
            <el-select
                v-model="formData.homeTeam"
                multiple
                placeholder="请选择主队"
                @change="emitUpdate"
                style="width: 100%">
              <el-option
                  v-for="team in homeTeamOptions"
                  :key="team"
                  :label="team"
                  :value="team"/>
            </el-select>
          </el-form-item>
        </el-col>

        <!-- VS 居中文本 -->
        <el-col :span="2" class="vs-text-container">
          <div class="vs-text">VS</div>
        </el-col>

        <!-- 客队选择 (右侧) -->
        <el-col :span="11">
          <el-form-item label="客队" required>
            <el-select
                v-model="formData.awayTeam"
                multiple
                placeholder="请选择客队"
                @change="emitUpdate"
                style="width: 100%">
              <el-option
                  v-for="team in awayTeamOptions"
                  :key="team"
                  :label="team"
                  :value="team"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 场地选择 -->
      <el-form-item label="场地">
        <el-select
            v-model="formData.venue_name"
            multiple
            placeholder="请选择场地"
            @change="emitUpdate"
            style="width: 100%">
          <el-option
              v-for="venue in venueOptions"
              :key="venue"
              :label="venue"
              :value="venue"></el-option>
        </el-select>
      </el-form-item>

      <!-- 裁判选择 -->
      <el-form-item label="裁判">
        <el-select
            v-model="formData.referee_name"
            multiple
            placeholder="请选择裁判"
            @change="emitUpdate"
            style="width: 100%">
          <el-option
              v-for="referee in refereesOptions"
              :key="referee"
              :label="referee"
              :value="referee"></el-option>
        </el-select>
      </el-form-item>

      <!-- 时间选择 -->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="开始时间">
            <el-date-picker
                v-model="formData.start_time"
                type="datetime"
                placeholder="选择开始时间"
                value-format="yyyy-MM-dd HH:mm"
                @change="emitUpdate"
                style="width: 100%"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束时间">
            <el-date-picker
                v-model="formData.end_time"
                type="datetime"
                placeholder="选择结束时间"
                value-format="yyyy-MM-dd HH:mm"
                @change="emitUpdate"
                style="width: 100%"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true,
      default: () => ({
        sport: '',
        venue_name: '',
        referee_name: [],
        start_time: '',
        end_time: ''
      })
    }
  },
  data() {
    return {
      // 直接使用 props.value 的初始值（无需深拷贝）
      formData: this.value,
      // 静态裁判列表

      awayTeamOptions: [],
      homeTeamOptions: [],
      venueOptions: [],
      refereesOptions: ['王裁判', '张裁判', '李裁判']
    }
  },
  methods: {
    // 统一触发更新事件
    emitUpdate() {
      this.$emit('input', { ...this.formData })
    }
  }
}
</script>

<style scoped>
.match-form-container {
  padding:20px 0;
  background: #fff;
  border-radius: 4px;
}
.match-form {
  max-width: 600px;
  margin: 0 auto;
}

.vs-text-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.vs-text {
  font-size: 18px;
  font-weight: bold;
  color: #666;
  margin-top: 28px; /* 补偿表单项的 label 高度 */
}

/* 响应式调整：小屏幕时堆叠显示 */
@media (max-width: 768px) {
  .el-col {
    width: 100% !important;
  }
  .vs-text {
    margin: 10px 0;
  }
}
</style>


