import axios from '@/server/services/leetcode/config/axios.config'
import GET_PROBLEMSET_QUESTION_LIST from '../queries/get-problemset-question-list'
import { ProblemsetQuestionList } from './types'

const getProblemsetQuestionList = (limit: number, skip: number) =>
  axios
    .post('/graphql', {
      query: GET_PROBLEMSET_QUESTION_LIST,
      variables: { limit, skip, categorySlug: '', filters: {} },
    })
    .then((e) => e.data.data.problemsetQuestionList as ProblemsetQuestionList)

export default getProblemsetQuestionList
