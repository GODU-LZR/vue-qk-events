<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 10px">
      <el-breadcrumb-item :to="{ path: '/' }">赛事管理</el-breadcrumb-item>
      <el-breadcrumb-item>我的工作台</el-breadcrumb-item>
      <el-breadcrumb-item>创建/更改赛程</el-breadcrumb-item>
    </el-breadcrumb>
    <h2>创建/更改赛程</h2>

    <div v-if="schedule_id">
      <el-row style="margin-bottom: 10px">
        <el-button type="success" size="mini" @click="isAdd = !isAdd">新增赛事</el-button>
        <el-button type="danger" size="mini" @click="isDeleting = !isDeleting">撤销赛事</el-button>
      </el-row>

      <el-row>
        <el-col :span="5">
          <el-collapse-transition>
            <div v-show="isAdd">
              <my-event-list @addEventToSchedule="addEventToSchedule1" ref="myEventList"></my-event-list>
            </div>
          </el-collapse-transition>
        </el-col>
        <el-col :span="19">
          <scheduleTree :champion="$store.state.myScheduleTreeData.winner"
                        :matchesData="$store.state.myScheduleTreeData"
                        :isAdd="isAdd"
                        :isDeleting="isDeleting"
                        @addEventToSchedule="addEventToSchedule2"
                        @deleteEventToSchedule="deleteEventToSchedule"
                        @updateChampion="updateChampion"></scheduleTree>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import myEventList from '../components/scheduleTree/myEventList'
import scheduleTree from '../components/scheduleTree/scheduleTree'
import {getScheduleById} from '@/api/scheduleTree/getScheduleById'
import {addEventToSchedule} from '@/api/scheduleTree/addEventToSchedule'
import {deleteEventToSchedule} from '@/api/scheduleTree/deleteEventToSchedule'
import {updateWinner} from '@/api/scheduleTree/updateWinner'
export default {
  name: "HandleSchedule",
  components: {
    scheduleTree: scheduleTree,
    myEventList: myEventList,
  },
  data() {
    return {
      schedule_id: 123,
      addEvent_id: null,

      isDeleting: false,
      isAdd: true
    }
  },
  methods: {
    // vuex辅助修改函数
    ...mapMutations(['updateMyScheduleTreeData', 'updateMyEventListDataByReset', 'updateMyEventListDataByAdd']),

    // 拖拽赛事开始后触发，记录当前拖拽的赛事(仅涉及前端)
    addEventToSchedule1(event_id) {
      this.addEvent_id = event_id;
    },

    // 根据赛程id(必填)获取到操纵的赛程数据
    async getScheduleById() {
      if (!this.schedule_id) {
        return;
      }
      try {
        const data = await getScheduleById(this.schedule_id);
        this.updateMyScheduleTreeData(data);
      } catch (error) {
        this.$message.error('获取赛程数据失败，请重试'); // 提示失败
        console.error('获取赛程数据失败:', error);
      }
    },

    // 重新获取到可选赛事数据然后覆盖原数据
    async getMyEventListByReset() {
      await this.$refs.myEventList.getMyEventListByReset();
    },

    // 拖拽赛事结束后出发，根据当前拖拽的赛事，加入到对应的赛程之中(发送到后端加入赛事，然后重新获取数据)
    async addEventToSchedule2(round_index) {
      if (!this.addEvent_id) {
        return;
      }
      try {
        // 发送后端添加请求
        const data = await addEventToSchedule(this.addEvent_id, this.schedule_id, round_index);
      }catch (error) {
        this.$message.error('添加赛事到赛程失败，请重试'); // 提示失败
        console.error('添加赛事到赛程失败:', error);
        return;
      }finally {
        this.addEvent_id = null;
      }
      // 重新获取数据
      await this.getScheduleById();
      await this.getMyEventListByReset();
    },

    // 删除赛程中指定的赛事
    async deleteEventToSchedule(event_id) {
      try {
        const data = await deleteEventToSchedule(event_id, this.$store.state.myScheduleTreeData.schedule_id);
      } catch (error) {
        this.$message.error('删除赛程中的赛事失败，请重试'); // 提示失败
        console.error('删除赛程中的赛事失败:', error);
        return;
      }
      // 重新获取数据
      await this.getScheduleById();
      await this.getMyEventListByReset();
    },

    // 修改胜利者
    async updateChampion(newChampion) {
      try {
        const data = await updateWinner(this.schedule_id, newChampion);
      } catch (error) {
        this.$message.error('修改赛程胜利者失败，请重试'); // 提示失败
        console.error('修改赛程胜利者失败:', error);
        return;
      }
      await this.getScheduleById();
    }
  },
  computed: {
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
}
</style>