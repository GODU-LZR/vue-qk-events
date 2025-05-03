<template>
  <div style="padding: 20px;">
    <div style="text-align: right; margin-top: 20px">
      <el-button size="medium" @click="addEventFormVisible = true">
        新增
      </el-button>
      <el-button type="primary" size="medium" @click="resetScheduleForm">
        重置
      </el-button>
      <el-button type="primary" size="medium" @click="updateMatch">
        保存
      </el-button>
    </div>
    <matchInfo v-model="scheduleForm"></matchInfo>

    <matchScheduleTable :eventsData="eventsData" @select-event="checkEvent"></matchScheduleTable>

    <el-dialog title="新增比赛" :visible.sync="addEventFormVisible" top="40px">
      <addEventForm v-model="addEventForm"></addEventForm>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addEventFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addEventFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import matchInfo from '../../../components/MyWorkbench/GetMyMatch/GetMyMatchSchedule/matchInfo'
import matchScheduleTable from '../../../components/MyWorkbench/GetMyMatch/GetMyMatchSchedule/matchScheduleTable'
import addEventForm from '../../../components/MyWorkbench/GetMyMatch/GetMyMatchSchedule/addEventForm'
import eventInfo from '../../../components/MyWorkbench/GetMyMatch/GetMyMatchEvent/eventInfo'
export default {
  name: "GetMyMatchSchedule",
  components: {
    matchInfo: matchInfo,
    matchScheduleTable: matchScheduleTable,
    addEventForm: addEventForm,
    eventInfo: eventInfo
  },
  data() {
    return {
      addEventFormVisible: false,

      addEventForm: {
        schedule_id: 1,
        awayTeam: '',
        homeTeam: '',
        venue_name: '',
        referee_name: [],
        start_time: '',
        end_time: '',
      },

      scheduleData: {
        schedule_id: 1,
        name: '春季联赛',
        sport: '篮球',
        responsiblePeople: '张三',
        phone: '12345678912',
        register_start_time: '2026-01-01 00:00',
        register_end_time: '2026-03-01 00:00',
        start_time: '2026-04-01 00:00',
        end_time: '',
      },

      scheduleForm: {},

      eventsData: [
        {
          event_id: 123456,
          event_sport: "篮球",
          awayTeam: '软件1223',
          homeTeam: '软件1224',
          awayTeam_score: 10,
          homeTeam_score: 20,
          venue_name: "篮球场1号",
          start_time: "2025-01-03 14:00",
          end_time: "2025-01-03 15:30",
          is_followed: 1,
          phase: 1,
          winner: "软件1224"
        },
        {
          event_id: 123457,
          event_sport: "羽毛球",
          awayTeam: '软件1223',
          homeTeam: '软件1224',
          awayTeam_score: 10,
          homeTeam_score: 20,
          venue_name: "羽毛球馆2号",
          start_time: "2025-01-03 10:00",
          end_time: "2025-01-03 11:30",
          is_followed: 0,
          phase: 1,
          winner: "软件1224"
        },
        {
          event_id: 123457,
          event_sport: "羽毛球",
          awayTeam: '软件1223',
          homeTeam: '软件1224',
          awayTeam_score: 10,
          homeTeam_score: 20,
          venue_name: "羽毛球馆2号",
          start_time: "2025-01-03 10:00",
          end_time: "2025-01-03 11:30",
          is_followed: 0,
          phase: 1,
          winner: "软件1224"
        },
        {
          event_id: 123458,
          event_sport: "乒乓球",
          awayTeam: '软件1223',
          homeTeam: '软件1224',
          awayTeam_score: 10,
          homeTeam_score: 20,
          venue_name: "乒乓球馆3号",
          start_time: "2025-01-02 09:00",
          end_time: "2025-01-02 11:00",
          is_followed: 1,
          phase: 2,
          winner: "软件1224"
        },
        {
          event_id: 123459,
          event_sport: "游泳",
          awayTeam: '软件1223',
          homeTeam: '软件1224',
          awayTeam_score: 10,
          homeTeam_score: 20,
          venue_name: "游泳馆1号",
          start_time: "2025-01-01 13:00",
          end_time: "2025-01-01 14:30",
          is_followed: 0,
          phase: 2,
          winner: "软件1224"
        },
        {
          event_id: 123458,
          event_sport: "乒乓球",
          awayTeam: '软件1223',
          homeTeam: '软件1224',
          awayTeam_score: 10,
          homeTeam_score: 20,
          venue_name: "乒乓球馆3号",
          start_time: "2025-01-02 09:00",
          end_time: "2025-01-02 11:00",
          is_followed: 1,
          phase: 3,
          winner: "软件1224"
        },
        {
          event_id: 123459,
          event_sport: "游泳",
          awayTeam: '软件1223',
          homeTeam: '软件1224',
          awayTeam_score: 10,
          homeTeam_score: 20,
          venue_name: "游泳馆1号",
          start_time: "2025-01-05 13:00",
          end_time: "2025-01-05 14:30",
          is_followed: 0,
          phase: 3,
          winner: "软件1224"
        }
      ]
    }
  },
  methods: {
    /* 前端路由方法 */
    // 选中比赛,请求路由至GetMyMatchEvent页面
    checkEvent(eventId) {
      this.$emit("select-event", eventId);
    },

    /*  前端函数  */
    // 重置比赛信息表单
    resetScheduleForm() {
      this.scheduleForm = this.scheduleData;
    },

    /* 后端函数 */
    // 修改赛事信息:发送axios请求,修改赛事信息
    updateMatch() {

    },

    // 新增比赛:发送axios请求,新增比赛
    addEvent() {

    }
  },
  watch: {
    scheduleData: {
      // 当 eventData 发生变化时执行,重置比赛信息表单
      handler(newValue) {
        this.scheduleForm = newValue;
      },
      immediate: true,
      deep: true
    }
  },
}
</script>

<style scoped>

</style>