import { useMemo } from 'react'

export type UsePaginationProps = {
  page: number
  pageSize: number
  count: number
}

const usePagination = ({ page, count, pageSize }: UsePaginationProps) => {
  const totalPages = useMemo(
    () => Math.ceil(count / pageSize),
    [count, pageSize]
  )
  const isLastPage = useMemo(() => page === totalPages, [page, totalPages])

  return { totalPages, isLastPage }
}

export default usePagination
