<template>
  <div class="event-list-container">
    <div class="event-list-header">
      <h3>我的赛事列表</h3>
    </div>

    <div class="event-list">
      <ul style="padding: 0"
          v-infinite-scroll="lazyLoad">
        <li style="list-style: none"
            v-for="(event, index) in $store.state.myEventListData"
            :key="index">
          <div
              class="event-item"
              draggable="true"
              @dragstart="addEventToSchedule(event.event_id)">
            <div class="event-sport-time">
              <span class="sport-badge">{{ event.event_sport }}</span>
              <span class="event-time">{{ formatTime(event.start_time, event.end_time) }}</span>
            </div>

            <div class="teams-container">
              <div
                  class="team-box"
                  v-for="(team, index) in event.participants"
                  :key="index">
                <div class="team-name">{{ team.teamName }}</div>
                <div class="players-list">
                  <div
                      class="player-item"
                      v-for="player in team.players"
                      :key="player.name">
                    <span class="player-name">{{ player.name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <!-- 固定高度的盒子，用于放置加载提示 -->
        <li class="loading-box">
          <div v-if="addLoading" style="text-align: center; padding: 10px;">
            <span>加载中</span>
            <i class="el-icon-loading"></i>
          </div>
          <div v-if="noMoreData" style="text-align: center; padding: 10px;">没有更多的数据了</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {getMyEventList} from '@/api/scheduleTree/getMyEventList'
export default {
  name: 'myEventList',
  data() {
    return {
      event_page: 1,

      addLoading: false,
      noMoreData: false,
      lazyTimer: null
    }
  },
  methods: {
    // vuex辅助修改函数
    ...mapMutations(['updateMyEventListDataByAdd', 'updateMyEventListDataByReset']),

    // 格式化时间显示
    formatTime(start, end) {
      const startDate = new Date(start)
      const endDate = new Date(end)

      const format = (date) => {
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        return `${hours}:${minutes}`
      }

      return `${startDate.getMonth()+1}月${startDate.getDate()}日 ${format(startDate)}-${format(endDate)}`
    },

    // 拖拽开始事件
    addEventToSchedule(event_id) {
      this.$emit("addEventToSchedule", event_id);
    },

    lazyLoad() {
      if (this.lazyTimer) clearTimeout(this.lazyTimer); // 清除之前的定时器
      this.lazyTimer = setTimeout(() => {
        if (!this.addLoading && !this.noMoreData) {
          this.getMyEventListByAdd();
        }
      }, 300); // 设置防抖延迟时间（单位：毫秒）
    },

    // 获取到可选赛事新数据后,添加到原数据的后面
    async getMyEventListByAdd() {
      this.addLoading = true;
      try {
        const data = (await getMyEventList(this.page)) || [];
        if (data.length > 0) {
          this.updateMyEventListDataByAdd(data); // 添加新数据
          this.event_page++;
        } else {
          this.noMoreData = true; // 没有更多数据
        }
      } catch (error) {
        this.$message.error('获取可用赛事信息失败，请重试'); // 提示失败
        console.error('获取可用赛事信息失败:', error);
      } finally {
        this.addLoading = false;
      }
    },

    // 重新获取到可选赛事数据然后覆盖原数据
    async getMyEventListByReset() {
      this.event_page = 1;
      try {
        const data = await getMyEventList(this.event_page);
        this.updateMyEventListDataByReset(data);
      } catch (error) {
        this.$message.error('获取可用赛事数据失败，请重试');
        console.error('获取可用赛事数据失败:', error);
      }
    },
  }
}
</script>

<style scoped>
.event-list-container {
  width: 300px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-right: 20px;
}

.event-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.event-list-header h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.event-list {
  max-height: 510px;
  overflow-y: auto;
  padding: 0 8px;
}

.event-item {
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #eee;
  border-radius: 6px;
  background-color: #fafafa;
  cursor: move;
  transition: all 0.2s;
}

.event-item:hover {
  border-color: #3498db;
  background-color: #f0f7ff;
}

.event-sport-time {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.sport-badge {
  padding: 2px 8px;
  background-color: #3498db;
  color: white;
  border-radius: 12px;
  font-size: 12px;
  margin-right: 8px;
}

.event-time {
  font-size: 12px;
  color: #666;
}

.teams-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.team-box {
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 8px;
  background-color: white;
}

.team-name {
  font-weight: bold;
  margin-bottom: 6px;
  color: #333;
  font-size: 14px;
}

.players-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.player-item {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}

.player-name {
  color: #444;
}

.loading-box {
  height: 20px; /* 固定高度 */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>