<template>
  <div>
    <!-- 表单 -->
    <el-form :model="form" label-width="120px" style="margin-top: 20px;">
      <el-row>
        <el-col :span="16">
      <!-- 比赛项目 -->
      <el-form-item label="比赛项目">
        <el-input v-model="form.event_sport" placeholder="请输入比赛项目" style="width: 100%"></el-input>
      </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="比赛场地">
            <el-input v-model="form.venue_name" placeholder="比赛场地" :disabled="true" style="width: 100%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="预约时间">
            <div class="block">
              <el-date-picker
                  v-model="form.timeRange"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd HH:mm:ss"
                  style="width: 100%"
                  :disabled="true">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button type="success" style="margin-left: 20px" @click="dialogVisible = true">选择场地</el-button>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <!-- 负责人 -->
          <el-form-item label="负责人">
            <el-input v-model="form.responsible_person" placeholder="请输入负责人姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <!-- 联系电话 -->
          <el-form-item label="联系电话">
            <el-input v-model="form.phone" placeholder="请输入联系电话"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="16">
      <!-- 裁判姓名 -->
      <el-form-item label="裁判姓名">
        <el-select
            v-model="form.referee_name"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择裁判(可自定义)"
            style="width: 100%">
          <el-option
              v-for="item in [{value: '李四',label: '李四'}]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
        </el-col>
      </el-row>

      <!-- 参赛方 -->
      <el-form-item label="参赛方">
        <el-input v-model="form.participants" placeholder="请输入参赛方"></el-input>
      </el-form-item>



      <!-- 备注 -->
      <el-form-item label="备注">
        <el-input
            v-model="form.note"
            type="textarea"
            :rows="3"
            placeholder="请输入备注"
        ></el-input>
      </el-form-item>

      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
        title="选择我的场地"
        :visible.sync="dialogVisible"
        width="50%">
      <el-table :data="$store.state.myVenueTableData"
                style="width: 100%"
                v-loading="venueLoading"
                height="50vh">
        <!-- 场地列，固定宽度 -->
        <el-table-column
            prop="venue_name"
            label="场地">
        </el-table-column>

        <!-- 比赛时间列，自适应宽度 -->
        <el-table-column
            label="比赛时间"
            :min-width="200"> <!-- 设置最小宽度为 200px，确保有足够的空间 -->
          <template slot-scope="scope">
            {{ scope.row.start_time }} 至 {{ scope.row.end_time }}
          </template>
        </el-table-column>

        <!-- 选择列，减少宽度 -->
        <el-table-column
            label="选择">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" v-if="scope.row.venue_id === form.venue_id">已选</el-button>
            <el-button size="mini" v-else @click="chooseVenue(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="getVenue">刷 新</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>



  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {getVenue} from "@/api/eventAddForm/getVenue";
import {getRefereeName} from "@/api/eventAddForm/getRefereeName";

export default {
  name: "eventAddForm",
  data() {
    //自定义检验规则
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      }
      const reg = /^1[3-9]\d{9}$/;
      setTimeout(() => {
        if (!reg.test(value)) {
          return callback(new Error('请输入正确的手机号'));
        } else {
          callback();
        }
      }, 1000);
    };

    return {
      form: {
        event_sport: '',
        venue_id: '',
        venue_name: '', // 展示项,发送axios前需要剔除
        start_time: '',
        end_time: '',
        responsible_person: '',
        phone: '',
        participants: '',
        referee_name: [],
        note: '',
        timeRange: [], // 展示项,发送axios前需要剔除
      },

      rules: {
        sport: [ {required: true, message: "请输入比赛项目", trigger: 'blur'} ],
      },

      dialogVisible: false,
      venueLoading: false,
      page: 1,

      refereeName: []
    }
  },
  methods: {
    // vuex辅助修改函数
    ...mapMutations(['updateMyVenueTableData']),

    /* 静态资源使用的函数 */
    // 选择场地的函数
    chooseVenue(row) {
      this.form.venue_id = row.venue_id;
      this.form.venue_name = row.venue_name;
      this.form.start_time = row.start_time;
      this.form.end_time = row.end_time;
      this.form.timeRange = [row.start_time, row.end_time];
      this.dialogVisible = false;
    },

    /* 用于后端交互并渲染数据的函数 */
    // 获取用户预约的场地
    async getVenue() {
      this.venueLoading = true;
      try {
        const data = await getVenue();
        this.updateMyVenueTableData(data);
      } catch (error) {
        this.updateMyVenueTableData([]);
        this.form.venue_id = null;
        this.form.venue_name = '';
        this.form.start_time = null;
        this.form.end_time = null;
        this.$message.error('获取预约场地信息失败，请重试'); // 提示失败0
        console.error('获取预约场地信息:', error);
      } finally {
        this.venueLoading = false;
      }
    },

    // 获取裁判的姓名
    async getRefereeName() {
      try {
        const data = await getRefereeName(this.page);
        this.refereeName.push(...data);
      } catch (error) {
        this.$message.error('获取裁判的姓名失败，请重试'); // 提示失败
        console.error('获取裁判的姓名失败:', error);
      }
    },

    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>

</style>