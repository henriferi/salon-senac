import React, { useState, useEffect } from 'react';
import './Feedback.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal'; 
import {FaStar} from 'react-icons/fa';

const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(null); 
  const [rating, setRating] = useState(0); 
  const [feedbacks, setFeedbacks] = useState([]);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [feedbackToDelete, setFeedbackToDelete] = useState(null); 


  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('http://localhost:3001/feedback');
      const data = await response.json();
      setFeedbacks(data.reverse()); 
    } catch (error) {
      console.error('Erro ao buscar feedbacks:', error);
    }
  };

  useEffect(() => {
    fetchFeedbacks(); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !comment || !password || rating === 0) {
      setMessage('Por favor, preencha todos os campos e dê uma avaliação.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('comment', comment);
    formData.append('password', password);
    formData.append('rating', rating); 
    if (photo) {
      formData.append('photo', photo); 
    }

    try {
      const response = await fetch('http://localhost:3001/feedback', {
        method: 'POST',
        body: formData, 
      });

      if (response.ok) {
        setMessage('Feedback enviado com sucesso!');
        setName('');
        setEmail('');
        setComment('');
        setPassword('');
        setRating(0); 
        setPhoto(null); 
        fetchFeedbacks(); 
      } else {
        const data = await response.json();
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Erro ao enviar feedback:', error);
      setMessage('Erro ao enviar feedback. Tente novamente.');
    }
  };

  const handleDelete = (id) => {
    setFeedbackToDelete(id); 
    setIsModalOpen(true); 
  };

  const confirmDelete = async (passwordForDelete) => {
    try {
      const response = await fetch(`http://localhost:3001/feedback/${feedbackToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: passwordForDelete }), 
      });

      if (response.ok) {
        setMessage('Feedback excluído com sucesso!');
        fetchFeedbacks(); 
      } else {
        const data = await response.json();
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Erro ao excluir feedback:', error);
      setMessage('Erro ao excluir feedback. Tente novamente.');
    } finally {
      setIsModalOpen(false); 
      setFeedbackToDelete(null); 
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? 'star filled' : 'star'}>
        ★
      </span>
    ));
  };

  return (
    <div className="container">
      <Header />
      <div className='container-promo'>
        <h1>
          Capriche no Feedback <FaStar />
        </h1>
        <span>
          Os Feedbacks mais completos concorrerão a um procedimento de sua escolha totalmente gratuito com os profissionais do Senac.
        </span>
      </div>

      <div className="feedback-container">
        <h1>Deixe seu Feedback</h1>
        <form onSubmit={handleSubmit} className="feedback-form" encType="multipart/form-data">
          <input
            type="text"
            placeholder="Seu Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Seu Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Seu Comentário"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Sua Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="photo-upload" className="photo-upload-label">
            Imagem do seu procedimento (opcional): <br />
            <input
              type="file"
              id="photo-upload"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </label>

          <div className="rating">
            <label>Avaliação:</label>
            {Array.from({ length: 5 }, (_, index) => (
              <span
                key={index}
                className={index < rating ? 'star filled' : 'star'}
                onClick={() => setRating(index + 1)}
              >
                ★
              </span>
            ))}
          </div>

          <button type="submit">Enviar Feedback</button>
        </form>
        {message && <p className="feedback-message">{message}</p>}
      </div>

      <div className="previous-feedbacks">
        <h2>Feedbacks Anteriores</h2>
        <div className="feedback-grid">
          {feedbacks.map((feedback) => (
            <div className="feedback-item" key={feedback.id}>
              {feedback.photo && (
                <img
                  src={`http://localhost:3001${feedback.photo}`}
                  alt="Foto do feedback"
                  style={{ maxWidth: '100px', height: 'auto', marginBottom: '10px' }} 
                />
              )}
              <strong>{feedback.name} ({feedback.email}):</strong>
              <p>{feedback.comment}</p>
              <div className="feedback-rating">
                {renderStars(feedback.rating)} 
              </div>
              <button onClick={() => handleDelete(feedback.id)} className="delete-button">Excluir</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Feedback;
