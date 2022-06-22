import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ButtonSignInGoogle } from '../components/button-sign-in-google';
import { auth } from '../firebase/clientApp';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const signIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {})
      .catch((err) => setErrorMessage(err.message));
    setEmail('');
    setPassword('');
  };

  const triggerPasswordResetEmail = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        router.push('/overview');
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={signIn}>
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
        <p>{errorMessage}</p>
        <button>Sign in</button>
        <button onClick={triggerPasswordResetEmail}>Forgot password?</button>
        <ButtonSignInGoogle />
      </form>
    </div>
  );
}
