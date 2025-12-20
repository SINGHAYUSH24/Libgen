import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/auth";
import styles from "../assets/Navbar.module.css";
import logoutimage from "../assets/logout.png";
const Navbar = () => {
    const user = getUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className={styles.nav}>
            <div className={styles.profile}>
                  <div className={styles.avatar}>{user.name.split(" ").map(item=>(item[0])).join("")}</div>
                  <span className={styles.name}>{user.name}</span>
            </div>
            <div className={styles.links}>
                <Link to="/">Home</Link>
                <Link to="/user">Search</Link>
                <Link to="/resource">Resource</Link>
                {user.role==="admin"?<Link to="/admin">Dashboard</Link>:null}
                {!user ? (
                    <>
                        <Link to="/login" className={styles.login}>
                            Login
                        </Link>
                        <Link to="/signup" className={styles.signup}>
                            Sign Up
                        </Link>
                    </>
                ) : (
                    <>
                        <div className={styles.userBox}>
                            {user.role.toUpperCase()}
                        </div>
                        <img src={logoutimage} style={{ width: "30px", cursor: "pointer" }} onClick={()=>{
                                    logout();
                                    navigate("/login");
                        }}/>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
