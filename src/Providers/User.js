import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const UserContext = createContext({
  username: '',
  email: '',
})

export function useUser() {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error(
      'UserContext can only be used inside an UserContextProvider.'
    )
  }

  return context
}

export default function UserContextProvider({ children }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  const userContextValue = useMemo(
    () => ({ username, email, setUsername, setEmail }),
    [username, email]
  )

  useEffect(() => {
    console.log('Emitting update', username, email)
  }, [username, email])

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  )
}
