import request from '@/api/config/index';

// 获取比赛的基本信息数据
export const getMatchData = (matchId) => {
    const url = '';
    const data = {
        matchId: matchId
    }
    return request({
        url: url,
        method: 'get'
    });
}