//vista_ganadores.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/vista_ganadores.css'; // Asegúrate de crear este archivo CSS

function VistaGanadores() {
  const [ganadores, setGanadores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    console.log("Rol del usuario:", userRole); // Verifica el rol
    if (userRole?.toLowerCase() !== 'admin') {
      navigate('/'); // Redirige a la página de inicio si no es administrador
    }

    // Obtener ganadores de la base de datos al cargar el componente
    const fetchGanadores = async () => {
      try {
        const response = await fetch('https://back-rifa-swart.vercel.app/api/ganadores'); // Asegúrate de que esta ruta sea correcta
        const data = await response.json();
        setGanadores(data);
      } catch (error) {
        console.error('Error al obtener ganadores:', error);
      }
    };

    fetchGanadores();
  }, [navigate]);

  const handleLogout = () => {
    try {
      localStorage.removeItem('role'); // Remover el rol del usuario
      localStorage.removeItem('user_id');
      navigate('/'); // Redirigir a la página de inicio
    } catch (error) {
      console.error("Error al acceder a localStorage:", error);
    }
  };
  

  return (
    <div className="ganadores-container">
      <h2 className="ganadores-title">Lista de Ganadores</h2>
      <table className="ganadores-table">
        <thead>
          <tr>
            <th>Fecha y Hora</th>
            <th>Nombre</th>
            <th>Cedula</th>
            <th>Celular</th>
            <th>Código</th>
            <th>Premio</th>
          </tr>
        </thead>
        <tbody>
          {ganadores.map((ganador) => (
            <tr key={ganador.id}>
              <td>{new Date(ganador.fecha_hora).toLocaleString('es-CO', { timeZone: 'America/Bogota' })}</td>
              <td>{ganador.nombre}</td>
              <td>{ganador.cedula}</td>
              <td>{ganador.celular}</td>
              <td>{ganador.numero_registrado}</td>
              <td>{ganador.premio}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='.logout-button' onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
}

export default VistaGanadores;
