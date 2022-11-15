import { Button } from "@mui/material";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "../services/firebase";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(credentials.username, credentials.password);
  };

  const onChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input onChange={onChange} type="text" name="username" />
        <label htmlFor="password">password</label>
        <input onChange={onChange} type="password" name="password" />
        <Button type="submit" label="Submit" primary />,
      </form>
    </div>
  );
};

export default SignUp;
