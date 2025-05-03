<template>
  <div>
    <div style="text-align: right; margin-right: 20px">
      <el-button size="medium" @click="resetEventForm">重置</el-button>
      <el-button size="medium" type="primary" @click="updatePlayer2">保存</el-button>
    </div>
    <eventInfo v-model="eventForm"></eventInfo>
    <myMatchPlayersTable :playersData="awayPlayers" @update-player="updatePlayer1"></myMatchPlayersTable>
    <myMatchPlayersTable :playersData="homePlayers" @update-player="updatePlayer1"></myMatchPlayersTable>

    <el-dialog title="修改球员信息" :visible.sync="dialogFormVisible">
      <updatePlayerForm v-model="playerForm"></updatePlayerForm>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import eventInfo from '../../../components/MyWorkbench/GetMyMatch/GetMyMatchEvent/eventInfo'
import myMatchPlayersTable from '../../../components/MyWorkbench/GetMyMatch/GetMyMatchEvent/myMatchPlayersTable'
import updatePlayerForm from '../../../components/MyWorkbench/GetMyMatch/GetMyMatchEvent/updatePlayerForm'
export default {
  name: "GetMyMatchEvent",
  components: {
    eventInfo: eventInfo,
    myMatchPlayersTable: myMatchPlayersTable,
    updatePlayerForm: updatePlayerForm
  },
  data() {
    return {
      eventData: {
          event_id: 123456,
          event_sport: "篮球",
          awayTeam: '软件1223',
          homeTeam: '软件1224',
          awayTeam_score: 10,
          homeTeam_score: 20,
          venue_name: "篮球场1号",
          start_time: "2025-01-03 14:00",
          end_time: "2025-01-03 15:30",
          phase: 1,
          winner: "软件1224",
          referee_name: ['张教练', '王教练']
      },

      awayPlayers: [
        {player_id: 123, name:"莫兰特" ,minutes:"34:54" ,pts:22 ,reb:3 ,ast:3 ,fgMade:9 ,fgAtt:18},
        {player_id: 124, name:"科比" ,minutes:"34:54" ,pts:22 ,reb:3 ,ast:3 ,fgMade:9 ,fgAtt:18},
        {player_id: 125, name:"莫兰特" ,minutes:"34:54" ,pts:22 ,reb:3 ,ast:3 ,fgMade:9 ,fgAtt:18},
        {player_id: 126, name:"莫兰特" ,minutes:"34:54" ,pts:22 ,reb:3 ,ast:3 ,fgMade:9 ,fgAtt:18},
        {player_id: 127, name:"莫兰特" ,minutes:"34:54" ,pts:22 ,reb:3 ,ast:3 ,fgMade:9 ,fgAtt:18},
        {player_id: 128, name:"莫兰特" ,minutes:"34:54" ,pts:22 ,reb:3 ,ast:3 ,fgMade:9 ,fgAtt:18},
        {player_id: 129, name:"莫兰特" ,minutes:"34:54" ,pts:22 ,reb:3 ,ast:3 ,fgMade:9 ,fgAtt:18}
      ],

      homePlayers: [
        {player_id: 123, name:"莫兰特" ,minutes:"34:54" ,pts:22 ,reb:3 ,ast:3 ,fgMade:9 ,fgAtt:18},
        {player_id: 130, name:"莫兰特" ,minutes:"34:54" ,pts:22 ,reb:3 ,ast:3 ,fgMade:9 ,fgAtt:18},
        {player_id: 125, name:"莫兰特" ,minutes:"34:54" ,pts:22 ,reb:3 ,ast:3 ,fgMade:9 ,fgAtt:18},
        {player_id: 126, name:"莫兰特" ,minutes:"34:54" ,pts:22 ,reb:3 ,ast:3 ,fgMade:9 ,fgAtt:18},
        {player_id: 127, name:"莫兰特" ,minutes:"34:54" ,pts:22 ,reb:3 ,ast:3 ,fgMade:9 ,fgAtt:18},
        {player_id: 128, name:"莫兰特" ,minutes:"34:54" ,pts:22 ,reb:3 ,ast:3 ,fgMade:9 ,fgAtt:18},
        {player_id: 129, name:"莫兰特" ,minutes:"34:54" ,pts:22 ,reb:3 ,ast:3 ,fgMade:9 ,fgAtt:18}
      ],

      // 比赛修改表单
      eventForm: {},

      // 球员修改表单
      playerForm: {},
      dialogFormVisible: false
    }
  },
  methods: {
    /*  前端函数  */
    // 重置比赛信息表单
    resetEventForm() {
      this.eventForm = this.eventData;
    },

    // 修改球员信息:初始化表单数据,并展示修改面板
    updatePlayer1(player_id) {
      let form = this.awayPlayers.find(player => player.player_id === player_id);
      if (!form) {
        form = this.homePlayers.find(player => player.player_id === player_id);
      }
      if (!form) {
        this.playerForm = {};
        this.$message.error("无法获取球员,请重试!");
        return;
      }
      this.playerForm = form;
      this.dialogFormVisible = true
    },

    /*  后端函数  */
    // 修改比赛信息:发送axios请求,修改比赛信息
    updateEvent() {

    },

    // 修改球员信息:发送axios请求,修改球员的信息
    updatePlayer2() {

    },
  },
  watch: {
    eventData: {
      // 当 eventData 发生变化时执行,重置比赛信息表单
      handler(newValue) {
        this.eventForm = newValue;
      },
      immediate: true,
      deep: true
    }
  },
  created() {

  }
}
</script>

<style scoped>

</style>