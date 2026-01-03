import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManageEvents.css";

const API_URL = "https://694d55dbad0f8c8e6e206be4.mockapi.io/events";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    image: "",
    price: "",
    date: "",
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API_URL}?limit=100`);
      setEvents(res.data);
      setError("");
    } catch {
      setError("Impossible de récupérer les événements.");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Add/Edit submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setFormData({ name: "", description: "", category: "", image: "", price: "", date: "" });
      setEditId(null);
      setShowModal(false);
      fetchEvents();
    } catch {
      setError("Impossible d'enregistrer l'événement.");
    }
  };

  // Open edit modal
  const handleEdit = (event) => {
    setEditId(event.id);
    setFormData(event);
    setShowModal(true);
  };

  // Delete modal
  const handleDelete = (event) => {
    setSelectedEvent(event);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${selectedEvent.id}`);
      setEvents(events.filter((e) => e.id !== selectedEvent.id));
      setShowDeleteModal(false);
      setSelectedEvent(null);
    } catch {
      alert("Impossible de supprimer cet événement.");
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedEvent(null);
  };

  return (
    <div className="manage-events-container">
      {/* Header */}
      <div className="manage-events-header">
        <h1>Gestion des Événements</h1>
        <button className="btn-add" onClick={() => setShowModal(true)}>Ajouter un événement</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editId ? "Modifier l'événement" : "Ajouter un événement"}</h2>
            <form onSubmit={handleSubmit} className="event-form">
              <input
                type="text"
                placeholder="Nom"
                value={editId ? formData.name : formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <textarea
                placeholder="Description"
                value={editId ? formData.description : formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Catégorie"
                value={editId ? formData.category : formData.category || ""}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="URL de l'image"
                value={editId ? formData.image : formData.image || ""}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Prix du ticket"
                value={editId ? formData.price : formData.price || ""}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
              <input
                type="date"
                placeholder="Date de l'événement"
                value={editId ? formData.date : formData.date || ""}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
              <div className="modal-buttons">
                <button type="submit">{editId ? "Mettre à jour" : "Ajouter"}</button>
                <button type="button" onClick={() => { setShowModal(false); setEditId(null); setFormData({ name: "", description: "", category: "", image: "", price: "", date: "" }); }}>
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirmer la suppression</h2>
            <p>Voulez-vous vraiment supprimer <strong>{selectedEvent.name}</strong> ?</p>
            <div className="modal-buttons">
              <button type="button" onClick={confirmDelete}>Oui, Supprimer</button>
              <button type="button" onClick={cancelDelete}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      {/* Events Table */}
      <table className="events-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Nom</th>
            <th>Catégorie</th>
            <th>Prix</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr key={e.id}>
              <td>
                <img src={e.image} alt={e.name} className="table-event-image" />
              </td>
              <td>{e.name}</td>
              <td>{e.category}</td>
              <td>€{e.price}</td>
              <td>{e.date || "N/A"}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(e)}>Modifier</button>
                <button className="btn-delete" onClick={() => handleDelete(e)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageEvents;
