import axios from '@/server/services/leetcode/config/axios.config'
import GET_GLOBAL_RANKING from '@/server/services/leetcode/queries/get-global-ranking'
import { GlobalRankingResponse } from './types'

const getGlobalRanking = async (page: number) =>
  axios
    .post('/graphql', {
      query: GET_GLOBAL_RANKING,
      variables: { page },
    })
    .then((e) => e.data?.data?.globalRanking as GlobalRankingResponse)

export default getGlobalRanking
