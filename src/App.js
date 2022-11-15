import { useEffect, useState } from "react";

import "./App.css";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { auth } from "./services/firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  return (
    <div className="App">
      {!user ? (
        <>
          SignUp: <SignUp />
          SignIn: <SignIn />
        </>
      ) : (
        <Home user={user} />
      )}
    </div>
  );
}

export default App;
