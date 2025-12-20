import { useState,useEffect } from "react";
import { signup } from "../api/authApi";
import styles from "../assets/Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import sign from "../assets/signup.png"
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
        if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/");
        } else {
            alert(data.message);
        }
    };

    return (
        <div className={`${styles["gradient-bg"]} min-h-screen flex items-center justify-center p-4 relative`}>
        <div className={styles.container}>
            <form className={styles.card} onSubmit={handleSubmit}>
                <img src={sign} style={{ width: "100px",margin:"auto"}}></img>
                <h1 className="mt-6 text-3xl font-bold text-indigo-400 p-3">
                Signup
              </h1>
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
                <div className="mt-8 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  Login
                </Link>
              </p>
            </div>
            </form>
        </div>
        </div>
    );
};

export default Signup;
