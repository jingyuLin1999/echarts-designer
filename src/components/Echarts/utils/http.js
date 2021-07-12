import axios from 'axios'
import { MessageBox, Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  // headers: {
  //   'Content-Type': 'application/json;charset=UTF-8' // application/x-www-form-urlencoded
  // },
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    const authKey = sessionStorage.getItem("auth-key");
    const authValue = sessionStorage.getItem("auth-value");
    if (authKey == "" || authValue == "") {
      Message({
        message: '无法请求数据，token未定义',
        type: 'error'
      })
      return Promise.reject('无法请求数据，token未定义')
    }
    config.headers[authKey] = authValue
    return config;
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status !== 20000) {
      Message({ message: res.msg || 'Error', type: 'error', duration: 5 * 1000 })
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    if (res.msg !== undefined && res.msg.length > 0)
      Message({ message: res.msg, type: 'success' })
    return res
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
