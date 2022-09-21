import axios from '@/server/services/leetcode/config/axios.config'
import GET_QUESTION_DETAILS from '../queries/get-question-details'
import { QuestionDetails } from './types'

const getQuestionDetails = async (titleSlug: string) =>
  axios
    .post('/graphql', {
      query: GET_QUESTION_DETAILS,
      variables: { titleSlug },
    })
    .then((e) => e.data.data as QuestionDetails)

export default getQuestionDetails
