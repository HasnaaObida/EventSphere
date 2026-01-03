import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManageOrders.css";

const API_URL = "https://694d55dbad0f8c8e6e206be4.mockapi.io/orders";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get(API_URL);
        setOrders(res.data);
        setError(null);
      } catch {
        setError("Impossible de récupérer les commandes.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const totalRevenue = orders.reduce((acc, order) => acc + Number(order.total), 0);

  return (
    <div className="manage-orders-container">
      <div className="manage-orders-header">
        <h1>Gestion des Commandes</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Chargement des commandes...</div>
      ) : orders.length === 0 ? (
        <div className="no-orders">Aucune commande disponible</div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Nom du client</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Prix total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.fullName}</td>
                    <td>{order.email}</td>
                    <td>{order.phone}</td>
                    <td>{order.total} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="total-revenue">Total des revenus : {totalRevenue} €</p>
        </>
      )}
    </div>
  );
};

export default ManageOrders;
