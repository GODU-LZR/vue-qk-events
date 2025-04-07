<template>
  <div>
    <el-row v-if="user === '超级管理员'" style="display: flex; justify-content: flex-end">
      <el-button type="primary" plain @click="() => {addButtonState = true; deleteButtonState = false;}">新增</el-button>
      <el-button type="success" plain @click="deleteButtonState = !deleteButtonState">删除</el-button>
    </el-row>

    <el-row v-if="user === '超级管理员'" style="display: flex; justify-content: flex-end; margin-top: 10px">
      <el-input v-model="search" placeholder="输入关键字搜索" size="small" style="width: 150px" @change="handleSearch"></el-input>
    </el-row>
    <ul class="infinite-list"
        style="overflow:auto; height: 450px;"
        v-infinite-scroll="lazyLoad"
        v-loading="getLoading">
      <li v-for="data in $store.state.refereeULData" class="infinite-list-item" style="position: relative; padding-right: 30px;list-style: none; padding-top: 10px;">

        <!-- 用户信息显示 -->
        <el-row class="demo-avatar demo-basic">
          <el-col :span="12">
            <div class="demo-basic--circle">
              <div class="block">
                <el-avatar :size="50" :src="data.picture_url"></el-avatar>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-descriptions title="用户信息">
          <el-descriptions-item label="姓名">{{ data.referee_name }}</el-descriptions-item>
          <el-descriptions-item label="联系电话">{{ data.phone }}</el-descriptions-item>
          <el-descriptions-item label="擅长项目">{{ showSports(data.specialties) }}</el-descriptions-item>
          <el-descriptions-item label="点赞数">
            <i class="el-icon-star-on" style="font-size: 20px"></i>
            {{ data.likes }}
          </el-descriptions-item>
          <el-descriptions-item label="个人荣誉">
            <el-tag size="small"
                    v-for="(honour, index) in data.honours"
                    :key="index"
                    style="margin-right: 10px">{{ honour }}</el-tag>
          </el-descriptions-item>
        </el-descriptions>

        <div
            v-if="user === '超级管理员'"
            class="delete-box"
            @click="deleteReferee(data.referee_id)"
            v-show="deleteButtonState">
          <i class="el-icon-close"></i>
        </div>
      </li>

      <!-- 固定高度的盒子，用于放置加载提示 -->
      <li class="loading-box">
        <div v-if="addLoading" style="text-align: center; padding: 10px;">
          <span>加载中</span>
          <i class="el-icon-loading"></i>
        </div>
        <div v-if="noMoreData" style="text-align: center; padding: 10px;">没有更多的数据了</div>
      </li>

      <li style="position: relative; padding-right: 30px;list-style: none; padding-top: 10px;">
        <el-empty description="暂无数据" v-show="$store.state.refereeULData.length <= 0"></el-empty>
      </li>
    </ul>

    <el-dialog
        v-if="user === '超级管理员'"
        title="新增"
        :visible.sync="addButtonState"
        width="30%"
        top="5vh">

      <el-form label-position="left" label-width="80px" :model="form">
        <el-form-item label="头像">
          <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>

        <el-form-item label="擅长项目">
          <el-select v-model="form.sports"
                     multiple placeholder="请选择"
                     class="custom-select"
                     filterable
                     :clearable="true">
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
import {mapMutations} from 'vuex'
import {getReferee} from "@/api/refereeUL/getReferee";
import {deleteReferee} from "@/api/refereeUL/deleteReferee";
export default {
  name: "refereeUL",
  data() {
    return {
      user: '超级管理员',
      addButtonState: false,
      deleteButtonState: false,
      getLoading: false,
      addLoading: false,
      noMoreData: false,
      lazyTimer: null,
      page: 1,
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
      imageUrl: '',
    }
  },
  methods: {
    // vuex辅助修改函数
    ...mapMutations(['updateRefereeULDataByReset', 'updateRefereeULDataByAdd']),

    /* 静态资源使用的函数 */
    // 由于暂时不确定specialties在数据库是怎么存储的，因此保留这个方法，返回值是擅长项目的展示值
    showSports(specialties) {
      let str = specialties;
      return str;
    },

    // 添加裁判时,删除tag触发的方法
    handleClose(tag) {
      this.form.honours.splice(this.form.honours.indexOf(tag), 1);
    },

    // 显示添加裁判时输入的input
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

    // search改变后触发的方法，要单独写是因为需要改变page的值
    handleSearch() {
      this.page = 1;
      this.getRefereeByReGet();
    },

    // 懒加载数据
    lazyLoad() {
      if (this.lazyTimer) clearTimeout(this.lazyTimer); // 清除之前的定时器
      this.lazyTimer = setTimeout(() => {
        if (!this.addLoading && !this.noMoreData) {
          this.getRefereeByAdd();
        }
      }, 300); // 设置防抖延迟时间（单位：毫秒）
    },

    // 头像上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },

    /* 用于后端交互并渲染数据的函数 */
    // 获取裁判信息，替换原有的数据，并渲染到UL上
    // 报错则会清空原数据
    // 用于搜索获取新的数据
    async getRefereeByReGet() {
      this.getLoading = true;
      try {
        const data = await getReferee(this.page, this.search);
        this.updateRefereeULDataByReset(data);
      } catch (error) {
        this.updateRefereeULDataByReset([]);
        this.$message.error('获取裁判信息失败，请重试'); // 提示失败
        console.error('获取裁判信息失败:', error);
      } finally {
        this.getLoading = false;
      }
    },

    // 获取裁判信息，添加到已有数据的后面，并渲染到UL上
    // 报错不会清空原有数据
    // 用于懒加载获取新的数据
    async getRefereeByAdd() {
      this.addLoading = true;
      try {
        const data = (await getReferee(this.page, this.search)) || [];
        if (data.length > 0) {
          this.updateRefereeULDataByAdd(data); // 添加新数据
          this.page++; // 加载下一页
        } else {
          this.noMoreData = true; // 没有更多数据
        }
      } catch (error) {
        this.$message.error('获取裁判信息失败，请重试'); // 提示失败
        console.error('获取裁判信息失败:', error);
      } finally {
        this.addLoading = false;
      }
    },

    // 删除裁判
    async deleteReferee(referee_id) {
      try {
        const data = await deleteReferee(referee_id);
        // 重新获取裁判
      } catch (error) {
        this.$message.error('删除裁判失败，请重试'); // 提示失败
        console.error('删除裁判失败:', error);
      }
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

.loading-box {
  height: 60px; /* 固定高度 */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 自定义删除按钮样式 */
.delete-box {
  position: absolute;
  top: 50%; /* 垂直居中 */
  right: 0;
  transform: translateY(-50%); /* 垂直居中 */
  width: 50px; /* 自定义宽度 */
  height: 90%; /* 高度占据 90% */
  background-color: rgba(0, 0, 0, 0.1); /* 灰色透明背景 */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer; /* 鼠标悬停时显示为手型 */
  transition: background-color 0.3s; /* 添加过渡效果 */
  border-radius: 10px;
}

.delete-box:hover {
  background-color: rgba(0, 0, 0, 0.2); /* 鼠标悬停时背景变深 */
}

/* 叉号图标样式 */
.delete-box i {
  font-size: 20px; /* 图标大小 */
  color: #666; /* 图标颜色 */
}

::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

::v-deep .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

::v-deep .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>