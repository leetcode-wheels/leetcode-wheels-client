import clsx from 'classnames'

import PaginationItem from './pagination-item'
import usePagination from '../../hooks/usePagination'
import Link from 'next/link'
import { useMemo } from 'react'

export type PaginationProps = JSX.IntrinsicElements['div'] & {
  pageSize: number
  page: number
  count: number
  basePath: string
}

const Pagination: React.FC<PaginationProps> = ({
  pageSize,
  page,
  count,
  className,
  basePath,
  ...props
}) => {
  const { totalPages } = usePagination({ page, pageSize, count })

  const pagesToRender = useMemo(() => {
    const ret = []
    for (
      let i = Math.max(1, page - 2), n = Math.min(page + 2, totalPages);
      i <= n;
      i++
    ) {
      ret.push(i)
    }
    return ret
  }, [page, totalPages])

  return (
    <div
      className={clsx('flex items-center gap-2 md:gap-4', className)}
      {...props}
    >
      {page > 3 && (
        <>
          <Link href={{ pathname: basePath, query: { page: 1 } }} passHref>
            <PaginationItem>1</PaginationItem>
          </Link>
          <span className="mb-2">...</span>
        </>
      )}
      {pagesToRender.map((pageToRender) => (
        <Link
          key={`page-${pageToRender}`}
          href={{ pathname: basePath, query: { page: pageToRender } }}
          passHref
        >
          <PaginationItem current={page === pageToRender}>
            {pageToRender}
          </PaginationItem>
        </Link>
      ))}

      {2 < totalPages - page && (
        <>
          <span className="mb-2">...</span>
          <Link
            href={{ pathname: basePath, query: { page: totalPages } }}
            passHref
          >
            <PaginationItem>{totalPages}</PaginationItem>
          </Link>
        </>
      )}
    </div>
  )
}

export default Pagination
