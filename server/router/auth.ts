import { z } from 'zod'
import { createRouter } from './utils'

const auth = createRouter().mutation('set-cookie', {
  input: z.object({
    cookie: z.string(),
  }),
  resolve: async ({ input, ctx }) => {
    // set header here
    console.log('hereeee')
    ctx.res.setHeader('set-cookie', input.cookie)
  },
})

export default auth
