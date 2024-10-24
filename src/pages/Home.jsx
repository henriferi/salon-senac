import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Header from '../components/Header'
import Footer from '../components/Footer';

const Home = () => {
  const navigate = useNavigate();

  // Objeto que guarda as informações das imagens
  const stylesData = [
    {
      id: 1,
      image: '/senac-match.jpg',
      title: 'Corte Moderno',
      description: 'Um corte cheio de estilo e modernidade.',
    },
    {
      id: 2,
      image: '/cabelo1.jpg',
      title: 'Coloração Vibrante',
      description: 'Cores vibrantes para um visual ousado.',
    },
    {
      id: 3,
      image: '/cabelo2.jpg',
      title: 'Corte Moderno',
      description: 'Um corte cheio de estilo e modernidade.',
    },
    {
      id: 4,
      image: '/cabelo3.jpg',
      title: 'Coloração Vibrante',
      description: 'Cores vibrantes para um visual ousado.',
    },
    {
      id: 5,
      image: '/senac-match.jpg',
      title: 'Corte Moderno',
      description: 'Um corte cheio de estilo e modernidade.',
    },
    {
      id: 6,
      image: '/senac-match.jpg',
      title: 'Coloração Vibrante',
      description: 'Cores vibrantes para um visual ousado.',
    },
    {
      id: 7,
      image: '/senac-match.jpg',
      title: 'Corte Moderno',
      description: 'Um corte cheio de estilo e modernidade.',
    },
    {
      id: 8,
      image: '/senac-match.jpg',
      title: 'Coloração Vibrante',
      description: 'Cores vibrantes para um visual ousado.',
    },
    {
      id: 9,
      image: '/senac-match.jpg',
      title: 'Corte Moderno',
      description: 'Um corte cheio de estilo e modernidade.',
    },
    {
      id: 10,
      image: '/senac-match.jpg',
      title: 'Coloração Vibrante',
      description: 'Cores vibrantes para um visual ousado.',
    },
    {
      id: 11,
      image: '/senac-match.jpg',
      title: 'Corte Moderno',
      description: 'Um corte cheio de estilo e modernidade.',
    },
    {
      id: 12,
      image: '/senac-match.jpg',
      title: 'Coloração Vibrante',
      description: 'Cores vibrantes para um visual ousado.',
    },
    {
      id: 13,
      image: '/senac-match.jpg',
      title: 'Coloração Vibrante',
      description: 'Cores vibrantes para um visual ousado.',
    },
    {
      id: 14,
      image: '/senac-match.jpg',
      title: 'Coloração Vibrante',
      description: 'Cores vibrantes para um visual ousado.',
    },
    {
      id: 15,
      image: '/senac-match.jpg',
      title: 'Coloração Vibrante',
      description: 'Cores vibrantes para um visual ousado.',
    },
  ];

  const handleMatch = (style) => {
    navigate('/matches', { state: { style } }); 
  };

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="info-section">
          <img src="/senac.png" alt="Logo Senac" className='logo' />
          <h1>Venha conhecer nossos serviços!</h1>
          <p>Transforme seu visual com os melhores profissionais do Senac.</p>
          <p>Contato: (81) 99999-9999 | Email: contato@senacpe.com.br</p>
        </div>

        <div className="grid-container">
          {stylesData.map((style) => (
            <div key={style.id} className="style-card">
              <img
                src={style.image}
                alt={style.title}
                style={{ width: '100%', height: '250px', objectFit: 'cover' }} 
              />
              <h2>{style.title}</h2>
              <p>{style.description}</p>
              <button onClick={() => handleMatch(style)}>Dê Match</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
