import eventRequest from '../../utils/eventRequest.js'

// 获取到我的赛事，这些赛事是没有被加入到赛程
export const getMyEventList = (page) => {
    const url = '';

    const data = {
        page: page
    }
    return eventRequest.post(url, data);
}