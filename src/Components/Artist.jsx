import React, { useState, useEffect } from 'react';
import { fetchArtists, deleteArtist } from '../Hooks/ConArtist';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalArtist from './Artist/ModalArtist';

export const Artist = () => {
  const [artists, setArtists] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);

  const loadArtists = async (page) => {
    setLoading(true);
    try {
      const { artists, totalCount, nextPage, prevPage } = await fetchArtists(page);
      setArtists(artists || []);
      setTotalCount(totalCount);
      setNextPage(nextPage);
      setPrevPage(prevPage);
      setCurrentPage(page);
      setError(null);
    } catch (error) {
      setError(error.message);
      setArtists([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArtists(currentPage);
  }, [currentPage]);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este artista?")) {
      try {
        await deleteArtist(id);
        loadArtists(currentPage);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleShowModal = (artist) => {
    setSelectedArtist(artist);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedArtist(null);
  };
  const handleArtistCreated = () => {
    loadSongs(currentPage);
    handleCloseCreateModal();
  };

  return (
    <div>
      <h1>Lista de Artistas</h1>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <ul className="artist-list">
        {artists.length > 0 ? (
          artists.map((artist) => (
            <li key={artist.id} className="artist-item">
              <div className="artist-name">{artist.name}</div>
              <div className="artist-details">Género(s): {artist.genres.join(', ')}</div>
              <div className="artist-details">Álbumes: {artist.albums.join(', ')}</div>
              <div className="artist-details">Fecha de Creación: {new Date(artist.created_at).toLocaleDateString()}</div>
              <div className="artist-details">Fecha de Actualización: {new Date(artist.updated_at).toLocaleDateString()}</div>
              <button onClik= { handleShowModal}>Editar</button>
              <button onClick={() => handleDelete(artist.id)}>Eliminar</button>
            </li>
          ))
        ) : (
          <p>No hay artistas disponibles.</p>
        )}
      </ul>
      <div className="pagination">
        {prevPage && <button onClick={() => loadArtists(prevPage)}>Anterior</button>}
        {nextPage && <button onClick={() => loadArtists(nextPage)}>Siguiente</button>}
      </div>



      {showModal && (
        <ModalArtist
          onClose={showModal}
          handleClose={handleCloseModal}
          artist={selectedArtist}
        />
      )}
    </div>
  );
};
