import eventRequest from '../../../utils/eventRequest.js'

// 获取赛事的对应比赛列表
export const handleFollow = (matchId) => {
    const url = '';
    const data = {
        matchId: matchId
    }
    return eventRequest.post(url, data);
}