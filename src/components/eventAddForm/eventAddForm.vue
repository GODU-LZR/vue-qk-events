<template>
  <div class="container">

    <div class="additional-info">
      <h2>填写说明</h2>
      <p>请仔细填写以下表单，确保信息准确无误。带 * 的字段为必填项。</p>
    </div>

    <el-switch
        v-model="isMassAdd"
        :active-value="true"
        :inactive-value="false"
        active-text="批量添加">
    </el-switch>

    <!-- 表单 -->
    <el-form :model="form" label-width="120px" style="margin-top: 20px;" label-position="top" :rules="rules" ref="ruleForm">
      <!-- 比赛项目 -->
      <el-form-item label="比赛项目" prop="event_sport">
        <el-select v-model="form.event_sport"
                   placeholder="请选择"
                   style="width: 100%"
                   v-el-select-loadmore="lazyLoadInEventSport"
                   @change="validateField('event_sport')">
            <el-option
                v-for="item in eventSport"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          <div style="height: 34px; display: flex; justify-content: center; align-items: center;" v-if="eventSportLoading || eventSportNoMore">
            <p v-if="eventSportLoading">加载中...</p>
            <p v-if="eventSportNoMore">没有更多了</p>
          </div>
        </el-select>
        <p class="hint">请选择赛事举办的比赛项目。</p>
      </el-form-item>

<!--      <el-row :gutter="80">-->
<!--        <el-col :span="10">-->
<!--          <el-form-item label="比赛场地" prop="venue_name">-->
<!--            <el-input v-model="form.venue_name" placeholder="比赛场地" :disabled="true" style="width: 100%"></el-input>-->
<!--            <p class="hint">选择已预约场地将自动填充赛事举办的比赛场地。</p>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col :span="10">-->
<!--          <el-form-item label="预约时间" prop="timeRange">-->
<!--            <div class="block">-->
<!--              <el-date-picker-->
<!--                  v-model="form.timeRange"-->
<!--                  type="datetimerange"-->
<!--                  range-separator="至"-->
<!--                  start-placeholder="开始日期"-->
<!--                  end-placeholder="结束日期"-->
<!--                  value-format="yyyy-MM-dd HH:mm:ss"-->
<!--                  format="yyyy-MM-dd HH:mm:ss"-->
<!--                  style="width: 100%"-->
<!--                  :disabled="true">-->
<!--              </el-date-picker>-->
<!--            </div>-->
<!--            <p class="hint">选择已预约场地将自动填充赛事举办的比赛时间。</p>-->
<!--          </el-form-item>-->
<!--        </el-col>-->

