<template>
  <!-- VS对战盒子（仅当有2支队伍时显示） -->
  <div class="vs-container">
    <div class="vs-box">
      <!-- 客队部分 -->
      <div class="vs-team">
        <el-avatar :size="80" :src="summaryData[0]?.url || 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'" class="vs-avatar"></el-avatar>
        <div class="vs-team-info">
          <div class="vs-team-name">{{ summaryData[0]?.team || '暂无数据'}}</div>
          <div class="vs-team-seed">客队 | {{ summaryData[0]?.seed || '--' }}</div>
          <div class="vs-team-score">{{ summaryData[0]?.score || '----' }}</div>
          <div class="vs-team-vote">{{ summaryData[0]?.votes || '--' }}({{summaryData[0]?.votePct || '0'}}%)</div>
        </div>
      </div>

      <!-- 中间VS部分 -->
      <div class="vs-middle">
        <div class="vs-text">VS</div>
      </div>

      <!-- 主队部分 -->
      <div class="vs-team vs-team-right">
        <el-avatar :size="80" :src="summaryData[1]?.url || 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'" class="vs-avatar"></el-avatar>
        <div class="vs-team-info">
          <div class="vs-team-name">{{ summaryData[1]?.team || '暂无数据'}}</div>
          <div class="vs-team-seed">主队 | {{ summaryData[1]?.seed || '--' }}</div>
          <div class="vs-team-score">{{ summaryData[1]?.score || '----' }}</div>
          <div class="vs-team-vote">{{ summaryData[1]?.votes || '--' }}({{summaryData[1]?.votePct || '0'}}%)</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "vsBox",
  props: {
    summaryData: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
/* VS标识样式 */
.vs-container {
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.vs-text {
  font-size:48px;
  font-weight: bold;
  color: #f56c6c;
  background: white;
  padding: 5px 10px;
  border-radius: 4px;
}

.vs-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.vs-team {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
}

.vs-middle {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
}

.vs-datetime {
  font-size: 12px;
  color: #666;
  margin-top: 5px;
}

.vs-team-name {
  font-weight: bold;
  font-size: 18px;
  margin-top: 8px;
  text-align: center
}

.vs-team-seed {
  font-size: 12px;
  color: #666;
  margin: 4px 0;
  text-align: center
}

.vs-team-score {
  font-size: 24px;
  font-weight: bold;
  text-align: center
}

.vs-team-vote {
  font-size: 12px;
  margin-top: 8px;
  text-align: center
}

.vs-avatar {
  margin-bottom: 10px;
}
</style>