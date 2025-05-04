import request from '@/api/config/index';

// 获取我的赛事基本信息数据
export const getCompetitionData = (page, review_status) => {
    const url = '';
    return request({
        url: url,
        method: 'post'
    });
}