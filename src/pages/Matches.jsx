import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Matches.css'; 

const Match = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { style } = location.state || {};

  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleCancelMatch = () => {
    navigate('/home'); 
  };

  const handleScheduleAppointment = () => {
    const chosenDate = new Date(selectedDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    if (!selectedDate || chosenDate <= today) {
      alert('Data inválida! Por favor, escolha uma data futura.');
    } else {
      alert('Atendimento agendado!');
    }
  };

  return (
    <>
      <Header />
      <div className="match-container">
        {style ? (
          <>
            <div className="match-content">
              <img src={style.image} alt={style.title} />
              <div className="match-content-text">
                <h1>Você escolheu: <br />{style.title}</h1>
                <p>{style.description}</p>
                <label htmlFor="date">Escolha a data do atendimento:</label>
                <input
                  type="date"
                  id="date"
                  name="appointmentDate"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </div>
            </div>

            <div className="buttons">
              <button onClick={handleScheduleAppointment}>
                Agendar Atendimento
              </button>
              <button onClick={handleCancelMatch}>Voltar</button>
            </div>
          </>
        ) : (
          <p>Nenhum estilo selecionado.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Match;