<!--        <el-col :span="4">-->
<!--          <el-form-item>-->
<!--            <el-button type="success" @click="dialogVisible = true" style="height: 40px; margin-top: 40px">选择场地</el-button>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--      </el-row>-->

      <!-- 负责人 -->
      <el-form-item label="负责人" prop="responsible_person">
        <el-input v-model="form.responsible_person" placeholder="请输入负责人姓名"></el-input>
        <p class="hint">请输入赛事举办的负责人。</p>
      </el-form-item>

      <!-- 联系电话 -->
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入联系电话"></el-input>
        <p class="hint">请输入负责人的联系电话。</p>
      </el-form-item>

      <!-- 裁判姓名 -->
      <el-form-item label="裁判姓名" prop="referee_name">
        <el-select
            v-model="form.referee_name"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择裁判姓名"
            style="width: 100%"
            v-el-select-loadmore="lazyLoadInReferee"
            @change="validateField('referee_name')">
          <el-option
              v-for="item in refereeName"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
          <div style="height: 34px; display: flex; justify-content: center; align-items: center;" v-if="refereeLoading || refereeNoMore">
            <p v-if="refereeLoading">加载中...</p>
            <p v-if="refereeNoMore">没有更多了</p>
          </div>
        </el-select>
        <p class="hint">请选择赛事举办的裁判列表(支持输入)。</p>
      </el-form-item>

      <!-- 参赛方 -->
      <el-form-item label="参赛方" prop="participants">
        <el-row type="flex" align="stretch" style="flex-wrap: nowrap; margin-bottom: 5px">
          <el-col :span="8" style="display: flex;">
            <eventClassRadio
                :options="[{ value: 1, label: '多人竞赛' }, { value: 2, label: '两方对抗' }, { value: 12, label: '其它' }]"
                :selected-value="form.teamNumber"
                style="flex: 1;"></eventClassRadio>
          </el-col>
          <!-- 中间文字区域（关键修改部分） -->
          <el-col :span="14" style="display: flex; align-items: center;">
            <span style="
              display: inline-flex;
              align-items: center;
              height: 100%;
              width: 100%;
              padding: 0 10px;
              line-height: 1.5;
              font-size: 20px">({{ form.participants.length }}/{{ form.teamNumber }})</span>
          </el-col>
          <el-col :span="2" style="display: flex;">
            <el-button
                type="danger"
                size="mini"
                style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;"
                @click="isDeleting = !isDeleting"
                :disabled="form.teamNumber !== 12 || form.participants.length <= 3">撤销队伍</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="display: flex; flex-wrap: wrap;">
          <!-- 参与者列表 -->
          <el-col
              v-for="(item, index) in form.participants"
              :key="index"
              :xs="24" :sm="12" :md="8" :lg="6"
              style="height: 340px; margin-bottom: 20px;">
          <addInput
              v-model="item.players"
              :title="item.teamName"
              :isDeleting="isDeleting"
              :index="index"
              :isError="item.isError"
              @update-team="updateTeamName"
              @delete-team="deleteTeam"
              @validate-teamName="validateParticipants(item, 'teamName')"
              @validate-player="validateParticipants(item, 'player')"
              style="width: 100%; height: 100%;"/>
          </el-col>
          <!-- 添加按钮（同样高度） -->
          <el-col :xs="24" :sm="12" :md="8" :lg="6" style="height: 340px; margin-bottom: 20px;"
                  v-if="form.event_sport !== '' &&
                  form.teamNumber === 12 &&
                  form.participants.length < 12 &&
                  !isDeleting">
            <div
                style="width: 100%; height: 100%; border-radius: 4px; display: flex; justify-content: center; align-items: center; border: 1px dashed #333; cursor: pointer;"
                @click="addTeam">
              <i class="el-icon-plus" style="font-size: 36px;"></i>
            </div>
          </el-col>
        </el-row>
        <p class="hint">请输入赛事参与的参赛方。</p>
      </el-form-item>

      <!-- 备注 -->
      <el-form-item label="备注" prop="note">
        <el-input
            v-model="form.note"
            type="textarea"
            :rows="3"
            placeholder="请输入备注"
            resize="none"></el-input>
        <p class="hint">请输入赛事的备注信息。</p>
      </el-form-item>

      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit('ruleForm')">提 交</el-button>
        <el-button type="success" @click="resetForm('ruleForm')">重 置</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
        title="选择我的场地"
        :visible.sync="dialogVisible"
        width="50%"
        top="50px">
      <el-table :data="$store.state.myVenueTableData"
                style="width: 100%"
                v-loading="venueLoading"
                height="55vh">
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
              <div class="pagination-container">
        <el-pagination
            background
            :current-page.sync="venuePage"
            layout="prev, pager, next"
            :total="300"
            :page-size="10"
            @current-change="getVenue"
        ></el-pagination>
      </div>
      </span>
    </el-dialog>



  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {getVenue} from "@/api/eventAddForm/getVenue";
