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
        throw new Error("Error al obtener los artículos");
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
        throw new Error("Error al obtener los artículos");
      }
    
      const data = await response.json();
    
      return {
        songs: data.results
      };
    };

