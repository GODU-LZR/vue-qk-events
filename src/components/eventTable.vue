<template>
  <div>
    <el-table
        :data="eventTableData.filter(data => !search || data.sport.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        empty-text = "暂无数据"
        height="68vh"
        v-loading = "loading">
      <el-table-column
          label="比赛时间">
            <template slot-scope="scope">
              {{ scope.row.start_time }} 至 {{ scope.row.end_time }}
            </template>
      </el-table-column>
      <el-table-column
          label="比赛项目"
          prop="sport">
      </el-table-column>
      <el-table-column
          label="参赛双方"
          prop="players">
      </el-table-column>
      <el-table-column
          label="比赛场地"
          prop="venue">
      </el-table-column>
      <el-table-column
          label="负责人"
          prop="responsiblePerson">
      </el-table-column>
      <el-table-column
          label="备注"
          prop="note">
      </el-table-column>
      <el-table-column
          prop="state"
          label="比赛状态"
          width="100"
          :filters="[{ text: '已结束', value: '已结束' }, { text: '未开始', value: '未开始'}, { text: '正在举行', value: '正在举行' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
              :type="chooseTag(scope.row.start_time, scope.row.end_time)[0]"
              disable-transitions>{{ chooseTag(scope.row.start_time, scope.row.end_time)[1] }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
          align="right">
        <template slot="header" slot-scope="scope">
          <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">关注</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-empty description="无内容" v-show="eventTableData.length <= 0"></el-empty>
  </div>
</template>

<script>
export default {
  name: "eventTable",
  data() {
    return {
      eventTableData: [{
        start_time: '2025-02-13 20:00',
        end_time: '2025-02-13 23:00',
        sport: '篮球',
        players: '软件1223VS软件1224',
        venue: '1号篮球场',
        state: '已付款',
        responsiblePerson: '张三',
        note: '备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注'
      }, {
        start_time: '2025-02-13 20:00',
        end_time: '2025-02-13 23:00',
        sport: '足球',
        players: '土木1223VS土木1224',
        venue: '1号足球场',
        state: '已付款',
        responsiblePerson: '李四',
        note: '备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注'
      }, {
        start_time: '2025-02-13 11:00',
        end_time: '2025-02-13 24:00',
        sport: '排球',
        players: '能源1223VS能源1224',
        venue: '2号排球场',
        state: '已付款',
        responsiblePerson: '王五',
        note: '备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注'
      }],
      search: '',
      loading: false
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    filterTag(value, row) {
      return this.chooseTag(row.start_time, row.end_time)[1] === value;
    },
    chooseTag(startTime, endTime) {
      const currentTime = new Date();
      const startDate = new Date(startTime);
      const endDate = new Date(endTime)
      if (currentTime < startDate) {
        // 未开始
        return ['info', '未开始'];
      }
      if (currentTime >= startDate && currentTime <= endDate) {
        // 正在举行
        return ['success', '正在举行'];
      }
      if (currentTime > endDate) {
        // 已结束
        return ['warning', '已结束'];
      }
    }
  }
}
</script>

<style scoped>

</style>