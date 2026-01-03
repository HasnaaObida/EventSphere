import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./AdminLayout.css";

export default function AdminLayout() {
  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>
        <nav className="sidebar-nav">
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/events">Manage Events</Link>
          <Link to="/admin/orders">Manage Orders</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
