<template>
  <el-collapse @change="handleChange">
    <el-collapse-item title="自动删除已结束、已撤销的赛事">

      <el-switch
          v-model="value1"
          active-text="开启"
          inactive-text="取消"
          active-value="开启"
          inactive-value="取消"
          @change="test">
      </el-switch>

    </el-collapse-item>
    <el-collapse-item title="关注赛事开始前5分钟通知">
      <el-switch
          v-model="value2"
          active-text="开启"
          inactive-text="取消"
          active-value="开启"
          inactive-value="取消">
      </el-switch>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  name: "followEventSwitchBoard",
  data() {
    return {
      value1: '取消',
      value2: '取消',
    }
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    test(){
      if (this.value1 === '取消'){
        return;
      }

      this.$confirm('此操作将立刻删除已结束、已取消的比赛', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

      }).catch(() => {
        this.value1 = '取消'
      });

    }
  }
}
</script>

<style scoped>

</style>