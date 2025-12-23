import api from "./axios";
const API_URL = "/auth";
export const signup = async (formData) => {
    const res=await api.post(`${API_URL}/signup`);
    return res.json();
};
export const login = async (formData) => {
  try{
    const res=await api.post(`${API_URL}/login`,formData);
    return res.data;
  }catch(err){
    alert(err.message);
  }
};
export const setAuth = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
};

export const getToken = () => localStorage.getItem("token");

export const logout = () => {
  localStorage.clear();
};
