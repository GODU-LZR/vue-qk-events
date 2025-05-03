<template>
  <div style="margin: 20px">
    <el-table
        :data="playersData"
        stripe
        show-summary
        :summary-method="handleSummary"
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
    </el-table>
  </div>
</template>

<script>
export default {
  name: "playersTable",
  props: {
    teamName: {
      type: String
    },
    playersData: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleSummary(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          // 第一列显示"总和"
          sums[index] = "总和";
          return;
        }

        // 定义不需要汇总的列（时间列）
        const noSumColumns = ["minutes"];
        if (noSumColumns.includes(column.property)) {
          sums[index] = "--";
          return;
        }

        // 处理投篮列的特殊格式
        if (column.property === "fgMade" || column.property === "fgAtt") {
          const made = data.reduce((sum, item) => sum + item.fgMade, 0);
          const att = data.reduce((sum, item) => sum + item.fgAtt, 0);
          sums[index] = `${made}-${att}`;
          return;
        }

        // 常规数值列汇总
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            return isNaN(value) ? prev : prev + value;
          }, 0);
        } else {
          sums[index] = "--";
        }
      });
      return sums;
    }
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
