import request from '@/api/config/index';

// 获取赛事列表数据
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
    return request({
        url: url,
        method: 'get'
    });
}