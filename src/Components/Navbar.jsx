import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';
import {Link} from 'react-router-dom';
import './Css/Nav.css';


export const NavBar = () => {
  
    const {auth, logout}=useContext(AuthContext);
    const navigate = useNavigate(); // Si planeas usar navegación programática
     // Función para manejar el clic en "Login"
     const handleLoginClick = () => {
        navigate('/login'); // Redirige a la página de login
        
      };
      const handleLogout = () => {
        logout();
        navigate('/songs'); // Redirige al usuario a la página de login después de cerrar sesión
      };

    // Función para manejar el envío del formulario
    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className='container'> 
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="#">Inicio</a>
      
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <a className="nav-link" href="#">Biblioteca <span className="sr-only"></span></a>
            </li>
           
           
          </ul>
          <div className="ml-auto">
           
            
              
          {auth.isAuthenticated ? (
          <>
            <div>Bienvenido {auth.username}</div>
          
              <button onClick={handleLogout}>Cerrar Sesión</button>
            
          </>
        ) : (
          <Link className="btn btn-primary" to="/login">Login</Link>
        )}
          </div>
          <form className="form-inline my-2 my-lg-0" >
            <input className="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Search"></input>
            
          </form>
        </div>
        </div>
      </nav>
      </div>
            
    );
};
