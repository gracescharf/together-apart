import { collection, getDocs, query, where } from 'firebase/firestore'
import { useState } from 'react'
import { IUser } from '../context/auth-context'
import { db } from '../firebase/clientApp'

export default function AddContact() {
  const [searchEmail, setSearchEmail] = useState('')
  const [foundContacts, setFoundContacts] = useState<IUser[]>([])

  const searchForUsers = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const q = query(collection(db, 'users'), where('email', '==', searchEmail))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const findingContacts = [...foundContacts, doc.data() as IUser]
      setFoundContacts(findingContacts)
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data())
    })
  }

  return (
    <div>
      <form onSubmit={searchForUsers}>
        <p>Add contact</p>
        <input
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          type="email"
        />
        <button>Search</button>
      </form>

      <ul>
        {foundContacts.map((contact) => (
          <li key={contact.email}>
            <span>{contact.displayName}</span>
            <button>Add Contact</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
