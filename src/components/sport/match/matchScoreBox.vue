<template>
  <div class="score-container">

    <!-- 横向得分表格 - 无边框+斑马纹 -->
    <div class="horizontal-table">
      <table>
        <thead>
        <tr>
          <th class="team-cell"></th>
          <!-- 遍历 quarterKeys 来生成表头 -->
          <th v-for="(key, index) in quarterKeys" :key="'th-'+key" class="quarter-header">
            第{{ index + 1 }}节
          </th>
          <th class="total-header">总分</th>
        </tr>
        </thead>
        <tbody>
        <tr class="away-row">
          <!-- 使用计算属性获取队伍名称 -->
          <td class="team-cell away">{{ awayTeamName }}</td>
          <!-- 遍历 quarterKeys 获取每节得分 -->
          <td v-for="key in quarterKeys" :key="'away-'+key" class="score-cell">
            <!-- 安全访问数据 -->
            {{ quartersData?.[0]?.[key] }}
          </td>
          <!-- 使用计算属性获取总分 -->
          <td class="total-cell">{{ awayTotalScore }}</td>
        </tr>
        <tr class="home-row">
          <!-- 使用计算属性获取队伍名称 -->
          <td class="team-cell home">{{ homeTeamName }}</td>
          <!-- 遍历 quarterKeys 获取每节得分 -->
          <td v-for="key in quarterKeys" :key="'home-'+key" class="score-cell">
            <!-- 安全访问数据 -->
            {{ quartersData?.[1]?.[key] }}
          </td>
          <!-- 使用计算属性获取总分 -->
          <td class="total-cell">{{ homeTotalScore }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- ECharts折线图容器 -->
    <div ref="lineChart" class="echarts-container"></div>

  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'matchScoreBox',
  props: {
    // 只保留 quartersData prop
    quartersData: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      chart: null
    };
  },
  computed: {
    // 从 quartersData 中获取客队名称
    awayTeamName() {
      return this.quartersData?.[0]?.team || '暂无名称';
    },
    // 从 quartersData 中获取主队名称
    homeTeamName() {
      return this.quartersData?.[1]?.team || '暂无名称';
    },
    // 提取 quartersData 中表示节的场次
    quarterKeys() {
      if (!this.quartersData?.[0]) {
        return [];
      }
      // 过滤掉 'team' 属性，只保留节的得分 key
      return Object.keys(this.quartersData[0]).filter(key => key !== 'team');
    },
    // 计算客队总分
    awayTotalScore() {
      if (!this.quartersData?.[0]) {
        return 0;
      }
      return this.quarterKeys.reduce((sum, key) => sum + (this.quartersData[0][key] || 0), 0);
    },
    // 计算主队总分
    homeTotalScore() {
      if (!this.quartersData?.[1]) {
        return 0;
      }
      return this.quarterKeys.reduce((sum, key) => sum + (this.quartersData[1][key] || 0), 0);
    },
    // 计算图表Y轴最大值
    maxScore() {
      const awayScores = this.quarterKeys.map(key => this.quartersData?.[0]?.[key] || 0);
      const homeScores = this.quarterKeys.map(key => this.quartersData?.[1]?.[key] || 0);

      const awayCumulative = [];
      const homeCumulative = [];
      let awaySum = 0;
      let homeSum = 0;

      for (let i = 0; i < this.quarterKeys.length; i++) {
        awaySum += awayScores[i];
        homeSum += homeScores[i];
        awayCumulative.push(awaySum);
        homeCumulative.push(homeSum);
      }

      const allCumulative = [...awayCumulative, ...homeCumulative];
      const currentMax = allCumulative.length > 0 ? Math.max(...allCumulative) : 0;

      // 确保最大值至少为 40 且是 10 的倍数向上取整
      return Math.max(40, Math.ceil(currentMax / 10) * 10);
    },
    // ECharts 配置项
    chartOption() {
      if (!this.quartersData || this.quartersData.length < 2) {
        return {}; // 数据不完整时返回空配置
      }

      const awayTeam = this.quartersData[0];
      const homeTeam = this.quartersData[1];
      const quarterKeys = this.quarterKeys;

      // 计算累计得分
      const awayCumulative = [];
      const homeCumulative = [];
      let awaySum = 0;
      let homeSum = 0;

      quarterKeys.forEach(key => {
        awaySum += awayTeam[key] || 0;
        homeSum += homeTeam[key] || 0;
        awayCumulative.push(awaySum);
        homeCumulative.push(homeSum);
      });

      // X轴数据 (第1节, 第2节...)
      const xAxisData = quarterKeys.map((_, index) => index + 1);

      return {
        tooltip: {
          trigger: 'axis',
          formatter: params => {
            // params 数组包含每个系列的tooltip信息，这里通常是客队和主队
            // 确保 params 数组有足够元素
            if (!params || params.length < 2) return '';

            const awaySeriesData = params.find(p => p.seriesName === this.awayTeamName);
            const homeSeriesData = params.find(p => p.seriesName === this.homeTeamName);

            if (!awaySeriesData || !homeSeriesData) return '';

            const quarterIndex = awaySeriesData.dataIndex; // 当前是第几节的累计数据 (0-indexed)
            const quarterNumber = quarterIndex + 1; // 第几节 (1-indexed)

            const awayCumulativeScore = awaySeriesData.value;
            const homeCumulativeScore = homeSeriesData.value;

            // 计算当前节的得分差
            const awayQuarterScore = quarterIndex === 0 ?
                awayCumulativeScore :
                awayCumulativeScore - awayCumulative[quarterIndex - 1];
            const homeQuarterScore = quarterIndex === 0 ?
                homeCumulativeScore :
                homeCumulativeScore - homeCumulative[quarterIndex - 1];


            return `
              <div style="font-weight:bold;margin-bottom:5px">第${quarterNumber}节</div>
              <div style="display:flex;align-items:center;margin-bottom:3px">
                <div style="width:10px;height:10px;background:#1E88E5;margin-right:5px"></div>
                <div>${this.awayTeamName}: ${awayCumulativeScore} <span style="color:#888">(+${awayQuarterScore})</span></div>
              </div>
              <div style="display:flex;align-items:center">
                <div style="width:10px;height:10px;background:#FF5722;margin-right:5px"></div>
                <div>${this.homeTeamName}: ${homeCumulativeScore} <span style="color:#888">(+${homeQuarterScore})</span></div>
              </div>
            `;
          }
        },
        legend: {
          data: [this.awayTeamName, this.homeTeamName], // 使用计算属性获取队伍名称
          bottom: 0,
          itemWidth: 12,
          itemHeight: 12
        },
        grid: {
          left: '50px',
          right: '20px',
          top: '20px',
          bottom: '40px'
        },
        xAxis: {
          type: 'category',
          data: xAxisData, // 使用计算出的X轴数据
          axisLabel: {
            formatter: '第{value}节',
            rotate: xAxisData.length > 4 ? 45 : 0, // 根据节数调整标签旋转
            margin: xAxisData.length > 4 ? 20 : 8
          },
          axisLine: {
            lineStyle: {
              color: '#e0e0e0'
            }
          },
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: this.maxScore, // 使用计算属性获取最大值
          interval: this.maxScore / 4, // 自动计算间隔
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#f0f0f0'
            }
          }
        },
        series: [
          {
            name: this.awayTeamName, // 使用计算属性获取队伍名称
            type: 'line',
            data: awayCumulative, // 使用计算出的累计得分
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              color: '#1E88E5'
            },
            lineStyle: {
              width: 3
            },
            emphasis: {
              itemStyle: {
                borderWidth: 2,
                borderColor: '#fff',
                shadowBlur: 5,
                shadowColor: 'rgba(0, 0, 0, 0.3)'
              }
            }
          },
          {
            name: this.homeTeamName, // 使用计算属性获取队伍名称
            type: 'line',
            data: homeCumulative, // 使用计算出的累计得分
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              color: '#FF5722'
            },
            lineStyle: {
              width: 3
            },
            emphasis: {
              itemStyle: {
                borderWidth: 2,
                borderColor: '#fff',
                shadowBlur: 5,
                shadowColor: 'rgba(0, 0, 0, 0.3)'
              }
            }
          }
        ]
      };
    }
  },
  mounted() {
    // 确保数据存在且结构正确再初始化图表
    if (this.quartersData && this.quartersData.length === 2) {
      this.initChart();
    } else {
      console.error("ScoreBoard: Invalid quartersData received on mount.", this.quartersData);
    }
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
      window.removeEventListener('resize', this.handleResize);
    }
  },
  methods: {
    initChart() {
      // 确保DOM元素存在
      if (!this.$refs.lineChart) {
        console.error("ScoreBoard: Chart container element not found.");
        return;
      }
      // 确保 chartOption 有效
      if (Object.keys(this.chartOption).length === 0) {
        console.warn("ScoreBoard: chartOption is empty, skipping chart initialization.");
        return;
      }

      this.chart = echarts.init(this.$refs.lineChart);
      this.chart.setOption(this.chartOption);
      window.addEventListener('resize', this.handleResize);
    },
    handleResize() {
      this.chart && this.chart.resize();
    }
  },
  watch: {
    // 监听 quartersData 的变化
    quartersData: {
      handler(newData, oldData) {
        // 检查新数据是否有效
        if (newData && newData.length === 2) {
          // 如果图表已存在，更新配置
          if (this.chart) {
            // 检查结构是否发生变化 (例如，节数改变)，如果结构变了，最好销毁重建
            const newKeys = this.quarterKeys;
            // 简单的结构变化判断：比较节数
            const oldKeys = oldData && oldData.length === 2 ? Object.keys(oldData[0]).filter(key => key !== 'team') : [];

            if (newKeys.length !== oldKeys.length) {
              console.log("ScoreBoard: quartersData structure changed, re-initializing chart.");
              this.chart.dispose();
              this.chart = null;
              window.removeEventListener('resize', this.handleResize);
              // $nextTick 确保 DOM 更新完成后再初始化
              this.$nextTick(() => {
                this.initChart();
              });
            } else {
              // 结构没变，只更新数据
              console.log("ScoreBoard: quartersData values changed, updating chart option.");
              this.chart.setOption(this.chartOption);
            }

          } else {
            // 如果图表不存在，初始化
            console.log("ScoreBoard: quartersData received, initializing chart.");
            this.$nextTick(() => {
              this.initChart();
            });
          }
        } else {
          // 新数据无效，如果图表存在则销毁
          if (this.chart) {
            console.warn("ScoreBoard: Invalid quartersData received, disposing chart.", newData);
            this.chart.dispose();
            this.chart = null;
            window.removeEventListener('resize', this.handleResize);
          } else {
            console.warn("ScoreBoard: Invalid quartersData received.", newData);
          }
        }
      },
      deep: true, // 深度监听数组内部对象的变化
      immediate: false // 不在组件创建时立即执行，mounted 会处理首次初始化
    }
  }
}
</script>

