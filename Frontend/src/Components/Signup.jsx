import { useState } from "react";
import { signup } from "../api/authApi";
import styles from "../assets/Signup.module.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await signup(form);

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
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Signup</h2>
                <input name="name" placeholder="Name" onChange={handleChange} />
                <input name="email" placeholder="Email" onChange={handleChange} />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <button>Signup</button>
            </form>
        </div>
    );
};

export default Signup;
