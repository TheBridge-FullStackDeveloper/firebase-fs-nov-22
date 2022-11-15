import { auth } from "../services/firebase";

const Home = ({ user }) => {
  return (
    <div>
      {user.displayName || user.email}
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  );
};

export default Home;
