import * as trpc from '@trpc/server'

import { Context } from '../contexts/context'

export const createRouter = () => trpc.router<Context>()
