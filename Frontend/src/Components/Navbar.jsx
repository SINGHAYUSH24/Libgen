import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/auth";
import styles from "../assets/Navbar.module.css";

const Navbar = () => {
    const user = getUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>
                📘 <span>LibrarySearch</span>
            </div>

            <div className={styles.links}>
                <Link to="/">Home</Link>
                <Link to="/user">Search</Link>

                {/* 👑 ADMIN BUTTON */}
                {user?.role === "admin" && (
                    <button
                        className={styles.adminBtn}
                        onClick={() => navigate("/admin")}
                    >
                        Admin Dashboard
                    </button>
                )}

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
                            <span>{user.name}</span>
                            <small>{user.role}</small>
                        </div>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
