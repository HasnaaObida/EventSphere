import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/slices/cartSlice";
import "./EventCard.css";

const EventCard = ({ event }) => {
  const dispatch = useDispatch();

  return (
    <div className="event-card">
      <img
        src={event.image} 
        alt={event.name}
        className="event-image"
      />

      <div className="event-content">
        <h3>{event.name}</h3>
        <p>{event.category}</p>
        <p>{event.price} €</p>

        <button
          onClick={() => dispatch(addToCart(event))}
          className="event-button"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default EventCard;
