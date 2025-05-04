import request from '@/api/config/index'; // <-- 导入您配置好的 Axios 实例

// 获取比赛得分组成数据
export const getTeamStatsData = (matchId) => {
    const url = `/event/match/data/${matchId}/teamstats`;
    return request({
        url: url,
        method: 'get'
    });
}