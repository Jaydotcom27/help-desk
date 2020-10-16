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
  const [id, setId] = useState('')
  const [role, setRole] = useState('Admin')

  const userContextValue = useMemo(
    () => ({
      username,
      email,
      id,
      role,
      setUsername,
      setEmail,
      setId,
      setRole,
    }),
    [username, email, id, role, setUsername, setEmail, setId, setRole]
  )

  useEffect(() => {
    console.log('Emitting update', username, email, id)
  }, [username, email, id])

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  )
}
