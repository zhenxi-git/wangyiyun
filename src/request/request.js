import axios from "axios"
let request=axios.create({
    baseURL:"https://wang-yi-api.vercel.app", //公共路径
     timeout:3000,   //返回时间
                    
})
export default request;