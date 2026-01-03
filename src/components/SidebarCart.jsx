import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../features/slices/cartSlice"; 
import { Link } from "react-router-dom";
import "./SidebarCart.css";

export default function SidebarCart() {
  const cartItems = useSelector((state) => state.cart.items || []);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="sidebar-cart">
      <h2 className="sidebar-title">Panier</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Le panier est vide</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-row">
                  <div>
                    <p className="cart-item-title">{item.name}</p>
                    <p className="cart-item-price">
                      {item.price} € x {item.quantity}
                    </p>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <h3 className="cart-total">
            Total : {totalPrice.toFixed(2)} €
          </h3>

          <Link to="/checkout">
            <button className="checkout-btn">
              Passer au paiement
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
