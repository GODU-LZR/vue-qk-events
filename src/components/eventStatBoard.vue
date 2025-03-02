<template>
  <div>
    <el-row :gutter="20" style="width: 100%">
      <el-col :span="6">
        <div>
          <el-statistic
              group-separator=","
              :precision="0"
              :value="totalEventCount"
              title="总共比赛数目"
          ></el-statistic>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-statistic
              group-separator=","
              :precision="0"
              :value="monthEventCount"
              title="本月比赛数目"
          ></el-statistic>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-statistic
              group-separator=","
              :precision="0"
              decimal-separator="."
              :value="todayEventCount"
              title="今日比赛数目"
          >
            <template slot="prefix">
              <i class="el-icon-s-flag" style="color: red"></i>
            </template>
            <template slot="suffix">
              <i class="el-icon-s-flag" style="color: blue"></i>
            </template>
          </el-statistic>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-statistic :value="likeCount" title="好评数量" group-separator=",">
            <template slot="suffix">
              <span @click="updateLikeCount()" class="like">
                <i
                    class="el-icon-star-on"
                    style="color:red"
                    v-show="!!like"
                ></i>
                <i class="el-icon-star-off" v-show="!like"></i>
              </span>
            </template>
          </el-statistic>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "eventStatBoard",
  data() {
    return {
      like: true,
      likeCount: 1000,
      totalEventCount: 4154,
      monthEventCount: 1314,
      todayEventCount: 1000
    };
  },
  methods: {
      //点赞状态发生修改后，先发送请求到后端，前端数据仅做修改，不重新获取后端数据
      updateLikeCount() {
        if (this.like) {
          this.likeCount = this.likeCount - 1;
        } else {
          this.likeCount = this.likeCount + 1;
        }
        this.like = !this.like;
      }
  }
}
</script>

<style scoped>
.like {
  cursor: pointer;
  font-size: 25px;
  display: inline-block;
}
</style>