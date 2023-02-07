import * as trpcNext from '@trpc/server/adapters/next'

import axios from '@/server/services/leetcode/config/axios.config'
import { createContext } from '../contexts/context'
import { createRouter } from './utils'
import usersRouter from './users'
import questionsRouter from './questions'
import pointsRouter from './points'
import authRouter from './auth'

export const appRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    const authCookie = ctx.req.cookies.auth
    if (authCookie) {
      axios.defaults.headers.common['cookie'] = authCookie
    }
    return next()
  })
  .merge('user.', usersRouter)
  .merge('question.', questionsRouter)
  .merge('auth.', authRouter)
  .merge('points.', pointsRouter)

// export type definition of API
export type AppRouter = typeof appRouter

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
})
