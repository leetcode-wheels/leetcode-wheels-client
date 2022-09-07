import useQuery from '../config/use-query.config'
import { getGlobalRanking } from '../services/leetcode/methods'
import { GET_GLOBAL_RANKING } from './querykeys'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useGetGlobalRanking = (page = 1, options?: any) =>
  useQuery([GET_GLOBAL_RANKING], () => getGlobalRanking(page), options)

export default useGetGlobalRanking
