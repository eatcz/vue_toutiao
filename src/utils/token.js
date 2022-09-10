// 封装操作token
const key = 'token';

// 存入token
export const setToken = (token) =>localStorage.setItem(key , token)


// 获取token
export const getToken = () => localStorage.getItem(key)


// 移除token

export const removeToken = () =>localStorage.removeItem(key)


