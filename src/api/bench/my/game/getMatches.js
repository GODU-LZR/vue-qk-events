import request from '@/api/config/index';

// 获取我的赛事的对应比赛
export const getMatches = (gameId) => {
    const url = '';
    return request({
        url: url,
        method: 'get'
    });
}