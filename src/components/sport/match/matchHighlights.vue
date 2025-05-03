<template>
  <el-card class="game-highlights-card minimalist-white" shadow="never">
    <div slot="header" class="clearfix">
      <span>比赛亮点</span>
    </div>

    <!-- 遍历统计类型 (得分、篮板、助攻) -->
    <el-row
        v-for="stat in statsList"
        :key="stat.type"
        type="flex"
        align="middle"
        class="stat-row"
        :gutter="10">
      <!-- 客队球员信息 -->
      <el-col :span="7" class="player-col">
        <div class="player-info away">
          <!-- 头像，使用 getPlayerAvatar 方法 -->
          <el-avatar
              shape="square"
              size="medium"
              :src="getPlayerAvatar(stat.awayPlayer)"
              @error="handleAvatarError"
              :alt="`${stat.awayPlayer.name || '球员'} 头像`"
              class="player-avatar"/>
          <!-- 球员名字 -->
          <span class="player-name">{{ stat.awayPlayer.name || '未知球员' }}</span>
        </div>
      </el-col>

      <!-- 客队统计值 -->
      <el-col :span="3">
        <!-- 直接访问 score 属性 -->
        <div class="stat-value away">{{ stat.awayPlayer.score }}</div>
      </el-col>

      <!-- 统计类型名称 -->
      <el-col :span="4">
        <div class="stat-type">{{ stat.type }}</div>
      </el-col>

      <!-- 主队统计值 -->
      <el-col :span="3">
        <!-- 直接访问 score 属性 -->
        <div class="stat-value home">{{ stat.homePlayer.score }}</div>
      </el-col>

      <!-- 主队球员信息 -->
      <el-col :span="7" class="player-col">
        <div class="player-info home">
          <!-- 球员名字 -->
          <span class="player-name">{{ stat.homePlayer.name || '未知球员' }}</span>
          <!-- 头像，使用 getPlayerAvatar 方法 -->
          <el-avatar
              shape="square"
              size="medium"
              :src="getPlayerAvatar(stat.homePlayer)"
              @error="handleAvatarError"
              :alt="`${stat.homePlayer.name || '球员'} 头像`"
              class="player-avatar"/>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'matchHighlights',
  props: {
    highlightsData: {
      type: Object,
      required: true,
      // 更新默认值和验证器以匹配新结构
      default: () => ({ pt: [], reb: [], ast: [] }),
      validator: value => {
        // 验证 highlightsData 是一个对象，且包含 pt, reb, ast 键，其值是数组
        return value && typeof value === 'object' &&
            Array.isArray(value.pt) &&
            Array.isArray(value.reb) &&
            Array.isArray(value.ast);
        // 更详细的数组元素验证可以在 computed 属性中处理，以提供更灵活的容错
      }
    }
  },
  data() {
    return {
      fallbackAvatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
    };
  },
  computed: {
    statsList() {
      // 如果 highlightsData 无效，返回空数组
      if (!this.highlightsData) {
        return [];
      }

      // 定义统计类型及其对应在新数据结构中的键
      const statsConfig = [
        { type: '得分', key: 'pt' },
        { type: '篮板', key: 'reb' },
        { type: '助攻', key: 'ast' }
      ];

      // 映射 statsConfig 到模板所需的 statsList 结构
      return statsConfig.map(statConfig => {
        // 从 highlightsData 中获取对应统计类型的数组 (例如 highlightsData.pt)
        const statArray = this.highlightsData[statConfig.key];

        // 查找 teamId 为 0 (客队) 和 teamId 为 1 (主队) 的球员数据
        // 使用 ?. 进行安全访问，如果 statArray 不存在则返回 undefined
        const awayPlayerRaw = statArray?.find(p => p.teamId === 0);
        const homePlayerRaw = statArray?.find(p => p.teamId === 1);

        // 构建模板所需的 player 对象，提供默认值以避免渲染错误
        // 新数据结构中统计值在 score 字段，且没有 avatar 字段，这里为兼容旧模板结构，添加了 avatar 字段并默认为空字符串
        const awayPlayer = awayPlayerRaw ?
            { name: awayPlayerRaw.name, score: awayPlayerRaw.score, url: awayPlayerRaw.url } :
            { name: 'N/A', score: 0, url: '' }; // 提供默认值

        const homePlayer = homePlayerRaw ?
            { name: homePlayerRaw.name, score: homePlayerRaw.score, url: homePlayerRaw.url } :
            { name: 'N/A', score: 0, url: '' }; // 提供默认值

        return {
          type: statConfig.type, // 统计类型名称 (得分, 篮板, 助攻)
          // key: statConfig.key, // 原来的 key 字段在新模板中不再需要，因为值统一在 score 字段
          awayPlayer: awayPlayer, // 客队球员对象
          homePlayer: homePlayer  // 主队球员对象
        };
      });
    }
  },
  methods: {
    // 获取球员头像，如果球员数据或头像 URL 不存在，则返回备用头像
    // 由于新数据结构不包含 avatar，这里 player.avatar 将始终为 undefined，因此会一直使用 fallbackAvatar
    getPlayerAvatar(player) {
      // 检查 player 对象是否存在且有 url 属性且 url 不为空
      return player && player.url ? player.url : this.fallbackAvatar;
    },
    // handleAvatarError 方法保持不变
    handleAvatarError(event) {
      event.target.src = this.fallbackAvatar;
      event.target.onerror = null;
      return true;
    }
  }
}
</script>

