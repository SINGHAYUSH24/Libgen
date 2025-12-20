import React from 'react';

const ActionButton = ({ icon, label, onClick, active }) => {
  return (
    <button
      onClick={onClick}
      className={` bg-indigo-400 flex items-center gap-2 px-4 py-3 rounded-lg border transition-all duration-200 shadow-sm hover:shadow-md ${
        active 
          ? 'bg-primary text-primary-foreground border-primary' 
          : 'bg-card text-foreground border-border hover:bg-accent hover:border-primary'
      }`}
      title={label}
    >
      {icon}
      <span className="hidden sm:inline font-medium">{label}</span>
    </button>
  );
};

export default ActionButton;
