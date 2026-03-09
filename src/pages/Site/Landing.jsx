import { useEffect, useState, useRef } from "react";
import "../../styles/Site/Landing.css";
import Lottie from "lottie-react";
import monitoramento from "../../../public/assets/icons/monitoramento.json.json";
import analiseSafra from "../../../public/assets/icons/analiseSafra.json.json";
import mapeamento from "../../../public/assets/icons/mapeamento.json.json";
import auxilioIA from "../../../public/assets/icons/auxilioIA.json.json";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Landing() {
  const [prompt, setPrompt] = useState(null);
  
  // Refs para os elementos que serão animados
  const headerRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroImgRef = useRef(null);
  const cardsRef = useRef([]);
  const contatoRef = useRef(null);
  const formRef = useRef(null);
  const contatoImgRef = useRef(null);

  useEffect(() => {
    // Event listener para instalação do PWA
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setPrompt(e);
    });

    // Primeiro, esconder os elementos que serão animados
    gsap.set([headerRef.current, heroTextRef.current, heroImgRef.current, 
              ...cardsRef.current, formRef.current, contatoImgRef.current, ".footer"], {
      opacity: 0
    });

    // Animação em timeline para o hero
    const heroTimeline = gsap.timeline();
    heroTimeline
      .to(headerRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
      .to(heroTextRef.current, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.4")
      .to(heroImgRef.current, { 
        x: 0, 
        opacity: 1, 
        duration: 1,
        rotation: 0,
        scale: 1,
        ease: "power3.out"
      }, "-=0.6")
      .to(".hero-buttons a, .hero-buttons button", {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4");

      gsap.to(heroImgRef.current, {
  y: -15,
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut"
});


    // Animação dos cards com stagger (efeito em cascata)
    gsap.to(cardsRef.current, {
      scrollTrigger: {
        trigger: ".servicos",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      },
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.2)"
    });

    // Animação da seção de contato
    gsap.to(formRef.current, {
      scrollTrigger: {
        trigger: ".contato",
        start: "top 70%",
      },
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    });

    gsap.to(contatoImgRef.current, {
      scrollTrigger: {
        trigger: ".contato",
        start: "top 70%",
      },
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    });

    // Animação do footer
    gsap.to(".footer", {
      scrollTrigger: {
        trigger: ".footer",
        start: "top 90%",
      },
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out"
    });

    // Setup hover animations
    const setupHoverAnimations = () => {
      cardsRef.current.forEach(card => {
        if (card) {
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
              boxShadow: "0 20px 30px rgba(0,0,0,0.1)"
            });
          });
          
          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
              boxShadow: "0 10px 20px rgba(0,0,0,0.05)"
            });
          });
        }
      });
    };

    setupHoverAnimations();

    // Cleanup do ScrollTrigger
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []); // Array vazio = executa apenas uma vez

  const instalar = () => {
    if (prompt) {
      prompt.prompt();
    }
  };

  return (
    <>
      <header ref={headerRef}>
        <h1 className="logo">AGROTECH</h1>
        <nav className="nav-menu">
          <a href="#">Home</a>
          <a href="#servicos">Serviços</a>
          <a href="#contato">Contato</a>
          <a href="/app" className="nav-btn">Nossa plataforma</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-text" ref={heroTextRef}>
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
            <button className="btn-outline" onClick={instalar}>
              Instalar App
            </button>
          </div>
        </div>
        <div className="hero-img" ref={heroImgRef}>
          <img src="../../public/assets/image/Mockup_cell2.png" alt="Mockup celular" />
        </div>
      </section>

      <section className="servicos" id="servicos">
        <h2>Serviços que oferecemos</h2>
        <div className="cards">
          {/* Card IA */}
          <div 
            className="card" 
            ref={el => cardsRef.current[0] = el}
          >
            <Lottie
              animationData={auxilioIA}
              loop={true}
              className="lottie-icon"
            />
            <h3>Auxilio de IA</h3>
          </div>

          {/* Card Mapeamento */}
          <div 
            className="card" 
            ref={el => cardsRef.current[1] = el}
          >
            <Lottie
              animationData={mapeamento}
              loop={true}
              className="lottie-icon"
            />
            <h3>Mapeamento</h3>
          </div>

          {/* Card Monitoramento */}
          <div 
            className="card" 
            ref={el => cardsRef.current[2] = el}
          >
            <Lottie
              animationData={monitoramento}
              loop={true}
              className="lottie-icon"
            />
            <h3>Monitoramento</h3>
          </div>

          {/* Card Análise de Safra */}
          <div 
            className="card" 
            ref={el => cardsRef.current[3] = el}
          >
            <Lottie
              animationData={analiseSafra}
              loop={true}
              className="lottie-icon"
            />
            <h3>Análise de Safra</h3>
          </div>
        </div>
      </section>

      <section className="contato" id="contato" ref={contatoRef}>
        <div className="form" ref={formRef}>
          <h2>Tem perguntas?</h2>
          <input type="text" placeholder="Nome" />
          <input type="email" placeholder="Email" />
          <textarea placeholder="Mensagem"></textarea>
          <button>Enviar mensagem</button>
        </div>
        <div className="contato-img" ref={contatoImgRef}>
          <img src="../../public/assets/image/Mockup_cell1.png" alt="Mockup celular" />
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
  );
}