import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLayout from "./components/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";

/* USER PAGES */
import Home from "./pages/user/Home";
import Events from "./pages/user/Events";
import Checkout from "./pages/user/Checkout";
import Contact from "./pages/user/Contact";

/* ADMIN PAGES */
import AdminLogin from "./pages/Admin/AdminLogin";
import Dashboard from "./pages/Admin/Dashboard";
import ManageEvents from "./pages/Admin/ManageEvents";
import ManageOrders from "./pages/Admin/ManageOrders";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* USER PAGES */}
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />

        {/* ADMIN LOGIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN PANEL LAYOUT */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="events"
            element={
              <ProtectedRoute>
                <ManageEvents />
              </ProtectedRoute>
            }
          />
          <Route
            path="orders"
            element={
              <ProtectedRoute>
                <ManageOrders />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
