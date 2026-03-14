// App.jsx do PWA
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"

import Intro from "./pages/App/Intro"
import Login from "./pages/App/Login"
import CadastroCompleto from "./pages/App/CadastroCompleto"
import Home from "./pages/App/Home"
import Profile from "./pages/App/Profile"
import ForgotPassword from "./pages/App/ForgotPassword"
import Explore from "./pages/App/Explore"

// Componentes
import SplashScreen from "./components/App/Global/SplashScreen"
import InstallPrompt from "./components/App/Global/InstallPrompt" // Vamos criar esse componente

// Estilos
import "./App.css"

function App() {
  const [loading, setLoading] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Verifica se já está instalado (modo standalone)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                         window.navigator.standalone === true;
    
    if (isStandalone) {
      setIsInstalled(true);
    }

    // Captura o evento de instalação
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Verifica se veio do site com parâmetro de instalação
      const params = new URLSearchParams(window.location.search);
      if (params.get('install') === 'true' && !isStandalone) {
        setShowInstallPrompt(true);
      }
    };

    // Quando o app for instalado
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
      
      // Opcional: redireciona ou mostra mensagem de sucesso
      alert('App instalado com sucesso!');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
  if (!deferredPrompt) return;

  // Mostra o prompt de instalação do navegador
  deferredPrompt.prompt();
  
  // Espera a escolha do usuário
  const { outcome } = await deferredPrompt.userChoice;
  
  if (outcome === 'accepted') {
    console.log('Usuário aceitou instalar');
    
    // AGUARDA UM POUCO PARA A INSTALAÇÃO COMPLETAR
    setTimeout(() => {
      // Tenta abrir o app no modo standalone
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      
      if (!isStandalone) {
        // Se não abriu automaticamente, sugere abrir
        alert('App instalado! Agora você pode abri-lo direto da sua área de trabalho.');
      }
      
      // Opcional: redireciona para uma página de sucesso
      // window.location.href = '/instalado-com-sucesso';
    }, 2000);
    
  } else {
    console.log('Usuário cancelou');
    setShowInstallPrompt(false);
  }
  
  setDeferredPrompt(null);
};

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {loading ? (
          <SplashScreen key="splash" onComplete={() => setLoading(false)} />
        ) : (
          <>
            {/* Componente de prompt de instalação */}
            {showInstallPrompt && !isInstalled && (
              <InstallPrompt 
                onInstall={handleInstall}
                onClose={() => setShowInstallPrompt(false)}
              />
            )}
            
            <Routes key="app">
              <Route path="/" element={<Intro />} />
              <Route path="/login" element={<Login setAppLoading={setLoading} />} />
              <Route path="/register" element={<CadastroCompleto />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/explore" element={<Explore />} />
            </Routes>
          </>
        )}
      </AnimatePresence>
    </BrowserRouter>
  )
}

export default App