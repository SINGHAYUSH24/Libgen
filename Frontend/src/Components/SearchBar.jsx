import React from 'react';
import {useState} from "react";
const SearchBar = ({path}) => {
  const loc=`File: ${path?.split("\\")[1]}`;
  return (
    <div className="relative flex-1">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input type="text" value={loc} readOnly
        className="bg-gray-200 w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 shadow-sm text-black"
      />
    </div>
  );
};

export default SearchBar;
