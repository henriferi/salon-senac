import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Header from '../components/Header'

const Home = () => {
  const navigate = useNavigate();

  // Objeto que guarda as informações das imagens
  const stylesData = [
    {
      id: 1,
      image: '/images/style1.jpg',
      title: 'Corte Moderno',
      description: 'Um corte cheio de estilo e modernidade.',
    },
    {
      id: 2,
      image: '/images/style2.jpg',
      title: 'Coloração Vibrante',
      description: 'Cores vibrantes para um visual ousado.',
    },
    {
      id: 3,
      image: '/images/style3.jpg',
      title: 'Corte Clássico',
      description: 'Um corte que nunca sai de moda.',
    },
    {
      id: 4,
      image: '/images/style4.jpg',
      title: 'Mechas Iluminadas',
      description: 'Realce a beleza do seu cabelo com mechas.',
    },
    {
      id: 5,
      image: '/images/style3.jpg',
      title: 'Corte Clássico',
      description: 'Um corte que nunca sai de moda.',
    },
    {
      id: 6,
      image: '/images/style4.jpg',
      title: 'Mechas Iluminadas',
      description: 'Realce a beleza do seu cabelo com mechas.',
    },
    // Adicione mais estilos conforme necessário
  ];

  const handleMatch = (style) => {
    navigate('/matches', { state: { style } }); // Redireciona para a tela de Matches com os dados do estilo
  };

  return (
    <>
      <Header />
      <div className="home-container">
        {/* Logo do Senac como background */}
        <div className="logo-background">
          <img src="/images/senac-logo.png" alt="Logo Senac" />
        </div>

        {/* Textos de incentivo e contatos */}
        <div className="info-section">
          <h1>Venha conhecer nossos serviços!</h1>
          <p>Transforme seu visual com os melhores profissionais do Senac.</p>
          <p>Contato: (81) 99999-9999 | Email: contato@senacpe.com.br</p>
        </div>

        {/* Grid de imagens */}
        <div className="grid-container">
          {stylesData.map((style) => (
            <div key={style.id} className="style-card">
              <img src={style.image} alt={style.title} />
              <h2>{style.title}</h2>
              <p>{style.description}</p>
              <button onClick={() => handleMatch(style)}>Dê Match</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;