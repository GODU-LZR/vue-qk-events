import eventRequest from '../../../utils/eventRequest.js'

// 获取带赛程列表的赛事项目数据
export const getMatchData = (matchId) => {
    const url = '';
    const data = {
        matchId: matchId
    }
    return eventRequest.post(url, data);
}