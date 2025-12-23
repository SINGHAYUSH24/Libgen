import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../assets/log.module.css";
import {useNavigate} from "react-router-dom";
import api from "../api/axios";
function Log() {
  const [data, setData] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    api
      .get("/admin/get")
      .then(res => setData(res.data))
      .catch(err => toast.error("Failed to load logs"));
  }, []);

  return (
    <div className={styles.container}>
      <ToastContainer position="top-center" autoClose={3000} theme="dark" />
      <header className={styles.header}>
        <div className={styles.head}>Activity Log</div>
      </header>

      <section className={styles.logList}>
        {data.length === 0 ? (
          <div className={styles.empty}>No logs available</div>
        ) : (
          <ul>
            {data.map(item => (
              <li key={item._id} className={styles.logItem}>
                <div className={styles.logType}>{item.type}d</div>

                <div className={styles.logContent}>
                  <span className={styles.logName}>{item.name}</span>
                  <span className={styles.logTime}>
                    {new Date(item.date).toLocaleString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Log;
