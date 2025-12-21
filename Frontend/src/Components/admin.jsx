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
import AdminChat from "./AdminChat";
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
          <span>Total Resources
            <svg width="75px" style={{margin:"auto"}} height="75px" viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#1f1e1e" stroke="#1f1e1e"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M627.2 256v204.8h-44.8v-160H269.3632c-25.216 0-45.3632 20.1472-45.3632 45.3632v235.776a90.8032 90.8032 0 0 1 45.9264-12.3392H473.6V614.4h-203.6736c-23.936 0-43.8528 18.688-45.7728 42.1632l-0.1536 3.7632v42.5472c0 25.216 20.736 45.9264 45.9264 45.9264H473.6V793.6h-204.2368A90.112 90.112 0 0 1 179.2 703.4368V346.1632A90.112 90.112 0 0 1 269.3632 256H627.2z m-153.6 403.1744v44.8l-204.8 0.0256v-44.8l204.8-0.0256zM716.8 300.8V460.8h-44.8v-160H716.8z" fill="#ED892D"></path><path d="M655.0016 502.2208a49.28 49.28 0 0 1 69.1456-3.1488l3.2512 3.1488 135.5008 142.8992c9.984 10.5472 9.984 27.648 0 38.1696a24.6272 24.6272 0 0 1-33.792 2.2528l-2.4064-2.2528L691.2 540.416l-135.5008 142.8992a24.6784 24.6784 0 0 1-36.1984 0 28.1088 28.1088 0 0 1-2.1248-35.6352l2.1248-2.56 135.5008-142.8736z" fill="#BE4BDB"></path><path d="M793.6 588.8a25.6 25.6 0 0 1 25.4208 22.6048L819.2 614.4v128a51.2 51.2 0 0 1-47.36 51.072L768 793.6h-153.6a51.2 51.2 0 0 1-51.072-47.36L563.2 742.4v-128a25.6 25.6 0 0 1 51.0208-2.9952L614.4 614.4v128h153.6v-128a25.6 25.6 0 0 1 25.6-25.6z" fill="#BE4BDB"></path></g></svg>
          </span>
          <strong>{stats.totalResources}</strong>
        </div>

        <div
          className={`${styles.statCard} ${viewMode === "available" ? styles.active : ""}`}
          onClick={() => setViewMode("available")}
        >
          <span>Available
            <svg style={{margin:"auto"}} width="64px" height="64px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="m 8 0 c -0.257812 0 -0.511719 0.0976562 -0.707031 0.292969 l -1.707031 1.707031 h -2.585938 c -0.550781 0 -1 0.449219 -1 1 v 2.585938 l -1.707031 1.707031 c -0.3906252 0.390625 -0.3906252 1.023437 0 1.414062 l 1.707031 1.707031 v 2.585938 c 0 0.550781 0.449219 1 1 1 h 2.585938 l 1.707031 1.707031 c 0.390625 0.390625 1.023437 0.390625 1.414062 0 l 1.707031 -1.707031 h 2.585938 c 0.550781 0 1 -0.449219 1 -1 v -2.585938 l 1.707031 -1.707031 c 0.390625 -0.390625 0.390625 -1.023437 0 -1.414062 l -1.707031 -1.707031 v -2.585938 c 0 -0.550781 -0.449219 -1 -1 -1 h -2.585938 l -1.707031 -1.707031 c -0.195312 -0.1953128 -0.449219 -0.292969 -0.707031 -0.292969 z m 0 5 c 0.257812 0 0.511719 0.097656 0.707031 0.292969 l 2 2 c 0.183594 0.1875 0.289063 0.441406 0.285157 0.707031 h 0.007812 v 1 h -2 v 2 h -2 v -2 h -2 v -1 h 0.007812 c -0.003906 -0.265625 0.101563 -0.519531 0.285157 -0.707031 l 2 -2 c 0.195312 -0.195313 0.449219 -0.292969 0.707031 -0.292969 z m 0 0" fill="#2e3436"></path> </g></svg>
          </span>
          <strong>{stats.availableResources}</strong>
        </div>

        <div className={`${styles.statCard} ${viewMode === "users" ? styles.active : ""}`}
          onClick={() => setViewMode("users")}>
          <span>Total Users
            <svg style={{margin:"auto"}} height="64px" width="64px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style={{fill:"#25BBCC"}} d="M128,178.102l87.149,119.83h32.681C247.83,231.753,194.179,178.102,128,178.102z"></path> <path style={{fill:"#FF9269"}} d="M129.209,8.172v137.26c37.899,0,68.63-30.731,68.63-68.63 C197.839,38.892,167.108,8.172,129.209,8.172z"></path> <path style={{fill:"#78E3EC"}} d="M128,178.102c48.128,0,87.149,53.651,87.149,119.83H8.17C8.17,231.753,61.821,178.102,128,178.102z"></path> <path style={{fill:"#FFB082"}} d="M129.209,8.172c19.848,0,35.949,30.72,35.949,68.63c0,37.899-16.101,68.63-35.949,68.63 c-37.91,0-68.63-30.731-68.63-68.63C60.579,38.892,91.299,8.172,129.209,8.172z"></path> <path style={{fill:"#25BBCC"}} d="M384,178.102l87.149,119.83h32.681C503.83,231.753,450.179,178.102,384,178.102z"></path> <path style={{fill:"#FF9269"}} d="M385.209,8.172v137.26c37.899,0,68.63-30.731,68.63-68.63 C453.839,38.892,423.108,8.172,385.209,8.172z"></path> <path style={{fill:"#78E3EC"}} d="M384,178.102c48.128,0,87.149,53.651,87.149,119.83H264.17 C264.17,231.753,317.821,178.102,384,178.102z"></path> <path style={{fill:"#FFB082"}} d="M385.209,8.172c19.848,0,35.949,30.72,35.949,68.63c0,37.899-16.101,68.63-35.949,68.63 c-37.91,0-68.63-30.731-68.63-68.63C316.579,38.892,347.299,8.172,385.209,8.172z"></path> <path style={{fill:"#FF4719"}} d="M256,178.102l87.149,119.83h32.681C375.83,231.753,322.179,178.102,256,178.102z"></path> <path style={{fill:"#FFDB8A"}} d="M257.209,8.172v137.26c37.899,0,68.63-30.731,68.63-68.63 C325.839,38.892,295.108,8.172,257.209,8.172z"></path> <path style={{fill:"FF754F"}} d="M256,178.102c48.128,0,87.149,53.651,87.149,119.83H136.17 C136.17,231.753,189.821,178.102,256,178.102z"></path> <path style={{fill:"FFEAB5"}} d="M257.209,8.172c19.848,0,35.949,30.72,35.949,68.63c0,37.899-16.101,68.63-35.949,68.63 c-37.91,0-68.63-30.731-68.63-68.63C188.579,38.892,219.299,8.172,257.209,8.172z"></path> <g> <circle style={{fill:"78E3EC"}} cx="69.251" cy="487.489" r="16.34"></circle> <circle style={{fill:"78E3EC"}} cx="134.612" cy="487.489" r="16.34"></circle> <circle style={{fill:"78E3EC"}} cx="290.74" cy="487.489" r="16.34"></circle> </g> <path d="M257.204,153.6c42.348,0,76.8-34.452,76.8-76.8S299.552,0,257.204,0s-76.8,34.452-76.8,76.8S214.856,153.6,257.204,153.6z M257.204,16.34c33.338,0,60.46,27.122,60.46,60.46s-27.122,60.46-60.46,60.46s-60.46-27.122-60.46-60.46 S223.867,16.34,257.204,16.34z"></path> <path d="M257.203,104.758c9.331,0,17.74-5.684,20.923-14.144c1.589-4.223-0.547-8.935-4.77-10.524 c-4.221-1.588-8.934,0.546-10.523,4.769c-0.801,2.129-3.063,3.558-5.63,3.558c-2.565,0-4.829-1.43-5.63-3.559 c-1.589-4.222-6.303-6.358-10.525-4.768c-4.222,1.589-6.358,6.302-4.768,10.524C239.465,99.075,247.873,104.758,257.203,104.758z"></path> <path d="M385.203,104.758c9.331,0,17.74-5.684,20.923-14.144c1.589-4.223-0.547-8.935-4.77-10.524 c-4.222-1.588-8.935,0.546-10.523,4.769c-0.801,2.129-3.063,3.558-5.63,3.558c-2.565,0-4.829-1.43-5.63-3.559 c-1.59-4.222-6.302-6.358-10.525-4.768c-4.222,1.589-6.358,6.302-4.768,10.524C367.465,99.075,375.873,104.758,385.203,104.758z"></path> <path d="M384,169.932c-10.593,0-21.14,1.304-31.351,3.876c-4.376,1.102-7.029,5.543-5.926,9.919c1.102,4.376,5.542,7.03,9.918,5.927 c8.907-2.244,18.112-3.381,27.359-3.381c58.822,0,107.167,45.719,111.364,103.489h-86.854c-4.513,0-8.17,3.658-8.17,8.17 c0,4.512,3.657,8.17,8.17,8.17h95.319c4.513,0,8.17-3.658,8.17-8.17C512,227.352,454.58,169.932,384,169.932z"></path> <path d="M76.42,464.052v-65.855l33.785-63.563c0.627-1.181,0.955-2.497,0.955-3.835v-32.867c0-4.512-3.657-8.17-8.17-8.17H16.636 C20.833,231.992,69.177,186.272,128,186.272c9.248,0,18.453,1.137,27.359,3.381c4.377,1.1,8.816-1.551,9.918-5.927 s-1.551-8.816-5.926-9.919c-10.211-2.572-20.759-3.876-31.351-3.876c-70.58,0-128,57.42-128,128c0,4.512,3.657,8.17,8.17,8.17h86.65 v22.66l-33.785,63.564c-0.627,1.181-0.955,2.497-0.955,3.835v68.605c-8.985,3.638-15.341,12.45-15.341,22.724 c0,13.516,10.996,24.511,24.511,24.511s24.511-10.995,24.511-24.511C93.759,476.468,86.447,467.126,76.42,464.052z M69.249,495.66 c-4.506,0-8.17-3.665-8.17-8.17s3.665-8.17,8.17-8.17c4.506,0,8.17,3.665,8.17,8.17S73.754,495.66,69.249,495.66z"></path> <path d="M298.911,464.384v-68.225c0-1.338-0.329-2.654-0.955-3.835l-33.785-63.563v-22.661h111.66c4.513,0,8.17-3.658,8.17-8.17 c0-70.58-57.42-128-128-128s-128,57.42-128,128c0,4.512,3.657,8.17,8.17,8.17h25.01v22.661l-33.784,63.563 c-0.627,1.181-0.955,2.497-0.955,3.835v68.225c-9.509,3.373-16.34,12.454-16.34,23.105c0,13.516,10.996,24.511,24.511,24.511 s24.511-10.995,24.511-24.511c0-10.651-6.831-19.733-16.34-23.105v-66.187l33.784-63.563c0.627-1.181,0.955-2.497,0.955-3.835 v-24.697h70.31v24.697c0,1.338,0.329,2.654,0.955,3.835l33.785,63.563v66.187c-9.509,3.373-16.34,12.454-16.34,23.105 c0,13.516,10.996,24.511,24.511,24.511s24.511-10.995,24.511-24.511C315.251,476.839,308.42,467.757,298.911,464.384z M134.61,495.66c-4.506,0-8.17-3.665-8.17-8.17s3.665-8.17,8.17-8.17s8.17,3.665,8.17,8.17S139.116,495.66,134.61,495.66z M256,186.272c58.822,0,107.167,45.719,111.364,103.489H144.636C148.833,231.99,197.178,186.272,256,186.272z M290.741,495.66 c-4.506,0-8.17-3.665-8.17-8.17s3.665-8.17,8.17-8.17s8.17,3.665,8.17,8.17S295.245,495.66,290.741,495.66z"></path> <path d="M459.092,387.99h-135.67c-4.513,0-8.17,3.658-8.17,8.17c0,4.512,3.657,8.17,8.17,8.17h135.67c4.513,0,8.17-3.658,8.17-8.17 C467.262,391.648,463.604,387.99,459.092,387.99z"></path> <path d="M459.092,420.671h-135.67c-4.513,0-8.17,3.658-8.17,8.17c0,4.512,3.657,8.17,8.17,8.17h135.67c4.513,0,8.17-3.658,8.17-8.17 C467.262,424.329,463.604,420.671,459.092,420.671z"></path> <path d="M459.092,453.352h-67.836c-4.513,0-8.17,3.658-8.17,8.17c0,4.512,3.657,8.17,8.17,8.17h67.836c4.513,0,8.17-3.658,8.17-8.17 C467.262,457.01,463.604,453.352,459.092,453.352z"></path> <path d="M347.926,29.221c10.738-8.426,23.628-12.881,37.278-12.881c33.338,0,60.46,27.122,60.46,60.46s-27.122,60.46-60.46,60.46 c-13.649,0-26.539-4.453-37.278-12.881c-3.549-2.787-8.685-2.167-11.471,1.385c-2.785,3.549-2.166,8.685,1.385,11.471 c13.643,10.706,30.023,16.365,47.364,16.365c42.348,0,76.8-34.452,76.8-76.8S427.552,0,385.204,0 c-17.344,0-33.722,5.659-47.365,16.367c-3.55,2.785-4.169,7.921-1.385,11.471C339.24,31.388,344.378,32.007,347.926,29.221z"></path> <path d="M132.426,84.859c-0.801,2.129-3.064,3.559-5.63,3.559c-2.567,0-4.829-1.43-5.63-3.558 c-1.588-4.223-6.303-6.356-10.523-4.769c-4.223,1.588-6.36,6.301-4.77,10.524c3.183,8.46,11.592,14.144,20.923,14.144 c9.329,0,17.738-5.683,20.923-14.143c1.589-4.222-0.546-8.935-4.768-10.524C138.728,78.503,134.017,80.635,132.426,84.859z"></path> <path d="M126.797,153.6c17.342,0,33.72-5.659,47.364-16.365c3.55-2.785,4.169-7.922,1.385-11.471 c-2.788-3.551-7.923-4.169-11.471-1.385c-10.738,8.426-23.628,12.881-37.277,12.881c-33.338,0-60.46-27.122-60.46-60.46 s27.121-60.46,60.458-60.46c13.649,0,26.539,4.454,37.278,12.881c3.548,2.785,8.685,2.167,11.471-1.383 c2.786-3.55,2.166-8.685-1.385-11.471C160.519,5.659,144.139,0,126.797,0c-42.348,0-76.8,34.452-76.8,76.8 S84.448,153.6,126.797,153.6z"></path> </g></svg>
          </span>
          <strong>{stats.totalUsers}</strong>
        </div>

        <div className={styles.statCard}>
          <span>Downloads
            <svg style={{margin:"auto"}}  height="64px" width="64px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon style={{fill:"#CEE8FA"}} points="256,227.71 128.876,114.549 128.876,250.148 256,354.835 383.123,250.148 383.123,114.549 "></polygon> <g> <path style={{fill:"#2D527C"}} d="M389.246,100.905c-5.38-2.411-11.666-1.442-16.067,2.474l-40.652,36.186V14.956 C332.526,6.697,325.829,0,317.57,0H194.43c-8.259,0-14.956,6.697-14.956,14.956v124.609l-40.652-36.186 c-4.403-3.917-10.695-4.888-16.067-2.474c-5.375,2.411-8.833,7.755-8.833,13.646v135.597c0,4.469,1.998,8.703,5.449,11.546 l127.123,104.687c2.762,2.275,6.137,3.41,9.508,3.41c3.371,0,6.747-1.137,9.508-3.41L392.63,261.694 c3.45-2.842,5.449-7.076,5.449-11.546V114.551C398.079,108.658,394.621,103.316,389.246,100.905z M209.386,29.912h93.228v136.28 L256,207.687l-46.614-41.494V29.912z M368.167,243.088L256,335.461l-112.167-92.372v-95.2l102.222,90.995 c5.67,5.045,14.22,5.045,19.89,0l102.222-90.995v95.2H368.167z"></path> <path style={{fill:"#2D527C"}} d="M454.169,512H57.831c-8.259,0-14.956-6.697-14.956-14.956V347.482 c0-8.259,6.697-14.956,14.956-14.956h71.045c8.259,0,14.956,6.697,14.956,14.956s-6.697,14.956-14.956,14.956H72.787v119.649 h366.426V362.438h-56.089c-8.259,0-14.956-6.697-14.956-14.956s6.697-14.956,14.956-14.956h71.045 c8.259,0,14.956,6.697,14.956,14.956v149.562C469.125,505.303,462.428,512,454.169,512z"></path> <path style={{fill:"#2D527C"}} d="M383.124,429.741H128.876c-8.259,0-14.956-6.697-14.956-14.956s6.697-14.956,14.956-14.956h254.249 c8.259,0,14.956,6.697,14.956,14.956S391.385,429.741,383.124,429.741z"></path> </g> </g></svg>
          </span>
          <strong>120</strong>
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
          <span className={type === "contact" ? styles.navItemActive : styles.navItem} onClick={() => setType("contact")}>Chat</span>
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
      ):type==="log"?(<Log />):type==="resource"?(<Resource view={view} />):type==="contact"?(<AdminChat/>):null
    }
    </div>
    </div>
  );
}

export default Admin;
