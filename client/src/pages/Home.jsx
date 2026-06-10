import { useAuth } from "../context/AuthContext";

function Home() {
  const { token } = useAuth();

  return (
    <div>
      <h1>Home Page</h1>

      <p>Token: {token || "No Token"}</p>
    </div>
  );
}

export default Home;