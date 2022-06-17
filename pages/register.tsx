import { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Header } from "../components/header";
import { auth } from "../firebase/clientApp";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validatePassword = () => {
    if (password !== "" && password === confirmPassword) return true;
    setErrorMessage("Password don't match");
    return false;
  };

  const register = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validatePassword()) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log(res.user);
        })
        .catch((err) => setErrorMessage(err.message));
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div>
      <Header />
      <h1>Register</h1>
      <form onSubmit={register}>
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
        <button>Register</button>
        <button type="button">Register with Google</button>
      </form>
    </div>
  );
}
