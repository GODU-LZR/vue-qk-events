import eventRequest from '../../../utils/eventRequest.js'

// 获取赛事的对应比赛列表
export const getMatches = (gameId) => {
    const url = '';
    const data = {
        gameId: gameId
    }
    return eventRequest.post(url, data);
}