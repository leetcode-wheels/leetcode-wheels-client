import React, { Fragment } from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import clsx from 'classnames/bind'
import { useRouter } from 'next/router'
import { Command, UseGlobalSearchData } from '@/hooks/useGlobalSearch'
import { CommandLineIcon } from '@heroicons/react/24/outline'

export type GlobalSearchProps = UseGlobalSearchData

const GlobalSearch: React.FC<GlobalSearchProps> = ({
  commands,
  filteredCommands,
  activeCommandIndex,
  open,
  query,
  triggerClose,
  type,
}) => {
  const router = useRouter()

  const handleRedirectTo = (url: string) => {
    router.push(url)
    triggerClose()
  }

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      appear
      afterLeave={() => type('')}
    >
      <Dialog as="div" className="relative z-50" onClose={triggerClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto px-4 sm:px-6 md:px-20 pt-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-2xl transform divide-y divide-gray-500 divide-opacity-10 overflow-hidden rounded-xl bg-gray-900 bg-opacity-80 shadow-2xl ring-1 ring-black ring-opacity-5 backdrop-blur backdrop-filter transition-all">
              <Combobox
                value={
                  activeCommandIndex === -1
                    ? commands[0]
                    : commands[activeCommandIndex]
                }
                onChange={(item: Command) => handleRedirectTo(item.url)}
              >
                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-500 text-opacity-40"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="outline-none h-12 w-full border-0 bg-transparent pl-11 pr-4 text-white placeholder-gray-500 focus:ring-0 text-sm md:text-xl font-medium"
                    placeholder="Search..."
                    value={query}
                    onChange={(event) => type(event.target.value)}
                  />
                </div>

                {filteredCommands.length > 0 && (
                  <Combobox.Options
                    static
                    className="max-h-80 scroll-py-2 divide-y divide-gray-500 divide-opacity-10 overflow-y-auto"
                  >
                    <li className="p-2">
                      <h2 className="sr-only">Quick actions</h2>
                      <ul className="text-sm text-gray-400">
                        {filteredCommands.map((command) => (
                          <Combobox.Option
                            key={command.shortcut}
                            value={command}
                            className={({ active }) =>
                              clsx(
                                'flex cursor-default select-none items-center rounded-md px-3 py-2',
                                active && 'bg-gray-800 text-white'
                              )
                            }
                            disabled={command.disabled}
                          >
                            {({ active }) => (
                              <>
                                <command.icon
                                  className={clsx(
                                    'h-6 w-6 flex-none text-opacity-40',
                                    active ? 'text-white' : 'text-gray-500'
                                  )}
                                  aria-hidden="true"
                                />
                                <span className="ml-3 flex-auto truncate">
                                  {command.name}
                                </span>
                                <span className="ml-3 flex-none text-xs font-semibold text-gray-500">
                                  <kbd className="font-sans">⌘</kbd>
                                  <kbd className="font-sans">
                                    {command.shortcut}
                                  </kbd>
                                </span>
                              </>
                            )}
                          </Combobox.Option>
                        ))}
                      </ul>
                    </li>
                  </Combobox.Options>
                )}

                {query !== '' && filteredCommands.length === 0 && (
                  <div className="py-14 px-6 text-center sm:px-14">
                    <CommandLineIcon
                      className="mx-auto h-10 w-10 text-gray-500 text-opacity-40"
                      aria-hidden="true"
                    />
                    <p className="mt-4 text-sm text-gray-200">
                      Commands not found related to {query}.
                    </p>
                  </div>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default GlobalSearch
