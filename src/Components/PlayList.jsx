import React, { useState, useEffect } from 'react';
import { fetchPlaylists, deletePlaylist } from '../Hooks/ConPlaylists';


import 'bootstrap/dist/css/bootstrap.min.css';

export const Playlist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPlaylists = async (page) => {
    setLoading(true);
    try {
      const { playlists, totalCount, nextPage, prevPage } = await fetchPlaylists(page);
      setPlaylists(playlists);
      setTotalCount(totalCount);
      setNextPage(nextPage);
      setPrevPage(prevPage);
      setCurrentPage(page);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlaylists(currentPage);
  }, [currentPage]);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta playlist?")) {
      try {
        await deletePlayList(id);
        loadPlaylists(currentPage);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Lista de Playlists</h1>
      {loading && <p>Cargando...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
      <ul className="list-group">
        {playlists.map((playlist) => (
          <li key={playlist.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-1">{playlist.name}</h5>
              <p className="mb-1">Descripción: {playlist.description}</p>
              <p className="mb-1">Canciones: {playlist.songs.join(', ')}</p>
              <p className="mb-1">Fecha de Creación: {new Date(playlist.created_at).toLocaleDateString()}</p>
              <p className="mb-1">Fecha de Actualización: {new Date(playlist.updated_at).toLocaleDateString()}</p>
            </div>
            <button className="btn btn-danger" onClick={() => handleDelete(playlist.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <div className="pagination my-4">
        {prevPage && <button className="btn btn-primary me-2" onClick={() => loadPlaylists(prevPage)}>Anterior</button>}
        {nextPage && <button className="btn btn-primary" onClick={() => loadPlaylists(nextPage)}>Siguiente</button>}
      </div>
    </div>
  );
};
