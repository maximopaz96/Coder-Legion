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
export const  fetchSongDelete = async (id) => {
    const token = localStorage.getItem("authToken");
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
      if (!response.ok) {
        throw new Error("Error al eliminar");
      }
    
      const data = await response.json();
    
      return (
        data
      )
}

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