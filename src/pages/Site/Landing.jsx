import { useEffect, useState } from "react"
import "../../styles/Site/Landing.css"
import Lottie from "lottie-react"
import monitoramento from "../../../public/assets/icons/monitoramento.json.json"
import analiseSafra from "../../../public/assets/icons/analiseSafra.json.json"
import mapeamento from "../../../public/assets/icons/mapeamento.json.json"
import auxilioIA from "../../../public/assets/icons/auxilioIA.json.json"

export default function Landing(){


  const [prompt, setPrompt] = useState(null)

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault()
      setPrompt(e)
    })
  }, [])

  const instalar = () => {
    if(prompt){
      prompt.prompt()
    }
  }


return(
<>
<header>
    <h2 className="logo">AGROTECH</h2>
    <nav className="nav-menu">
        <a href="#">Home</a>
        <a href="#servicos">Serviços</a>
        <a href="#contato">Contato</a>
        <a href="/app" className="nav-btn">Nossa plataforma</a>
    </nav>
</header>

<section className="hero">
    <div className="hero-text">
    <span className="tag">Tecnologia agrícola</span>
    <h1>
    Serviços para <span>agricultura inteligente</span>
    </h1>
    <p>
    Drones de alta precisão para monitoramento de safras contra pragas e doenças.
    </p>
        <div className="hero-buttons">
            <a href="/app" className="btn">
            Acessar Plataforma
            </a>
            {prompt && (
            <button onClick={instalar}>
            📲 Instalar App
            </button>
        )}
        </div>
    </div>
    <div className="hero-img">
        <img src="../../public/assets/image/Mockup_cell2.png" />
    </div>
</section>

<section className="servicos" id="servicos">
<h2>Serviços que oferecemos</h2>
<div className="cards">

{/* Card IA */}
<div className="card">
<Lottie
animationData={auxilioIA}
loop={true}
className="lottie-icon"
/>
<h3>Auxilio de IA</h3>
</div>

{/* Card Mapeamento */}
<div className="card">
<Lottie
animationData={mapeamento}
loop={true}
className="lottie-icon"
/>
<h3>Mapeamento</h3>
</div>

{/* Card Monitoramento */}
<div className="card">
<Lottie
animationData={monitoramento}
loop={true}
className="lottie-icon"
/>
<h3>Monitoramento</h3>
</div>

{/* Card Análise de Safra */}
<div className="card">
<Lottie
animationData={analiseSafra}
loop={true}
className="lottie-icon"
/>
<h3>Análise de Safra</h3>
</div>

</div>
</section>

<section className="contato" id="contato">
    <div className="form">
        <h2>Tem perguntas?</h2>
        <input type="text" placeholder="Nome"/>
        <input type="email" placeholder="Email"/>
        <textarea placeholder="Mensagem"></textarea>
        <button>Enviar mensagem</button>
    </div>
    <div className="contato-img">
        <img src="../../public/assets/image/Mockup_cell1.png" />
    </div>
</section>

<footer className="footer">
    <div className="footer-container">
        <div className="footer-logo">
            <h2>🚁 AgroTech</h2>
            <p>Tecnologia e inteligência para o agro.</p>
        </div>
        <div className="footer-links">
            <a href="#">Início</a>
            <a href="#">Sobre</a>
            <a href="#">Contato</a>
        </div>
        <div className="footer-action">
            <a href="/app" className="footer-btn">
            Acessar Plataforma
            </a>
        </div>
    </div>
<div className="footer-bottom">
    <p>© 2026 AgroTech • Todos os direitos reservados</p>
</div>
</footer>

</>

)

}