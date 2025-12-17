import { useState } from "react";
import { login } from "../api/authApi";
import styles from "../assets/Login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await login(form);

        if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate(data.user.role === "admin" ? "/admin" : "/");
        } else {
            alert(data.message);
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input name="email" placeholder="Email" onChange={handleChange} />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <button>Login</button>
            </form>
        </div>
    );
};

export default Login;
