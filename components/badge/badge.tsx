import clsx from 'classnames/bind'

export type BadgeVariants =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'disabled'

const classes = clsx.bind({
  root: 'px-2.5 py-0.5 rounded-3xl font-semibold inline-flex items-center',
  success: 'bg-green-200 text-green-800',
  error: 'bg-red-200 text-red-800',
  warning: 'bg-yellow-200 text-yellow-800',
  info: 'bg-blue-200 text-blue-800',
  disabled: 'bg-gray-200 text-gray-800',
})

export type BadgeProps = JSX.IntrinsicElements['div'] & {
  variant?: BadgeVariants
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'success',
  children,
  ...props
}) => {
  return (
    <div className={classes('root', variant)} {...props}>
      {children}
    </div>
  )
}

export default Badge
