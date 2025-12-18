import { useState } from "react";
import { login } from "../api/authApi";
import styles from "../assets/Login.module.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await login(form);

        if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/");
        } else {
            alert(data.message);
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.card} onSubmit={handleSubmit}>
                <h2>Welcome Back 👋</h2>
                <p>Login to explore library resources</p>

                <input
                    placeholder="Email"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <button>Login</button>
                <span>
                    Don’t have an account? <Link to="/signup">Signup</Link>
                </span>
            </form>
        </div>
    );
};

export default Login;
