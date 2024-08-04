export const fetchPlaylists = async (page = 1) => {
    const token = localStorage.getItem("authToken");
  
    const response = await fetch(
      `https://sandbox.academiadevelopers.com/harmonyhub/playlists/?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Token ${token}` : "",
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Error al obtener las playlists");
    }
  
    const data = await response.json();
    return {
      playlists: data.results,
      totalCount: data.count,
      nextPage: data.next ? new URL(data.next).searchParams.get("page") : null,
      prevPage: data.previous ? new URL(data.previous).searchParams.get("page") : null,
    };
  };
  export const createPlaylist = async (playlistData) => {
    const token = localStorage.getItem("authToken");
  
    const response = await fetch('https://sandbox.academiadevelopers.com/harmonyhub/playlists/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Token ${token}` : '',
      },
      body: JSON.stringify(playlistData),
    });
  
    if (!response.ok) {
      throw new Error('Error al crear la playlist');
    }
  
    return response.json();
  };
  export const fetchPlaylistById = async (id) => {
    const token = localStorage.getItem("authToken");
  
    const response = await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/playlists/${id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Token ${token}` : '',
      },
    });
  
    if (!response.ok) {
      throw new Error('Error al obtener la playlist');
    }
  
    return response.json();
  };
  export const updatePlaylistById = async (id, updatedData) => {
    const token = localStorage.getItem("authToken");
  
    const response = await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/playlists/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Token ${token}` : '',
      },
      body: JSON.stringify(updatedData),
    });
  
    if (!response.ok) {
      throw new Error('Error al actualizar la playlist');
    }
  
    return response.json();
  };
  export const patchPlaylistById = async (id, updatedData) => {
    const token = localStorage.getItem("authToken");
  
    const response = await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/playlists/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Token ${token}` : '',
      },
      body: JSON.stringify(updatedData),
    });
  
    if (!response.ok) {
      throw new Error('Error al actualizar parcialmente la playlist');
    }
  
    return response.json();
  };
  export const deletePlaylistById = async (id) => {
    const token = localStorage.getItem("authToken");
  
    const response = await fetch(`https://sandbox.academiadevelopers.com/harmonyhub/playlists/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Token ${token}` : '',
      },
    });
  
    if (!response.ok) {
      throw new Error('Error al eliminar la playlist');
    }
  
    return response.status;
  };
          