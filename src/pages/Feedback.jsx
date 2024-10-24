import React, { useState, useEffect } from 'react';
import './Feedback.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [password, setPassword] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [message, setMessage] = useState('');

  // Função para buscar feedbacks existentes
  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('http://localhost:3001/feedback');
      const data = await response.json();
      setFeedbacks(data.reverse()); // Feedbacks mais recentes no topo
    } catch (error) {
      console.error('Erro ao buscar feedbacks:', error);
    }
  };

  useEffect(() => {
    fetchFeedbacks(); // Buscar feedbacks ao carregar a página
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !comment || !password) {
      setMessage('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, comment, password }),
      });

      if (response.ok) {
        setMessage('Feedback enviado com sucesso!');
        setName('');
        setEmail('');
        setComment('');
        setPassword('');
        fetchFeedbacks(); // Atualizar a lista de feedbacks após enviar
      } else {
        const data = await response.json();
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Erro ao enviar feedback:', error);
      setMessage('Erro ao enviar feedback. Tente novamente.');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este feedback?');
    if (!confirmDelete) return;

    const passwordForDelete = prompt('Por favor, insira sua senha:'); // Solicita a senha ao usuário

    try {
      const response = await fetch(`http://localhost:3001/feedback/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: passwordForDelete }), // Envia a senha para a exclusão
      });

      if (response.ok) {
        setMessage('Feedback excluído com sucesso!');
        fetchFeedbacks(); // Atualizar a lista de feedbacks após exclusão
      } else {
        const data = await response.json();
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Erro ao excluir feedback:', error);
      setMessage('Erro ao excluir feedback. Tente novamente.');
    }
  };

  return (
    <div className="container">
        <Header />
    <div className="feedback-container">
      <h1>Deixe seu Feedback</h1>
      <form onSubmit={handleSubmit} className="feedback-form">
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
        <button type="submit">Enviar Feedback</button>
      </form>
      {message && <p className="feedback-message">{message}</p>}

    </div>
    {/* Seção de comentários anteriores */}
    <div className="previous-feedbacks">
        <h2>Feedbacks Anteriores</h2>
        <div className="feedback-grid">
          {feedbacks.map((feedback) => (
            <div className="feedback-item" key={feedback.id}>
              <strong>{feedback.name} ({feedback.email}):</strong> {feedback.comment}
              <button onClick={() => handleDelete(feedback.id)}>Excluir</button>
            </div>
          ))}
        </div>
      </div>
    <Footer />
    </div>
  );
};

export default Feedback;
