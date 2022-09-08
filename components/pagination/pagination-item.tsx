import { forwardRef } from 'react'
import clsx from 'classnames'

export type PaginationItemProps = JSX.IntrinsicElements['a'] & {
  current?: boolean
}

const PaginationItem = forwardRef<HTMLAnchorElement, PaginationItemProps>(
  ({ current, children, className, href, onClick, ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        onClick={onClick}
        className={clsx(
          'px-2 py-2 h-10 min-w-10 transition-shadow duration-200 shadow-md hover:shadow-lg rounded-lg flex items-center justify-center',
          current ? 'bg-blue-600' : 'bg-slate-50',
          className
        )}
        {...props}
      >
        <span
          className={clsx(
            'text-xs font-semibold',
            current ? 'text-white' : 'text-slate-800'
          )}
        >
          {children}
        </span>
      </a>
    )
  }
)

PaginationItem.displayName = 'PaginationItem'

export default PaginationItem
