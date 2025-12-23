import React, { useState,useEffect } from 'react';
import SearchBar from '../Components/SearchBar';
import ActionButton from '../Components/ActionButton';
import PDFViewer from '../Components/PDFViewer';
import MetadataTab from '../Components/MetadataTab';
import Navbar from './Navbar';
import {useLocation } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from '../api/axios';
const Index = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const {state}=useLocation();
  const item=state?.item;
  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.bookmarks?.includes(item._id)) {
    setIsBookmarked(true);
  }
}, [item]);
  const handleDownload = async() => {
    try{
      const res=await api.get(`/admin/download/${item._id}`,
        {
          responseType:"blob"
        });
      const url=window.URL.createObjectURL(res.data);
      const a=document.createElement("a");
      a.href=url;
      a.download=`${item.title}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    }catch(error){
      toast.error(error.message);
    }
  };

  const handleBookmark = async() => {
    try{
    const token=localStorage.getItem("token");
    const res= await api.post(`/user/bookmark/${item._id}`,{},
      {headers:{
        Authorization:`Bearer ${token}`
      }}
    );
    const {bookmarked}=res.data;
    console.log(item?._id);
    console.log(token);
    setIsBookmarked(bookmarked);
    toast.success(isBookmarked?"Bookmark Removed":"Added to Bookmarks");
    }catch(error){
      toast.error(error.message);
    }
  };

  const DownloadIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );

  const BookmarkIcon = (
    <svg className="w-5 h-5" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
  );
 
  return (
    <div className="min-h-screen h-screen flex flex-col bg-background">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" style={{ zIndex: 999999 }} />
      <Navbar/>
      <header className="w-full px-4 py-4 bg-card border-b border-border shadow-sm">
        <div className="w-[80%] mx-auto flex gap-4">
          <SearchBar path={item?.pdf_path} />
          <div className="flex items-center gap-3">
            <ActionButton 
              icon={DownloadIcon} 
              label="Download" 
              onClick={handleDownload} 
            />
            <ActionButton 
              icon={BookmarkIcon} 
              label="Bookmark" 
              onClick={handleBookmark}
              active={isBookmarked}
            />
          </div>
        </div>
      </header>
      <div className="flex flex-1 w-full overflow-hidden">
        <main className="w-[60%] h-full p-4 overflow-none bg-blue-100">
          <PDFViewer pdfUrl={item?.pdf_path} />
        </main>
        <aside className="w-[40%] h-full border-1 border-border overflow-y-auto p-4 bg-blue-100">
          <MetadataTab data={item} />
        </aside>
      </div>
    </div>
  );
};

export default Index;
