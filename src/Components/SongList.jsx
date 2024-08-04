import React, { useState } from 'react';
import EditSong from './EditSong'; // Importa el componente de edición

const SongList = () => {
  const [selectedSongId, setSelectedSongId] = useState(null);

  const handleEdit = (id) => {
    setSelectedSongId(id);
  };

  const handleCloseEdit = () => {
    setSelectedSongId(null);
  };

  return (
    <div>
      <h1>Lista de Canciones</h1>
      {/* Renderiza tu lista de canciones aquí */}
      {/* ... */}

      {selectedSongId && (
        <EditSong
          songId={selectedSongId}
          onClose={handleCloseEdit}
        />
      )}
    </div>
  );
};

export default SongList;
