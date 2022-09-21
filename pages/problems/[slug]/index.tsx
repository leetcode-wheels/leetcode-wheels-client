import { trpc } from '@/config/trpc'
import HomeLayout from '@/layouts/home'
import { Question } from '@/server/services/leetcode/methods/types'
import { GetServerSideProps, NextPage } from 'next'
import clsx from 'classnames'
import Badge, { BadgeVariants } from '@/components/badge/badge'
import { fromQuestionDifficultyToBadgeVariant } from '@/utils'
import { useMemo } from 'react'

export type ProblemDetaisProps = {
  slug: string
}

export type ProblemDescriptionProps = JSX.IntrinsicElements['div'] & {
  question: Question
}

export type QuestionStatsProps = JSX.IntrinsicElements['div'] & {
  question: Question
}

const QuestionDescription: React.FC<ProblemDescriptionProps> = ({
  question,
  className,
  ...props
}) => {
  return (
    <section className={className} {...props}>
      <div dangerouslySetInnerHTML={{ __html: question.content }} />
    </section>
  )
}

const QuestionStats: React.FC<QuestionStatsProps> = ({
  question,
  className,
  ...props
}) => {
  const tagVariants = [
    'info',
    'warning',
    'error',
    'success',
    'disabled',
  ] as BadgeVariants[]

  const stats = useMemo(() => {
    if (question?.stats) {
      const stats = JSON.parse(question.stats)

      return {
        accepted: stats.totalAccepted,
        tried: stats.totalSubmission,
        acRate: stats.acRate,
      }
    }

    return null
  }, [question?.stats])

  return (
    <section className={clsx('w-full', className)} {...props}>
      <div className="flex flex-col gap-6 items-start py-4 px-2 border-zinc-400 border-t pt-8 md:pt-4 md:border-t-0 md:border-l md:pl-10">
        <Badge
          variant={fromQuestionDifficultyToBadgeVariant(question.difficulty)}
        >
          {question.difficulty}
        </Badge>

        <ul className="flex flex-wrap gap-3">
          {question.topicTags.map((tag, i) => (
            <li key={tag.slug}>
              <Badge variant={tagVariants[i % tagVariants.length]}>
                {tag.name}
              </Badge>
            </li>
          ))}
        </ul>

        <div className="w-full border-t border-zinc-400 pt-4 flex flex-col gap-4">
          <span className="font-bold text-lg md:text-xl">
            Accepted:{' '}
            <span className="ml-1 text-gray-300">{stats?.accepted || ''}</span>
          </span>
          <span className="font-bold text-lg md:text-xl">
            Tried:{' '}
            <span className="ml-1 text-gray-300">{stats?.tried || ''}</span>
          </span>
          <span className="font-bold text-lg md:text-xl">
            Acceptance Rate:{' '}
            <span className="ml-1 text-gray-300">{stats?.acRate || ''}</span>
          </span>
        </div>
      </div>
    </section>
  )
}

const ProblemDetais: NextPage<ProblemDetaisProps> = ({ slug }) => {
  const { data: questionDetails, isLoading } = trpc.useQuery(
    ['question.details', { slug }],
    { enabled: !!slug.length }
  )

  return (
    <HomeLayout isLoading={isLoading} loadingBlocksContent>
      <h3 className="font-medium text-2xl text-center md:text-3xl md:text-left lg:text-4xl">
        {questionDetails &&
          `${questionDetails.question.questionId}. ${questionDetails.question.questionTitle}`}
      </h3>
      {questionDetails && (
        <div className="flex flex-col gap-10 md:flex-row mt-10">
          <QuestionDescription
            className="w-full md:w-2/3"
            question={questionDetails?.question}
          />
          <QuestionStats
            className="w-full md:w-1/3"
            question={questionDetails.question}
          />
        </div>
      )}
    </HomeLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slug = ctx.params?.slug
  return {
    props: { slug: slug as string },
  }
}

export default ProblemDetais
