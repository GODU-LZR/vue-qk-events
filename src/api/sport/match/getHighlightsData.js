import request from '@/api/config/index'; // <-- 导入您配置好的 Axios 实例

// 获取比赛高光数据
export const getHighlightsData = (matchId) => {
    const url = `/event/match/data/${matchId}/highlights`;
    return request({
        url: url,
        method: 'get'
    });
}