import { ContestData } from '@/server/services/leetcode/methods/types'
import { format } from 'date-fns'
import { useCallback, useMemo } from 'react'
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  YAxis,
} from 'recharts'
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent'

export type ContestHistoryProps = {
  data?: ContestData[]
}

const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({
  payload,
  label,
}) => {
  if (!payload?.length || !label) return null

  const curPayload = payload[0].payload as ContestData
  const contestStartDate = new Date(curPayload.contest.startTime * 1000) // TODO: Get exact date from startTime value

  return (
    <div className="px-4 py-2 rounded-xl bg-gray-200 text-black">
      <span>{curPayload.contest.title}</span>
      <div className="mt-2 flex flex-col text-sm">
        <span className="text-gray-600">
          {format(contestStartDate, 'dd MMM yyyy')}
        </span>
        <span>Rating: {curPayload.rating}</span>
        <span>Ranking: {curPayload.ranking}</span>
      </div>
    </div>
  )
}

const ContestHistory: React.FC<ContestHistoryProps> = ({ data, ...props }) => {
  const filteredData = useMemo(() => {
    return data?.filter((e) => e.ranking > 0)
  }, [data])

  const { maxRating, minRating } = useMemo(() => {
    let minRating = Infinity,
      maxRating = -Infinity

    filteredData?.forEach((el) => {
      maxRating = Math.max(maxRating, el.rating)
      minRating = Math.min(minRating, el.rating)
    })

    return {
      maxRating: Math.ceil(maxRating / 500) * 500,
      minRating: Math.floor(minRating / 500) * 500,
    }
  }, [filteredData])

  const contestNametoContestLink = useCallback((contestName: string) => {
    const contestUri = contestName.replaceAll(' ', '-').toLowerCase()
    return `${process.env.NEXT_LEETCODE_BASE_URL}/contest/${contestUri}`
  }, [])

  return (
    <ResponsiveContainer
      className="border border-gray-300 rounded-lg bg-zinc-800"
      height={237}
      {...props}
    >
      <LineChart
        data={filteredData}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line
          activeDot={{
            onClick: (_, e: unknown) => {
              const contestData = (e as { payload: ContestData }).payload
              const contestLink = contestNametoContestLink(
                contestData.contest.title
              )
              window.open(contestLink, '_blank')
            },
          }}
          dot={false}
          dataKey="rating"
          stroke="#8884d8"
          animationDuration={250}
        />
        <YAxis
          type="number"
          domain={[minRating, maxRating]}
          tickMargin={2}
          tick={{ fontSize: 10 }}
        />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default ContestHistory
