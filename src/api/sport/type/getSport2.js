import request from '@/api/config/index';

// 获取不带赛事列表的赛事项目数据
export const getSport2 = () => {
    const url = '';
    return request({
        url: url,
        method: 'get'
    });
}