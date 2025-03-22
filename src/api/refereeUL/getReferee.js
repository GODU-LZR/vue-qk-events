import eventRequest from '../../utils/eventRequest.js'

// 获取裁判
export const getReferee = (page, search) => {
    const url = '';
    const data = {
        page: page,
        search: search
    }
    return eventRequest.post(url, data);
}