import request from '@/api/config/index';

// 获取负责人待选选项
export const getResponsiblePersonOptions = (responsiblePerson) => {
    const url = '';
    return request({
        url: url,
        method: 'get'
    });
}