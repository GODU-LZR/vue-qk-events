<template>
  <div class="container">
    <eventStatBoard></eventStatBoard>
    <el-table
        :data="$store.state.eventTableData"
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
              @click="filterDrawerVisiable = true"
              type="success"
              size="mini"
              style="width: 70px; margin-left: auto; margin-right: 20px;">
            过滤器
          </el-button>
        </template>

        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="showDetailEvent(scope.row)">赛事详情</el-button>
          <el-button
              size="mini"
              type="primary"
              @click="handleEventFollow(scope.row.event_id)" v-if="!scope.row.is_followed">关注</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleEventFollow(scope.row.event_id)" v-else>取关</el-button>
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
          @current-change="getEvent()"
      ></el-pagination>
    </div>

    <el-drawer
        title="过滤器"
        :visible.sync="filterDrawerVisiable"
        direction="ltr"
        @close="getEvent">
      <el-form label-position="right" label-width="80px" :model="search">
        <el-form-item label="筛选赛程">
          <el-input v-model="search.schedule_id" placeholder="请输入赛程id" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="比赛项目">
          <el-select v-model="search.event_sport"
                     multiple
                     placeholder="请选择"
                     style="width: 80%"
                     v-el-select-loadmore="lazyLoadInEventSport">
            <el-option
                v-for="item in eventSport"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
            <div style="height: 34px; display: flex; justify-content: center; align-items: center;" v-if="eventSportLoading || eventSportNoMore">
              <p v-if="eventSportLoading">加载中<i class="el-icon-loading"/></p>
              <p v-if="eventSportNoMore">没有更多了</p>
            </div>
          </el-select>
        </el-form-item>
        <el-form-item label="比赛场地">
          <el-select v-model="search.venue_name"
                     multiple
                     placeholder="请选择"
                     style="width: 80%"
                     v-el-select-loadmore="lazyLoadInVenueName">
            <el-option
                v-for="item in venueName"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
            <div style="height: 34px; display: flex; justify-content: center; align-items: center;" v-if="venueNameLoading || venueNameNoMore">
              <p v-if="venueNameLoading">加载中<i class="el-icon-loading"/></p>
              <p v-if="venueNameNoMore">没有更多了</p>
            </div>
          </el-select>
        </el-form-item>
        <el-form-item label="参赛队伍">
          <el-input v-model="search.participant" placeholder="请输入参赛队伍" style="width: 80%"></el-input>
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

    <el-dialog title="赛事详情" :visible.sync="eventDetailDrawerVisiable" top="30px">
      <eventInfo
          :event="detailEvent"
          :isSelectScheduleId="true"
          @select-scheduleId="selectScheduleId"></eventInfo>
    </el-dialog>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import eventStatBoard from "./eventStatBoard"
