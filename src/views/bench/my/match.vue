<template>
  <div>
    <div style="text-align: right; margin-right: 20px">
      <el-button size="medium" @click="resetMatchForm">重置</el-button>
      <el-button size="medium" type="primary">保存</el-button>
    </div>
    <matchInfo v-model="matchForm"></matchInfo>

    <el-row>
      <el-col :span="10">
        <quartersInfo v-model="quartersForm[0]"></quartersInfo>
      </el-col>
      <el-col :span="4" style="padding: 10px 0">

      </el-col>
      <el-col :span="10">
        <quartersInfo v-model="quartersForm[1]"></quartersInfo>
      </el-col>
    </el-row>

    <el-divider content-position="center">VS</el-divider>

    <el-row>
      <el-col :span="10">
        <teamStatsInfo v-model="teamStatsForm[0]"></teamStatsInfo>
      </el-col>
      <el-col :span="4" style="padding: 10px 0">
      </el-col>
      <el-col :span="10">
        <teamStatsInfo v-model="teamStatsForm[1]"></teamStatsInfo>
      </el-col>
    </el-row>

    <playersTable :playersData="awayPlayers" @update-player="updatePlayer1"></playersTable>
    <playersTable :playersData="homePlayers" @update-player="updatePlayer1"></playersTable>

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
import matchInfo from '../../../components/bench/my/match/matchInfo'
import quartersInfo from '../../../components/bench/my/match/quartersInfo'
import teamStatsInfo from '../../../components/bench/my/match/teamStatsInfo'
import playersTable from '../../../components/bench/my/match/playersTable'
import updatePlayerForm from '../../../components/bench/my/match/updatePlayerForm'
export default {
  name: "match",
  components: {
    matchInfo: matchInfo,
    quartersInfo: quartersInfo,
    teamStatsInfo: teamStatsInfo,
    playersTable: playersTable,
    updatePlayerForm: updatePlayerForm
  },
  data() {
    return {
      // 比赛信息
      matchData: {
        matchId: 123456,
        sport: "篮球",
        awayTeam: '软件1223',
        homeTeam: '软件1224',
        venue_name: "篮球场1号",
        start_time: "2025-01-03 14:00",
        end_time: "2025-01-03 15:30",
        responsible_person: '张管理员',
        phone: '13800138000',
        note: '请各队提前30分钟到场热身，迟到15分钟视为弃权',
        phase: 1,
        winner: "软件1224",
        referee_name: ['张教练', '王教练']
      },

      // 队伍信息
      quartersData:[
        {
          team: "Grizzlies",
          one: 25,
          two: 30,
          three: 36,
          four: 25
        },
        {
          team: "Warriors",
          one: 31,
          two: 36,
          three: 27,
          four: 27
        }
      ],

      teamStatsData: [
        {
          name: "Grizzlies",
          pts: 116,
          reb: 50,
          ast: 39,
          fgPct: 48.8,
          tpPct: 46.2
        },
        {
          name: "Warriors",
          pts: 121,
          reb: 39,
          ast: 29,
          fgPct: 45.9,
          tpPct: 34.9
        }
      ],

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
      matchForm: {},

      // 队伍阶段信息
      quartersForm: {},

      // 队伍得分信息
      teamStatsForm: {},

      // 球员修改表单
      playerForm: {},
      dialogFormVisible: false
    }
  },
  methods: {
    /*  前端函数  */
    // 重置比赛信息表单
    resetMatchForm() {
      this.matchForm = this.matchData;
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


    // 修改球员信息:发送axios请求,修改球员的信息
    updatePlayer2() {

    },
  },
  watch: {
    matchData: {
      // 当 eventData 发生变化时执行,重置比赛信息表单
      handler(newValue) {
        this.matchForm = newValue;
      },
      immediate: true,
      deep: true
    },

    quartersData: {
      // 当 eventData 发生变化时执行,重置比赛信息表单
      handler(newValue) {
        this.quartersForm = newValue;
      },
      immediate: true,
      deep: true
    },

    teamStatsData: {
      // 当 eventData 发生变化时执行,重置比赛信息表单
      handler(newValue) {
        this.teamStatsForm = newValue;
      },
      immediate: true,
      deep: true
    },
  },
  created() {

  }
}
</script>

<style scoped>
::v-deep .el-divider__text {
    font-size: 48px;
}
</style>