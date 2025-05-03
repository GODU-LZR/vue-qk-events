import eventRequest from '../../../utils/eventRequest.js'

// 获取赛事信息
export const getGameData = (gameId) => {
    const url = '';
    const data = {
        gameId: gameId
    }
    return eventRequest.post(url, data);
}