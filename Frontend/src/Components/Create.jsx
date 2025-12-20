import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../assets/Create.module.css";
import back from "../assets/backbutton.png"
function Create(){
    const [data,setData]=useState({
        title:"",
        authors:"",
        category:"",
        keywords:"",
        publication_year:"",
        availability:"",
        pdf:null
    });
    const navigate=useNavigate();
    const handleChange=(e)=>{
        const {name,value,files}=e.target;
        if(name=="pdf"){
            setData(prev=>({...prev,pdf:files[0]}));
            return;
        }
        setData(prev=>({...prev,[name]:value}));
        return;
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!data.pdf){
            alert("Must Upload Resource PDF!");
            return;
        }
        const authorsArray = data.authors.split(",").map(a => a.trim()).filter(Boolean);
        const keywordsArray = data.keywords.split(",").map(k => k.trim()).filter(Boolean);
        const formData=new FormData();
        formData.append("title",data.title);
        formData.append("authors",authorsArray.join(","));
        formData.append("category",data.category);
        formData.append("keywords",keywordsArray.join(","));
        formData.append("publication_year",data.publication_year);
        formData.append("availability",data.availability);
        formData.append("pdf",data.pdf);
        try{
            await axios.post("http://localhost:2000/admin/upload",
                formData);
            toast.success("Data Updated");
            const formdata={
              type:"Create",
              name:data.title
            }
            axios.post("http://localhost:2000/admin/log",formdata)
            .then(res=>toast.success(res.data))
            .catch(()=>toast.error("Action could not be added to Log History"));
            setTimeout(() => {
              navigate("/admin");
            }, 3500);
        }catch(err){
            toast.error("Error: "+err.message);
            return;
        }
    }
    return(
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" style={{ zIndex: 999999 }} />
  <div className={styles.header}>
    <div>
    <button onClick={()=>{
      navigate("/admin");
    }}><img src={back} style={{width:"30px"}}></img></button>
    </div>
    <div className="flex-1">Resource Upload</div>
  </div>
  <form className={styles.erpForm} onSubmit={handleSubmit}>
    <div className={styles.row}>
      <label>Title :</label>
      <input name="title" value={data.title} onChange={handleChange} />
      
      <label>Category :</label>
      <input name="category" value={data.category} onChange={handleChange} />
    </div>

    <div className={styles.row}>
      <label>Authors :</label>
      <input name="authors" value={data.authors} onChange={handleChange} />

      <label>Publication Year :</label>
      <input name="publication_year" value={data.publication_year} onChange={handleChange} />
    </div>

    <div className={styles.row}>
      <label>Keywords :</label>
      <input name="keywords" value={data.keywords} onChange={handleChange} />

      <label>Availability :</label>
      <input name="availability" value={data.availability} onChange={handleChange} />
    </div>

    <div className={styles.row}>
      <label>PDF File :</label>
      <input type="file" name="pdf" onChange={handleChange} />
    </div>

    <div className={styles.actionRow}>
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </div>
  </form>
</div>
    );
}     
export default Create;