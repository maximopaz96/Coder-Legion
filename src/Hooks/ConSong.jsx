export const fetchSongs = async (page=1) => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
        `https://sandbox.academiadevelopers.com/harmonyhub/songs/?page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Token ${token}` : "",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error al obtener las canciones");
      }
    
      const data = await response.json();
    
      return {
        songs: data.results,
        totalCount: data.count,
        nextPage: data.next ? new URL(data.next).searchParams.get("page") : null,
        prevPage: data.previous
          ? new URL(data.previous).searchParams.get("page")
          : null,
      };
    };
  
// ConSong.jsx
export const createSong = async (songData) => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(
    `https://sandbox.academiadevelopers.com/harmonyhub/songs/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Token ${token}` : "",
      },
      body: JSON.stringify(songData),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al crear la canción: ${errorText}`);
  }

  return await response.json();
};


export const fetchSongsEdit = async (id) => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
        `https://sandbox.academiadevelopers.com/harmonyhub/songs/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Token ${token}` : "",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error al obtener las canciones");
      }
    
      const data = await response.json();
    
      return {
        songs: data.results
      };
    };

  // Metodo actualizar
    export const updateSong = async (id, songData) => {
      const token = localStorage.getItem("authToken");
    
      const response = await fetch(
        `https://sandbox.academiadevelopers.com/infosphere/songs/${id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Token ${token}` : "",
          },
          body: JSON.stringify(songData),
        }
      );
    
      if (!response.ok) {
        throw new Error("Error al actualizar la canción");
      }
    
      const data = await response.json();
      return data;
    };

//Metodo Delete   
// Método Delete
export const fetchSongDelete = async (id) => {
  const token = localStorage.getItem("authToken");

  try {
    const response = await fetch(
      `https://sandbox.academiadevelopers.com/harmonyhub/songs/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Token ${token}` : "",
        },
      }
    );

    // Verifica si la respuesta no es OK
    if (!response.ok) {
      const errorText = await response.text(); // Obtiene el cuerpo de la respuesta si hay un error
      console.error('Error:', errorText); // Registra el mensaje de error
      throw new Error(`Error al eliminar: ${errorText}`);
    }

    return {}; // Devuelve un objeto vacío si es exitoso
  } catch (error) {
    console.error('Error capturado:', error.message); // Registra los errores capturados
    throw error; // Vuelve a lanzar el error para que lo maneje el llamador
  }
};


//Metodo patch

export const patchSong = async (id, songData) => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(
    `https://sandbox.academiadevelopers.com/harmonyhub/songs/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Token ${token}` : "",
      },
      body: JSON.stringify(songData),
    }
  );

  if (!response.ok) {
    throw new Error("Error al actualizar la canción");
  }

  const data = await response.json();
  return data;
};