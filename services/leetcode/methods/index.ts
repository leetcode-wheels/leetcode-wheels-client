import httpService from '../config/axios.config'
import { UserProfileResponse } from './types'

export const getUserProfile = (username: string) =>
  httpService
    .get(`/user/profile/${username}`)
    .then((e) => e.data as UserProfileResponse)

export const getQuestionOfTheDay = () =>
  httpService.get('/question/today').then((e) => e.data)
