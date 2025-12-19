import { useState,useEffect } from "react";
import { signup } from "../api/authApi";
import styles from "../assets/Signup.module.css";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    const navigate = useNavigate();
    useEffect(()=>{
          if(localStorage.getItem("token")){
            navigate("/");
          }
        },[]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await signup(form);
        alert(data.token);
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
                <h2>Create Account 🚀</h2>
                <p>Join the smart library search platform</p>

                <input
                name="name"
                    placeholder="Name"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                name="email"
                    placeholder="Email"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <input
                name="password"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                {/* ROLE SELECT */}
                <select
                    className={styles.select}
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>

                <button>Sign Up →</button>

                <span>
                    Already have an account? <Link to="/login">Login</Link>
                </span>
            </form>
        </div>
    );
};

export default Signup;
