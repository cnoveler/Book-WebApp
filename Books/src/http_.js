import axios from 'axios'

function request(url, method, data = null) {
  return new Promise((resolve, reject) => {
    axios({
      method,
      url,
      data: data,
    }).then(res => {
      resolve(res)
    }).then(err => {
      reject(err)
    })
  })
}

export default {
  //get请求
  async get(url) {
    return await request(url, "get")
  },
  //post请求
  post(url, data) {
    return request(url, "post", data)
  }
}
