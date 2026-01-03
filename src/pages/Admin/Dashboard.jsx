import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [eventsCount, setEventsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [visitorsCount, setVisitorsCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          "https://694d55dbad0f8c8e6e206be4.mockapi.io/events"
        );
        setEventsCount(res.data.length);
      } catch (err) {
        console.error("Erreur fetching events:", err);
      }
    };

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "https://694d55dbad0f8c8e6e206be4.mockapi.io/orders"
        );
        setOrdersCount(res.data.length);
        setRecentOrders(res.data.slice(-3).reverse());
        const totalRevenue = res.data.reduce(
          (acc, order) => acc + Number(order.total),
          0
        );
        setRevenue(totalRevenue);
      } catch (err) {
        console.error("Erreur fetching orders:", err);
      }
    };

    const fetchVisitors = () => setVisitorsCount(1234); // Mock

    fetchEvents();
    fetchOrders();
    fetchVisitors();
  }, []);

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="metrics-cards">
        <div className="card">
          <p>Événements</p>
          <p className="card-number">{eventsCount}</p>
        </div>
        <div className="card">
          <p>Commandes</p>
          <p className="card-number">{ordersCount}</p>
        </div>
        <div className="card">
          <p>Visiteurs</p>
          <p className="card-number">{visitorsCount}</p>
        </div>
        <div className="card">
          <p>Revenus</p>
          <p className="card-number">€{revenue}</p>
        </div>
      </div>

      <div className="recent-orders">
        <h2>Commandes récentes</h2>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Client</th>
                <th>Téléphone</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr key={order.id}>
                  <td>#{index + 1}</td>
                  <td>{order.fullName}</td>
                  <td>{order.phone}</td>
                  <td>€{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
