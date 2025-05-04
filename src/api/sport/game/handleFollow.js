import request from '@/api/config/index';

// 用户关注或取消关注赛事
export const handleFollow = (matchId) => {
    const url = '';
    const data = {
        matchId: matchId
    }
    return request({
        url: url,
        method: 'get'
    });
}