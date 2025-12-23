import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../assets/resource.module.css";
import searchpng from "../assets/search.png";
import{useNavigate,useLocation} from "react-router-dom";
import api from "../api/axios";
function Search({view}) {
  const [resources, setResources] = useState([]);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("keywords");
  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = () => {
    api
      .get("/user/search", {
        params: { q: "", type }
      })
      .then(res => setResources(res.data))
      .catch(err => console.error(err));
  };
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    if (!value.trim()) {
      fetchAll();
      return;
    }
    api
      .get("/user/search", {
        params: { q: value, type }
      })
      .then(res => setResources(res.data))
      .catch(() => {});
  };

  return (
    <div className={styles.container}>
    <div className={styles.header}>
      <div className={styles.searchBox}>
        <img src={searchpng} className={styles.searchIcon} alt="search" />
        <input
          type="text"
          placeholder="Search books, journals, keywords..."
          value={query}
          onChange={handleSearch}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.filters}>
        {["keywords", "author", "category", "year"].map(opt => (
          <label key={opt} className={styles.radioLabel}>
            <input
              type="radio"
              value={opt}
              checked={type === opt}
              onChange={(e) => {
                setType(e.target.value);
                setQuery("");
                fetchAll();
              }}
            />
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </label>
        ))}
      </div>
      </div>
      <div className={styles.results}>
        {resources.length === 0 && query && (
          <p className={styles.noResult}>No results found</p>
        )}

        {resources.map(item => (
          <div key={item._id} className={styles.card}>
            <h3 className={styles.title} onClick={()=>view(item)}>{item.title}</h3>

            <p>
              <span className={styles.label}>Authors:</span>{" "}
              {item.authors.join(", ")}
            </p>

            <div className={styles.meta}>
              <span>
                <strong>Category:</strong> {item.category}
              </span>
              <span>
                <strong>Year:</strong> {item.publication_year}
              </span>
              <span>
                <strong>Available:</strong>{" "}
                {item.availability > 0 ? "Yes" : "No"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
