import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.NEXT_LEETCODE_BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
})

export default instance
