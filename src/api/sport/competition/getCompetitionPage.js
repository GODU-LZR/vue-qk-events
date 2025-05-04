import request from '@/api/config/index';

// 获取赛事列表的总条数
export const getCompetitionPage = (sportId) => {
    const url = '';
    const data = {
        sportId: sportId,
    }
    return request({
        url: url,
        method: 'get'
    });
}