import eventRequest from '../../utils/eventRequest.js'

// 获取关注赛事
export const getFollowEvent = (page, search) => {
    const url = '';
    const data = {
        page: page, // 页数条件
        search: search, // 关键字搜索
    }
    return eventRequest.post(url, data);
}