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
          :filters="[{ text: '待审核', value: '待审核' }, { text: '待付款', value: '待付款'}, { text: '已通过', value: '已通过' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
              :type="chooseTag(scope.row.state)"
              disable-transitions>{{ scope.row.state }}</el-tag>
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
              @click="handleEdit(scope.$index, scope.row)" v-if="scope.row.state === '待审核'">通过</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="() => {rejectTitle = '请输入否决原因'; handleDelete(scope.$index, scope.row.sport)}" v-if="scope.row.state === '待审核'">否决</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="() => {rejectTitle = '请输入撤销原因'; handleDelete(scope.$index, scope.row.sport)}" v-if="scope.row.state === '待付款' || scope.row.state === '已通过'">撤销</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
        :title="rejectTitle"
        :visible.sync="dialogVisible"
        width="40%">

      <el-descriptions title="赛事信息">
        <el-descriptions-item label="比赛时间">{{ deleteFormData.start_time }} 至 {{ deleteFormData.end_time }}</el-descriptions-item>
        <el-descriptions-item label="比赛项目">{{ deleteFormData.sport }}</el-descriptions-item>
        <el-descriptions-item label="参赛双方">{{ deleteFormData.players }}</el-descriptions-item>
        <el-descriptions-item label="比赛场地">{{ deleteFormData.venue }}</el-descriptions-item>
        <el-descriptions-item label="负责人">{{ deleteFormData.responsiblePerson }}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{ deleteFormData.phone }}</el-descriptions-item>
        <el-descriptions-item label="状态">{{ deleteFormData.state }}</el-descriptions-item>
        <el-descriptions-item label="备注">{{ deleteFormData.note }}</el-descriptions-item>
      </el-descriptions>

      <el-input
          type="textarea"
          :rows="4"
          :placeholder="rejectTitle"
          v-model="rejectOpinion">
      </el-input>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "auditTable",
  data() {
    return {
      eventTableData: [{
        start_time: '2025-02-13 20:00',
        end_time: '2025-02-13 23:00',
        sport: '篮球',
        players: '软件1223VS软件1224',
        venue: '1号篮球场',
        state: '待审核',
        responsiblePerson: '张三',
        phone: '123456789',
        note: '备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注'
      }, {
        start_time: '2025-02-13 20:00',
        end_time: '2025-02-13 23:00',
        sport: '足球',
        players: '土木1223VS土木1224',
        venue: '1号足球场',
        state: '待付款',
        responsiblePerson: '李四',
        phone: '123456789',
        note: '备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注'
      }, {
        start_time: '2025-02-13 11:00',
        end_time: '2025-02-13 24:00',
        sport: '排球',
        players: '能源1223VS能源1224',
        venue: '2号排球场',
        state: '已通过',
        responsiblePerson: '王五',
        phone: '123456789',
        note: '备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注'
      }],
      search: '',
      loading: false,

      deleteFormData: {
        start_time: '',
        end_time: '',
        sport: '',
        players: '',
        venue: '',
        state: '',
        responsiblePerson: '',
        phone: '',
        note: ''
      },
      dialogVisible: false,
      rejectOpinion: '',
      rejectTitle: ''
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, sport) {
      this.deleteFormData.start_time = this.eventTableData[index].start_time;
      this.deleteFormData.end_time = this.eventTableData[index].end_time;
      this.deleteFormData.sport = this.eventTableData[index].sport;
      this.deleteFormData.players = this.eventTableData[index].players;
      this.deleteFormData.venue = this.eventTableData[index].venue;
      this.deleteFormData.state = this.eventTableData[index].state;
      this.deleteFormData.responsiblePerson = this.eventTableData[index].responsiblePerson;
      this.deleteFormData.phone = this.eventTableData[index].phone;
      this.deleteFormData.note = this.eventTableData[index].note;
      this.dialogVisible = true;
    },

    filterTag(value, row) {
      return row.state === value;
    },
    chooseTag(value) {
      if (value === '待审核') {
        return 'warning';
      }
      if (value === '未付款') {
        return 'info';
      }
      if (value === '已付款') {
        return 'success';
      }
      if (value === '已否决') {
        return 'danger';
      }
    }
  }
}
</script>

<style scoped>

</style>