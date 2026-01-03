import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");

    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <div className="contact-page">
      <div className="contact-overlay"></div>

      <div className="contact-container">
        <div className="contact-header">
          <h1>Contactez-nous</h1>
          <p>
            Une question ? Une suggestion ? N'hésitez pas à nous écrire, 
            nous vous répondrons dans les plus brefs délais.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Nom complet
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Adresse email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Message
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Envoi en cours..." : "Envoyer le message"}
          </button>

          {status === "success" && (
            <p className="success-message">
              ✅ Message envoyé avec succès !
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
