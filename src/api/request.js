import axios from "axios";
const requests = axios.create({
    baseURL:'',
    timeout:2000
})

requests.interceptors.request.use(config =>{
    return config
})

requests.interceptors.response.use((res) => {
    return res.data
} , (err) => {
    return Promise.reject(new Error('fail'))
})

export default requests