<template>
  <div class="schedule-container">
    <div style="padding: 10px 20px">
      <gameInfo :gameData="gameData"></gameInfo>
    </div>

    <div style="padding: 0 20px">
      <el-radio-group v-model="radio" size="small">
        <el-radio-button label="赛事列表"></el-radio-button>
        <el-radio-button label="赛程图览"></el-radio-button>
      </el-radio-group>
    </div>

    <!-- 赛事列表视图 -->
    <div v-show="radio === '赛事列表'">
      <gameTable :matches="matches"
                 @to-match="toMatch"
                 @handle-follow="handleFollow"/>
    </div>

    <!-- 赛程图览视图 -->
    <div v-show="radio === '赛程图览'" class="tree-view-container">
      <gameTree :matches="matches"/>
    </div>
  </div>
</template>

<script>
import gameInfo from '../../components/sport/game/gameInfo'
import gameTable from '../../components/sport/game/gameTable'
import playerRanking from '../../components/sport/game/playerRanking'
import gameTree from '../../components/sport/game/gameTree'

import {getGameData} from "@/api/sport/game/getGameData";
import {getMatches} from "@/api/sport/game/getMatches";
import {handleFollow} from "@/api/sport/game/handleFollow";
export default {
  name: "game",
  components: {
    gameInfo: gameInfo,
    gameTable: gameTable,
    playerRanking: playerRanking,
    gameTree: gameTree
  },
  data() {
    return {
      gameId: null,
      radio: '赛事列表',

      gameData: {
        gameId: 1,
        name: '春季联赛',
        sport: '篮球',
        responsiblePeople: '张三',
        phone: '12345678912',
        register_start_time: '2026-01-01 00:00',
        register_end_time: '2026-03-01 00:00',
        start_time: '2026-04-01 00:00',
        end_time: '',
        note: '备注信息',
        // mode: 1
      },

      matches: [
        {
          matchId: 'M20231128001',
          sport: "篮球",
          awayTeam: '软件1223',
          homeTeam: '软件1224',
          awayTeam_score: 20,
          homeTeam_score: 10,
          venue_name: "篮球场1号",
          start_time: "2025-01-03 14:00",
          end_time: "2025-01-03 15:30",
          is_followed: 1,
          phase: 1,
          winner: "软件1224"
        },
        {
          matchId: 'M20231128002',
          sport: "羽毛球",
          awayTeam: '软件1223',
          homeTeam: '软件1224',
          awayTeam_score: 20,
          homeTeam_score: 10,
          venue_name: "羽毛球馆2号",
          start_time: "2025-01-03 10:00",
          end_time: "2025-01-03 11:30",
          is_followed: 0,
          phase: 1,
          winner: "软件1224"
        },
        {
          matchId: 12312,
          sport: "羽毛球",
          awayTeam: '软件1223',
          homeTeam: '软件1224',
          awayTeam_score: 20,
          homeTeam_score: 10,
          venue_name: "羽毛球馆2号",
          start_time: "2025-01-03 10:00",
          end_time: "2025-01-03 11:30",
          is_followed: 0,
          phase: 1,
          winner: "软件1224"
        },
        {
          matchId: 123458,
          sport: "乒乓球",
          awayTeam: '软件1223',
          homeTeam: '软件1224',
          awayTeam_score: 20,
          homeTeam_score: 10,
          venue_name: "乒乓球馆3号",
          start_time: "2025-01-02 09:00",
          end_time: "2025-01-02 11:00",
          is_followed: 1,
          phase: 2,
          winner: "软件1224"
        },
        {
          matchId: 123459,
          sport: "游泳",
          awayTeam: '软件1223',
          homeTeam: '软件1224',
          awayTeam_score: 20,
          homeTeam_score: 10,
          venue_name: "游泳馆1号",
          start_time: "2025-01-01 13:00",
          end_time: "2025-01-01 14:30",
          is_followed: 0,
          phase: 2,
          winner: "软件1224"
        },
        {
          matchId: 123410,
          sport: "乒乓球",
          awayTeam: '软件1223',
          homeTeam: '软件1224',
          awayTeam_score: 20,
          homeTeam_score: 10,
          venue_name: "乒乓球馆3号",
          start_time: "2025-01-02 09:00",
          end_time: "2025-01-02 11:00",
          is_followed: 1,
          phase: 3,
          winner: "软件1224"
        },
        {
          matchId: 123411,
          sport: "游泳",
          awayTeam: '软件1223',
          homeTeam: '软件1224',
          awayTeam_score: null,
          homeTeam_score: null,
          venue_name: "游泳馆1号",
          start_time: "2025-01-05 13:00",
          end_time: "2025-01-05 14:30",
          is_followed: 0,
          phase: 3,
          winner: null
        }
      ],
    }
  },
  methods: {
    // 选中比赛后,申请更换页面，查看比赛详情
    toMatch(matchId) {
      // 向父组件发送消息,要求更换路由页面,并将比赛id作为参数
      this.$emit("to-match", matchId);
    },

    // 请求跳转到上一页面
    toPrev() {
      this.$emit("to-prev");
    },

    // 获取赛事的信息
    async getGameData() {
      try{
        const data = await getGameData(this.gameId);
        this.gameData = data;
      }catch (error) {
        this.$message.error('获取赛事信息失败，请重试!');
        console.error('获取赛事信息失败:', error);
      }
    },

    // 获取赛事对应的比赛列表
    async getMatches() {
      try{
        const data = await getMatches(this.gameId);
        this.matches = data;
      }catch (error) {
        this.$message.error('获取比赛列表失败，请重试!');
        console.error('获取比赛列表失败:', error);
      }
    },

    // 关注和取消关注赛事
    async handleFollow(row) {
      try{
        const data = await handleFollow(row.matchId);
        console.log(data);
        // 重新获取数据
        // await this.getMatches();

        // 仅前端同步数据
        const match = this.matches.find((match) => {
          return match.matchId === row.matchId;
        });
        match.is_followed = !match.is_followed;
      }catch (error) {
        const message = row.is_followed === 0?"关注赛事失败":"取消关注赛事失败";
        this.$message.error(message + '，请重试!');
        console.error(message + ':', error);
      }
    }
  },
  async created() {
    // 将url中的competitionId初始化到competitionId变量中,如果不存在，则直接返回到competition页面
    const id = this.$route.params.gameId;
    if(id === undefined || id === '') {
      this.toPrev();
    } else {
      this.gameId = id;
    }
  },
  async mounted() {
    // 由于生命周期的自动执行,在页面跳转前回进入mounted函数内。如果gameId不存在,则后面的执行的函数都没有意义。因此需要停止执行。
    if (!this.gameId) {
      return;
    }
    await this.getGameData();
    await this.getMatches();
  }
}
</script>
<style scoped>
.schedule-container {
  padding: 20px;
}

/* 赛事图览容器 */
.tree-view-container {
  display: flex;
  justify-content: center;
}
</style>