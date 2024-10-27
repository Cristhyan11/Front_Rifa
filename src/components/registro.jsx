import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import '../styles/registro.css';

Modal.setAppElement('#root');

function Registro() {
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [cedula, setCedula] = useState('');
  const [celular, setCelular] = useState('');
  const [email, setEmail] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', { nombre, fechaNacimiento, cedula, celular, email, ciudad, password, confirmPassword });
    
    if (!email.includes('@')) {
      setModalMessage('El correo electrónico debe contener un @.');
      return;
    }
    if (password !== confirmPassword) {
      setModalMessage('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('https://back-rifa-swart.vercel.app/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, fechaNacimiento, cedula, celular, email, ciudad, password })
      });
      const result = await response.json();
      if (result.status === "UsuarioRegistrado") {
        console.log(`User: ${result.user}, Role: ${result.role}`);
        localStorage.setItem('user', result.user);
        localStorage.setItem('role', result.role);
        setModalMessage('Su registro es un éxito.');
        setTimeout(() => {
          navigate('/login');
        }, 2000); // Redirect after 2 seconds
      } else {
        setModalMessage(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setModalMessage('Error en el registro');
    }
  };

  const closeModal = () => {
    setModalMessage('');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="ai-agent-form">
        <h2 className="form-title">Pocket UX - Registro</h2>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
          <input
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cedula">Cédula</label>
          <input
            type="text"
            id="cedula"
            name="cedula"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            maxLength="11"
            pattern="\d{11}"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="celular">Celular</label>
          <input
            type="text"
            id="celular"
            name="celular"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            maxLength="10"
            pattern="\d{10}"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ciudad">Ciudad</label>
          <input
            type="text"
            id="ciudad"
            name="ciudad"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Registrarse</button>
        <label htmlFor="">                         </label>
        <button type="button" className="submit-button" onClick={() => navigate('/home')}>Home</button>
      </form>
      <Modal
        isOpen={!!modalMessage}
        onRequestClose={closeModal}
        contentLabel="Message Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <h2>Mensaje</h2>
          <p>{modalMessage}</p>
          <button onClick={closeModal} className="submit-button">Cerrar</button>
        </div>
      </Modal>
    </div>
  );
}

export default Registro;
