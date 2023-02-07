import { z } from 'zod'

import { createRouter } from './utils'
import axios from '@/server/services/leetcode/config/axios.config'

const auth = createRouter()
  .mutation('set-cookie', {
    input: z.object({
      cookie: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      ctx.res.setHeader('set-cookie', input.cookie)
    },
  })
  .mutation('delete-cookie', {
    resolve: async ({ ctx }) => {
      delete axios.defaults.headers.common['set-cookie']
      ctx.res.removeHeader('set-cookie')
    },
  })

export default auth