<!-- 样式部分：完全复制原代码中的样式，未做任何修改 -->
<style scoped>
.score-container {
  margin: 20px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  height: 500px;
}

/* 横向表格样式 - 无边框+斑马纹 */
.horizontal-table {
  margin-bottom: 30px;
  overflow-x: auto;
}

.horizontal-table table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  border: none;
}

.horizontal-table th, .horizontal-table td {
  padding: 12px 8px;
  border: none;
}

.quarter-header {
  font-weight: normal;
  color: #666;
  min-width: 60px;
}

.total-header {
  font-weight: bold;
  min-width: 80px;
}

.team-cell {
  font-weight: bold;
  text-align: left;
  padding-left: 15px !important;
  min-width: 100px;
}

.team-cell.away {
  color: #1E88E5;
}

.team-cell.home {
  color: #FF5722;
}

.score-cell {
  font-weight: bold;
}

.total-cell {
  font-weight: bold;
  font-size: 16px;
}

/* 斑马条纹 */
.horizontal-table thead tr {
  background-color: #f8f9fa;
}

.away-row {
  background-color: #fff;
}

.home-row {
  background-color: #f8f9fa;
}

/* ECharts容器样式 */
.echarts-container {
  width: 100%;
  height: 300px;
  margin-top: 20px;
}
</style>
