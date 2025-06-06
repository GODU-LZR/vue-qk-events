//第一步：导入工具
import axios from 'axios'

//第二步：创建实例
const instance = axios.create({
    //设置基地址(需要自己设置，这只是)
    baseURL: 'https://localhost:8080/',
    //超时时间
    timeout: 1000
});

//第三步：添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance