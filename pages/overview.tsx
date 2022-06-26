import AddContact from '../components/add-contact'
import { useAuth } from '../context/auth-context'

export default function Overview() {
  const { user } = useAuth()

  return (
    <div>
      <h2>{user.displayName || user.email}</h2>
      <AddContact />
    </div>
  )
}
