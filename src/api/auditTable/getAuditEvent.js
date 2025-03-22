import eventRequest from '../../utils/eventRequest.js'

// 获取审核相关的赛事
export const getAuditEvent = (page, search, review_status) => {
    const url = '';
    // review_status是String类型,如果需要数字类型，需要修改一下

    const data = {
        page: page, // 页数条件
        search: search, // 关键字搜索
        review_status: review_status // 审核状态(管理员可以使用这个功能)
    }
    return eventRequest.post(url, data);
}