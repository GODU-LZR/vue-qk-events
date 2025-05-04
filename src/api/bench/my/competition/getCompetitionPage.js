import request from '@/api/config/index';

// 获取我的赛事列表的总条数
export const getCompetitionPage = (review_status) => {
    const url = '';
    return request({
        url: url,
        method: 'get'
    });
}