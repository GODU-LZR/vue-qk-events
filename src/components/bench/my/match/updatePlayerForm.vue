<template>
  <div class="update-player-form">
    <el-form
        ref="playerStatsForm"
        :model="form"
        label-width="100px"
        size="small">
      <!-- 球员姓名 -->
      <el-form-item label="球员姓名">
        <el-input v-model="form.name" disabled></el-input>
      </el-form-item>

      <!-- 上场时间  -->
      <el-form-item label="上场时间">
        <el-input v-model="form.minutes" placeholder="例如: 60:00"></el-input>
      </el-form-item>

      <el-row>
        <el-col :span="8">
          <!-- 得分 -->
          <el-form-item label="个人得分">
            <el-input-number
                v-model="form.pts"
                :min="0"
                controls-position="right"
                style="width: 100%;"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <!-- 篮板 -->
          <el-form-item label="篮板得分">
            <el-input-number
                v-model="form.reb"
                :min="0"
                controls-position="right"
                style="width: 100%;"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <!-- 助攻 -->
          <el-form-item label="助攻得分">
            <el-input-number
                v-model="form.ast"
                :min="0"
                controls-position="right"
                style="width: 100%;"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <!-- 投篮命中 -->
          <el-form-item label="投篮命中">
            <el-input-number
                v-model="form.fgMade"
                :min="0"
                controls-position="right"
                style="width: 100%;"></el-input-number>
          </el-form-item>
          </el-col>
          <el-col :span="8">
            <!-- 投篮 -->
            <el-form-item label="投篮次数">
              <el-input-number
                  v-model="form.fgAtt"
                  :min="0"
                  controls-position="right"
                  style="width: 100%;"></el-input-number>
            </el-form-item>
          </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'updatePlayerForm', // 组件名称
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: JSON.parse(JSON.stringify(this.value))
    };
  },
  watch: {
    // 监听外部传入的 value prop 的变化
    value: {
      handler(newValue) {
        if (JSON.stringify(newValue) !== JSON.stringify(this.form)) {
          this.form = JSON.parse(JSON.stringify(newValue));
        }
      },
      deep: true,
      immediate: true // 组件创建时立即执行一次,初始化form
    },
    form: {
      handler(newValue) {
        if (JSON.stringify(newValue) !== JSON.stringify(this.value)) {
          this.$emit('input', JSON.parse(JSON.stringify(newValue)));
        }
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.update-player-form {
  padding: 20px;
  margin: 20px auto;
}

.el-input-number >>> input {
  text-align: center;
}
</style>

