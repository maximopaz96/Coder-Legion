import React from 'react';
import { Modal, Button } from 'react-bootstrap';

 export const  ModalArtist = ({ show, handleClose, artist }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{artist?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {artist ? (
          <>
            <p><strong>Género(s):</strong> {artist.genres.join(', ')}</p>
            <p><strong>Álbumes:</strong> {artist.albums.join(', ')}</p>
            <p><strong>Fecha de Creación:</strong> {new Date(artist.created_at).toLocaleDateString()}</p>
            <p><strong>Fecha de Actualización:</strong> {new Date(artist.updated_at).toLocaleDateString()}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalArtist;
