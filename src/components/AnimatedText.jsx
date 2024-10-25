//AnimatedText.jsx
import React from 'react';
import '../styles/AnimatedText.css'; // Asegúrate de importar los estilos

const AnimatedText = ({ text, animationDelay }) => {
  return (
    <h2 className="animated-text">
      {text.split('').map((letter, index) => (
        <span
          key={index}
          className="letter"
          style={{ animationDelay: `${animationDelay + index * 0.1}s` }} // Ajusta el retraso de animación
        >
          {letter === ' ' ? '\u00A0' : letter} {/* Mantiene los espacios */}
        </span>
      ))}
    </h2>
  );
};

export default AnimatedText;
