import { LinkProps as BaseLinkProps } from 'next/link'
import React from 'react'
import BaseLink from 'next/link'

export type LinkProps = BaseLinkProps &
  React.PropsWithChildren<{
    disabled?: boolean
  }>

const Link: React.FC<LinkProps> = ({ disabled, children, ...props }) =>
  disabled ? (
    <span {...props}>{children}</span>
  ) : (
    <BaseLink {...props}>{children}</BaseLink>
  )

export default Link
