// app-pwa/src/components/App/Global/InstallPrompt.jsx

import { motion } from "framer-motion";
import { FaDownload, FaTimes, FaChrome, FaMobile } from 'react-icons/fa';
import './InstallPrompt.css';

const InstallPrompt = ({ onInstall, onClose }) => {
  return (
    <motion.div 
      className="install-prompt-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="install-prompt"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
      >
        <button className="install-prompt-close" onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className="install-prompt-icon">
          <FaDownload size={32} />
        </div>
        
        <h3>Instalar App AgroTech</h3>
        
        <p>
          Instale nosso app para uma experiência completa <strong>fora do navegador</strong>!
        </p>

        <div className="install-benefits">
          <div className="benefit-item">
            <FaMobile size={20} />
            <span>Abre como app nativo</span>
          </div>
          <div className="benefit-item">
            <FaChrome size={20} />
            <span>Sai do Chrome</span>
          </div>
        </div>
        
        <div className="install-prompt-features">
          <span>✅ Acesso rápido</span>
          <span>✅ Modo offline</span>
          <span>✅ Notificações</span>
        </div>
        
        <button className="install-prompt-button" onClick={onInstall}>
          Instalar Agora
        </button>
        
        <p className="install-note">
          ⚡ Após instalar, o app abrirá automaticamente fora do Chrome!
        </p>
        
        <button className="install-prompt-later" onClick={onClose}>
          Agora não
        </button>
      </motion.div>
    </motion.div>
  );
};

export default InstallPrompt;