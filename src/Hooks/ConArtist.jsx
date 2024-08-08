export const fetchArtists = async (page=1) => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
        `https://sandbox.academiadevelopers.com/harmonyhub/artists/?page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Token ${token}` : "",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error al obtener los artístas");
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
export const createArtist = async ({ name, bio, website }) => {
    const token = localStorage.getItem("authToken");
        
    const response = await fetch(
        'https://sandbox.academiadevelopers.com/harmonyhub/artists/', 
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Token ${token}` : "",
            },
            body: JSON.stringify({ name, bio, website })
          }
        );
      
        if (!response.ok) {
          throw new Error("Error al crear el artista");
}
      
        const data = await response.json();
        return data;
};
export const fetchArtistById = async (id) => {
    const token = localStorage.getItem("authToken");
  
    const response = await fetch(
      `https://sandbox.academiadevelopers.com/harmonyhub/artists/${id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Token ${token}` : "",
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Error al obtener los detalles del artista");
    }
  
    const data = await response.json();
    return data;
  };
  
export const updateArtist = async (id, { name, bio, website }) => {
    const token = localStorage.getItem("authToken");
    
    const response = await fetch(
      `https://sandbox.academiadevelopers.com/harmonyhub/artists/${id}/`, 
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Token ${token}` : "",
        },
        body: JSON.stringify({ name, bio, website })
      }
    );
  
    if (!response.ok) {
      throw new Error("Error al actualizar el artista");
    }
  
    const data = await response.json();
    return data;
  };
  export const deleteArtist = async (id) => {
    const token = localStorage.getItem("authToken");
  
    const response = await fetch(
      `https://sandbox.academiadevelopers.com/harmonyhub/artists/${id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: token ? `Token ${token}` : "",
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Error al eliminar el artista");
    }
  
    return true;
  };
    

      