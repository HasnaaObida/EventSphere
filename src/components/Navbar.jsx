import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa"; 
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("adminAuth") === "true";

  const cartItems = useSelector((state) => state.cart.items || []);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAdminClick = () => {
    if (isAuth) navigate("/admin/dashboard");
    else navigate("/admin/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">EventSphere</Link>
      </div>

      <ul className="nav-center">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/events">Événements</Link></li> 
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className="navbar-right">
        <Link to="/checkout" className="cart">
          <FaShoppingCart size={20} />
          {totalQuantity > 0 && <span className="cart-count">{totalQuantity}</span>}
        </Link>

        {isAuth ? (
          <button className="admin-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <button className="admin-btn" onClick={handleAdminClick}>Admin</button>
        )}
      </div>
    </nav>
  );
}
