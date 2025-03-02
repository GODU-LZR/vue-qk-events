<template>

  <el-form ref="form" :model="form" label-width="80px" :rules="rules" status-icon>

    <el-form-item label="赛事项目" prop="sport">
      <el-select v-model="form.sport" placeholder="请选择比赛项目">
        <el-option label="篮球" value="basketball"></el-option>
        <el-option label="足球" value="football"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="比赛场地" prop="venue">
      <el-select v-model="form.venue" placeholder="请选择比赛场地">
        <el-option label="1号篮球场" value="shanghai"></el-option>
        <el-option label="2号篮球场" value="beijing"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="比赛时间" prop="dateRange">
      <div class="block">
        <el-date-picker
            v-model="form.dateRange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm">
        </el-date-picker>
      </div>
    </el-form-item>

    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="负责人" prop="responsiblePeople">
          <el-input v-model="form.responsiblePeople"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="队伍1" prop="player1">
          <el-input v-model="form.player1"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="队伍2" prop="player2">
          <el-input v-model="form.player2"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item label="裁判员">
      <el-tooltip class="item" effect="dark" content="多位裁判时建议使用空格分隔" placement="top-start">
        <el-input v-model="form.referees"></el-input>
      </el-tooltip>
    </el-form-item>

    <el-form-item label="备注">
      <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')">立即预约</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
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
        console.log("aaaaaa");
        if (!reg.test(value)) {
          return callback(new Error('请输入正确的手机号'));
        } else {
          callback();
        }
      }, 1000);
    };

    return {
      form: {
        sport: '',
        venue: '',
        dateRange: [],
        responsiblePeople: '',
        phone: '',
        player1:'',
        player2:'',
        referees: '',
        desc: '',

        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      },

      rules: {
        sport: [ {required: true, message: "请输入比赛项目", trigger: 'blur'} ],
        venue: [ {required: true, message: "请输入比赛场地", trigger: 'blur'} ],
        dateRange: [ {required: true, message: "请输入比赛时间", trigger: 'blur'} ],
        responsiblePeople: [ {required: true, message: "请输入负责人", trigger: 'blur'} ],
        phone: [ {validator: checkPhone, trigger: 'blur'} ],
        player1: [ {required: true, message: "请输入比赛队伍1", trigger: 'blur'} ],
        player2: [ {required: true, message: "请输入比赛队伍2", trigger: 'blur'} ]
      }
    }
  },
  methods: {
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