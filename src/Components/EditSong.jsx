import React, { useState, useEffect } from 'react';
import { updateSong } from '../Hooks/ConSong'; 

const EditSong = ({ songId, onClose }) => {
  const [song, setSong] = useState({
    title: '',
    year: '',
    album: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar datos de la canción al montar el componente
  useEffect(() => {
    const fetchSong = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/songs/${songId}/`);
        if (!response.ok) throw new Error('Error al obtener la canción');
        const data = await response.json();
        setSong({
          title: data.title || '',
          year: data.year || '',
          album: data.album || null,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSong();
  }, [songId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSong(prevSong => ({
      ...prevSong,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateSong(songId, song);
      onClose(); // Cerrar el formulario o hacer algo después de la actualización
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Editar Canción</h1>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            name="title"
            value={song.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Año:
          <input
            type="number"
            name="year"
            value={song.year}
            onChange={handleChange}
          />
        </label>
        <label>
          Álbum:
          <input
            type="number"
            name="album"
            value={song.album || ''}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Actualizar Canción</button>
      </form>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default EditSong;
