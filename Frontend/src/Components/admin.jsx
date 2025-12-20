import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../assets/admin.module.css";
import Log from "../Components/log";
import logoutimage from "../assets/logout.png";
import Resource from "../Components/resource"
import {logout} from "../utils/auth";
import { getUser } from "../utils/auth";
import Navbar from "./Navbar";
function Dashboard({
  viewMode,
  setViewMode,
  stats,
  displayedResources,
  handleDelete,
  handleUpdate,
  handleAdd,
  view
}) {
  return (
    <main className={styles.main}>
      <header className={styles.topbar}>
        <h1>Dashboard</h1>
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

        <div className={`${styles.statCard} ${viewMode === "users" ? styles.active : ""}`}
          onClick={() => setViewMode("users")}>
          <span>Total Users</span>
          <strong>{stats.totalUsers}</strong>
        </div>

        <div className={styles.statCard}>
          <span>Top Category</span>
          <strong>OS</strong>
        </div>
      </section>
      <h1><strong>Resources</strong></h1><br></br>
      <section className={styles.content}>
      {viewMode==="users"?
      displayedResources.map(item => (
            <div key={item._id} className={styles.resourceCard}>
              <div className={styles.cardTop}>
                <h3><strong>{item.name}</strong></h3>
              </div>
              <div className={styles.role}>
                  <span><strong>{item.role.toUpperCase()}</strong></span>
              </div>
              <span><strong>Created on: </strong>{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
          )):null}
      {displayedResources.length === 0&&viewMode!=="users" ? (
          <div className={styles.empty}>No resources found</div>
        ) :viewMode!=="users"?(
          displayedResources.map(item => (
            <div key={item._id} className={styles.resourceCard}>
              <div className={styles.cardTop}>
                <h3 className={styles.hyper} onClick={()=>{view(item)}}><strong>{item.title}</strong></h3>
                <span>{item.publication_year}</span>
              </div>
              <div className={styles.authors}>
                {Array.isArray(item.authors) &&item.authors.map((a, i) => (
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
        ):null}
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
  const [count,setCount]=useState([]);
  const [viewMode, setViewMode] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [type, setType] = useState("dashboard");

  const navigate = useNavigate();
  const user=getUser();
  const fetchAdminData = async () => {
  try {
    const [resourcesRes, statsRes,userRes] = await Promise.all([
      axios.get("http://localhost:2000/admin/view"),
      axios.get("http://localhost:2000/admin/stats"),
      axios.get("http://localhost:2000/admin/users")
    ]);
    setResources(resourcesRes.data || []);
    setStats(statsRes.data);
    setCount(userRes.data);
  } catch {
    toast.error("Failed to load admin data");
  } finally {
    setIsLoading(false);
  }
};
  useEffect(() => {
    fetchAdminData();
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
        fetchAdminData();
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
  const view=(item)=>{
    navigate("/resource",{
      state:{item}
    })
  }
  const displayedResources =
    viewMode === "available"
      ? resources.filter(r => r.availability > 0)
      : viewMode==="all"?resources:count;

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.layout}>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" style={{ zIndex: 999999 }} />
      <Navbar/>
      <div className={styles.body}>
      <aside className={styles.sidebar}>
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
          navigate={navigate}
          count={count}
          setCount={setCount}
          view={view}
        />
      ):type==="log"?(<Log />):type==="resource"?(<Resource/>):null
    }
    </div>
    </div>
  );
}

export default Admin;
