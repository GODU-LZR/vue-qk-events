import request from '@/api/config/index';

// 获取赛事的对应比赛列表
export const getMatches = (gameId) => {
    const url = '';
    const data = {
        gameId: gameId
    }
    return request({
        url: url,
        method: 'get'
    });
}