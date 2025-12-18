import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../assets/admin.module.css";
import Log from "../Components/log";
import logout from "../assets/logout.png";
import Resource from "../Components/resource"
function Dashboard({
  viewMode,
  setViewMode,
  stats,
  displayedResources,
  handleDelete,
  handleUpdate,
  handleAdd
}) {
  return (
    <main className={styles.main}>
      <header className={styles.topbar}>
        <h1>Dashboard</h1>
        <div className={styles.topRight}>
          <img src={logout} style={{ width: "30px", cursor: "pointer" }} />
        </div>
      </header>

      <section className={styles.statsGrid}>
        <div
          className={`${styles.statCard} ${viewMode === "all" ? styles.active : ""}`}
          onClick={() => setViewMode("all")}
        >
          <span>Total Resources</span>
          <strong>{stats.totalResources}</strong>
        </div>

        <div
          className={`${styles.statCard} ${viewMode === "available" ? styles.active : ""}`}
          onClick={() => setViewMode("available")}
        >
          <span>Available</span>
          <strong>{stats.availableResources}</strong>
        </div>

        <div className={styles.statCard}>
          <span>Total Users</span>
          <strong>128</strong>
        </div>

        <div className={styles.statCard}>
          <span>Top Category</span>
          <strong>OS</strong>
        </div>
      </section>
      <div style={{textAlign:"center"}}><h2>RECENT ADDITIONS</h2></div>
      <section className={styles.content}>
        {displayedResources.length === 0 ? (
          <div className={styles.empty}>No resources found</div>
        ) : (
          displayedResources.map(item => (
            <div key={item._id} className={styles.resourceCard}>
              <div className={styles.cardTop}>
                <h3>{item.title}</h3>
                <span>{item.publication_year}</span>
              </div>

              <div className={styles.authors}>
                {item.authors.map((a, i) => (
                  <span key={i}>{a}</span>
                ))}
              </div>

              <div className={styles.actions}>
                <button type="button"
                  className={styles.delete}
                  onClick={() => handleDelete(item)}
                >
                  Delete
                </button>
                <button type="button"
                  className={styles.update}
                  onClick={() => handleUpdate(item)}
                >
                  Update
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      <button type="button" className={styles.fab} onClick={handleAdd}>+</button>
    </main>
  );
}
function Admin() {
  const [resources, setResources] = useState([]);
  const [stats, setStats] = useState({
    totalResources: 0,
    availableResources: 0
  });
  const [viewMode, setViewMode] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("dashboard");

  const navigate = useNavigate();

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

  const handleDelete = (item) => {
    const formdata={
      type:"Delete",
      name:item.title
    }
    axios.delete(`http://localhost:2000/admin/${item._id}`)
      .then(() => {
        toast.success("Resource deleted");
        setResources(prev => prev.filter(r => r._id !== item._id));
        axios.post("http://localhost:2000/admin/log",formdata)
        .then(res=>toast.success(res.data))
        .catch(()=>toast.error("Action could not be added to Log History"));
      })
      .catch(() => toast.error("Delete failed"));
  };

  const handleUpdate = (item) => {
    navigate("/update", { state: { item } });
  };

  const handleAdd = () => {
    navigate("/upload");
  };

  const displayedResources =
    viewMode === "available"
      ? resources.filter(r => r.availability > 0)
      : resources;

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.layout}>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" style={{ zIndex: 999999 }} />

      <aside className={styles.sidebar}>
        <div className={styles.profile}>
          <div className={styles.avatar}>JD</div>
          <span className={styles.name}>Admin</span>
        </div>

        <nav className={styles.nav}>
          <span className={type === "dashboard" ? styles.navItemActive : styles.navItem} onClick={() => setType("dashboard")}>Dashboard</span>
          <span className={type === "resource" ? styles.navItemActive : styles.navItem} onClick={() => setType("resource")}>Resources</span>
          <span className={type === "log" ? styles.navItemActive : styles.navItem} onClick={() => setType("log")}>History</span>
        </nav>
      </aside>

      {type === "dashboard" ? (
        <Dashboard
          viewMode={viewMode}
          setViewMode={setViewMode}
          stats={stats}
          displayedResources={displayedResources}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          handleAdd={handleAdd}
        />
      ):type==="log"?(<Log />):type==="resource"?(<Resource/>):null
    }
    </div>
  );
}

export default Admin;
