import React from 'react';
import { useRoutes } from 'react-router-dom';
import {Songs} from './Components/Songs';
import { Login } from './Routes/Login';
import { Navigate,Routes,Route } from 'react-router-dom';
import { AboutScreen } from './Routes/AboutScreen';
import { AuthProvider } from './Contexts/AuthContext';
import { NavBar } from './Components/Navbar';
import{MusicPlayer} from './Components/MusicPlayer';

import { Artist } from './Components/Artist';
import { ModalArtist } from './Components/Artist/ModalArtist';



export const App = () => {
  
    const routes = useRoutes([

      {path:"/", element: <Songs />},
      { path: "/login", element: <Login /> },
      {path: "/songs", element: <Songs />},
      {path:"/musicplayer",element: <MusicPlayer />},
      {path:"/modalartist", element: <ModalArtist />},
      
      {path:"/Artist",element: <Artist />},
     
    ]);
    
    
    return (
      <AuthProvider>
          <NavBar /> {/* Renderizar el NavBar */}
            <div className="container mt-4">
                {routes} {/* Renderizar las rutas definidas */}
            </div>
      </AuthProvider>
  );


}