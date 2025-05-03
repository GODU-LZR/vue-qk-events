import eventRequest from '../../../utils/eventRequest.js'

// 获取赛程列表
export const getCompetitionData = (sportId, page, filter) => {
    const url = '';
    const data = {
        sportId: sportId,
        page: page,
        name: filter.name,
        team: filter.team,
        registerTime: filter.registerTime,
        time: filter.time
    }
    return eventRequest.post(url, data);
}