import eventInfo from '../eventTable/eventInfo'
import {getEvent} from '@/api/eventTable/getEvent'
import {getEventSport} from "@/api/eventAddForm/getEventSport";
import {getVenueName} from "@/api/eventTable/getVenueName";
import {handleEventFollow} from "@/api/followEventTable/handleEventFollow";
export default {
  name: "eventTable",
  components: {
    eventInfo: eventInfo,
    eventStatBoard: eventStatBoard
  },
  data() {
    return {
      filterDrawerVisiable: false, // 过滤器抽屉是否出现
      eventDetailDrawerVisiable: false,
      loading: false, // 加载状态
      page: 1, // 查询页数
      search: {
        schedule_id: '',
        event_sport: [],
        event_time: '',
        participant: '',
        venue_name: []
      }, // 过滤器

      detailEvent: {},

      eventSport: [{value: '跑步',label: '跑步'},
                   {value: '游泳',label: '游泳'},
                   {value: '吃鸡',label: '吃鸡'},
                   {value: '篮球',label: '篮球'},
                   {value: '足球',label: '足球'},
                   {value: '排球',label: '排球'},
                   {value: '台球',label: '台球'},
                   {value: '网球',label: '网球'},
                   {value: '冰球',label: '冰球'},
                   {value: '乒乓球',label: '乒乓球'},
                   {value: '羽毛球',label: '羽毛球'},
                   {value: '保龄球',label: '保龄球'},
                   {value: '接力赛',label: '接力赛'}],
      eventSportPage: 1,
      eventSportLoading : false,
      eventSportNoMore: false,
      eventSportTimer: null, // 这是用于防抖的计时器：加载盒子消失后，置为false,用计时器设置3秒后置为true,在此期间无法再次懒加载方法

      venueName: [{value: '篮球馆1号',label: '篮球馆1号'},
                 {value: '篮球馆2号',label: '篮球馆2号'},
                 {value: '篮球馆3号',label: '篮球馆3号'},
                 {value: '足球场1号',label: '足球场1号'},
                 {value: '足球场2号',label: '足球场2号'},
                 {value: '足球场3号',label: '足球场3号'},
                 {value: '台球桌1号',label: '台球桌1号'},
                 {value: '台球桌2号',label: '台球桌2号'},
                 {value: '台球桌3号',label: '台球桌3号'},
                 {value: '乒乓球桌1号',label: '乒乓球桌1号'},
                 {value: '乒乓球桌2号',label: '乒乓球桌2号'},
                 {value: '乒乓球桌3号',label: '乒乓球桌3号'}],
      venueNamePage: 1,
      venueNameLoading : false,
      venueNameNoMore: false,
      venueNameTimer: null, // 这是用于防抖的计时器：加载盒子消失后，置为false,用计时器设置3秒后置为true,在此期间无法再次懒加载方法
    }
  },
  methods: {
    // vuex辅助修改函数
    ...mapMutations(['updateEventTableData', 'updateFollowEventTableData']),

    /* 静态资源使用的函数 */
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

    // 查询赛程
    selectScheduleId(schedule_id) {
      this.search.schedule_id = schedule_id;
      this.search.event_sport = [];
      this.search.event_time = '';
      this.search.participant = '';
      this.search.venue_name = [];
      this.page = 1;
      this.eventDetailDrawerVisiable = false;
      this.getEvent();
    },

    // 懒加载赛事项目信息数据
    lazyLoadInEventSport() {
      if (this.eventSportLoading || this.eventSportNoMore || this.eventSportTimer !== null) {
        return;
      }
      this.getEventSport();
      // 设置计时器，3秒内无法再次触发
      this.eventSportTimer = setTimeout(() => {
        this.eventSportTimer = null; // 计时器结束后重置为 null
      }, 3000); // 3秒防抖时间
    },

    // 懒加载场地项目信息数据
    lazyLoadInVenueName() {
      if (this.venueNameLoading || this.venueNameNoMore || this.venueNameTimer !== null) {
        return;
      }
      this.getVenueName();
      // 设置计时器，3秒内无法再次触发
      this.venueNameTimer = setTimeout(() => {
        this.venueNameTimer = null; // 计时器结束后重置为 null
      }, 3000); // 3秒防抖时间
    },

    /* 用于后端交互并渲染数据的函数 */
    // 获取赛事表格的数据并且渲染在表格组件上
    async getEvent() {
      this.loading = true;
      try {
        const data = await getEvent(this.page, this.search, 1); // 1表示"已通过"
        this.updateEventTableData(data);
      } catch (error) {
        this.updateEventTableData([]);
        this.$message.error('操作失败，请重试'); // 提示失败0
        console.error('获取数据失败:', error);
      } finally {
        this.loading = false;
      }
    },

    // 关注或取消关注赛事
    async handleEventFollow(event_id) {
      try {
        const data = await handleEventFollow(event_id);
        await this.getEvent();
      } catch (error) {
        this.$message.error('操作失败，请重试'); // 提示失败
        console.error('关注或取消关注赛事失败:', error);
      }
    },

    // 获取赛事项目
    async getEventSport() {
      this.eventSportLoading = true;
      try {
        const data = await getEventSport(this.eventSportPage);
        if (data.length > 0) {
          // 数据格式转变为select读懂的格式
          const newData = data.map(item => ({
            value: item.eventSport,
            label: item.eventSport,
          }));
          this.eventSport.push(...newData);
          this.eventSportPage++; // 加载下一页
        } else {
          this.eventSportNoMore = true; // 没有更多数据
        }
      } catch (error) {
        this.$message.error('获取赛事项目选项失败，请重试'); // 提示失败
        console.error('获取赛事项目选项失败:', error);
      } finally {
        this.eventSportLoading = false;
      }
    },

    // 获取赛事项目
    async getVenueName() {
      this.venueNameLoading = true;
      try {
        const data = await getVenueName(this.venueNamePage);
        if (data.length > 0) {
          // 数据格式转变为select读懂的格式
          const newData = data.map(item => ({
            value: item.venueName,
            label: item.venueName,
          }));
          this.venueName.push(...newData);
          this.venueNamePage++; // 加载下一页
        } else {
          this.venueNameNoMore = true; // 没有更多数据
        }
      } catch (error) {
        this.$message.error('获取场地选项失败，请重试'); // 提示失败
        console.error('获取场地选项失败:', error);
      } finally {
        this.venueNameLoading = false;
      }
    },
  },
  directives: {
    /** 下拉框懒加载 */
    'el-select-loadmore': {
      bind(el, binding) {
        const SELECTWRAP_DOM = el.querySelector(
            '.el-select-dropdown .el-select-dropdown__wrap'
        );
        SELECTWRAP_DOM.addEventListener('scroll', function() {
          const condition =
              this.scrollHeight - this.scrollTop <= this.clientHeight;
          if (condition) {
            binding.value();
          }
        });
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