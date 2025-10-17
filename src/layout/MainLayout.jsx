import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './MainLayout.css';

const MainLayout = () => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div className={`main-layout ${isSidebarExpanded ? 'layout-expanded' : 'layout-collapsed'}`}>
      <Sidebar isSidebarExpanded={isSidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
