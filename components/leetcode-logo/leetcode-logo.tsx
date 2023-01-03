import Image, { ImageProps } from 'next/image'
import clsx from 'classnames'

export type LeetCodeLogoProps = Omit<ImageProps, 'src'>

const LeetCodeLogo: React.FC<LeetCodeLogoProps> = ({ className, ...props }) => {
  return (
    <div
      className={clsx(
        'inline-flex items-center gap-2 cursor-pointer',
        className
      )}
    >
      <Image
        className="block h-8 w-auto lg:hidden"
        src="https://leetcode.com/_next/static/images/logo-dark-c96c407d175e36c81e236fcfdd682a0b.png"
        alt="LeetCode.w Logo"
        width={22}
        height={24}
        {...props}
      />
      <span className="text-white font-semibold">LeetCode.w</span>
    </div>
  )
}

export default LeetCodeLogo
