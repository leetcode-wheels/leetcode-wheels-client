import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback } from 'react'
import clsx from 'classnames'
import { useRouter } from 'next/router'

export type NavbarProps = JSX.IntrinsicElements['nav'] & {
  variant?: 'hero' | 'primary'
}

type NavbarItem = {
  name: string
  href: string
  current?: boolean
}

const DisclosurePanel: React.FC<{ navigation: NavbarItem[] }> = ({
  navigation,
}) => (
  <Disclosure.Panel className="sm:hidden">
    <div className="space-y-1 px-2 pt-2 pb-3">
      {navigation.map((item) => (
        <Link href={item.href} key={item.name}>
          <Disclosure.Button
            className={clsx(
              item.current
                ? 'bg-zinc-900 text-white'
                : 'text-zinc-300 hover:bg-gray-700 hover:text-white font-semibold',
              'block px-3 py-2 rounded-md text-base font-medium'
            )}
            aria-current={item.current ? 'page' : undefined}
          >
            {item.name}
          </Disclosure.Button>
        </Link>
      ))}
    </div>
  </Disclosure.Panel>
)

const Navbar: React.FC<NavbarProps> = ({ variant = 'primary', className }) => {
  const router = useRouter()

  const isCurrentPath = useCallback(
    (path: string) => path == router.pathname,
    [router.pathname]
  )

  const navigation = [
    {
      name: 'Problems',
      href: '/problems',
      current: isCurrentPath('/problems'),
    },
    { name: 'Users', href: '/users', current: isCurrentPath('/users') },
    {
      name: 'Contests',
      href: '/contests',
      current: isCurrentPath('/contests'),
    },
  ] as NavbarItem[]

  return (
    <Disclosure
      as="nav"
      className={clsx(
        'relative z-50',
        variant === 'primary' ? 'bg-zinc-800' : 'bg-transparent',
        className
      )}
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-12 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Link href="/">
                  <a className="flex flex-shrink-0 items-center gap-2">
                    <Image
                      className="block h-8 w-auto lg:hidden"
                      src="https://leetcode.com/_next/static/images/logo-dark-c96c407d175e36c81e236fcfdd682a0b.png"
                      alt="Your Company"
                      width={22}
                      height={24}
                    />
                    <span className="text-white font-semibold">leetCode.w</span>
                  </a>
                </Link>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={clsx(
                            'transition-colors duration-200',
                            item.current
                              ? 'bg-zinc-900 text-white'
                              : 'text-zinc-300 hover:text-white hover:shadow-lg font-semibold',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>{' '}
              </div>
            </div>
            <DisclosurePanel navigation={navigation} />
          </div>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar
