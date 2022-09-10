import requests from "./request";

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
export const reqChannels = () =>requests({url:'/v1_0/user/channels' , method:'get'})