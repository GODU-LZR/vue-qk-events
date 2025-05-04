<template>
  <div style="padding: 20px">
    <el-table
        :data="playersData"
        stripe
        style="width: 100%">
      <el-table-column
          prop="name"
          :label="teamName"
          width="180">
      </el-table-column>
      <el-table-column
          prop="minutes"
          label="时间"
          width="180">
      </el-table-column>
      <el-table-column
          prop="pts"
          label="得分">
      </el-table-column>
      <el-table-column
          prop="reb"
          label="篮板">
      </el-table-column>
      <el-table-column
          prop="ast"
          label="助攻">
      </el-table-column>
      <el-table-column
          label="投篮">
        <template slot-scope="scope">
          {{ scope.row.fgMade }}-{{scope.row.fgAtt}}
        </template>
      </el-table-column>
      <el-table-column
          align="right">
        <template slot-scope="scope">
          <el-button size="small" @click="updatePlayer(scope.row.player_id)">
            修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "layersTable",
  props: {
    teamName: {
      type: String
    },
    playersData: {
      type: Array,
      required: true
    },
  },
  data() {
    return{
    }
  },
  methods: {
    // 通知GetMyMatchEvent开启修改面板,对队员进行修改
    updatePlayer(player_id) {
      this.$emit('update-player', player_id);
    },
  }
}
</script>

<style scoped>
/* 可以添加自定义样式来突出显示总和行 */
::v-deep .el-table__footer-wrapper tbody td {
  font-weight: bold;
  background-color: #f5f7fa;
}
</style>