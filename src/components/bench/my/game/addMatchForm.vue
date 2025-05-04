<template>
  <div class="match-form-container">
    <el-form label-position="top" class="match-form">
      <el-row type="flex" align="middle" :gutter="20">
        <!-- 主队选择 (左侧) -->
        <el-col :span="11">
          <el-form-item label="主队" required>
            <el-select
                v-model="formData.homeTeam"
                placeholder="请选择主队"
                remote
                filterable
                :remote-method="getHomeTeamOptions"
                style="width: 100%">
              <el-option
                  v-for="team in homeTeamOptions"
                  :key="team.teamId"
                  :label="team.name"
                  :value="team.teamId"/>
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
                placeholder="请选择客队"
                remote
                filterable
                :remote-method="getAwayTeamOptions"
                style="width: 100%">
              <el-option
                  v-for="team in awayTeamOptions"
                  :key="team.teamId"
                  :label="team.name"
                  :value="team.teamId"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 场地选择 -->
      <el-form-item label="场地">
        <el-select
            v-model="formData.venue_name"
            placeholder="请选择场地"
            remote
            filterable
            :remote-method="getVenueOptions"
            style="width: 100%">
          <el-option
              v-for="venue in venueOptions"
              :key="venue.venueId"
              :label="venue.name"
              :value="venue.venueId"></el-option>
        </el-select>
      </el-form-item>

      <!-- 裁判选择 -->
      <el-form-item label="裁判">
        <el-select
            v-model="formData.referee_name"
            placeholder="请选择裁判"
            multiple
            remote
            filterable
            :remote-method="getRefereeOptions"
            style="width: 100%">
          <el-option
              v-for="referee in refereesOptions"
              :key="referee.refereeId"
              :label="referee.name"
              :value="referee.refereeId"></el-option>
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
                style="width: 100%"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {getTeamOptions} from "@/api/bench/my/game/addMatchForm/getTeamOptions";
import {getVenueOptions} from "@/api/bench/my/game/addMatchForm/getVenueOptions";
import {getRefereeOptions} from "@/api/bench/my/game/addMatchForm/getRefereeOptions";

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
      formData: JSON.parse(JSON.stringify(this.value)),
      // 静态裁判列表

      awayTeamOptions: [{teamId: '1', name: '软件1223'}, {teamId: '2', name: '软件1224'}],
      homeTeamOptions: [{teamId: '3', name: '土木1223'}, {teamId: '4', name: '土木1224'}],
      venueOptions: [{venueId: '1', name: '篮球馆1号'}, {venueId: '2', name: '篮球馆2号'}],
      refereesOptions: [{refereeId: '1', name: '李教练'}, {refereeId: '2', name: '刘教练'}]
    }
  },
  methods: {
    // 获取主队队伍待选选项
    async getHomeTeamOptions(key) {
      try{
        const data = await this.getTeamOptions(key);
        this.homeTeamOptions = data;
      }catch (error) {
        this.$message.error('获取队伍待选选项失败，请重试!');
        console.error('获取队伍待选选项失败:', error);
      }
    },

    // 获取客队队伍待选选项
    getAwayTeamOptions(key) {
      try{
        const data = this.getTeamOptions(key);
        this.homeTeamOptions = data;
      }catch (error) {
        this.$message.error('获取队伍待选选项失败，请重试!');
        console.error('获取队伍待选选项失败:', error);
      }
    },

    /* 后端函数 */
    // 获取队伍待选选项
    async getTeamOptions(key) {
      const response = await getTeamOptions(key);
      return response.data;
    },

    // 获取场地待选选项
    async getVenueOptions(key) {
      try{
        const response = await getVenueOptions(key);
        this.venueOptions = response.data;
      }catch (error) {
        this.$message.error('获取场地待选选项失败，请重试!');
        console.error('获取场地待选选项失败:', error);
      }
    },

    async getRefereeOptions(key) {
      try{
        const response = await getRefereeOptions(key);
        this.refereesOptions = response.data;
      }catch (error) {
        this.$message.error('获取裁判待选选项失败，请重试!');
        console.error('获取裁判待选选项失败:', error);
      }
    }
  },
  watch: {
    value: {
      handler(newValue) {
        if (JSON.stringify(newValue) !== JSON.stringify(this.form)) {
          this.formData = JSON.parse(JSON.stringify(newValue));
        }
      },
      deep: true,
      immediate: true // 组件创建时立即执行一次,初始化form
    },
    formData: {
      handler(newValue) {
        if (JSON.stringify(newValue) !== JSON.stringify(this.value)) {
          this.$emit('input', JSON.parse(JSON.stringify(newValue)));
        }
      },
      deep: true
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


