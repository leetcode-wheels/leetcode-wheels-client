import clsx from 'classnames/bind'

export type TextFieldVariants = 'sm' | 'md' | 'lg' | 'xl'

export type TextFieldProps = JSX.IntrinsicElements['input'] & {
  variant?: TextFieldVariants
}

const classes = clsx.bind({
  root: '',
  sm: 'py-1 px-2',
  md: 'py-2 px-4',
  lg: 'py-3 px-6',
  xl: 'py-4 px-8',
})

export const TextField: React.FC<TextFieldProps> = ({
  className,
  variant = 'md',
  ...props
}) => {
  return <input className={classes(variant, className)} {...props} />
}

export default TextField
