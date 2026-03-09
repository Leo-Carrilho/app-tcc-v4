// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"

// Importações de todas as páginas (todas em pages/App/)
import Landing from "./pages/Site/Landing"
import Intro from "./pages/App/Intro"
import Login from "./pages/App/Login"
import Register from "./pages/App/Register"
import Home from "./pages/App/Home"
import CadastroFazenda from "./pages/App/CadastroFazenda"
import Profile from "./pages/App/Profile"
import ForgotPassword from "./pages/App/ForgotPassword"
import Explore from "./pages/App/Explore"

// Componentes
import SplashScreen from "./components/App/Global/SplashScreen"

// Estilos
import "./App.css"

function App() {
  const [loading, setLoading] = useState(false)

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {loading ? (
          <SplashScreen
            key="splash"
            onComplete={() => setLoading(false)}
          />
        ) : (
          <Routes key="app">
            <Route path="/" element={<Landing />} />
            <Route path="/app" element={<Intro />} />
            <Route 
              path="/login" 
              element={<Login setAppLoading={setLoading} />} 
            />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cadastrar-fazenda" element={<CadastroFazenda />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/explore" element={<Explore />} />
          </Routes>
        )}
      </AnimatePresence>
    </BrowserRouter>
  )
}

export default App