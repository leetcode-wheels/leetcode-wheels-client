import { BadgeVariants } from '@/components/badge/badge'
import { QuestionDifficulty } from '@/server/services/leetcode/methods/types'

export const fromQuestionDifficultyToBadgeVariant = (
  question: QuestionDifficulty
) => {
  return {
    Easy: 'success',
    Medium: 'warning',
    Hard: 'error',
  }[question] as BadgeVariants
}
