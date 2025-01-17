import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = await axios.post(baseUrl,blog, config)
  return request.data
}

const pressLike = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = await axios.put(baseUrl+`/${blog.id}`, blog, config)
  return request.data
}

const pressDelete = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(baseUrl+`/${id}`, config)
}

export default { create, getAll, setToken, pressLike, pressDelete }