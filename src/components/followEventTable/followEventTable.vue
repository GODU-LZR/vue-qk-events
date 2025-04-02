<template>
  <div class="container">
    <followEventDropdown
        @autoDeleted="autoDeleted"></followEventDropdown>
    <el-table
        :data="$store.state.followEventTableData"
        style="width: 100%"
        empty-text = "暂无数据"
        class="dynamic-height-table"
        height="69vh"
        v-loading = "loading">
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
              @change="getFollowEvent"/>
        </template>
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="showDetailEvent(scope.row)">赛事详情</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleEventFollow(scope.row.event_id)">取关</el-button>
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
          @current-change="getFollowEvent()"
      ></el-pagination>
    </div>

    <!-- 赛事详情 -->
    <el-dialog title="赛事详情" :visible.sync="eventDetailDrawerVisiable" top="30px">
      <eventInfo
          :event="detailEvent"></eventInfo>
    </el-dialog>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import followEventDropdown from './followEventDropdown'
import eventInfo from '../eventTable/eventInfo'
import {getFollowEvent} from "@/api/followEventTable/getFollowEvent";
import {handleEventFollow} from "@/api/followEventTable/handleEventFollow";
import {handleAutoDeleted} from "@/api/followEventTable/handleAutoDeleted";
import {handleNotice} from "@/api/followEventTable/handleNotice";
export default {
  name: "followEventTable",
  components: {
    followEventDropdown: followEventDropdown,
    eventInfo: eventInfo
  },
  data() {
    return {
      search: '',
      loading: false,
      page: 1,

      eventDetailDrawerVisiable: false,
      detailEvent: {}
    }
  },
  methods: {
    // vuex辅助修改函数
    ...mapMutations(['updateFollowEventTableData']),

    /* 静态资源使用的函数 */
    filterTag(value, row) {
      return this.chooseTag(row.start_time, row.end_time)[1] === value;
    },
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

    // 开启自动删除后,重新获取数据
    autoDeleted() {
      console.log("你好");
      this.page = 1;
      this.search = '';
      this.getFollowEvent();
    },

    /* 用于后端交互并渲染数据的函数 */
    // 获取关注赛事表格的数据并且渲染在表格组件上
    async getFollowEvent() {
      this.loading = true;
      try {
        const data = await getFollowEvent(this.page, this.search);
        this.updateFollowEventTableData(data);
      } catch (error) {
        this.updateFollowEventTableData([]);
        this.$message.error('操作失败，请重试'); // 提示失败
        console.error('获取关注赛事数据失败:', error);
      } finally {
        this.loading = false;
      }
    },

    // 关注或取消关注赛事，在这组件里，理论上只有取消关注功能
    async handleEventFollow(event_id) {
      try {
        const data = await handleEventFollow(event_id);
        await this.getFollowEvent();
      } catch (error) {
        this.$message.error('操作失败，请重试'); // 提示失败
        console.error('关注或取消关注赛事失败:', error);
      }
    }
  }
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
</style>