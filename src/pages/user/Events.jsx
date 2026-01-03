import { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../../components/EventCard";
import { useSearchParams } from "react-router-dom";
import "./Events.css";

const categories = ["Tous", "Musique", "Art", "Spectacle", "Football"];

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [searchParams] = useSearchParams();
  const categoryFromURL = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState(categoryFromURL || "Tous");

  useEffect(() => {
    axios
      .get("https://694d55dbad0f8c8e6e206be4.mockapi.io/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchCategory = selectedCategory === "Tous" || event.category === selectedCategory;
    const matchSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="events-page">
      {/* Titre fixe */}
      <div className="events-header">
        <h2>Tous les Événements</h2>
        <p>Parcourez notre sélection d'événements et trouvez votre prochaine expérience.</p>
      </div>

      {/* Search bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="events-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <p className="no-events">Aucun événement trouvé.</p>
        )}
      </div>
    </div>
  );
};

export default Events;
