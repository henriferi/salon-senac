import React, { useState } from 'react';
import './Modal.css'; 

const Modal = ({ isOpen, onClose, onConfirm }) => {
  const [password, setPassword] = useState('');

  const handleConfirm = () => {
    onConfirm(password);
    setPassword(''); 
    onClose(); 
  };

  if (!isOpen) return null; 

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Confirme sua Senha</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
        />
        <button onClick={handleConfirm}>Confirmar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default Modal;
