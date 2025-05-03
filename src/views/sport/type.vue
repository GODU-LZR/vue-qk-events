<template>
  <div>
    <div class="sport-container" v-loading="loading">
<!--      @scroll="lazyLoad"-->
      <el-row :gutter="20" class="sport-row">
        <el-col
            v-for="(sport, index) in sportData1"
            :key="index"
            :xs="24" :sm="12" :md="12" :lg="12">
          <div class="card-container">
            <sportCard
                :sport="sport"
                @to-competition="toCompetition"
                @to-game="toGame"/>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="sport-row">
        <el-col
            v-for="(sport, index) in sportData2"
            :key="index"
            :xs="24" :sm="12" :md="8" :lg="8">
          <div class="card-container">
            <sport-card
                :sport="sport"
                :list="false"
                @to-competition="toCompetition"/>
          </div>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
import sportCard from "../../components/sport/type/sportCard"
import {getSport1} from "@/api/sport/type/getSport1";
import {getSport2} from "@/api/sport/type/getSport2";
export default {
  name: "type",
  components: {
    sportCard: sportCard
  },
  data() {
    return {
      loading: false,

      sportData1: [
        { sportId: 123451, name: "篮球", games: [{gameId: 123, name: 'NBA季后赛'}, {gameId: 123, name: 'CBA常规赛'}] },
        { sportId: 123452, name: "足球", games: [{gameId: 123, name: 'NBA季后赛'}, {gameId: 123, name: 'CBA常规赛'}] },
        { sportId: 123453, name: "网球", games: [{gameId: 123, name: 'NBA季后赛'}, {gameId: 123, name: 'CBA常规赛'}] },
        { sportId: 123454, name: "网球", games: [{gameId: 123, name: 'NBA季后赛'}, {gameId: 123, name: 'CBA常规赛'}] },
      ],

      // GetSport数据:用于没有举例赛程列表的赛事数据
      sportData2: [
        { sportId: 123451, name: "篮球"},
        { sportId: 123452, name: "足球"},
        { sportId: 123453, name: "网球"},
        { sportId: 123454, name: "网球"},
        { sportId: 123455, name: "篮球"},
        { sportId: 123456, name: "足球"},
      ],
    }
  },
  methods: {
    /* 前端路由函数 */
    // 选中赛事项目后,申请路由到GetMatch
    toCompetition(sportId) {
      // 向父组件发送消息,要求更换路由页面,并将赛事项目id作为参数
      this.$emit("to-competition", sportId);
    },

    // 选中sportData1的赛程,申请路由到GetSchedule
    toGame(gameId) {
      // 向父组件发送消息,要求更换路由页面,并将赛事项目id作为参数
      this.$emit("to-game", gameId);
    },

    /* 前端函数 */

    /* 后端函数 */
    // 获取赛事项目1数据
    async getSportData1() {
      try {
        const data = await getSport1();
        this.sportData1 = data;
      }catch (error) {
        console.error('获取赛事项目1失败:', error);
        throw error;
      }
    },

    // 获取赛事项目2数据
    async getSportData2() {
      try {
        const data = await getSport2();
        this.sportData2 = data;
      }catch (error) {
        console.error('获取赛事项目2失败:', error);
        throw error;
      }
    },

    // 获取赛事项目数据
    async getSportData() {
      this.loading = true;
      try {
        await this.getSportData1();
        await this.getSportData2();
      }catch (error) {
        this.$message.error('获取赛事项目失败，请重试!');
      }finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    // 获取赛事运动项目信息
    this.getSportData();
  }
}
</script>

<style scoped>
/* 您的原有所有样式保持不变 */
.sport-container {
  padding: 0 10px;
  margin: 0;

  height: 600px; /*!* 设置一个固定的高度 *!*/
  overflow-y: auto; /* 开启滚动 */
}

.sport-row {
  margin: 0 -10px;
}

::v-deep .el-col {
  padding: 0 10px !important;
  margin-bottom: 20px;
}

.card-container {
  display: flex;
  justify-content: center;
}

.sport-card {
  width: 100%;
  max-width: 100%;
}

@media (max-width: 1200px) {
  .el-col-lg-6 {
    width: 25%;
  }
}

@media (max-width: 992px) {
  .el-col-md-8 {
    width: 33.3333%;
  }
}

@media (max-width: 768px) {
  .el-col-sm-12 {
    width: 50%;
  }
}

@media (max-width: 576px) {
  .el-col-xs-24 {
    width: 100%;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>