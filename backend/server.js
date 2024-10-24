const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(cors());

// Importar as rotas de feedback
const feedbackRoutes = require('./feedback'); // Ajuste o caminho se necessário
app.use(feedbackRoutes); // Usar as rotas de feedback

// Rota de cadastro
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Verificar se o email ou nome de usuário já existe
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: email },
        { username: username },
      ],
    },
  });

  if (existingUser) {
    return res.status(400).json({ message: 'Email ou nome de usuário já existe.' });
  }

  // Criar o novo usuário
  const newUser = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: password, // Sem hash, conforme o seu pedido
    },
  });

  res.status(201).json(newUser);
});

// Rota de login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Verificar se o usuário existe
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Login ou senha inválidos.' });
  }

  // Autenticação bem-sucedida
  res.status(200).json({ message: 'Login bem-sucedido', user: user });
});

// Rota para listar todos os usuários cadastrados: http://localhost:3001/users
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
});

// Iniciar o servidor
app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
