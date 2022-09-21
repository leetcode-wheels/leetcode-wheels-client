import type { GetServerSideProps, NextPage } from 'next'
import clsx from 'classnames/bind'

import HomeLayout from '@/layouts/home'
import { trpc } from '@/config/trpc'
import Pagination from '@/components/pagination'
import { ProblemsetQuestion } from '@/server/services/leetcode/methods/types'
import Link from 'next/link'
import Badge from '@/components/badge/badge'
import { fromQuestionDifficultyToBadgeVariant } from '@/utils'
import LoadingState from '@/components/loading-state'

export type ProblemsTableProps = JSX.IntrinsicElements['div'] & {
  questions: ProblemsetQuestion[]
}

export type ProblemRowProps = {
  rowId: number
  question: ProblemsetQuestion
}

export type ProblemsPageProps = {
  page: number
}

const classes = clsx.bind({
  column:
    'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-300 sm:pl-6',
})

const ProblemRow: React.FC<ProblemRowProps> = ({ rowId, question }) => {
  return (
    <tr className={clsx(rowId % 2 == 0 ? 'bg-zinc-800' : 'bg-zinc-600')}>
      <td className={classes('column')}>
        <Link href={`problems/${question.titleSlug}`}>
          <a>
            {question.frontendQuestionId}. {question.title}
          </a>
        </Link>
      </td>
      <td className={classes('column')}>
        <Badge
          variant={fromQuestionDifficultyToBadgeVariant(question.difficulty)}
        >
          {question.difficulty}
        </Badge>
      </td>
      <td className={classes('column')}>{question.acRate.toFixed(2)}%</td>
    </tr>
  )
}

const ProblemsTable: React.FC<ProblemsTableProps> = ({
  className,
  questions,
  ...props
}) => {
  const columns = [
    { name: 'Title', key: 'title' },
    { name: 'Difficulty', key: 'difficulty' },
    { name: 'Acc. Rate', key: 'acRate' },
  ]

  return (
    <div
      className={clsx(
        'overflow-auto ring-1 ring-black ring-opacity-5 md:rounded-lg border border-gray-700',
        className
      )}
      {...props}
    >
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-zinc-800">
          <tr>
            {columns.map((col) => (
              <th
                key={col.name}
                scope="col"
                className="pl-4 pr-3 py-3.5 text-left text-sm font-semibold text-gray-300 sm:pl-6"
              >
                {col.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-zinc-800 bg-zinc-800">
          {questions.map((q, i) => (
            <ProblemRow rowId={i} key={q.titleSlug} question={q} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

const ProblemsPage: NextPage<ProblemsPageProps> = ({ page }) => {
  const {
    data: problemsetQuestionList,
    isLoading,
    isRefetching,
  } = trpc.useQuery(['question.all', { page }], {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  return (
    <HomeLayout title="Problems List" isLoading={isLoading}>
      <LoadingState show={isLoading || isRefetching} />
      {problemsetQuestionList && (
        <>
          <ProblemsTable
            className="mt-10"
            questions={problemsetQuestionList?.questions}
          />
          <Pagination
            className="mt-10 flex justify-center md:justify-end"
            page={page}
            pageSize={50}
            count={problemsetQuestionList.total}
            basePath="/problems"
          />
        </>
      )}
    </HomeLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      page: Number(ctx.query.page) || 1,
    },
  }
}

export default ProblemsPage
