import axios from '@/server/services/leetcode/config/axios.config'
import GET_CONTEST_RANKING_DATA from '../queries/get-contest-ranking-data'
import { ContestRankingDataResponse } from './types'

const getContestRankingData = (username: string) =>
  axios
    .post('/graphql', {
      query: GET_CONTEST_RANKING_DATA,
      variables: { username },
    })
    .then((e) => e.data as ContestRankingDataResponse)

export default getContestRankingData
