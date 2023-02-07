import { z } from 'zod'
import getProblemsetQuestionList from '../services/leetcode/methods/get-problemset-question-list'
import getQuestionDetails from '../services/leetcode/methods/get-question-details'
import { createRouter } from './utils'

const questionsRouter = createRouter()
  .query('details', {
    input: z.object({
      slug: z.string(),
    }),
    resolve({ input }) {
      return getQuestionDetails(input.slug)
    },
  })
  .query('all', {
    input: z.object({
      page: z.number(),
    }),
    resolve({ input, ctx }) {
      console.log('Real cookies', ctx.req.cookies)
      return getProblemsetQuestionList(50, 50 * (input.page - 1))
    },
  })

export default questionsRouter
