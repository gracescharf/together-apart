import Link from 'next/Link';
import { useAuth } from '../context/auth-context';

export const Header = ({}) => {
  const { user, logout } = useAuth();
  return (
    <div>
      <h1>Together Apart</h1>
      <ul>
        <li>
          <Link href={'/'}>Home</Link>
        </li>

        {user ? (
          <li>
            <button
              onClick={() => {
                logout();
              }}
            >
              Sign out
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link href={'/create-account'}>Create Account</Link>
            </li>
            <li>
              <Link href={'/sign-in'}>Sign In</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
