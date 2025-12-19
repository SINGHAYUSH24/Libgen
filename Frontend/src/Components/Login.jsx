import { useState,useEffect } from "react";
import { login } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import styles from "../assets/Login.module.css";
const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    useEffect(()=>{
      if(localStorage.getItem("token")){
        navigate("/");
      }
    },[]);
    const navigate = useNavigate();
    const handleChange=(e)=>{
        setForm((prev)=>({...prev,[e.target.name]:e.target.value}
        ));
    }
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
    <div className={`${styles["gradient-bg"]} min-h-screen flex items-center justify-center p-4 relative`}>
      <div className={`w-full max-w-4xl ${styles["frosted-glass"]} rounded-xl shadow-2xl overflow-hidden`}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 md:p-12">
            <div className="mb-10 text-center">
              <div className="inline-block bg-indigo-600/20 p-4 rounded-2xl">
                <svg
                  className="w-12 h-12 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>
              </div>

              <h1 className="mt-6 text-3xl font-bold text-gray-100">
                Login Portal
              </h1>
              <p className="mt-2 text-gray-400">
                Secure access to Library system
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <Link
                    to="/faculty-login"
                    className="text-sm text-indigo-400 hover:text-indigo-300"
                  >
                    Admin
                  </Link>
                </div>

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900"
                />
              </div>

              <button
                type="submit"
                className="w-full border-2 z-50 relative py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                Access Portal
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-400">
                New member?{" "}
                <Link
                  to="/signup"
                  className="text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  SignUp
                </Link>
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hidden md:block bg-gradient-to-br from-indigo-900/50 to-gray-900 p-12">
            <div className="h-full flex flex-col justify-center items-center text-center">
              <div className="max-w-xs">
                <svg
                  className="w-full text-indigo-300"
                  viewBox="0 0 200 200"
                  fill="none"
                >
                  <path
                    d="M53.2 153.6C44.8 140.8 40 125.867 40 110C40 71.6 71.6 40 110 40C125.867 40 140.8 44.8 153.6 53.2"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="32"
                    fill="currentColor"
                    fillOpacity="0.2"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                </svg>

                <h2 className="mt-8 text-xl font-semibold text-indigo-100">
                  LIBGEN
                </h2>
                <p className="mt-2 text-indigo-200/80 text-sm">
                  Secured Repository for Library Resources
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 text-center w-full text-gray-500 text-sm">
        © {new Date().getFullYear()} Library Management System. Restricted access.
      </div>
    </div>
);
}
export default Login;
