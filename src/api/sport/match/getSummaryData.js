import request from '@/api/config/index'; // <-- 导入您配置好的 Axios 实例

// 获取队伍信息数据
export const getSummaryData = (matchId) => {
    const url = `/event/match/data/${matchId}/summary`;
    return request({
        url: url,
        method: 'get'
    });
}