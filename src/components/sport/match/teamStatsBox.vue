<template>
  <div class="team-container">
    <!-- 头部显示队伍名称 -->
    <div class="team-header">
      <div class="away-team">{{ teamStatsData?.[0]?.name }}</div>
      <div class="vs">VS</div>
      <div class="home-team">{{ teamStatsData?.[1]?.name }}</div>
    </div>
    <!-- ECharts 图表容器 -->
    <div class="stats-chart" ref="statsChart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'TeamStatsComparison',
  props: {
    // 明确 prop 类型为 Array，且是必需的
    teamStatsData: {
      required: true,
    }
  },
  data() {
    return {
      chart: null,
      // 定义统计项类别
      categories: ['得分', '篮板', '助攻', '投篮%', '三分%']
    };
  },
  // 组件挂载后初始化图表
  mounted() {
    if (this.teamStatsData && this.teamStatsData.length === 2) {
      this.initChart();
    } else {
      // 如果数据不符合要求，输出错误信息
      console.error("TeamStatsComparison: teamStatsData 必须是一个包含两个对象的数组。当前数据:", this.teamStatsData);
    }
  },
  // 组件销毁前销毁图表实例，防止内存泄漏
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
    // 移除窗口resize监听
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    // 初始化 ECharts 图表
    initChart() {
      // 确保DOM元素存在
      if (!this.$refs.statsChart) {
        console.error("TeamStatsComparison: Chart container element not found.");
        return;
      }

      // 初始化图表实例
      this.chart = echarts.init(this.$refs.statsChart);

      // 获取两个队伍的数据
      const awayTeam = this.teamStatsData[0];
      const homeTeam = this.teamStatsData[1];

      // 检查队伍数据对象是否存在
      if (!awayTeam || !homeTeam) {
        console.error("TeamStatsComparison: 队伍数据对象缺失。", { awayTeam, homeTeam });
        return;
      }

      // ECharts 配置项
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          // 自定义 tooltip 格式
          formatter: params => {
            // params[0] 通常是 awayTeam (负值), params[1] 是 homeTeam (正值)
            const awayValue = Math.abs(params[0].data); // 取绝对值显示
            const homeValue = params[1].data;
            const categoryIndex = params[0].dataIndex; // 统计项索引

            // 根据索引判断是否为百分比数据，进行格式化
            const awayFormatted = categoryIndex >= 3 ? awayValue.toFixed(1) + '%' : awayValue;
            const homeFormatted = categoryIndex >= 3 ? homeValue.toFixed(1) + '%' : homeValue;

            return `${params[0].axisValue}<br/>
              ${awayTeam.name}: ${awayFormatted}<br/>
              ${homeTeam.name}: ${homeFormatted}`;
          }
        },
        legend: {
          data: [awayTeam.name, homeTeam.name] // 使用队伍名称作为 legend
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true // 确保刻度标签显示完整
        },
        xAxis: {
          type: 'value',
          // 格式化 x 轴标签，显示绝对值
          axisLabel: {
            formatter: function(value) {
              return Math.abs(value);
            }
          },
          splitLine: {
            lineStyle: {
              type: 'dashed' // 分隔线样式
            }
          }
        },
        yAxis: {
          type: 'category',
          data: this.categories // 使用统计项作为 y 轴类别
        },
        series: [
          {
            name: awayTeam.name,
            type: 'bar',
            barWidth: 8,
            barGap: '-100%', // 使两组柱子重叠
            label: {
              show: true,
              position: 'left', // 标签显示在左侧
              // 格式化标签，显示绝对值并处理百分比
              formatter: function(params) {
                const value = Math.abs(params.value);
                return params.dataIndex >= 3 ? value.toFixed(1) + '%' : value;
              }
            },
            itemStyle: { color: '#5470C6' }, // 队伍颜色
            // 队伍1数据，使用负值使其显示在左侧
            data: [
              -awayTeam.pts,
              -awayTeam.reb,
              -awayTeam.ast,
              -awayTeam.fgPct,
              -awayTeam.tpPct
            ]
          },
          {
            name: homeTeam.name,
            type: 'bar',
            barWidth: 8,
            label: {
              show: true,
              position: 'right', // 标签显示在右侧
              // 格式化标签，处理百分比
              formatter: function(params) {
                return params.dataIndex >= 3 ? params.value.toFixed(1) + '%' : params.value;
              }
            },
            itemStyle: { color: '#EE6666' }, // 队伍颜色
            // 队伍2数据，使用正值使其显示在右侧
            data: [
              homeTeam.pts,
              homeTeam.reb,
              homeTeam.ast,
              homeTeam.fgPct,
              homeTeam.tpPct
            ]
          }
        ]
      };

      // 设置图表配置项并渲染
      this.chart.setOption(option);
      // 添加窗口resize监听，使图表自适应
      window.addEventListener('resize', this.handleResize);
    },
    // 处理窗口resize事件，重绘图表
    handleResize() {
      if (this.chart) {
        this.chart.resize();
      }
    }
  },
  // 监听 teamStatsData 的变化
  watch: {
    teamStatsData: {
      deep: true, // 深度监听数组内部对象的变化
      handler(newData) {
        // 数据变化时，先销毁旧图表，再尝试初始化新图表
        if (this.chart) {
          this.chart.dispose();
          this.chart = null; // 清空引用
          window.removeEventListener('resize', this.handleResize); // 移除旧监听
        }
        // 检查新数据是否符合要求，再初始化
        if (newData && newData.length === 2) {
          this.$nextTick(() => { // 确保DOM更新后再初始化
            this.initChart();
          });
        } else {
          console.error("TeamStatsComparison: teamStatsData 更新后数据不符合要求。", newData);
        }
      }
    }
  }
};
</script>

<!-- 样式部分 -->
<style scoped>
.team-container {
  margin: 20px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  height: 500px;
  display: flex;
  flex-direction: column;
}

.team-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.away-team, .home-team {
  width: 40%;
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.away-team {
  color: #5470C6; /* 左侧队伍颜色 */
}

.home-team {
  color: #EE6666; /* 右侧队伍颜色 */
}

.vs {
  width: 20%;
  text-align: center;
  font-size: 24px;
  color: #909399;
}

.stats-chart {
  width: 100%;
  flex-grow: 1;
}
</style>


