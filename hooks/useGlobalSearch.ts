import {
  HomeIcon,
  ChartBarIcon,
  PuzzlePieceIcon,
  PresentationChartLineIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'

export type Command = {
  name: string
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element
  shortcut: string
  url: string
  disabled?: boolean
}

const commands: Command[] = [
  {
    name: 'Home',
    icon: HomeIcon,
    shortcut: 'Z',
    url: '/',
  },
  {
    name: 'Global ranking',
    icon: ChartBarIcon,
    shortcut: 'X',
    url: '/users',
  },
  {
    name: 'Versus',
    icon: PresentationChartLineIcon,
    shortcut: 'C',
    url: '/users/versus',
  },
  {
    name: 'Problems',
    icon: PuzzlePieceIcon,
    shortcut: 'V',
    url: '/problems',
  },
  {
    name: 'Support',
    icon: HeartIcon,
    shortcut: 'B',
    url: '/support',
  },
]

export type UseGlobalSearchData = {
  commands: Command[]
  filteredCommands: Command[]
  open: boolean
  query: string
  activeCommandIndex: number
  triggerOpen: () => void
  triggerClose: () => void
  type: (str: string) => void
}

const useGlobalSearch = (): UseGlobalSearchData => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const router = useRouter()

  const triggerOpen = useCallback(() => setOpen(true), [])
  const triggerClose = useCallback(() => setOpen(false), [])
  const toggleOpen = useCallback(() => setOpen((prev) => !prev), [])

  const type = (str: string) => setQuery(str)

  const filteredCommands = useMemo(() => {
    if (query === '') return commands

    return commands.filter((command) => {
      const normalizedQuery = query.toLocaleLowerCase().trim()
      const normalizedName = command.name.toLocaleLowerCase()
      const normalizedUrl = command.url
      const normalizedShortcut = command.shortcut.toLowerCase()

      return [normalizedName, normalizedUrl, normalizedShortcut].some((e) =>
        e.includes(normalizedQuery)
      )
    })
  }, [query])

  const activeCommandIndex = useMemo(() => {
    return filteredCommands.findIndex((e) => router.pathname === e.url)
  }, [filteredCommands, router.pathname])

  const handlePressShortcut = useCallback(
    (e: KeyboardEvent) => {
      if (!e.metaKey && !e.ctrlKey) {
        return
      }

      filteredCommands.forEach((cmd) => {
        if (
          !cmd.disabled &&
          e.key.toUpperCase() === cmd.shortcut.toUpperCase()
        ) {
          router.push(cmd.url)
        }
      })
    },
    [filteredCommands, router]
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        toggleOpen()
      } else {
        handlePressShortcut(e)
      }
    },
    [toggleOpen, handlePressShortcut]
  )

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  return {
    commands,
    filteredCommands,
    open,
    query,
    activeCommandIndex,
    triggerOpen,
    triggerClose,
    type,
  }
}

export default useGlobalSearch
