import React, { useState, useEffect } from 'react';
import { fetchArtists, deleteArtist,createArtist } from '../Hooks/ConArtist';
import {CreateArtistModal} from './Artist/CreateArtistModal';

export const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  //Función para crear una cancion
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
  useEffect(() => {
    console.log(artists); // Verifica los datos de los artistas
  }, [artists]);

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

  //Crear
  const handleShowModal = (artists) => {
    setSelectedArtist(artists);
    setShowModal(true);
  };
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedArtists(null);
  };
  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);

  };
  const handleArtistCreated = () => {
    loadArtists(currentPage);
    handleCloseCreateModal();
  };


  return (
    <div>
      <h1>Lista de Artistas</h1>
      <button onClick={handleShowForm}>Agregar Artista</button>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <ul className="artist-list">
         { artists.map((artists) => (
            <li key={artists.id} className="artist-item">
              <div className="artist-name">{artists.name}</div>
              <div className="artist-details">Género(s): {artists.genres.join(', ')}</div>
              <div className="artist-details">Álbumes: {artists.albums.join(', ')}</div>
              <div className="artist-details">Fecha de Creación: {new Date(artists.created_at).toLocaleDateString()}</div>
              <div className="artist-details">Fecha de Actualización: {new Date(artists.updated_at).toLocaleDateString()}</div>
              <button onClick={() => handleShowModal(artists)}>Ver Detalles</button>
              <button onClick={() => handleDelete(artists.id)}>Eliminar</button>
            </li>
          ))
      }
      
      </ul>
      <div className="pagination">
        {prevPage && <button onClick={() => loadArtists(prevPage)}>Anterior</button>}
        {nextPage && <button onClick={() => loadArtists(nextPage)}>Siguiente</button>}
      </div>
      <div>

      {showForm && (
        <>
       <CreateArtistModal
        
         onClose={handleCloseForm}
          onArtistCreated={handleArtistCreated}
         />
         {console.log('Modal se está renderizando')}
         {console.log('Se creo correctamente')}

         </>
        )}

      </div>
      

    </div>
  );
};
