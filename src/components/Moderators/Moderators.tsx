// Libs -----------------------------------------------------------------------
import { LS_ADMIN_TOKEN } from '@/lib/client-constants'
import { Moderator } from '@prisma/client'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react'

// Interfaces ------------------------------------------------------------------

interface ModeratorsProviderProps {
  children: React.ReactNode
}

interface ModeratorProviderProps {
  children: React.ReactNode
  moderator: Moderator
}

// Contexts --------------------------------------------------------------------

const ModeratorsCtx = createContext<
  [Moderator[], Dispatch<SetStateAction<Moderator[]>>]
>([[], () => {}])

const ModeratorCtx = createContext<Moderator>({} as Moderator)

export function ModeratorsProvider({ children }: ModeratorsProviderProps) {
  const [moderators, setModerators] = useState<Moderator[]>([])

  return (
    <ModeratorsCtx.Provider value={[moderators, setModerators]}>
      {children}
    </ModeratorsCtx.Provider>
  )
}

export function ModeratorProvider({
  children,
  moderator,
}: ModeratorProviderProps) {
  return (
    <ModeratorCtx.Provider value={moderator}>{children}</ModeratorCtx.Provider>
  )
}

// Hooks -----------------------------------------------------------------------
export function useModerators() {
  // Contexts --------------------------------------------------------------------
  const ctx = useContext(ModeratorsCtx)
  if (!ctx)
    throw new Error('useModerators must be used within a ModeratorProvider')

  // States -----------------------------------------------------------------------
  const [loading, setLoading] = useState(false)
  const [moderators, setModerators] = ctx

  // Handlers ---------------------------------------------------------------------
  const fetchModerators = async () => {
    if (!localStorage.getItem(LS_ADMIN_TOKEN)) return
    setLoading(true)
    const res = await fetch('/api/moderators', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem(LS_ADMIN_TOKEN)}`,
      },
    })
    const moderators = await res.json()
    setModerators(moderators)
    setLoading(false)
  }

  const create = async (moderator: {
    name: string
    email: string
    lang: string
  }) => {
    setLoading(true)
    const res = await fetch('/api/moderators/create', {
      method: 'POST',
      body: JSON.stringify(moderator),
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem(LS_ADMIN_TOKEN)}`,
      },
    })
    if (!res.ok) {
      setLoading(false)
      return
    }

    const newModerator = await res.json()
    setModerators([newModerator, ...moderators])
    setLoading(false)
    return newModerator
  }

  const del = async (id: string) => {
    setLoading(true)
    const res = await fetch(`/api/moderators/${id}/delete`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem(LS_ADMIN_TOKEN)}`,
      },
    })
    if (!res.ok) {
      setLoading(false)
      return
    }
    setModerators(moderators.filter((moderator) => moderator.id !== id))
    setLoading(false)
  }

  // Effects ---------------------------------------------------------------------
  useEffect(() => {
    fetchModerators()
  }, [])

  // Return ---------------------------------------------------------------------

  return {
    // Getters -------------------------------------------------------------------
    moderators,
    loading,
    // Setters -------------------------------------------------------------------
    fetchModerators,
    create,
    del,
  }
}

export function useModerator() {
  const ctx = useContext(ModeratorCtx)
  if (!ctx) throw new Error('useModerator must be used within a ModeratorCtx')
  return ctx
}
