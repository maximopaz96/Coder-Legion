import React, { useState, useEffect } from 'react';
import { fetchSongs } from '../Hooks/ConSong';
import { MusicPlayer } from './MusicPlayer';
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


  // Función para eliminar una canción
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta canción?")) {
      try {
        await deleteSong(id);
        // Re-cargar las canciones después de eliminar
        loadSongs(currentPage);
      } catch (error) {
        setError(error.message);
      }
    }
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
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <ul className="song-list">
        {songs.map((song,index) => (
          <li key={song.id} className="song-item">
            <div className="song-title">{song.title}</div>
            <div className="song-details">Álbum: {song.album}</div>
            <div className="song-details">Artista(s): {song.artists.join(', ')}</div>
            <div className="song-details">Género(s): {song.genres.join(', ')}</div>
            <div className="song-details">Año: {song.year}</div>
            <div className="song-details">Duración: {song.duration} segundos</div>
            <div className="song-details">Fecha de Creación: {new Date(song.created_at).toLocaleDateString()}</div>
            <div className="song-details">Fecha de Actualización: {new Date(song.updated_at).toLocaleDateString()}</div>
            
            <div>
            
            <MusicPlayer  
                songs={songs}
               currentSongIndex={currentSongIndex}
               setCurrentSongIndex={setCurrentSongIndex} />
            
        </div>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {prevPage && <button onClick={() => loadSongs(prevPage)}>Anterior</button>}
        {nextPage && <button onClick={() => loadSongs(nextPage)}>Siguiente</button>}
      </div>
        
    </div>
  );
};






