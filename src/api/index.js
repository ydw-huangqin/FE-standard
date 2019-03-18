import service from '../service'

const Api = {}
// const path = ''

const ApiSchema = {
  login: {
    url: '/user/userLogin',
    method: 'post',
    keys: ''
  },
  getInfomation: {
    url: '/getInfomation',
    method: 'post',
    keys: ['is_page', 'page', 'rows']
  }
}

// filter keys

const filterKey = (obj, keys) => {
  let ret = {}
  // eslint-disable-next-line no-return-assign
  if (!keys) return ret = obj || {}
  for (let key in obj) {
    if (keys.indexOf(key) > -1) {
      ret[key] = obj[key]
    }
  }
  return ret
}

function gernerater () {
  for (let key in ApiSchema) {
    if (!ApiSchema[key].type) {
      Api[key] = (params) => {
        return service({
          method: ApiSchema[key].method,
          url: ApiSchema[key].url,
          menuCode: ApiSchema[key].menuCode,
          title: ApiSchema[key].title,
          [ApiSchema[key].method === 'post' ? 'data' : 'params']: filterKey(params, ApiSchema[key].keys)
        })
      }
    } else if (ApiSchema[key].type === 'file') {
      Api[key] = (url) => {
        return service({
          method: 'get',
          url: url,
          baseURL: location.origin,
          headers: {
            accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
          },
          responseType: 'blob'
        })
      }
    } else {
      Api[key] = (data) => {
        return service({
          method: ApiSchema[key].method,
          url: ApiSchema[key].url,
          data: data
        })
      }
    }
  }
}
gernerater()

export default Api
