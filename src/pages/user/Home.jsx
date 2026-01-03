import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import EventCard from "../../components/EventCard";
import "./Home.css";

const categories = [
  {
    name: "Musique",
    color: "purple",
    image: "https://res.cloudinary.com/dyluyp1lj/image/upload/v1767307392/images_im76xl.jpg",
  },
  {
    name: "Art",
    color: "indigo",
    image: "https://res.cloudinary.com/dyluyp1lj/image/upload/v1767307372/istockphoto-636761588-612x612_nwpk0c.jpg",
  }, 
  {
    name: "Spectacle",
    color: "red",
    image: "https://res.cloudinary.com/dyluyp1lj/image/upload/v1767307731/istockphoto-1295114854-612x612_aqrhly.jpg",
  },
  {
    name: "Football",
    color: "green",
    image: "https://res.cloudinary.com/dyluyp1lj/image/upload/v1767189120/fancy-crave-qowyMze7jqg-unsplash_ogsuny.jpg",
  },
];

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          "https://694d55dbad0f8c8e6e206be4.mockapi.io/events"
        );
        setEvents(res.data);
      } catch (err) {
        console.error("Erreur fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  const getEventsByCategory = (category) => {
    return events.filter((event) => event.category === category).slice(0, 1);
  };

  return (
    <div className="home-page">
      {/* HERO */}
      <header className="hero">
        <img
          src="https://res.cloudinary.com/dyluyp1lj/image/upload/v1767188898/danny-howe-bn-D2bCvpik-unsplash_ph9dwa.jpg"
          alt="Banner"
          className="hero-image"
        />
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1>Vivez des Expériences Inoubliables</h1>
          <p>
            Découvrez les meilleurs événements : concerts, expositions,
            spectacles et matchs partout au Maroc.
          </p>
          <div className="hero-buttons">
            <Link to="/events" className="btn btn-primary">
              Découvrir les événements
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Nous contacter
            </Link>
          </div>
        </div>
      </header>

      {/* CATEGORIES */}
      <section className="categories-section">
        <h2>Explorez par Catégorie</h2>
        <p>Trouvez l'événement parfait parmi nos différentes catégories</p>
        <div className="categories-grid">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/events?category=${cat.name}`}
              className={`category-card ${cat.color}`}
              style={{ backgroundImage: `url(${cat.image})` }}
            >
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED EVENTS */}
      <section className="featured-section">
        <h2>Événements à la Une</h2>
        <p>Ne manquez pas nos événements les plus populaires</p>
        <div className="featured-grid">
          {categories.map((cat) =>
            getEventsByCategory(cat.name).map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
