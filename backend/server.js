const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  }
});

const upload = multer({ storage: storage });


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.json());
app.use(cors());

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email ou nome de usuário já existe.' });
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erro ao registrar:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Login ou senha inválidos.' });
    }

    res.status(200).json({ message: 'Login bem-sucedido', user: user });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro ao fazer login.' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
});

app.post('/feedback', upload.single('photo'), async (req, res) => {
  const { name, email, comment, password, rating } = req.body;
  const photo = req.file ? req.file.filename : null; 

  try {
    const feedback = await prisma.feedback.create({
      data: {
        name,
        email,
        comment,
        password,
        rating: parseInt(rating), 
        photo: photo ? `/uploads/${photo}` : null, 
      },
    });
    res.status(201).json(feedback);
  } catch (error) {
    console.error('Erro ao enviar feedback:', error);
    res.status(500).json({ message: 'Erro ao enviar feedback.' });
  }
});

const feedbackRoutes = require('./feedback');
app.use(feedbackRoutes); 


app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
