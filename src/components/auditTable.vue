<template>
  <div class="container">

    <el-tabs v-model="review_status" @tab-click="handleClick">
      <el-tab-pane label="待审核" name="0"></el-tab-pane>
      <el-tab-pane label="已通过" name="1"></el-tab-pane>
      <el-tab-pane label="已否决" name="2"></el-tab-pane>
      <el-tab-pane label="已撤销" name="3"></el-tab-pane>
    </el-tabs>


    <el-table
        :data="$store.state.auditEventTableData"
        style="width: 100%"
        empty-text = "暂无数据"
        v-loading = "loading"
        class="dynamic-height-table"
        height="75vh">
      <el-table-column
          label="比赛时间">
        <template slot-scope="scope">
          {{ scope.row.start_time }} 至 {{ scope.row.end_time }}
        </template>
      </el-table-column>
      <el-table-column
          label="比赛项目"
          prop="event_sport">
      </el-table-column>
      <el-table-column
          label="参赛双方"
          prop="participants">
      </el-table-column>
      <el-table-column
          label="比赛场地"
          prop="venue_name">
      </el-table-column>
      <el-table-column
          label="负责人"
          prop="responsible_person">
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
          align="right"
          fixed="right">
        <template slot="header" slot-scope="scope">
          <el-button
              @click="filterDrawerVisible = true"
              type="success"
              size="mini"
              style="width: 70px; margin-left: auto; margin-right: 20px;">
            过滤器
          </el-button>
        </template>
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="approvePendingEvent(scope.row.event_id)"
              v-if="scope.row.review_status === 0">通过</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row, '请输入否决原因')"
              v-if="scope.row.review_status === 0">否决</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row, '请输入撤销原因')"
              v-if="scope.row.review_status === 1" :disabled="chooseTag(scope.row.start_time, scope.row.end_time)[1] !== '未开始'">撤销</el-button>
          <el-button
              size="mini"
              type="primary"
              @click="handleDetail(scope.row)"
              v-if="scope.row.review_status === 2 || scope.row.review_status === 3">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页条 -->
    <div class="pagination-container">
      <el-pagination
          background
          :current-page.sync="page"
          layout="prev, pager, next"
          :total="300"
          :page-size="10"
          @current-change="getAuditEvent()"
      ></el-pagination>
    </div>

    <el-dialog
        :title="rejectTitle"
        :visible.sync="dialogVisible"
        width="40%"
        @close="handleCancel">

      <el-descriptions title="赛事信息">
        <el-descriptions-item label="比赛时间">{{ deleteFormData.start_time }} 至 {{ deleteFormData.end_time }}</el-descriptions-item>
        <el-descriptions-item label="比赛项目">{{ deleteFormData.event_sport }}</el-descriptions-item>
        <el-descriptions-item label="参赛双方">{{ deleteFormData.participants }}</el-descriptions-item>
        <el-descriptions-item label="比赛场地">{{ deleteFormData.venue_name }}</el-descriptions-item>
        <el-descriptions-item label="负责人">{{ deleteFormData.responsible_person }}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{ deleteFormData.phone }}</el-descriptions-item>
        <el-descriptions-item label="状态">{{ deleteFormData.review_status }}</el-descriptions-item>
        <el-descriptions-item label="备注">{{ deleteFormData.note }}</el-descriptions-item>
      </el-descriptions>

      <el-input
          type="textarea"
          :rows="4"
          :placeholder="rejectTitle"
          v-model="reject_opinion"
          resize="none"
          style="border-radius: 10px">
      </el-input>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="rejectAndCancelEvent">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog
        title="详细信息"
        :visible.sync="detailDialogVisible"
        width="40%"
        @close="handleDetailCancel">

      <el-descriptions title="赛事信息">
        <el-descriptions-item label="比赛时间">{{ detailEventData.start_time }} 至 {{ detailEventData.end_time }}</el-descriptions-item>
        <el-descriptions-item label="比赛项目">{{ detailEventData.event_sport }}</el-descriptions-item>
        <el-descriptions-item label="参赛双方">{{ detailEventData.participants }}</el-descriptions-item>
        <el-descriptions-item label="比赛场地">{{ detailEventData.venue_name }}</el-descriptions-item>
        <el-descriptions-item label="负责人">{{ detailEventData.responsible_person }}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{ detailEventData.phone }}</el-descriptions-item>
        <el-descriptions-item label="状态">{{ detailEventData.review_status }}</el-descriptions-item>
        <el-descriptions-item label="备注">{{ detailEventData.note }}</el-descriptions-item>
      </el-descriptions>

      <el-input
          type="textarea"
          :rows="4"
          :placeholder="rejectTitle"
          v-model="detailEventData.opinion"
          resize="none"
          style="border-radius: 10px"
          :disabled="true">
      </el-input>

      <span slot="footer" class="dialog-footer">
    <el-button @click="detailDialogVisible = false">取 消</el-button>
    <el-button type="primary">确 定</el-button>
  </span>
    </el-dialog>

    <el-drawer
        title="过滤器"
        :visible.sync="filterDrawerVisible"
        direction="ltr"
        @close="getAuditEvent">
      <el-form label-position="right" label-width="80px" :model="search">
        <el-form-item label="赛事编号">
          <el-input v-model="search.event_id" placeholder="请输入赛事编号" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="比赛项目">
          <el-select v-model="search.event_sport" multiple placeholder="请选择" style="width: 80%">
            <el-option
                v-for="item in [{value: '篮球',label: '篮球'}, {value: '足球',label: '足球'}]"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="比赛场地">
          <el-select v-model="search.venue_name" multiple placeholder="请选择" style="width: 80%">
            <el-option
                v-for="item in [{value: '1号篮球场',label: '1号篮球场'}, {value: '1号足球场',label: '1号足球场'}]"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="参赛人员">
          <el-input v-model="search.participant" placeholder="请输入参赛人员" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="比赛时间">
          <div class="block">
            <el-date-picker
                v-model="search.event_time"
                type="datetime"
                placeholder="选择日期时间"
                style="width: 80%"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm">
            </el-date-picker>
          </div>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {getAuditEvent} from '@/api/auditTable/getAuditEvent'
