//home.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import AnimatedText from './AnimatedText';

const Home = () => {
  const [showFirstText, setShowFirstText] = useState(true);
  const [showSecondText, setShowSecondText] = useState(false);
  const [showThirdText, setShowThirdText] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const firstTextTimer = setTimeout(() => {
      setShowFirstText(false);
      setShowSecondText(true);
    }, 3000);

    const secondTextTimer = setTimeout(() => {
      setShowSecondText(false);
      setShowThirdText(true);
    }, 6000);

    const thirdTextTimer = setTimeout(() => {
      setShowButtons(true);
    }, 9000);

    return () => {
      clearTimeout(firstTextTimer);
      clearTimeout(secondTextTimer);
      clearTimeout(thirdTextTimer);
    };
  }, []);

  const handleRegisterClick = () => {
    navigate('/registro');
  };

  const handleEnterClick = () => {
    navigate('/login'); // Aquí rediriges a la página de login
  };

  return (
    <div className="form-container">
      {showFirstText && <AnimatedText text="Te doy la bienvenida a la gran rifa!" />}
      {showSecondText && <AnimatedText text="¿Deseas ser millonario?" />}
      {showThirdText && <AnimatedText text="Pues participa en nuestra rifa, ¡vamos, regístrate!" />}
      {showButtons && (
        <div className="button-container">
          <button className="register-button" onClick={handleRegisterClick}>Registrar</button>
          <label className="label-white">O</label>
          <button className="enter-button" onClick={handleEnterClick}>Entrar</button>
        </div>
      )}
    </div>
  );
};

export default Home;
