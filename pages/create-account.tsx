import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleAuthProvider } from '../firebase/clientApp';
import { useRouter } from 'next/router';
import { ButtonSignInGoogle } from '../components/button-sign-in-google';

export default function CreateAccount() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const validatePassword = () => {
    if (password !== '' && password === confirmPassword) return true;
    setErrorMessage("Password don't match");
    return false;
  };

  const createAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validatePassword()) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          router.push('/overview');
        })
        .catch((err) => setErrorMessage(err.message));
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div>
      <h2>Create Account</h2>
      <form onSubmit={createAccount}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            id="password"
            name="password"
            required
          />
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="text"
            id="confirm-password"
            name="confirm-password"
            required
          />
        </div>
        <p>{errorMessage}</p>
        <button>Create an account</button>
        <ButtonSignInGoogle />
      </form>
    </div>
  );
}
