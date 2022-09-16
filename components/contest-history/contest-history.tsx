import { ContestData } from '@/server/services/leetcode/methods/types'
import { format } from 'date-fns'
import { useMemo } from 'react'
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
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
    const lowIndex = data?.findIndex((e) => e.ranking > 0)
    if (!lowIndex) return []
    const indexToStart = Math.max(0, lowIndex - 5)
    return data?.filter((_, i) => i >= indexToStart)
  }, [data])
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
          dataKey="rating"
          stroke="#8884d8"
          animationDuration={250}
          dot={false}
        />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default ContestHistory
