import getPointsHistory from '../services/leetcode/methods/get-points-history'
import { createRouter } from './utils'

const pointsRouter = createRouter().query('history', {
  resolve() {
    return getPointsHistory()
  },
})

export default pointsRouter
