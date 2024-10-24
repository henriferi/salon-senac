const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Rota para adicionar feedback
router.post('/feedback', async (req, res) => {
  const { name, email, comment, password } = req.body;

  try {
    const newFeedback = await prisma.feedback.create({
      data: { name, email, comment, password }, // Adiciona o email e a senha
    });
    res.status(201).json(newFeedback);
  } catch (error) {
    console.error('Erro ao adicionar feedback:', error);
    res.status(500).json({ message: 'Erro ao adicionar feedback.' });
  }
});

// Rota para listar todos os feedbacks
router.get('/feedback', async (req, res) => {
  try {
    const feedbacks = await prisma.feedback.findMany();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Erro ao buscar feedbacks:', error);
    res.status(500).json({ message: 'Erro ao buscar feedbacks.' });
  }
});

// Rota para excluir feedback
router.delete('/feedback/:id', async (req, res) => {
  const { id } = req.params;
  const { password } = req.body; // Captura a senha do corpo da requisição

  try {
    // Verifica se o feedback existe
    const feedback = await prisma.feedback.findUnique({
      where: { id: parseInt(id) },
    });

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback não encontrado.' });
    }

    // Verifica se a senha está correta
    if (feedback.password !== password) {
      return res.status(403).json({ message: 'Senha incorreta. Não é possível excluir o feedback.' });
    }

    // Exclui o feedback
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
