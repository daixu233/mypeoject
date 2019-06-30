import axios from 'axios'
import qs from 'qs'
import { getLocal } from './util'

axios.interceptors.request.use(config => {
  config.data = qs.stringify(config.data)
  const token = getLocal('token');
  if (token) {
    config.headers['token'] = token;
  }
  // Vue.$vux.loading.show({
  //   text: '加载中....'
  // })
  return config
}, err => {
  // Vue.$vux.loading.hide()
  return Promise.reject(err)
})

// http response 拦截
axios.interceptors.response.use(response => {
  // Vue.$vux.loading.hide()
//   store.commit('SET_LOADING',false)
//   if(response.data.status == 0 && response.data.code == 18) {
//     router.push('/please-wx')
//   } else if(response.data.status == 0 && response.data.code == 1006) {
//     router.push('/blacklist')
//     return ''
//   } else if (response.data.status == 0 && catchCode.indexOf(response.data.code)==-1) {
//     Vue.$vux.alert.show({title: '提示', content: response.data.message})
//     return response.data
//   } else {
//     return response.data
//   }
return response.data
}, error => {
  // Vue.$vux.loading.hide()
  return Promise.reject(error)
})

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.defaults.timeout = 60000

if(process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://wj.hainiudanbao.com/api'
} else if(process.env.NODE_ENV === 'testing') {
  axios.defaults.baseURL = 'http://wj.hainiudanbao.com/api'
} else {
  axios.defaults.baseURL = 'http://wj.hainiudanbao.com/api'
}

export default axios
