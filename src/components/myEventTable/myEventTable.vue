<template>
  <div class="container">
    <el-tabs v-model="review_status" @tab-click="handleClick">
      <el-tab-pane label="待审核" name="0"></el-tab-pane>
      <el-tab-pane label="已通过" name="1"></el-tab-pane>
      <el-tab-pane label="已否决" name="2"></el-tab-pane>
      <el-tab-pane label="已撤销" name="3"></el-tab-pane>
    </el-tabs>

    <el-table
        :data="$store.state.myEventTableData"
        style="width: 100%"
        empty-text="暂无数据"
        v-loading="loading"
        class="dynamic-height-table"
        height="69vh">
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
          label="参赛方">
        <template slot-scope="scope">
          {{ scope.row.participants.map((team) => { return team.teamName}).join(" VS ") }}
        </template>
      </el-table-column>
      <el-table-column
          label="比赛场地"
          prop="venue_name">
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
          <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
              @change="getMyEvent"/>
        </template>
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="showDetailEvent(scope.row)">赛事详情</el-button>
          <el-button
              size="mini"
              type="danger" v-if="(scope.row.review_status === 0 || scope.row.review_status === 1) && chooseTag(scope.row.start_time, scope.row.end_time)[1] === '未开始'" @click="rescindEvent(scope.row.event_id)">撤销</el-button>
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
          @current-change="getMyEvent()"
      ></el-pagination>
    </div>

    <!--赛事详情-->
    <el-dialog title="赛事详情" :visible.sync="eventDetailDrawerVisiable" top="30px">
      <eventInfo
          :event="detailEvent"></eventInfo>
    </el-dialog>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import eventInfo from '../eventTable/eventInfo'
import {getMyEvent} from '@/api/myEventTable/getMyEvent'
import {rescindEvent} from "@/api/myEventTable/rescindEvent";
export default {
  name: "myEventTable",
  components: {
    eventInfo: eventInfo
  },
  data() {
    return {
      loading: false,
      search: '',
      review_status: '0',
      page: 1,

      eventDetailDrawerVisiable: false,
      detailEvent: {}
    }
  },
  methods: {
    // vuex辅助修改函数
    ...mapMutations(['updateMyEventTableData']),

    /* 静态资源使用的函数 */
    handleClick(tab, event) {
      this.getMyEvent();
    },

    filterTag(value, row) {
      return this.chooseTag(row.start_time, row.end_time)[1] === value;
    },

    // 根据比赛时间和当前时间进行比较，确认比赛状态
    chooseTag(startTime, endTime) {
      const currentTime = new Date();
      const startDate = new Date(startTime);
      const endDate = new Date(endTime)
      if (currentTime < startDate) {return ['info', '未开始'];}
      if (currentTime >= startDate && currentTime <= endDate) {return ['success', '正在举行'];}
      if (currentTime > endDate) {return ['warning', '已结束'];}
    },

    // 展示赛事详细信息
    showDetailEvent(detailEvent) {
      this.detailEvent = detailEvent;
      this.eventDetailDrawerVisiable = true;
    },

    /* 用于后端交互并渲染数据的函数 */
    // 获取我的赛事表格的数据并且渲染在表格组件上
    async getMyEvent() {
      this.loading = true;
      try {
        const data = await getMyEvent(this.page, this.search, this.review_status);
        this.updateMyEventTableData(data);
      } catch (error) {
        this.updateMyEventTableData([]); // 清空我的赛事表格数据
        this.$message.error('操作失败，请重试'); // 提示失败
        console.error('获取我的赛事失败:', error);
      } finally {
        this.loading = false;
      }
    },

    // 撤销未审核、已通过的赛事
    async rescindEvent(event_id) {
      try {
        const data = await rescindEvent(event_id); // 撤销某项赛事
        this.page = 1;
        this.search = '';
        await this.getMyEvent(); // 重新获取我的赛事数据
      } catch (error) {
        this.$message.error('操作失败，请重试'); // 提示失败
        console.error('撤销赛事失败:', error);
      }
    }
  }
}
</script>

<style>
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
</style>