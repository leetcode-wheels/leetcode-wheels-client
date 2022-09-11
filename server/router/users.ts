import { z } from 'zod'
import getContestRankingData from '../services/leetcode/methods/get-contest-ranking-data'
import getGlobalRanking from '../services/leetcode/methods/get-global-ranking'
import getUserProfile from '../services/leetcode/methods/get-user-profile'
import { createRouter } from './utils'

const usersRouter = createRouter()
  .query('global-ranking', {
    input: z.object({
      page: z.number().nullish(),
    }),
    resolve({ input }) {
      return getGlobalRanking(input.page ?? 1)
    },
  })
  .query('profile', {
    input: z.object({
      username: z.string(),
    }),
    resolve({ input }) {
      return getUserProfile(input.username)
    },
  })
  .query('contest-ranking-data', {
    input: z.object({
      username: z.string(),
    }),
    resolve({ input }) {
      return getContestRankingData(input.username)
    },
  })

export default usersRouter
