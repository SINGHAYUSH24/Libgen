import { useState, useEffect } from "react";
import axios from "axios";
import style from "../assets/dashboard.module.css";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const [resource, setResource] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:2000/admin/view")
      .then(res => setResource(res.data))
      .catch(err => console.log(err));
  }, []);
  const handleDelete=(item)=>{
    axios.delete(`http://localhost:2000/admin/${item._id}`)
    .then(res=>alert(res.data.message))
    .catch(err=>{
        alert("Could Not Delete Resource: "+err.message);
        return;
    });
    setResource(prev=>prev.filter((list)=>list._id!=item._id));
  }
  const handleUpdate=(item)=>{
    navigate("/update", {
      state: { item }
    });
  }
  const handleSubmit=()=>{
    navigate("/upload");
  }
  return (
    <div className={style.cont}>
      <div className={style.box}>
        {resource.map(item => (
          <div className={style.list} key={item._id}>
            <div className={style.title}>
              <span className={style.heading}>{item.title}</span>
              <span className={style.year}>{item.publication_year}</span>
            </div>
            <div className={style.auth}>
              Authors:
              <div className={style.authors}>
                {item.authors.map(name => (
                  <span className={style.name} key={name}>
                    {name}
                  </span>
                ))}
              </div>
            </div>
            <div className={style.box2}>
                <button className={style.butn1} onClick={()=>{handleDelete(item)}}>Delete</button>
                <button className={style.butn2}onClick={()=>{handleUpdate(item)}}>Update</button>
            </div>
          </div>
        ))}
      </div>
      <div className={style.submit}>
      <button type="button" className={style.butn3} onClick={handleSubmit}>+</button>
      </div>
    </div>
  );
}
export default Dashboard;
