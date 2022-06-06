import axios from 'axios'
import { Message } from 'element-ui'
import { isUrl } from "./index"

// create an axios instance
const service = axios.create({
  // baseURL: sessionStorage.getItem("report-baseUrl"),
  timeout: 120000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  const baseUrl = sessionStorage.getItem("report-baseUrl");
  if (!isUrl(config.url) && baseUrl) config.baseURL = baseUrl;
  const authKey = sessionStorage.getItem("report-key");
  const authValue = sessionStorage.getItem("report-value");
  if (authKey && authValue) config.headers[authKey] = authValue
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
    if (response.status !== 200) {
      Message({ message: res.msg || 'Error', type: 'error', duration: 5 * 1000 })
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    return res
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
