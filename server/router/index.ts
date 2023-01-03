import * as trpcNext from '@trpc/server/adapters/next'

import { createRouter } from './utils'
import usersRouter from './users'
import questionsRouter from './questions'
import authRouter from './auth'

export const appRouter = createRouter()
  .merge('user.', usersRouter)
  .merge('question.', questionsRouter)
  .merge('auth.', authRouter)

// export type definition of API
export type AppRouter = typeof appRouter

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
})
