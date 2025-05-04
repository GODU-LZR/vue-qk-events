<template>
  <div>
    <!-- 赛事信息盒子 -->
    <matchInfoBox :matchData="matchData"></matchInfoBox>

    <!-- 队伍信息盒子 -->
    <vsBox :summaryData="summaryData"></vsBox>

    <!--队员得分高光信息盒子-->
    <matchHighlights :highlightsData="highlightsData"></matchHighlights>

    <!--队伍成员信息盒子-->
    <el-row>
      <el-col :span="12">
        <playersTable :playersData="awayPlayers" :teamName="summaryData.awayTeam"></playersTable>
      </el-col>
      <el-col :span="12">
        <playersTable :playersData="homePlayers" :teamName="summaryData.homeTeam"></playersTable>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <matchScoreBox
            :quartersData="quartersData"/>
      </el-col>
      <el-col :span="12">
        <teamStatsBox
            :teamStatsData="teamStatsData"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getMatchData} from "@/api/sport/match/getMatchData";
import {getSummaryData} from "@/api/sport/match/getSummaryData";
import {getHighlightsData} from "@/api/sport/match/getHighlightsData";
import {getQuartersData} from "@/api/sport/match/getQuartersData";
import {getTeamStatsData} from "@/api/sport/match/getTeamStatsData";

