<template>
  <div>
    <el-row v-if="user === '超级管理员'" style="display: flex; justify-content: flex-end;">
      <el-button type="primary" plain @click="() => {addButtonState = true; deleteButtonState = false;}">新增</el-button>
      <el-button type="success" plain @click="deleteButtonState = !deleteButtonState">删除</el-button>
    </el-row>

    <ul class="infinite-list" style="overflow:auto">
      <li v-for="data in tableData" class="infinite-list-item" style="position: relative; padding-right: 30px;list-style: none; padding-top: 10px;">

        <!-- 用户信息显示 -->
        <el-row class="demo-avatar demo-basic">
          <el-col :span="12">
            <div class="demo-basic--circle">
              <div class="block">
                <el-avatar :size="50" :src="data.pictureUrl"></el-avatar>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-descriptions title="用户信息">
          <el-descriptions-item label="姓名">{{ data.name }}</el-descriptions-item>
          <el-descriptions-item label="联系电话">{{ data.phone }}</el-descriptions-item>
          <el-descriptions-item label="擅长项目">{{ showSports(data.sports) }}</el-descriptions-item>
          <el-descriptions-item label="个人荣誉">
            <el-tag size="small" v-for="honour in data.honours" style="margin-right: 10px">{{ honour }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="点赞数">
            <i class="el-icon-star-on" style="font-size: 20px"></i>
            {{ data.likeNumber }}
          </el-descriptions-item>
        </el-descriptions>

        <el-button
            v-if="user === '超级管理员'"
            type="text"
            icon="el-icon-remove"
            size="small"
            circle
            @click="handleDelete(data.name)"
            style="position: absolute; top: 10vh; right: 5vh; font-size: 24px;"
            v-show="deleteButtonState">
        </el-button>

      </li>
    </ul>

    <el-dialog
        v-if="user === '超级管理员'"
        title="新增"
        :visible.sync="addButtonState"
        width="30%">

      <el-form label-position="left" label-width="80px" :model="form">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>

        <el-form-item label="擅长项目">
          <el-select v-model="form.sports" multiple placeholder="请选择" class="custom-select" filterable clearable="true">
            <el-option
                v-for="item in [{value: '篮球', label: '篮球'}, {value: '足球', label: '足球'}, {value: '排球', label: '排球'}, {value: '羽毛球', label: '羽毛球'}, {value: '乒乓球', label: '乒乓球'}]"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="个人荣誉" prop="age">
          <el-tag
              :key="tag"
              v-for="tag in form.honours"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
            {{tag}}
          </el-tag>

          <el-input
              class="input-new-tag"
              v-show="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
              :style="tagStyle"
          >
          </el-input>

          <el-tooltip class="item" effect="dark" content="最多只能有3个标签" placement="top-start">
            <el-button class="button-new-tag" size="small" @click="showInput" :style="tagStyle" v-show="!inputVisible && form.honours.length < 3">+ New Tag</el-button>
          </el-tooltip>

        </el-form-item>

        <!-- 添加flex布局并设置右对齐 -->
        <el-form-item style="display: flex; justify-content: flex-end;">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="addButtonState = false">取消</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "refereeTable",
  data() {
    return {
      user: '超级管理员',
      addButtonState: false,
      deleteButtonState: false,
      tableData: [{
        pictureUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        name: '张三',
        phone: '123456789',
        sports: ['篮球', '足球', '羽毛球'],
        honours: ['国家一级运动员', '国家二级教练'],
        likeNumber: 100
      },
      {
        pictureUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        name: '李四',
        phone: '987654321',
        sports: ['乒乓球', '排球'],
        honours: ['国家二级运动员', '国家一级教练', '月最佳员工'],
        likeNumber: 428
      }],
      search: '',

      form: {
        pictureUrl: '',
        name: '',
        phone: '',
        sports: [],
        honours: []
      },
      inputVisible: false,
      inputValue: '',

    }
  },
  methods: {
    showSports(sports) {
      let str = '';
      sports.forEach((v) => {
        if( str !== '') {
          str = str + '、'
        }
        str = str + v;
      });
      return str;
    },

    handleDelete(id) {
      console.log(id);
    },

    handleClose(tag) {
      this.form.honours.splice(this.form.honours.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      // 标签最多只有三个
      if (this.form.honours.length >= 3) {
        return;
      }
      let inputValue = this.inputValue;
      if (inputValue) {
        this.form.honours.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  computed: {
    tagStyle() {
      return {
        marginLeft: this.form.honours.length > 0 ? '10px' : '0'
      };
    }
  }
}
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

</style>