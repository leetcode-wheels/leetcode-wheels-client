import httpService from '../config/axios.config'
import { GlobalRankingResponse, UserProfileResponse } from './types'

export const getUserProfile = (username: string) =>
  httpService
    .get(`/user/profile/${username}`)
    .then((e) => e.data as UserProfileResponse)

export const getQuestionOfTheDay = () =>
  httpService.get('/question/today').then((e) => e.data)

export const getGlobalRanking = () =>
  httpService
    .get('/user/global-ranking')
    .then((e) => e.data as GlobalRankingResponse)
