import eventRequest from '../../utils/eventRequest.js'

// 同意开启或取消赛事开始前5分钟通知功能
export const handleNotice = () => {
    const url = '';
    return eventRequest.post(url);
}