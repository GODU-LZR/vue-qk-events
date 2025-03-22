<template>
  <div class="container">
    <el-table
        :data="$store.state.eventTableData"
        style="width: 100%"
        empty-text="暂无数据"
        v-loading="loading"
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
          label="参赛方"
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
import {getEvent} from '@/api/eventTable/getEvent'
import {getFollowEvent} from "@/api/followEventTable/getFollowEvent";
import {handleEventFollow} from "@/api/followEventTable/handleEventFollow";

export default {
  name: "eventTable",
  data() {
    return {
      filterDrawerVisiable: false, // 过滤器抽屉是否出现
      loading: false, // 加载状态
      page: 1, // 查询页数
      search: {
        event_sport: [],
        event_time: '',
        participant: '',
        venue_name: []
      }, // 过滤器
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
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 67.7vh; /* 容器占满整个视口高度 */
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