<style scoped>
/* --- 简约白色风格 --- */
.game-highlights-card.minimalist-white {
  background-color: #ffffff; /* 白色背景 */
  border: 1px solid #ebeef5;
  color: #303133;
  max-width: 700px;
  margin: 20px auto;
  transition: box-shadow 0.3s; /* 添加过渡效果 */
}
.game-highlights-card.minimalist-white:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); /* 鼠标悬浮时显示更明显的阴影 */
}

/* 卡片头部 */
.game-highlights-card.minimalist-white >>> .el-card__header {
  background-color: #fcfcfc; /* 非常浅的灰色头部背景 */
  border-bottom: 1px solid #ebeef5; /* 浅边框色 */
  padding: 14px 20px;
  font-weight: 600;
}
.game-highlights-card.minimalist-white >>> .el-card__header .clearfix span {
  font-size: 16px;
}

/* 卡片内容区域 */
.game-highlights-card.minimalist-white >>> .el-card__body {
  padding: 10px 20px; /* 调整内容区域内边距 */
}

/* 统计行 */
.stat-row {
  padding: 15px 0;
  border-bottom: 1px dashed #dcdfe6;
}
.stat-row:last-child {
  border-bottom: none;
}

.player-col {
  display: flex;
  align-items: center;
}

.player-info {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.player-info.away {
  justify-content: flex-start;
}

.player-info.home {
  justify-content: flex-end;
}

/* 头像样式 */
.player-avatar {
  flex-shrink: 0;
  border: 1px solid #eee;
}
.player-avatar >>> img {
  object-fit: cover;
}

/* 名字样式 */
.player-name {
  font-size: 14px;
  font-weight: 500;
  color: #606266;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px; /* 限制名字最大宽度 */
}

/* 数据值样式调整 */
.stat-value {
  padding: 4px 8px; /* 稍微调整内边距 */
  min-width: 35px;
  font-weight: 600; /* 稍微降低字重 */
  font-size: 15px; /* 调整字号 */
  border-radius: 4px;
  text-align: center;
  line-height: 1.4;
  background-color: #f4f4f5; /* 浅灰色背景 */
  color: #303133; /* 深色文字 */
  border: 1px solid #e9e9eb; /* 添加细边框 */
}

.stat-value.away {
  color: #F56C6C;
}
.stat-value.home {
  color: #409EFF;
}

.stat-type {
  color: #909399;
  font-size: 13px;
  text-align: center;
  font-weight: 400;
}

/* 清除浮动 */
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
</style>
