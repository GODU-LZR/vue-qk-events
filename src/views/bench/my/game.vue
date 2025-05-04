<template>
  <div style="padding: 20px;">
    <div style="text-align: right; margin-top: 20px">
      <el-button size="medium" @click="addEventFormVisible = true">
        新增
      </el-button>
      <el-button type="primary" size="medium" @click="resetGameForm">
        重置
      </el-button>
      <el-button type="primary" size="medium" @click="updateGameData">
        保存
      </el-button>
    </div>
    <gameInfo v-model="gameForm" v-loading="gameDataLoading"></gameInfo>

    <gameTable :matches="matches" @to-match="toMatch" v-loading="matchesLoading"></gameTable>

    <el-dialog title="新增比赛" :visible.sync="addEventFormVisible" top="40px" @closed="clearAddEventForm">
      <addMatchForm v-model="addMatchForm"></addMatchForm>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addEventFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMatch">新 增</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getGameData} from "@/api/bench/my/game/getGameData";
import {getMatches} from "@/api/bench/my/game/getMatches";
import {updateGameData} from "@/api/bench/my/game/updateGameData";
import {addMatch} from "@/api/bench/my/game/addMatch";

import gameInfo from '../../../components/bench/my/game/gameInfo'
import gameTable from '../../../components/bench/my/game/gameTable'
import addMatchForm from '../../../components/bench/my/game/addMatchForm'
export default {
  name: "game",
  components: {
    gameInfo: gameInfo,
    gameTable: gameTable,
    addMatchForm: addMatchForm,
  },
  data() {
    return {
      gameId: null,
      addEventFormVisible: false,

      gameDataLoading: false,
      matchesLoading: false,

      addMatchForm: {
        gameId: 1,
        awayTeam: '',
        homeTeam: '',
        venue_name: '',
        referee_name: [],
        start_time: '',
        end_time: '',
      },

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
        mode: 2
      },

      gameForm: {},

      matches: [
        {
          matchId: 123456,
          sport: "篮球",
          awayTeam: '软件1223',
          homeTeam: '软件1224',
          venue_name: "篮球场1号",
          start_time: "2025-01-03 14:00",
          end_time: "2025-01-03 15:30",
          is_followed: 1,
          phase: 1,
          winner: "软件1224"
        },
        {
          matchId: 123457,
          sport: "羽毛球",
          awayTeam: '软件1223',
          homeTeam: '软件1224',
          venue_name: "羽毛球馆2号",
          start_time: "2025-01-03 10:00",
          end_time: "2025-01-03 11:30",
        },
        {
          matchId: 123457,
          sport: "羽毛球",
          awayTeam: '软件1223',
          homeTeam: '软件1224',
          venue_name: "羽毛球馆2号",
          start_time: "2025-01-03 10:00",
          end_time: "2025-01-03 11:30",
        },
        {
          matchId: 123458,
          sport: "乒乓球",
          awayTeam: '软件1223',
          homeTeam: '软件1224',
          venue_name: "乒乓球馆3号",
          start_time: "2025-01-02 09:00",
          end_time: "2025-01-02 11:00",
        },
        {
          matchId: 123459,
          sport: "游泳",
          awayTeam: '软件1223',
          homeTeam: '软件1224',
          venue_name: "游泳馆1号",
          start_time: "2025-01-01 13:00",
          end_time: "2025-01-01 14:30",
        },
        {
          matchId: 123458,
          sport: "乒乓球",
          awayTeam: '软件1223',
          homeTeam: '软件1224',
          venue_name: "乒乓球馆3号",
          start_time: "2025-01-02 09:00",
          end_time: "2025-01-02 11:00",
        },
        {
          matchId: 123459,
          sport: "游泳",
          awayTeam: '软件1223',
          homeTeam: '软件1224',
          venue_name: "游泳馆1号",
          start_time: "2025-01-05 13:00",
          end_time: "2025-01-05 14:30",
        }
      ]
    }
  },
  methods: {
    /* 前端路由方法 */
    // 选中比赛,请求路由至GetMyMatchEvent页面
    toMatch(matchId) {
      this.$emit("to-match", matchId);
    },

    /*  前端函数  */
    // 重置比赛信息表单
    resetGameForm() {
      this.gameForm = this.gameData;
    },

    // 清空添加比赛的数据
    clearAddEventForm() {
        this.addMatchForm.awayTeam = '';
        this.addMatchForm.homeTeam = '';
        this.addMatchForm.venue_name = '';
        this.addMatchForm.referee_name = []; // 确保数组也清空
        this.addMatchForm.start_time = '';
        this.addMatchForm.end_time = '';
    },

    /* 后端函数 */
    // 获取我的赛事的信息
    async getGameData() {
      this.gameDataLoading = true;
      try{
        const response = await getGameData(this.gameId);
        this.gameData = response.data;
      }catch (error) {
        this.$message.error('获取赛事信息失败，请重试!');
        console.error('获取赛事信息失败:', error);
      }finally {
        this.gameDataLoading = false;
      }
    },

    // 获取我的赛事对应的比赛列表
    async getMatches() {
      this.matchesLoading = true;
      try{
        const response = await getMatches(this.gameId);
        this.matches = response.data;
      }catch (error) {
        this.$message.error('获取比赛列表失败，请重试!');
        console.error('获取比赛列表失败:', error);
      }finally {
        this.matchesLoading = false;
      }
    },

    // 修改赛事信息
    async updateGameData() {
      try {
        const data = await updateGameData(this.gameForm);
        await this.getGameData();
      }catch (error) {
        this.$message.error('修改赛事信息失败，请重试!');
        console.error('修改赛事信息失败:', error);
      }
    },

    // 新增比赛
    async addMatch() {
      try {
        const data = await addMatch(this.addMatchForm);
        this.addEventFormVisible = false;
        await this.getMatches();
      }catch (error) {
        this.$message.error('新增比赛失败，请重试!');
        console.error('新增比赛失败:', error);
      }
    }
  },
  watch: {
    gameData: {
      // 当 gameData 发生变化时执行,重置比赛信息表单
      handler(newValue) {
        this.gameForm = newValue;
      },
      immediate: true,
      deep: true
    }
  },
  async created() {
    // 将url中的competitionId初始化到competitionId变量中,如果不存在，则直接返回到competition页面
    const id = this.$route.params.gameId;
    if(id === undefined || id === '') {
      // this.toPrev();
    } else {
      this.gameId = id;
    }
  },
  async mounted() {
    await this.getGameData();
    await this.getMatches();
  }
}
</script>

<style scoped>

</style>