// CreateSongModal.jsx
import React, { useState } from 'react';
import { createSong } from '../../Hooks/ConSong'; // Asegúrate de tener esta función en tu archivo de hooks
import './CreateSongModal.css';
export const CreateSongModal = ({ onClose, onSongCreated }) => {
  const [title, setTitle] = useState('');
  const [album, setAlbum] = useState('');
  const [artists, setArtists] = useState('');
  const [genres, setGenres] = useState('');
  const [year, setYear] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newSong = {
      title,
      album,
      artists: artists.split(',').map(artist => artist.trim()), // Suponiendo que artistas se ingresan como una cadena separada por comas
      genres: genres.split(',').map(genre => genre.trim()),     // Lo mismo para géneros
      year: parseInt(year),
      duration: parseInt(duration),
    };

    try {
      await createSong(newSong);
      onSongCreated(); // Llama a la función para recargar las canciones
      onClose(); // Cierra el modal
    } catch (error) {
      console.error('Error al crear la canción:', error.message);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Crear Nueva Canción</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Título:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Álbum:
            <input
              type="text"
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
              required
            />
          </label>
          <label>
            Artista(s):
            <input
              type="text"
              value={artists}
              onChange={(e) => setArtists(e.target.value)}
              required
            />
          </label>
          <label>
            Género(s):
            <input
              type="text"
              value={genres}
              onChange={(e) => setGenres(e.target.value)}
              required
            />
          </label>
          <label>
            Año:
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </label>
          <label>
            Duración (segundos):
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </label>
          <button type="submit">Crear Canción</button>
        </form>
      </div>
    </div>
  );
};