import matchInfoBox from '../../components/sport/match/matchInfoBox'
import matchScoreBox from '../../components/sport/match/matchScoreBox'
import matchHighlights from '../../components/sport/match/matchHighlights'
import playersTable from '../../components/sport/match/playersTable'
import teamStatsBox from '../../components/sport/match/teamStatsBox'
import vsBox from '../../components/sport/match/vsBox'
export default {
  name: "GetDetailEvent",
  components: {
    matchInfoBox: matchInfoBox,
    matchScoreBox: matchScoreBox,
    matchHighlights: matchHighlights,
    playersTable: playersTable,
    teamStatsBox: teamStatsBox,
    vsBox: vsBox
  },
  data() {
    return{
      matchId: null,

      matchData: {
        matchId: 2024001,
        sport: '篮球',
        venue_name: '篮球馆1号',
        referee_name: ['王裁判', '张裁判', '李裁判'],
        start_time: '2024-03-15 14:00',
        end_time: '2024-03-15 16:00',
        responsible_person: '张管理员',
        phone: '13800138000',
        note: '请各队提前30分钟到场热身，迟到15分钟视为弃权',
        is_followed: 1,
      },

      summaryData: [
        {
          team: "Grizzlies",
          url: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png',
          score: 116,
          seed: "西部第8",
          votes: 2636234,
          votePct: 42.0
        },
        {
          team: "Warriors",
          url: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png',
          score: 121,
          seed: "西部第7",
          votes: 3672283,
          votePct: 58.0
        }
      ],

      highlightsData: {
        pt: [
          {
            teamId: 0,
            name: "贝恩",
            url: 'https://img.52tiemo.com/uploads/allimg/2023052011/3225olj2se0.jpg',
            score: 10
          },
          {
            teamId: 1,
            name: "伊迪",
            url: 'https://img.52tiemo.com/uploads/allimg/2023052011/3225olj2se0.jpg',
            score: 20
          }
        ],
        reb: [
          {
            teamId: 0,
            name: "小皮蓬",
            url: 'https://img.52tiemo.com/uploads/allimg/2023052011/3225olj2se0.jpg',
            score: 0
          },
          {
            teamId: 1,
            name: "巴勒特",
            url: 'https://img.52tiemo.com/uploads/allimg/2023052011/3225olj2se0.jpg',
            score: 0
          }
        ],
        ast: [
          {
            teamId: 0,
            name: "库里",
            url: 'https://img.52tiemo.com/uploads/allimg/2023052011/3225olj2se0.jpg',
            score: 0
          },
          {
            teamId: 1,
            name: "格林",
            url: 'https://img.52tiemo.com/uploads/allimg/2023052011/3225olj2se0.jpg',
            score: 0
          }
        ]
      },

      awayPlayers: [
        {name:"莫兰特" ,minutes:"34:54" ,pts:22 ,reb:3 ,ast:3 ,fgMade:9 ,fgAtt:18},
        {name:"莫兰特" ,minutes:"34:54" ,pts:22 ,reb:3 ,ast:3 ,fgMade:9 ,fgAtt:18},
        {name:"莫兰特" ,minutes:"34:54" ,pts:22 ,reb:3 ,ast:3 ,fgMade:9 ,fgAtt:18},
        {name:"莫兰特" ,minutes:"34:54" ,pts:22 ,reb:3 ,ast:3 ,fgMade:9 ,fgAtt:18},
        {name:"莫兰特" ,minutes:"34:54" ,pts:22 ,reb:3 ,ast:3 ,fgMade:9 ,fgAtt:18},
        {name:"莫兰特" ,minutes:"34:54" ,pts:22 ,reb:3 ,ast:3 ,fgMade:9 ,fgAtt:18},
        {name:"莫兰特" ,minutes:"34:54" ,pts:22 ,reb:3 ,ast:3 ,fgMade:9 ,fgAtt:18}
      ],

      homePlayers: [
        {name:"莫兰特" ,minutes:"34:54" ,pts:22 ,reb:3 ,ast:3 ,fgMade:9 ,fgAtt:18},
        {name:"莫兰特" ,minutes:"34:54" ,pts:22 ,reb:3 ,ast:3 ,fgMade:9 ,fgAtt:18},
        {name:"莫兰特" ,minutes:"34:54" ,pts:22 ,reb:3 ,ast:3 ,fgMade:9 ,fgAtt:18},
        {name:"莫兰特" ,minutes:"34:54" ,pts:22 ,reb:3 ,ast:3 ,fgMade:9 ,fgAtt:18},
        {name:"莫兰特" ,minutes:"34:54" ,pts:22 ,reb:3 ,ast:3 ,fgMade:9 ,fgAtt:18},
        {name:"莫兰特" ,minutes:"34:54" ,pts:22 ,reb:3 ,ast:3 ,fgMade:9 ,fgAtt:18},
        {name:"莫兰特" ,minutes:"34:54" ,pts:22 ,reb:3 ,ast:3 ,fgMade:9 ,fgAtt:18}
      ],

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
      ]
    }
  },
  methods: {

    // 后端函数
    async getMatchData() {
      try {
        const response = await getMatchData(this.matchId);
        this.matchData = response.data;
      }catch (error) {
        this.$message.error('获取比赛信息失败，请重试!');
        console.error('获取比赛信息失败:', error);
      }
    },

    // 获取队伍信息数据
    async getSummaryData() {
      try {
        const response = await getSummaryData(this.matchId);
        this.summaryData = response.data;
      }catch (error) {
        this.$message.error('获取队伍信息失败，请重试!');
        console.error('获取队伍信息失败:', error);
      }
    },

    // 获取比赛高光数据
    async getHighlightsData() {
      try {
        const response = await getHighlightsData(this.matchId);
        this.highlightsData = response.data;
      }catch (error) {
        this.$message.error('获取比赛高光信息失败，请重试!');
        console.error('获取比赛高光信息失败:', error);
      }
    },

    // 获取客队信息数据
    async getAwayPlayersData() {
      try {
      }catch (error) {
        this.$message.error('获取客队信息失败，请重试!');
        console.error('获取客队信息失败:', error);
      }
    },

    // 获取主队信息数据
    async getHomePlayersData() {
      try {
      }catch (error) {
        this.$message.error('获取主队信息失败，请重试!');
        console.error('获取主队信息失败:', error);
      }
    },

    // 获取比赛场次得分数据
    async getQuartersData() {
      try {
        const response = await getQuartersData(this.matchId);
        this.quartersData = response.data;
      }catch (error) {
        this.$message.error('获取比赛场次得分信息失败，请重试!');
        console.error('获取比赛场次得分信息失败:', error);
      }
    },

    // 获取比赛得分组成数据
    async getTeamStatsData() {
      try {
        const response = await getTeamStatsData(this.matchId);
        this.teamStatsData = response.data;
      }catch (error) {
        this.$message.error('获取比赛得分组成信息失败，请重试!');
        console.error('获取比赛得分组成信息失败:', error);
      }
    },
  },
  async created() {
    // 将url中的matchId初始化到matchId变量中,如果不存在，则直接返回到GetSport页面
    const id = this.$route.params.matchId;
    if(id === undefined || id === '') {
      // this.toPrev();
    } else {
      this.matchId = id;
    }
  },
  async mounted() {
    await this.getSummaryData();
    await this.getHighlightsData();
    await this.getAwayPlayersData();
    await this.getHomePlayersData();
    await this.getQuartersData();
    await this.getTeamStatsData();
  }
}
</script>

<style scoped>

</style>