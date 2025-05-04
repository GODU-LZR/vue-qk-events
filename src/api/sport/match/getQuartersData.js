import request from '@/api/config/index'; // <-- 导入您配置好的 Axios 实例

// 获取比赛场次得分数据
export const getQuartersData = (matchId) => {
    const url = `/event/match/data/${matchId}/quarters`;
    return request({
        url: url,
        method: 'get'
    });
}