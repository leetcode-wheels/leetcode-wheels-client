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
  selectedCommand: Command
  triggerOpen: () => void
  triggerClose: () => void
  handleSelectCommand: (newCommand: Command) => void
  type: (str: string) => void
}

const useGlobalSearch = (): UseGlobalSearchData => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedCommand, setSelectedCommand] = useState(commands[0])
  const router = useRouter()

  const triggerOpen = useCallback(() => setOpen(true), [])
  const triggerClose = useCallback(() => setOpen(false), [])
  const toggleOpen = useCallback(() => setOpen((prev) => !prev), [])

  const type = (str: string) => setQuery(str)

  const filteredCommands = useMemo(() => {
    return commands.filter((command) => {
      const normalizedQuery = query.toLowerCase().trim()
      const normalizedName = command.name.toLowerCase()
      const normalizedUrl = command.url
      const normalizedShortcut = command.shortcut.toLowerCase()

      return [normalizedName, normalizedUrl, normalizedShortcut].some((e) =>
        e.includes(normalizedQuery)
      )
    })
  }, [query])

  const activeCommandIndex = useMemo(() => {
    const index = filteredCommands.findIndex((e) => router.pathname === e.url)
    return index == -1 ? 0 : index
  }, [filteredCommands, router.pathname])

  const handleSelectCommand = useCallback(
    (newCommand: Command) => {
      setSelectedCommand(newCommand)
      triggerClose()
      router.push(newCommand.url)
    },
    [router, triggerClose]
  )

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
    selectedCommand,
    triggerOpen,
    triggerClose,
    handleSelectCommand,
    type,
  }
}

export default useGlobalSearch
