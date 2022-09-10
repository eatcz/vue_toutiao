import requests from "./request";
import { getToken } from "@/utils/token.js";
// 登录
export const reqLogin = ({ mobile , code }) => requests({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
        mobile,
        code
    }
}) 

// 频道获取
export const reqChannels = () =>requests({url:'/v1_0/user/channels' , method:'get',
    headers:{
        Authorization:`Bearer ${getToken()}`
    }
})

// 列表数据
export const reqArticles = ({channel_id , timestamp}) =>requests({
    url:'/v1_0/articles',
    method:'GET',
    params:{
        channel_id,
        timestamp
    }
})