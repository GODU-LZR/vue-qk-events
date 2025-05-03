import eventRequest from '../../../utils/eventRequest.js'

// 获取带赛程列表的赛事项目数据
export const getSummaryData = (matchId) => {
    const url = `http://124.71.58.72:8081/api/event/match/data/${matchId}/summary`;
    return eventRequest.get(url);
}