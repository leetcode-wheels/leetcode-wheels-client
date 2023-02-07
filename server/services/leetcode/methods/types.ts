import z from 'zod'

import {
  globalRankingResponseValidator,
  rankingNodeValidator,
  userProfileObjectValidator,
  userProfileResponseValidator,
  contestRankingDataResponseValidator,
  contestDataValidator,
  topicTagValidator,
  questionValidator,
  questionDetailsValidator,
  questionDifficultyValidator,
  problemsetQuestionListValidator,
  problemseteQuestionValidator,
  pointsHistoryValidator,
} from './validators'

export type UserProfile = z.infer<typeof userProfileObjectValidator>

export type UserProfileResponse = z.infer<typeof userProfileResponseValidator>

export type GlobalRankingResponse = z.infer<
  typeof globalRankingResponseValidator
>

export type RankingNode = z.infer<typeof rankingNodeValidator>

export type ContestRankingDataResponse = z.infer<
  typeof contestRankingDataResponseValidator
>

export type ContestData = z.infer<typeof contestDataValidator>

export type TopicTag = z.infer<typeof topicTagValidator>

export type Question = z.infer<typeof questionValidator>

export type QuestionDifficulty = z.infer<typeof questionDifficultyValidator>

export type QuestionDetails = z.infer<typeof questionDetailsValidator>

export type ProblemsetQuestion = z.infer<typeof problemseteQuestionValidator>

export type ProblemsetQuestionList = z.infer<
  typeof problemsetQuestionListValidator
>

export type PointsHistory = z.infer<typeof pointsHistoryValidator>
