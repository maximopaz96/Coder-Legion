import React, { useState, useEffect } from 'react';
import { fetchSongs,fetchSongDelete,updateSong } from '../Hooks/ConSong';
import { MusicPlayer } from './MusicPlayer';

import { CreateSongModal } from './Songs/CreateSongModal';
import './Css/Songs.css';
//import EditSongPartial from './EditSongPartial';
export const Songs = () => {
  const [songs, setSongs] = useState([
  ]);
  
  
  const [totalCount, setTotalCount] = useState(0);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [selectedSongId, setSelectedSongId] = useState(null);
  const [editingSong, setEditingSong] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
 
  // Función para cargar canciones
  const loadSongs = async (page) => {
    setLoading(true);
    try {
      const { songs, totalCount, nextPage, prevPage } = await fetchSongs(page);
      setSongs(songs);
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
    loadSongs(currentPage);
  }, [currentPage]);

  //Funcion para crear una canción

  const handleCreateSong = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleSongCreated = () => {
    loadSongs(currentPage);
    handleCloseCreateModal();
  };
  // Función para eliminar una canción
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta canción?")) {
      try {
        await fetchSongDelete(id);
        loadSongs(currentPage);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  // Función para editar una canción
  const handleEdit = (song) => {
    setEditingSong(song);
  };

  const handleSaveEdit = () => {
    loadSongs(currentPage); // Recargar canciones para mostrar cambios
    setEditingSong(null);
  };

  

  // Efecto para cargar canciones iniciales
 

  const handleEditPartial = (id) => {
    setSelectedSongId(id);
  };

  const handleCloseEdit = () => {
    setSelectedSongId(null);
  };
  const handlePlay = (index) => {
    setCurrentSongIndex(index);
  };

  return (
    <div>
      <h1>Lista de Canciones</h1>
      <button className="btn btn-primary" onClick={handleCreateSong}>Crear Canción</button>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <div className="card border-primary mb-3"id="card">
      
        {songs.map((song,index) => (
          <div key={song.id} className="song-item">
            <div className="card-header">{song.title}</div>
      
      <div className="card-body text-primary">
      <div className="song-details">Álbum: {song.album}</div>
            <div className="song-details">Artista(s): {song.artists.join(', ')}</div>
            <div className="song-details">Género(s): {song.genres.join(', ')}</div>
            <div className="song-details">Año: {song.year}</div>
            <div className="song-details">Duración: {song.duration} segundos</div>
            <div className="song-details">Fecha de Creación: {new Date(song.created_at).toLocaleDateString()}</div>
            <div className="song-details">Fecha de Actualización: {new Date(song.updated_at).toLocaleDateString()}</div>
            <div className="d-flex justify-content-between">
                <button className="btn btn-primary" onClick={() => handleEdit(song.id)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleDelete(song.id)}>Eliminar</button>
                <button className="btn btn-success" onClick={() => handlePlay(index)}>Reproducir</button>
              </div>
            
      </div>
      </div>
        ))}
          {editingSong && (
        <EditSongForm
          song={editingSong}
          onClose={handleCloseEdit}
          onSave={handleSaveEdit}
        />
      )}
       {showCreateModal && (
         <>
         <CreateSongModal
            onClose={handleCloseCreateModal}
            onSongCreated={handleSongCreated}
          />
          {console.log('Modal se está renderizando')}
          </>
        )}
      </div>
         
            
      
      <div className="pagination">
        {prevPage && <button onClick={() => loadSongs(prevPage)}>Anterior</button>}
        {nextPage && <button onClick={() => loadSongs(nextPage)}>Siguiente</button>}
      </div>
        
    </div>
  );
};






