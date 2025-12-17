import styles from "../assets/Home.module.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <h1>Welcome {user?.name}</h1>
      <p>Library Search Platform</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;

