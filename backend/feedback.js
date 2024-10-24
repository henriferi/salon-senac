const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const path = require('path');

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

router.post('/feedback', upload.single('photo'), async (req, res) => {
  const { name, email, comment, password, rating } = req.body;
  const photo = req.file ? req.file.filename : null; 

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Avaliação inválida. Deve ser um valor entre 1 e 5.' });
  }

  try {
    const newFeedback = await prisma.feedback.create({
      data: { 
        name, 
        email, 
        comment, 
        password, 
        rating: parseInt(rating), 
        photo: photo ? `/uploads/${photo}` : null 
      },
    });
    res.status(201).json(newFeedback);
  } catch (error) {
    console.error('Erro ao adicionar feedback:', error);
    res.status(500).json({ message: 'Erro ao adicionar feedback.' });
  }
});

router.get('/feedback', async (req, res) => {
  try {
    const feedbacks = await prisma.feedback.findMany();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Erro ao buscar feedbacks:', error);
    res.status(500).json({ message: 'Erro ao buscar feedbacks.' });
  }
});

router.delete('/feedback/:id', async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const feedback = await prisma.feedback.findUnique({
      where: { id: parseInt(id) },
    });

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback não encontrado.' });
    }

    if (feedback.password !== password) {
      return res.status(403).json({ message: 'Senha incorreta. Não é possível excluir o feedback.' });
    }

    const deletedFeedback = await prisma.feedback.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json(deletedFeedback);
  } catch (error) {
    console.error('Erro ao excluir feedback:', error);
    res.status(500).json({ message: 'Erro ao excluir feedback.' });
  }
});

module.exports = router;