import {approvePendingEvent} from "@/api/auditTable/approvePendingEvent";
import {rejectAndCancelEvent} from "@/api/auditTable/rejectAndCancelEvent";
export default {
  name: "auditTable",
  data() {
    return {
      filterDrawerVisible: false, // 过滤器抽屉是否出现
      loading: false,
      search: {
        event_id: null,
        event_sport: [],
        event_time: '',
        participant: '',
        venue_name: []
      }, // 过滤器
      review_status: "0",
      page:1,

      deleteFormData: {}, // 否决和撤销的dialog信息
      detailEventData: {}, // 已否决、已撤销的赛事详情信息
      dialogVisible: false,
      detailDialogVisible: false,
      reject_opinion: '',
      rejectTitle: ''
    }
  },
  methods: {
    // vuex辅助修改函数
    ...mapMutations(['updateAuditEventTableData']),

    /* 静态资源使用的函数 */
    handleClick() {
      this.getAuditEvent();
    },

    // 将否决和撤销对应赛事的信息写入到展示dialog数据里
    handleDelete(row, rejectTitle) {
      this.rejectTitle = rejectTitle;
      this.deleteFormData = row;
      this.dialogVisible = true;
    },

    // 关闭dialog后触发的方法,用于消除dialog已有信息
    handleCancel() {
      this.deleteFormData = {};
      this.reject_opinion = '';
      this.rejectTitle = ''
    },

    // 将已否决和已撤销的赛事的信息,写入到展示dialog数据里
    handleDetail(row) {
      this.detailEventData = row;
      this.detailDialogVisible = true;
    },

    // 关闭dialog后触发的方法,用于消除dialog已有信息
    handleDetailCancel() {
      this.detailEventData = {};
    },

    filterTag(value, row) {
      return this.chooseTag(row.start_time, row.end_time)[1] === value;
    },

    // 根据比赛的状态进行比较,确认比赛状态样式
    chooseTag(startTime, endTime) {
      const currentTime = new Date();
      const startDate = new Date(startTime);
      const endDate = new Date(endTime)
      if (currentTime < startDate) {return ['info', '未开始'];}
      if (currentTime >= startDate && currentTime <= endDate) {return ['success', '正在举行'];}
      if (currentTime > endDate) {return ['warning', '已结束'];}
    },

    // 将具体信息展示出来，只能用于已否决、已撤销的赛事，由于信息已经获取，因此只涉及前端内容
    displayEventDetail(row) {

    },

    /* 用于后端交互并渲染数据的函数 */
    // 获取我的赛事表格的数据并且渲染在表格组件上
    async getAuditEvent() {
      this.loading = true;
      try {
        const data = await getAuditEvent(this.page, this.search, this.review_status);
        this.updateAuditEventTableData(data);
      } catch (error) {
        this.updateAuditEventTableData([]); // 清空我的赛事表格数据
        this.$message.error('获取审核赛事失败，请重试'); // 提示失败
        console.error('获取审核赛事失败:', error);
      } finally {
        this.loading = false;
      }
    },

    // 通过待审核的赛事
    async approvePendingEvent(event_id) {
      try {
        const data = await approvePendingEvent(event_id);
        this.page = 1;
        this.search = '';
        await this.getAuditEvent();
      } catch (error) {
        this.$message.error('通过待审核赛事失败，请重试'); // 提示失败
        console.error('通过待审核赛事失败:', error);
      }
    },

    // 否决待审核、撤销已通过的赛事
    async rejectAndCancelEvent() {
      try {
        const data = await rejectAndCancelEvent(this.deleteFormData.event_id, this.reject_opinion);
        this.page = 1;
        this.search = '';
        await this.getAuditEvent();
      } catch (error) {
        this.$message.error('否决待审核赛事失败，请重试'); // 提示失败
        console.error('否决待审核赛事失败:', error);
      } finally {
        this.handleCancel();
        this.dialogVisible = false;
      }
    },
  },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 75vh; /* 容器占满整个视口高度 */
}

.dynamic-height-table {
  flex: 1; /* 表格占据剩余空间 */
  overflow-y: auto; /* 如果数据超过高度，显示滚动条 */
}

.pagination-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  margin-top: 20px; /* 分页条与表格的间距 */
}

::v-deep .el-dialog {
  border-radius: 10px;
}

::v-deep .el-dialog__header {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

::v-deep .el-dialog__footer {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>