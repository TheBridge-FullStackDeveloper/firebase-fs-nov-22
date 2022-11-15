import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithGoogle,
} from "../services/firebase";

const SignIn = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(credentials.username, credentials.password);
  };

  const onChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>SignIn With google</button>

      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input onChange={onChange} type="text" name="username" />
        <label htmlFor="password">password</label>
        <input onChange={onChange} type="password" name="password" />
        <input type="submit" />
      </form>
    </div>
  );
};

export default SignIn;
