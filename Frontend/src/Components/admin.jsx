import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../assets/admin.module.css";

function Admin() {
  const [resource, setResource] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:2000/admin/view")
      .then((res) => {
        setResource(res.data || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        toast.error("Failed to load resources");
      });
  }, []);
  const handleDelete = (item) => {
    axios
      .delete(`http://localhost:2000/admin/${item._id}`)
      .then((res) => {
        toast.success(res.data.message || "Resource deleted");
        setResource((prev) =>
          prev.filter((list) => list._id !== item._id)
        );
      })
      .catch(() => {
        toast.error("Could not delete resource");
      });
  };

  const handleUpdate = (item) => {
    navigate("/update", { state: { item } });
  };
  const handleSubmit = () => {
    navigate("/upload");
  };
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <span className={styles.headerIcon}>📚</span>
            <h1 className={styles.headerTitle}>Resource Library</h1>
          </div>
        </div>

        <div className={styles.content}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={styles.skeleton}>
              <div className={styles.skeletonTitle}></div>
              <div className={styles.skeletonText}></div>
              <div className={styles.skeletonBadges}>
                <div className={styles.skeletonBadge}></div>
                <div className={styles.skeletonBadge}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />

      <div className={styles.header}>
        <div className={styles.headerContent}>
          <span className={styles.headerIcon}>📚</span>
          <h1 className={styles.headerTitle}>Resource Library</h1>
        </div>
      </div>

      <div className={styles.content}>
        {resource.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>📖</span>
            <h3 className={styles.emptyTitle}>No resources yet</h3>
            <p className={styles.emptyText}>
              Start by adding your first academic resource
            </p>
            <button
              className={styles.emptyButton}
              onClick={handleSubmit}
            >
              + Add Resource
            </button>
          </div>
        ) : (
          resource.map((item) => (
            <div className={styles.card} key={item._id}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>{item.title}</h2>
                <div className={styles.yearBadge}>
                  <span className={styles.yearIcon}>📅</span>
                  {item.publication_year}
                </div>
              </div>
              <div className={styles.authorsSection}>
                <div className={styles.authorsLabel}>
                  <span className={styles.authorsIcon}>👥</span>
                  Authors
                </div>
                <div className={styles.authorsList}>
                  {item.authors.map((name, i) => (
                    <span
                      className={styles.authorBadge}
                      key={i}
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.actions}>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(item)}
                >
                  🗑️ Delete
                </button>
                <button
                  className={styles.updateBtn}
                  onClick={() => handleUpdate(item)}
                >
                  ✏️ Update
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <button
        className={styles.fab}
        onClick={handleSubmit}
        title="Add Resource"
      >
        +
      </button>
    </div>
  );
}

export default Admin;
