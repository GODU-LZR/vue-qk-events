<template>
  <div class="container">
    <div class="additional-info">
      <h2>填写说明</h2>
      <p>请仔细填写以下表单，确保信息准确无误。带 * 的字段为必填项。</p>
    </div>

    <!-- 表单 -->
    <el-form :model="form" label-width="120px" style="margin-top: 20px;" label-position="top" :rules="rules" ref="ruleForm" >
      <!-- 比赛项目 -->
      <el-form-item label="比赛项目" prop="event_sport">
        <el-select v-model="form.event_sport"
                   placeholder="请选择"
                   v-el-select-loadmore="lazyLoad"
                   @blur="validateField('event_sport')"
                   style="width: 100%"
                   remote
                   filterable
                   :remote-method="remoteMethod">
          <el-option
              v-for="item in sportData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
          <div style="height: 34px; display: flex; justify-content: center; align-items: center;" v-if="sportLoading || sportNoMore">
            <p v-if="sportLoading">加载中<i class="el-icon-loading"/></p>
            <p v-if="sportNoMore">没有更多了</p>
          </div>
        </el-select>
        <p class="hint">请选择赛事举办的比赛项目。</p>
      </el-form-item>

      <el-form-item label="赛事名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入"></el-input>
        <p class="hint">请选择赛事名称。</p>
      </el-form-item>

      <!-- 负责人 -->
      <el-form-item label="负责人" prop="responsiblePerson">
        <el-select v-model="form.responsiblePerson"
                   placeholder="请选择"
                   v-el-select-loadmore="lazyLoad"
                   @blur="validateField('responsiblePerson')"
                   style="width: 100%"
                   remote
                   filterable
                   :remote-method="remoteMethod">
          <el-option
              v-for="item in responsiblePersonData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
          <div style="height: 34px; display: flex; justify-content: center; align-items: center;" v-if="responsiblePersonLoading || responsiblePersonNoMore">
            <p v-if="responsiblePersonLoading">加载中<i class="el-icon-loading"/></p>
            <p v-if="responsiblePersonNoMore">没有更多了</p>
          </div>
        </el-select>
        <p class="hint">请选择赛事的负责人。</p>
      </el-form-item>

      <!-- 联系电话 -->
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入联系电话"></el-input>
        <p class="hint">请输入负责人的联系电话。</p>
      </el-form-item>

      <!-- 备注信息 -->
      <el-form-item label="备注" prop="note">
        <el-input v-model="form.note" placeholder="请输入备注"></el-input>
        <p class="hint">请输入备注信息。</p>
      </el-form-item>

      <!-- 报名时间 -->
      <el-form-item label="报名时间" prop="register_time">
        <el-date-picker
            v-model="form.register_time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="截止日期"
            style="width: 50%">
        </el-date-picker>
        <p class="hint">请输入报名开始和截止时间。</p>
      </el-form-item>

      <!-- 比赛开始时间 -->
      <el-form-item label="开始时间" prop="start_time">
        <el-date-picker
            v-model="form.start_time"
            type="datetime"
            placeholder="选择日期时间"
            style="width: 50%">
        </el-date-picker>
        <p class="hint">请输入赛事开始时间。</p>
      </el-form-item>

      <!-- 匹配模式 -->
      <el-form-item label="选择匹配模式" prop="method">
        <competition-method-selector v-model="form.method"/>
        <p class="hint">请输入队伍匹配模式。</p>
      </el-form-item>

      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit('ruleForm')">提 交</el-button>
        <el-button type="success" @click="resetForm('ruleForm')">重 置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import competitionMethodSelector from './competitionMethodSelector.vue'
export default {
  name: "addEventForm",
  components: {
     competitionMethodSelector: competitionMethodSelector
  },
  data() {
    return {
      form: {
        sport: '', // 赛事项目
        name: '', // 赛事名称
        register_time: '', // 报名开始和截止时间
        start_time: '', // 赛事开始时间(结束时间未知，无需填写)
        responsiblePerson: '', // 负责人
        phone: '', // 负责人联系电话
        promotionMethod: '',
        method: 'time', // 匹配模式
        note: '' // 备注
      },

      rules: {
        event_sport: [{ required: true, message: ' '},],
        name: [{ required: true, message: ' '},],
        responsiblePerson: [{ required: true, message: ' '},],
        phone: [{ required: true, message: ' '},],
        register_time: [{ required: true, message: ' '},],
        start_time: [{ required: true, message: ' '},],
        method: [{ required: true, message: ' '},],
      },

      sportData: [{value: '跑步',label: '跑步'},
                  {value: '游泳',label: '游泳'},
                  {value: '吃鸡',label: '吃鸡'},
                  {value: '篮球',label: '篮球'},
                  {value: '足球',label: '足球'},
                  {value: '跑步1',label: '跑步'},
                  {value: '游泳1',label: '游泳'},
                  {value: '吃鸡1',label: '吃鸡'},
                  {value: '篮球1',label: '篮球'},
                  {value: '足球1',label: '足球'}], // 赛事项目列表
      sportPage: 1, // 赛事项目列表页数
      sportSearch: '', // 赛事项目搜索关键字
      sportLoading: false, // 赛事项目加载中状态
      sportNoMore: false, // 赛事项目无更多状态
      sportTimer: null,

      responsiblePersonData: [], // 负责人列表
      responsiblePersonPage: 1, // 负责人列表页数
      responsiblePersonSearch: '', // 负责人搜索关键字
      responsiblePersonLoading: false, // 负责人加载中状态
      responsiblePersonNoMore: false, // 负责人无更多状态
      responsiblePersonTimer: null
    }
  },
  methods: {
    // 按照校验规则，校验任意字段，应使用在@change事件
    // 仅对select选择器、picker时间选择器和带disabled的普通输入框进行校验时使用
    validateField(fieldName) {
      this.$refs.ruleForm.validateField(fieldName, (errorMessage) => {
        this[`is${fieldName}Error`] = errorMessage;
      });
    },

    remoteMethod(query) {
      console.log("发起搜索");
    },

    lazyLoad() {
      console.log("发起懒加载");
      this.sportLoading = true;
      setTimeout(() => {
        this.sportLoading = false;
      }, 3000);
    },

    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    async onSubmit(formName) {
      try {
        // 等待表单验证完成
        await this.$refs[formName].validate();
        // 验证通过后提交数据

      } catch (error) {
        this.$message.error('请填写完整表单!');
      }
    }
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

.hint {
  font-size: 12px;
  color: #888;
  padding: 0;
  height: 10px; /* 固定高度 */
  line-height: 10px; /* 确保文字垂直居中 */
}
</style>