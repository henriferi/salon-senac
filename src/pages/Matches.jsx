import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header'

const Match = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { style } = location.state || {};

  const handleCancelMatch = () => {
    navigate('/home'); // Volta para a Home ao cancelar o match
  };

  return (
    <>
      <Header />
      <div className="match-container">
        {style ? (
          <>
            <h1>Você escolheu: {style.title}</h1>
            <img src={style.image} alt={style.title} />
            <p>{style.description}</p>

            {/* Escolha de data para o atendimento */}
            <label htmlFor="date">Escolha a data do atendimento:</label>
            <input type="date" id="date" name="appointmentDate" />

            <div className="buttons">
              <button onClick={() => alert('Atendimento agendado!')}>Agendar Atendimento</button>
              <button onClick={handleCancelMatch}>Cancelar Match</button>
            </div>
          </>
        ) : (
          <p>Nenhum estilo selecionado.</p>
        )}
      </div>
    </>
  );
};

export default Match;
