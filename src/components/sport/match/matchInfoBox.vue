<template>
  <!-- 赛事信息盒子 -->
  <div class="event-info-box">
    <div class="event-header">
      <div class="event-title">
        <span class="sport-name">{{ matchData.sport }}</span>
        <el-tag v-if="matchData.is_followed === 1" type="primary" size="small">已关注</el-tag>
        <el-tag v-else type="danger" size="small">未关注</el-tag>
      </div>
      <div class="event-time">
        <span><i class="el-icon-time"></i> {{ matchData.start_time }} - {{ matchData.end_time }}</span>
      </div>
    </div>

    <div class="event-details">
      <div class="detail-row">
        <span class="detail-label">比赛场地:</span>
        <span class="detail-value">{{ matchData.venue_name }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">裁判:</span>
        <span class="detail-value">{{ matchData.referee_name.join('、') }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">负责人:</span>
        <span class="detail-value">{{ matchData.responsible_person }} (<i class="el-icon-phone"></i>{{ matchData.phone }})</span>
      </div>
      <div class="detail-row" v-if="matchData.note">
        <span class="detail-label">备注:</span>
        <span class="detail-value note-text">{{ matchData.note }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "matchInfoBox",
  props: {
    matchData: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.event-info-box {
  width: 100%;
  margin-bottom: 20px;
  border-bottom: 1px dashed #dcdfe6;
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.event-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sport-name {
  font-size: 18px;
  font-weight: bold;
}

.event-time {
  color: #909399;
  font-size: 14px;
}

.event-details {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 10px 20px;
}

.detail-row {
  display: flex;
  margin-bottom: 8px;
}

.detail-label {
  color: #909399;
  margin-right: 8px;
  white-space: nowrap;
}

.detail-value {
  color: #606266;
}

.note-text {
  word-break: break-word;
}
</style>