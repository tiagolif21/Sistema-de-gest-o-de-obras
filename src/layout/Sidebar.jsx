import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isSidebarExpanded, setSidebarExpanded }) => {

  return (
    <div 
      className={`sidebar ${isSidebarExpanded ? 'layout-expanded' : 'layout-collapsed'}`}
      onMouseEnter={() => setSidebarExpanded(true)}
      onMouseLeave={() => setSidebarExpanded(false)}
    >
      <div className="sidebar-header">
        <img src="/hidrosantec_logo.png" alt="Logo Hidrosantec" className="sidebar-logo" />
        <h2 className="sidebar-company-name">Hidrosantec</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <i className="fa-solid fa-chart-pie"></i>
              <span className="nav-text">Painel</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/clientes" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <i className="fa-solid fa-users"></i>
              <span className="nav-text">Clientes</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/fornecedores" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <i className="fa-solid fa-truck-fast"></i>
              <span className="nav-text">Fornecedores</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/obras" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <i className="fa-solid fa-helmet-safety"></i>
              <span className="nav-text">Obras</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/recursos" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <i className="fa-solid fa-box-open"></i>
              <span className="nav-text">Recursos</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;