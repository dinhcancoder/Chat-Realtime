import { createContext, useState } from 'react'
import { User } from '~/types/user.type'
import { getAccessTokenFromLocalStorage, getListUserOnlineLocalStorage, getProfileFromLocalStorage } from '~/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  listUserOnline: User[]
  setListUserOnline: React.Dispatch<React.SetStateAction<User[]>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: !!getAccessTokenFromLocalStorage(),
  setIsAuthenticated: () => null,
  profile: getProfileFromLocalStorage(),
  setProfile: () => null,
  listUserOnline: getListUserOnlineLocalStorage(),
  setListUserOnline: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const [listUserOnline, setListUserOnline] = useState<User[]>([])

  const valueAppContext = {
    isAuthenticated,
    setIsAuthenticated,
    profile,
    setProfile,
    listUserOnline,
    setListUserOnline
  }

  return <AppContext.Provider value={valueAppContext}>{children}</AppContext.Provider>
}
