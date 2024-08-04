import React from 'react';
import { useNavigate } from 'react-router-dom';


export const NavBar = () => {
    const navigate = useNavigate(); // Si planeas usar navegación programática
     // Función para manejar el clic en "Login"
     const handleLoginClick = () => {
        navigate('/login'); // Redirige a la página de login
    };

    // Función para manejar el envío del formulario
    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="#">Inicio</a>
      
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <a className="nav-link" href="#">Biblioteca <span className="sr-only"></span></a>
            </li>
            <li className="nav-item" style={{marginLeft: "10px"}}>
            <a 
                                className="nav-link" 
                                href="#" 
                                onClick={(e) => {
                                    e.preventDefault(); // Evita el comportamiento predeterminado del enlace
                                    handleLoginClick();
                                }}
                            >
                                Login
                            </a>
            </li>
           
          </ul>
          <form className="form-inline my-2 my-lg-0" >
            <input className="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Search"></input>
            
        
            
          </form>
        </div>
      </nav>
      </div>
            
    );
};
