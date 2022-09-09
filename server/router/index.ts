import * as trpcNext from '@trpc/server/adapters/next'

import { createRouter } from './utils'
import usersRouter from './users'

export const appRouter = createRouter().merge('user.', usersRouter)

// export type definition of API
export type AppRouter = typeof appRouter

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
})
