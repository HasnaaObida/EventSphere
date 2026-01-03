import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../../features/slices/cartSlice";
import axios from "axios";
import "./Checkout.css";

const API_ORDERS = "https://694d55dbad0f8c8e6e206be4.mockapi.io/orders";

const Checkout = () => {
  const cart = useSelector((state) => state.cart.items || []);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(API_ORDERS, {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        items: cart,
        total: totalPrice,
      });
      setSuccessMessage("Commande validée avec succès ✅");
      dispatch(clearCart());
      setFormData({ fullName: "", email: "", phone: "" });
    } catch (error) {
      setSuccessMessage("❌ Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Votre Panier</h1>
        <p>{cart.length} ticket(s) sélectionné(s)</p>

        <div className="checkout-layout">
          {/* Cart Items */}
          <div className="cart-box">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>{item.category}</p>
                  <p>{item.price} €</p>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                  <button className="remove-btn" onClick={() => handleRemove(item.id)}>Supprimer</button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="summary-box">
            <h2>Récapitulatif</h2>
            {cart.map((item) => (
              <div key={item.id} className="summary-row">
                <span>{item.name} x{item.quantity}</span>
                <span>{item.price * item.quantity} €</span>
              </div>
            ))}
            <div className="summary-total">
              <span>Total</span>
              <span>{totalPrice} €</span>
            </div>

            <form onSubmit={handleSubmit} className="checkout-form">
              <input type="text" name="fullName" placeholder="Nom complet" value={formData.fullName} onChange={handleInputChange} required />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
              <input type="tel" name="phone" placeholder="Téléphone" value={formData.phone} onChange={handleInputChange} required />
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Validation..." : "Commander"}
              </button>
            </form>

            {successMessage && <p className="success-message">{successMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
