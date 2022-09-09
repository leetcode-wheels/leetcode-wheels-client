import { z } from 'zod'
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

export default usersRouter
