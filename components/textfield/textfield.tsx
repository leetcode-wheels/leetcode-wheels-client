import classnames from 'classnames/bind'

export type TextFieldProps = JSX.IntrinsicElements['input'] & {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const classes = classnames.bind({
  root: 'block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-600 shadow-sm border-none focus:outline-none sm:text-sm',
  primary: 'text-slate-300 bg-gray-800 border border-gray-600',
  secondary: 'text-slate-900 bg-gray-300',
  disabled: 'opacity-70',
  sm: 'py-1 px-2',
  md: 'py-2 px-3',
  lg: 'py-3 px-4',
  xl: 'py-4 px-5',
})

const TextField: React.FC<TextFieldProps> = ({
  className,
  size = 'md',
  variant = 'primary',
  ...props
}) => {
  return (
    <input className={classes('root', variant, size, className)} {...props} />
  )
}

export default TextField
