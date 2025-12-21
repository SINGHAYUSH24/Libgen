import { useState } from "react";
import styles from "../assets/Profile.module.css";
import { getUser } from "../utils/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";
const Profile = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const user = getUser();
  const navigate=useNavigate();
  const [data,setData]=useState(user);
  const handleChangePassword = async(e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try{
        const form={
            pass:newPassword
        }
        const res=await axios.put(`http://localhost:2000/user/change/${user.id}`,form);
        toast.success(res.data.message);
    }catch(error){
        toast.error(error.message);
    }
    console.log("Password changed successfully");
    setShowPasswordModal(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async() => {
    try{
        const formdata={
            name:data.name,
            email:data.email
        }
        const res=await axios.put(`http://localhost:2000/user/update/${user.id}`,formdata);
        toast.success(res.data.message);
        const updatedUser = {
            ...res.data.data,
            id: res.data.data._id,
        };
        localStorage.setItem("user",JSON.stringify(updatedUser));
        setData(res.data.data);
        setTimeout(()=>{
            navigate("/");
        },4000);
    }catch(error){
        toast.error(error.message);
    }
  };
  return (
    <div className={styles.profilePage}>
    <ToastContainer position="top-right" autoClose={3000} theme="colored" style={{ zIndex: 999999 }} />
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}>
              {user.name.split(" ").map(item => item[0]).join("")}
            </div>
          </div>
          <h1 className={styles.userName}>{data.name}</h1>
          <p className={styles.userRole}>{data.role}</p>
        </div>

        <div className={styles.profileBody}>
          <div className={styles.infoSection}>
            <h2 className={styles.sectionTitle}>Account Information</h2>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className={styles.infoContent}>
                <p className={styles.infoLabel}>Username</p>
                <input className={styles.infoValue} name="name" value={data.name} onChange={(e)=>{setData(prev=>({...prev,[e.target.name]:e.target.value}))}}/>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div className={styles.infoContent}>
                <p className={styles.infoLabel}>Email Address</p>
                <input className={styles.infoValue} name="email" value={data.email} onChange={(e)=>{setData(prev=>({...prev,[e.target.name]:e.target.value}))}}></input>
              </div>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.securitySection}>
            <h2 className={styles.sectionTitle}>Security</h2>

            <div className={styles.passwordItem}>
              <div className={styles.passwordLeft}>
                <div className={styles.infoIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div>
                  <p className={styles.infoLabel}>Password</p>
                  <p className={styles.passwordDots}>••••••••</p>
                </div>
              </div>

              <button
                type="button"
                className={styles.changePasswordBtn}
                onClick={() => setShowPasswordModal(true)}
              >
                Change
              </button>
            </div>
          </div>

          <div className={styles.divider} />

          <button className={styles.logoutBtn} onClick={handleSubmit}>
            Save Information
          </button>
        </div>
      </div>

      {showPasswordModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowPasswordModal(false)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Change Password</h2>

            <form onSubmit={handleChangePassword}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Current Password</label>
                <input
                  type="password"
                  className={styles.formInput}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>New Password</label>
                <input
                  type="password"
                  className={styles.formInput}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Confirm New Password</label>
                <input
                  type="password"
                  className={styles.formInput}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.Btn}
                  onClick={() => setShowPasswordModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.Btn}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
