import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../assets/admin.module.css";

function Admin() {
  const [resources, setResources] = useState([]);
  const [stats, setStats] = useState({
    totalResources: 0,
    availableResources: 0
  });
  const [viewMode, setViewMode] = useState("all"); // all | available
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    setIsLoading(true);

    Promise.all([
      axios.get("http://localhost:2000/admin/view"),
      axios.get("http://localhost:2000/admin/stats")
    ])
      .then(([resourcesRes, statsRes]) => {
        setResources(resourcesRes.data || []);
        setStats(statsRes.data);
      })
      .catch(() => toast.error("Failed to load admin data"))
      .finally(() => setIsLoading(false));
  }, []);

  /* ---------------- HANDLERS ---------------- */
  const handleDelete = (item) => {
    axios
      .delete(`http://localhost:2000/admin/${item._id}`)
      .then(() => {
        toast.success("Resource deleted");
        setResources((prev) =>
          prev.filter((r) => r._id !== item._id)
        );
      })
      .catch(() => toast.error("Delete failed"));
  };

  const handleUpdate = (item) => {
    navigate("/update", { state: { item } });
  };

  const handleAdd = () => {
    navigate("/upload");
  };

  /* ---------------- FILTERED DATA ---------------- */
  const displayedResources =
    viewMode === "available"
      ? resources.filter((r) => r.availability > 0)
      : resources;

  /* ---------------- LOADING ---------------- */
  if (isLoading) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      {/* ---------- HEADER ---------- */}
      <div className={styles.header}>
        <span className={styles.headerIcon}>📚</span>
        <h1 className={styles.headerTitle}>Admin Dashboard</h1>
      </div>

      {/* ---------- ANALYTICS CARDS ---------- */}
      <div className={styles.statsGrid}>
        <div
          className={`${styles.statCard} ${
            viewMode === "all" ? styles.statActive : ""
          }`}
          onClick={() => setViewMode("all")}
        >
          <h4>Total Resources</h4>
          <p>{stats.totalResources}</p>
        </div>

        <div
          className={`${styles.statCard} ${
            viewMode === "available" ? styles.statActive : ""
          }`}
          onClick={() => setViewMode("available")}
        >
          <h4>Available Resources</h4>
          <p>{stats.availableResources}</p>
        </div>

        {/* HARD-CODED FOR NOW */}
        <div className={styles.statCard}>
          <h4>Total Users</h4>
          <p>128</p>
        </div>

        <div className={styles.statCard}>
          <h4>Most Downloads</h4>
          <p>Operating Systems</p>
        </div>
      </div>

      {/* ---------- RESOURCE LIST ---------- */}
      <div className={styles.content}>
        {displayedResources.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No resources found</p>
          </div>
        ) : (
          displayedResources.map((item) => (
            <div key={item._id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>{item.title}</h2>
                <span className={styles.yearBadge}>
                  {item.publication_year}
                </span>
              </div>

              <div className={styles.authorsList}>
                <div className={styles.authorsLabel}>
                  <span className={styles.authorsIcon}>👥</span>
                  Authors:
                </div>
                {item.authors.map((a, i) => (
                  <span key={i} className={styles.authorBadge}>
                    {a}
                  </span>
                ))}
              </div>

              <div className={styles.actions}>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(item)}
                >
                  🗑 Delete
                </button>
                <button
                  className={styles.updateBtn}
                  onClick={() => handleUpdate(item)}
                >
                  ✏ Update
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ---------- FAB ---------- */}
      <button className={styles.fab} onClick={handleAdd}>
        +
      </button>
    </div>
  );
}

export default Admin;