import {getRefereeName} from "@/api/eventAddForm/getRefereeName";
import {getEventSport} from "@/api/eventAddForm/getEventSport";
import {submitForm} from '@/api/eventAddForm/submitForm'
import eventClassRadio from './eventClassRadio'
import addInput from './addInput'
export default {
  name: "eventAddForm",
  components: {
    eventClassRadio: eventClassRadio,
    addInput: addInput
  },
  data() {
    //自定义检验规则
    // var checkPhone = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('手机号不能为空'));
    //   }
    //   const reg = /^1[3-9]\d{9}$/;
    //   setTimeout(() => {
    //     if (!reg.test(value)) {
    //       return callback(new Error('请输入正确的手机号'));
    //     } else {
    //       callback();
    //     }
    //   }, 1000);
    // };
    return {
      form: {
        event_sport: '',
        teamNumber: 0, // 处理项，仅在一些布尔逻辑中使用，表示当前选中event_sport应该有几只队伍
                       // 注意:并不是表示participants数组里有几支队伍，而是表示该赛事最多能选择几支队伍
        venue_id: '',
        venue_name: '', // 展示项,发送axios前需要剔除
        start_time: '',
        end_time: '',
        timeRange: [], // 展示项,发送axios前需要剔除
        responsible_person: '',
        phone: '',
        referee_name: [],
        note: '',
        participants: [
        // {
        //   teamName: '队伍1', // 队伍名称
        //
        //   // 队伍的名单,在axios里需要剔除掉没有成员的队伍,但一般情况下不会出现这种情况,因为会有校验
        //   players: [],
        //
        //   // 这是用于表示参赛者输入框是否存在错误的,是需要在axios里剔除的
        //   isError: {titleError: false, listError: false}
        // }
        ]
      },
      isMassAdd: false,

      rules: {
        event_sport: [ {required: true, trigger: 'blur'} ],
        // venue_name: [ {required: true, trigger: 'blur'} ],
        // timeRange: [ {required: true, trigger: 'blur'} ],
        responsible_person: [ {required: true, trigger: 'blur'} ],
        phone: [ {required: true, trigger: 'blur'} ],
        referee_name: [ {required: true, trigger: 'blur'}, ],
      },

      dialogVisible: false,
      venue: [],
      venuePage: 1,
      venueLoading: false,

      eventSport: [{value: '跑步',label: '跑步', teamNumber: 1},
                   {value: '游泳',label: '游泳', teamNumber: 1},
                   {value: '吃鸡',label: '吃鸡', teamNumber: 1},
                   {value: '篮球',label: '篮球', teamNumber: 2},
                   {value: '足球',label: '足球', teamNumber: 2},
                   {value: '排球',label: '排球', teamNumber: 2},
                   {value: '台球',label: '台球', teamNumber: 2},
                   {value: '网球',label: '网球', teamNumber: 2},
                   {value: '冰球',label: '冰球', teamNumber: 2},
                   {value: '乒乓球',label: '乒乓球', teamNumber: 2},
                   {value: '羽毛球',label: '羽毛球', teamNumber: 2},
                   {value: '保龄球',label: '保龄球', teamNumber: 2},
                   {value: '接力赛',label: '接力赛', teamNumber: 0}],

      eventSportPage: 1,
      eventSportLoading : false,
      eventSportNoMore: false,
      eventSportTimer: null, // 这是用于防抖的计时器：加载盒子消失后，置为false,用计时器设置3秒后置为true,在此期间无法再次懒加载方法

      refereeName: [{value: '张三', label: '张三'},
                    {value: '李四', label: '李四'},
                    {value: '王五', label: '王五'},
                    {value: '赵六', label: '赵六'},
                    {value: '林七', label: '林七'},
                    {value: '陈八', label: '陈八'},
                    {value: '张三0', label: '张三0'},
                    {value: '李四0', label: '李四0'},
                    {value: '王五0', label: '王五0'},
                    {value: '赵六0', label: '赵六0'},
                    {value: '林七0', label: '林七0'},
                    {value: '陈八0', label: '陈八0'}],
      refereePage: 1,
      refereeLoading : false,
      refereeNoMore: false,
      refereeTimer: null, // 这是用于防抖的计时器：加载盒子消失后，置为false,用计时器设置3秒后置为true,在此期间无法再次懒加载方法

      isDeleting: false, // 是否开启删除队伍模式
      teamNameNumber: 3 // 不取决于队伍数量，而是默认命名序号，只增不减。防止默认名重复
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
      // this.validateField('venue_name');
      // this.validateField('timeRange');
    },

    // 校验参赛者中单个队伍的规则
    validateParticipants(item, part) {
      // 校验队伍名称
      if (part === 'teamName' || part === 'all') {
        item.isError.titleError = item.teamName === null || item.teamName === '';
      }
      // 校验队伍成员
      if (part === 'player' || part === 'all') {
        item.isError.listError = item.players.length <= 0;
      }
    },

    // 懒加载赛事项目信息数据
    lazyLoadInEventSport() {
      if (this.eventSportLoading || this.eventSportNoMore || this.eventSportTimer !== null) {
        return;
      }
      this.getEventSport();
      // 设置计时器，3秒内无法再次触发
      this.eventSportTimer = setTimeout(() => {
        this.eventSportTimer = null; // 计时器结束后重置为 null
      }, 3000); // 3秒防抖时间
    },

    // 懒加载裁判信息数据
    lazyLoadInReferee() {
      if (this.refereeLoading || this.refereeNoMore || this.refereeTimer !== null) {
        return;
      }
      this.getRefereeName();
      // 设置计时器，3秒内无法再次触发
      this.refereeTimer = setTimeout(() => {
        this.refereeTimer = null; // 计时器结束后重置为 null
      }, 3000); // 3秒防抖时间
    },

    // 添加新的队伍
    addTeam() {
      const newTeamNumber = this.teamNameNumber;
      this.form.participants.push({
        teamName: `队伍${newTeamNumber}`,  // 自动生成 "队伍3"、"队伍4" 等
        players: [],  // 初始化空数组
        isError: {titleError: false, listError: false}
      });
      this.teamNameNumber++;
    },

    // 更新队伍名称
    updateTeamName(newTeamName, index) {
      this.form.participants[index].teamName = newTeamName;
    },

    // 根据index删除队伍
    deleteTeam(index) {
      this.form.participants.splice(index, 1);
      if (this.form.participants.length <= 3) {
        this.isDeleting = false;
      }
    },

    // 按照校验规则，校验任意字段，应使用在@change事件
    // 仅对select选择器、picker时间选择器和带disabled的普通输入框进行校验时使用
    validateField(fieldName) {
      this.$refs.ruleForm.validateField(fieldName, (errorMessage) => {
        console.log(fieldName);
        this[`is${fieldName}Error`] = errorMessage;
      });
    },

    // 重置表单
    resetForm(formName) {
      this.form.venue_id = '';
      this.$refs[formName].resetFields();
    },

    /* 用于后端交互并渲染数据的函数 */
    // 获取用户预约的场地
    async getVenue() {
      this.venueLoading = true;
      try {
        const data = await getVenue(this.venuePage);
        this.updateMyVenueTableData(data);
      } catch (error) {
        this.updateMyVenueTableData([]);
        this.form.venue_id = null;
        this.form.venue_name = '';
        this.form.start_time = null;
        this.form.end_time = null;
        this.$message.error('获取预约场地信息失败，请重试'); // 提示失败0
        console.error('获取预约场地信息:', error);
      }
    },

    // 获取赛事项目
    async getEventSport() {
      this.eventSportLoading = true;
      try {
        const data = await getEventSport(this.eventSportPage);
        if (data.length > 0) {
          // 数据格式转变为select读懂的格式
          const newData = data.map(item => ({
            value: item.eventSport,
            label: item.eventSport,
            teamNumber: item.teamNumber
          }));
          this.eventSport.push(...newData);
          this.eventSportPage++; // 加载下一页
        } else {
          this.eventSportNoMore = true; // 没有更多数据
        }
      } catch (error) {
        this.$message.error('获取赛事项目选项失败，请重试'); // 提示失败
        console.error('获取赛事项目选项失败:', error);
      } finally {
        this.eventSportLoading = false;
      }
    },

    // 获取裁判的姓名
    async getRefereeName() {
      this.refereeLoading = true;
      try {
        const data = await getRefereeName(this.refereePage);
        if (data.length > 0) {
          // 数据格式转变为select读懂的格式
          const newData = data.map(item => ({
            value: item,
            label: item,
          }));
          this.refereeName.push(...newData);
          this.refereePage++; // 加载下一页
        } else {
          this.refereeNoMore = true; // 没有更多数据
        }
      } catch (error) {
        this.$message.error('获取裁判姓名选项失败，请重试'); // 提示失败
        console.error('获取裁判姓名选项失败:', error);
      } finally {
        this.refereeLoading = false;
      }
    },


    async onSubmit(formName) {
      try {
        // 等待表单验证完成
        await this.$refs[formName].validate();

        // 验证通过后提交数据
        try {
          const data = await submitForm(this.form);
          this.$message.success('提交成功'); // 提示成功

          // 如果不是批量添加模式，重置表单
          if (!this.isMassAdd) {
            this.resetForm('ruleForm');
          }
        } catch (error) {
          this.$message.error('提交申请表单失败，请重试'); // 提示失败
          console.error('提交申请表单失败:', error);
        }
      } catch (error) {
          this.$message.error('请填写完整表单!');
      }
    }
  },
  watch: {
    "form.event_sport": {
      handler(newValue) {
        if (newValue === '') {
          this.form.teamNumber = 0;
          this.form.participants = [];
          return;
        }
        const selectedSport = this.eventSport.find(item => item.value === newValue);
        // 如果找到对应的元素，则赋值 eventClass
        this.form.participants = []; // 清空数组
        this.teamNameNumber = 1; // 重置序号
        this.isDeleting = false;
        // 找到且不为"其它"
        if (selectedSport && selectedSport.teamNumber !== 0) {
          for (let i = 0; i < selectedSport.teamNumber; i++) {
            this.addTeam();
          }
          this.form.teamNumber = selectedSport.teamNumber;
          return;
        }
        // 没找到或为其它
        for (let i = 0; i < 3; i++) {
          this.addTeam();
        }
        this.form.teamNumber = 12;
      },
    },
  },
  directives: {
    /** 下拉框懒加载 */
    'el-select-loadmore': {
      bind(el, binding) {
        const SELECTWRAP_DOM = el.querySelector(
            '.el-select-dropdown .el-select-dropdown__wrap'
        );
        SELECTWRAP_DOM.addEventListener('scroll', function() {
          const condition =
              this.scrollHeight - this.scrollTop <= this.clientHeight;
          if (condition) {
            binding.value();
          }
        });
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1000px;
  height: auto; /* 高度自适应 */
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.additional-info {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.additional-info h2 {
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
}

.additional-info p {
  font-size: 14px;
  color: #666;
  margin: 0;
}

::v-deep .el-form-item {
  margin-bottom: 10px; /* 自定义距离 */
}

::v-deep .el-form-item__label {
  font-size: 16px; /* 自定义字体大小 */
  font-weight: bolder; /* 自定义字体粗细 */
}

::v-deep .el-form--label-top .el-form-item__label {
  float: none;
  display: inline-block;
  text-align: left;
  padding: 0 0 0;
}

.hint {
  font-size: 12px;
  color: #888;
  padding: 0;
  height: 10px; /* 固定高度 */
  line-height: 10px; /* 确保文字垂直居中 */
}

.pagination-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  margin-top: 20px; /* 分页条与表格的间距 */
}

::v-deep .el-form-item.is-error .el-input.is-disabled .el-input__inner {
  border-color: #f56c6c !important; /* 强制设置为红色 */
}

::v-deep .el-form-item__error {
  display: none;
}

/* 只针对输入框添加红框 */
.validate-input-only .custom-transfer .el-input__inner {
  border-color: #ff4949 !important;
}
.validate-input-only .el-form-item__error {
  padding-left: 10px; /* 调整错误提示位置 */
}
</style>