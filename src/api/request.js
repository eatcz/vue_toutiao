import axios from "axios";
import router from "@/router";
import { getToken } from "@/utils/token";
import { Toast } from "vant";
import nProgress from "nprogress";
import 'nprogress/nprogress.css'
const requests = axios.create({
    baseURL:'',
    timeout:2000
})

requests.interceptors.request.use(config =>{
    nProgress.start()
    // 判断 如果token的长度 > 0 并且 请求头内没有配置Authorization 则添加Authorization
    // ?. 可选链操作符  表示如果前面对象没有length 整个表达式原地返回underfined
    if(getToken()?.length > 0 && config.headers.Authorization === undefined) {
        config.headers.Authorization = `Bearer ${getToken()}`
    }
    return config
})

requests.interceptors.response.use((res) => {
    nProgress.done()
    return res.data
} , (err) => {
    //  console.log(err);
     if(err.response.status === 401) {
        Toast('用户身份已过期')
        router.replace('/login')
     }
    return Promise.reject(new Error('fail'))
})

export default requests