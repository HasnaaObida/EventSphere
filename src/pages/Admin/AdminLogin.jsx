import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("adminAuth");
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Nom d'utilisateur ou mot de passe incorrect");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-box">
        <h2>Espace Administrateur</h2>
        <p>Connectez-vous pour accéder au dashboard</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Nom d'utilisateur</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
