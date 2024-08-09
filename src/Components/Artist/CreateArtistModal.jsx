
import React, { useState } from 'react';
import { createArtist } from '../../Hooks/ConArtist'; // Asegúrate de que esta función esté disponible

export const CreateArtistModal = ({ onClose, onArtistCreated }) => {
  const [name, setName] = useState('');
  const [genres, setGenres] = useState('');
  const [albums, setAlbums] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const artistGenres = genres.split(',').map(genre => genre.trim());
    const artistAlbums = albums.split(',').map(album => album.trim());

    try {
      await createArtist({ name, genres: artistGenres, albums: artistAlbums });
      if (onArtistCreated) onArtistCreated(); // Llama al callback para actualizar la lista
      onClose(); // Cierra el formulario después de agregar el artista
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Agregar Artista</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Géneros (separados por comas):</label>
            <input
              type="text"
              value={genres}
              onChange={(e) => setGenres(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Álbumes (separados por comas):</label>
            <input
              type="text"
              value={albums}
              onChange={(e) => setAlbums(e.target.value)}
              
            />
          </div>
          <button type="submit">Agregar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );

}
