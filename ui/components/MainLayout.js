import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
const MainLayout = ({ children }) => {
  return (
    <div className="w-full h-full">
      <div className="flex">
        <Sidebar />
      </div>
      <div className="w-full">
        <Navbar />
      </div>
      <div>
      {children}
      </div>
    </div>
  );
};

export default MainLayout;
