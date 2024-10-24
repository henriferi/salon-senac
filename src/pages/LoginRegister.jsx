import { useState } from 'react';
import './LoginRegister.css';

const LoginRegister = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        setMessage('Cadastro bem-sucedido. Agora você pode fazer login.');
        setIsRegister(false); // Alterna para o bloco de login após o cadastro
      } else {
        const data = await response.json();
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      setMessage('Erro ao cadastrar. Tente novamente.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login bem-sucedido:', data);
        // Redirecionar para a página Home após o login bem-sucedido
        window.location.href = '/home';
      } else {
        const data = await response.json();
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setMessage('Erro ao fazer login. Tente novamente.');
    }
  };

  return (
    <div className="bg-body">
      <div className="auth-container">
        {isRegister ? (
          <div className="register-form">
            <fieldset>
              <legend>Cadastro</legend> 
              <form onSubmit={handleRegister}>
              <img src="/senac.png" alt="Logo Senac" className="logo" />
                <input
                  type="text"
                  placeholder="Nome de usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit">Registrar</button>
              </form>
              <p className='msg-bd'>{message}</p>
              <p className='login-register' onClick={toggleForm}>Já tem uma conta? Faça login</p>
            </fieldset>
          </div>
        ) : (
          <div className="login-form">
            <fieldset>
              <legend>Login</legend> {/* Título opcional para o fieldset */}
              <form onSubmit={handleLogin}>
              <img src="/senac.png" alt="Logo Senac" className="logo" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit">Login</button>
              </form>
              <p className='msg-bd-rg'>{message}</p>
              <p className='login-register' onClick={toggleForm}>Não tem uma conta? Cadastre-se</p>
            </fieldset>
          </div>
        )}
      </div>
    </div>

  );
};

export default LoginRegister;
