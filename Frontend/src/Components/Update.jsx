import { useState, useEffect } from "react";
import styles from "../assets/Update.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api/axios";
function Update() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const item = state?.item;

  const [data, setData] = useState({
    _id:"",
    title: "",
    authors: "",
    category: "",
    keywords: "",
    publication_year: "",
    availability: "",
    pdf: null
  });
  useEffect(() => {
    if (!item) {
      navigate("/admin");
      return;
    }

    setData({
      _id:item._id || "",  
      title: item.title || "",
      authors: item.authors.join(",")|| "",
      category: item.category || "",
      keywords: item.keywords.join(",")|| "",
      publication_year: item.publication_year || "",
      availability: item.availability || "",
      pdf: null
    });
  }, [item, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "pdf") {
      setData(prev => ({ ...prev, pdf: files[0] }));
      return;
    }
    setData(prev => ({ ...prev, [name]: value }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  const authorsArray = data.authors.split(",").map(a => a.trim()).filter(Boolean);
  const keywordsArray = data.keywords.split(",").map(k => k.trim()).filter(Boolean);
  formData.append("title", data.title);
  formData.append("category", data.category);
  formData.append("publication_year", data.publication_year);
  formData.append("availability", data.availability);
  formData.append("authors", authorsArray.join(","));
  formData.append("keywords", keywordsArray.join(","));

  if (data.pdf) {
    formData.append("pdf", data.pdf);
  }

  try {
    await api.put(
      `/admin/update/${data._id}`,
      formData);
    toast.success("Data Updated");
      const formdata={
        type:"Update",
        name:item.title
      }
       api.post("/admin/log",formdata)
        .then(res=>toast.success(res.data))
        .catch(()=>toast.error("Action could not be added to Log History"));
      setTimeout(() => {
        navigate("/admin");
      }, 3500);
  } catch (err) {
    toast.error("Error"+err.message);
  }
};
  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" style={{ zIndex: 999999 }} />
      <form className={styles.formBox} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Title</label>
          <input
            type="text"
            name="title"
            className={styles.input}
            value={data.title}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Author(s)</label>
          <input
            type="text"
            name="authors"
            className={styles.input}
            value={data.authors}
            onChange={handleChange}
          />
          <span className={styles.hint}>
            Separate multiple authors with commas
          </span>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Category</label>
          <input
            type="text"
            name="category"
            className={styles.input}
            value={data.category}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Keywords</label>
          <input
            type="text"
            name="keywords"
            className={styles.input}
            value={data.keywords}
            onChange={handleChange}
          />
          <span className={styles.hint}>
            Comma-separated keywords
          </span>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Publication Year</label>
          <input
            type="number"
            name="publication_year"
            className={styles.input}
            value={data.publication_year}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Availability</label>
          <input
            type="number"
            name="availability"
            className={styles.input}
            value={data.availability}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>PDF File</label>
          <input
            type="file"
            name="pdf"
            className={styles.fileInput}
            onChange={handleChange}
          />
        </div>
        <div className={styles.butn}>
        <button type="submit" className={styles.button}>
          Submit
        </button>
        </div>
      </form>
    </div>
  );
}

export default Update;
