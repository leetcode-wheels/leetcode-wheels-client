import React from 'react'
import clsx from 'classnames/bind'

import Spinner from '../spinner'

export type ButtonProps = JSX.IntrinsicElements['button'] & {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  submit?: boolean
  isLoading?: boolean
}

const classes = clsx.bind({
  root: 'rounded-md font-semibold',
  animated: 'transition-shadow hover:shadow-xl active:opacity-90',
  primary: 'text-slate-300 bg-gray-800 border border-gray-600',
  secondary: 'text-slate-900 bg-gray-300',
  disabled: 'opacity-70',
  sm: 'py-1 px-2',
  md: 'py-2 px-4',
  lg: 'py-3 px-6',
  xl: 'py-4 px-8',
})

const Button: React.FC<ButtonProps> = ({
  variant,
  size = 'md',
  disabled,
  className,
  submit = false,
  isLoading,
  children,
  ...props
}) => {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      className={classes(
        'root',
        variant,
        !disabled && 'animated',
        size,
        disabled && 'disabled',
        className
      )}
      {...props}
    >
      <div className="w-auto flex items-center gap-2">
        {isLoading && <Spinner size="xs" />}
        {children}
      </div>
    </button>
  )
}

export default Button
