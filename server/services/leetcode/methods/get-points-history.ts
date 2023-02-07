import axios from '@/server/services/leetcode/config/axios.config'
import { PointsHistory } from './types'

const getPointsHistory = async () =>
  axios.get('/points/api').then((e) => e.data as PointsHistory)

export default getPointsHistory
