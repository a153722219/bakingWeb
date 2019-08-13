import axios from 'axios'
import store from '../store'
import router from '../router'
import {baseURL} from "./config"
// 创建axios实例
const service = axios.create({
	//https://bozunbaking.com/baking
  baseURL: baseURL+"/baking", // api的base_url
  timeout: 5000 // 请求超时时间
});

axios.defaults.headers = {
  // "Content-Type": "application/x-www-form-urlencoded"
  "Content-Type": "application/json"
};

// 发送请求前处理request的数据
axios.defaults.transformRequest = [function (data) {
  let newData = ''
  for (let k in data) {
    newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
  }
  return newData
}];




// request拦截器
service.interceptors.request.use(config => {
  //拦截器
 if(store.getters.token)
    config.headers['Authorization']=store.state.token;
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;


  if (res.header.code !== "000") {
      return Promise.reject((res.header.error));
    } else {
      return response.data;
    }

  },
  error => {

    if(error.message==="Request failed with status code 401"){
      // Message({
      //   message: "请先登录!",
      //   type: 'error',
      //   duration: 5 * 1000
      // });
    }else{
      // Message({
      //   message: error.message,
      //   type: 'error',
      //   duration: 5 * 1000
      // });
    }

    return Promise.reject(error)
  }
);

export default service
