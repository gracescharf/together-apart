// from https://github.com/sairajchouhan/nextjs-firebase-auth

import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { auth, db } from '../firebase/clientApp'
import { addDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore'

const AuthContext = createContext<any>({})
interface IUseAuth {
  user: User
  logout: () => void
}
export interface IUser {
  displayName: string
  email: string
  photoUrl: string
  lastSeen: any
}

export const useAuth = (): IUseAuth => useContext(AuthContext)

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const addUserToDatabase = async (user: User | null) => {
    if (user) {
      setUser(user)
      addDoc
      try {
        await setDoc(doc(db, 'users', user.uid), {
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          lastSeen: serverTimestamp(),
        })

        // console.log('Document written with ID: ', docRef.id);
      } catch (e) {
        console.error('Error adding document: ', e)
      }
    } else setUser(null)

    setLoading(false)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) =>
      addUserToDatabase(user)
    )

    return () => unsubscribe()
  }, [])

  const logout = async () => {
    setUser(null)
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}
