import { useState } from "react"
import { useNavigate } from "react-router-dom"
import MenuBar from "../../components/App/Global/MenuBar"
import AppHeader from "../../components/App/Global/AppHeader"
import "../../styles/App/Explore.css"

export default function Explore() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("diagnostico") // aba ativa

  // Dados simulados para diagnóstico
  const [plantImage, setPlantImage] = useState(null)
  const [diagnosisResult, setDiagnosisResult] = useState(null)
  const [loading, setLoading] = useState(false)

  // Função para simular diagnóstico
  const handleDiagnose = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPlantImage(URL.createObjectURL(file))
      setLoading(true)
      
      // Simula processamento da IA
      setTimeout(() => {
        setDiagnosisResult({
          disease: "Ferrugem Asiática",
          confidence: 94,
          treatment: "Aplicar fungicida à base de triazol, repetir em 14 dias",
          severity: "Média",
          prevention: "Rotação de culturas e uso de cultivares resistentes"
        })
        setLoading(false)
      }, 2000)
    }
  }

  // Dados climáticos simulados
  const weatherData = {
    current: {
      temp: 28,
      humidity: 65,
      wind: 12,
      condition: "Parcialmente nublado",
      icon: "partly_cloudy_day"
    },
    forecast: [
      { day: "Hoje", temp: 28, icon: "partly_cloudy_day", rain: 10 },
      { day: "Amanhã", temp: 26, icon: "rainy", rain: 70 },
      { day: "Quarta", temp: 27, icon: "cloud", rain: 30 },
      { day: "Quinta", temp: 29, icon: "sunny", rain: 5 },
      { day: "Sexta", temp: 30, icon: "sunny", rain: 0 }
    ],
    alerts: [
      "Possibilidade de geada nas próximas 48h",
      "Ventos fortes previstos para amanhã"
    ]
  }

  // Diário da plantação
  const [diaryEntries, setDiaryEntries] = useState([
    {
      id: 1,
      date: "2024-03-15",
      title: "Aplicação de fungicida",
      description: "Aplicação preventiva no setor A12 contra ferrugem",
      type: "insumo"
    },
    {
      id: 2,
      date: "2024-03-14",
      title: "Irrigação noturna",
      description: "Irrigação programada das 20h às 22h",
      type: "irrigacao"
    },
    {
      id: 3,
      date: "2024-03-13",
      title: "Colheita do tomate",
      description: "Colheita de 500kg no setor B3",
      type: "colheita"
    }
  ])

  const [newEntry, setNewEntry] = useState({ title: "", description: "", type: "outros" })

  const addDiaryEntry = () => {
    if (newEntry.title && newEntry.description) {
      setDiaryEntries([
        {
          id: Date.now(),
          date: new Date().toISOString().split('T')[0],
          ...newEntry
        },
        ...diaryEntries
      ])
      setNewEntry({ title: "", description: "", type: "outros" })
    }
  }

  // Dados do mapa
  const farmZones = [
    { id: 1, name: "Setor A12", crop: "Soja", area: "45 ha", health: 92, color: "#4caf50" },
    { id: 2, name: "Setor B3", crop: "Tomate", area: "28 ha", health: 78, color: "#ff9800" },
    { id: 3, name: "Setor C7", crop: "Café", area: "62 ha", health: 88, color: "#2196f3" },
    { id: 4, name: "Reserva", crop: "Mata nativa", area: "15 ha", health: 100, color: "#8bc34a" }
  ]

  // Estoque
  const [inventory, setInventory] = useState([
    { id: 1, name: "Fungicida Premium", category: "Defensivo", quantity: 25, unit: "L", minStock: 20 },
    { id: 2, name: "Fertilizante NPK", category: "Fertilizante", quantity: 150, unit: "kg", minStock: 100 },
    { id: 3, name: "Sementes de Soja", category: "Semente", quantity: 300, unit: "kg", minStock: 200 },
    { id: 4, name: "Óleo diesel", category: "Combustível", quantity: 200, unit: "L", minStock: 100 },
    { id: 5, name: "Herbicida Total", category: "Defensivo", quantity: 15, unit: "L", minStock: 30 }
  ])

  const [showAddItem, setShowAddItem] = useState(false)
    const [showAddEntry, setShowAddEntry] = useState(false)
  const [newItem, setNewItem] = useState({ name: "", category: "", quantity: "", unit: "L", minStock: "" })

  const addInventoryItem = () => {
    if (newItem.name && newItem.category && newItem.quantity) {
      setInventory([
        ...inventory,
        {
          id: Date.now(),
          ...newItem,
          quantity: parseFloat(newItem.quantity),
          minStock: parseFloat(newItem.minStock) || 0
        }
      ])
      setNewItem({ name: "", category: "", quantity: "", unit: "L", minStock: "" })
      setShowAddItem(false)
    }
  }

  return (
    <div className="explorar-container">
      <AppHeader title="Explorar" showNotification={true} />

      {/* TABS DE NAVEGAÇÃO */}
      <div className="explorar-tabs">
        <button 
          className={`tab-btn ${activeTab === 'diagnostico' ? 'active' : ''}`}
          onClick={() => setActiveTab('diagnostico')}
        >
          <span className="material-symbols-outlined">eco</span>
          <span>Diagnóstico</span>
        </button>
        <button 
          className={`tab-btn ${activeTab === 'clima' ? 'active' : ''}`}
          onClick={() => setActiveTab('clima')}
        >
          <span className="material-symbols-outlined">cloud</span>
          <span>Clima</span>
        </button>
        <button 
          className={`tab-btn ${activeTab === 'diario' ? 'active' : ''}`}
          onClick={() => setActiveTab('diario')}
        >
          <span className="material-symbols-outlined">menu_book</span>
          <span>Diário</span>
        </button>
        <button 
          className={`tab-btn ${activeTab === 'mapa' ? 'active' : ''}`}
          onClick={() => setActiveTab('mapa')}
        >
          <span className="material-symbols-outlined">map</span>
          <span>Mapa</span>
        </button>
        <button 
          className={`tab-btn ${activeTab === 'estoque' ? 'active' : ''}`}
          onClick={() => setActiveTab('estoque')}
        >
          <span className="material-symbols-outlined">inventory</span>
          <span>Estoque</span>
        </button>
      </div>

      {/* CONTEÚDO DAS TABS */}
      <div className="explorar-content">
        
        {/* TAB DIAGNÓSTICO */}
        {activeTab === 'diagnostico' && (
          <div className="tab-pane diagnostico-pane">
            <h2>Diagnóstico de Plantas</h2>
            <p className="pane-subtitle">Tire uma foto da planta para análise por IA</p>

            <div className="upload-area glass">
              <input 
                type="file" 
                id="plant-upload" 
                accept="image/*" 
                capture="environment"
                onChange={handleDiagnose}
                hidden
              />
              <label htmlFor="plant-upload" className="upload-label">
                {!plantImage ? (
                  <>
                    <span className="material-symbols-outlined upload-icon">add_photo_alternate</span>
                    <span>Clique para tirar foto</span>
                    <span className="upload-hint">ou selecione da galeria</span>
                  </>
                ) : (
                  <img src={plantImage} alt="Planta" className="preview-image" />
                )}
              </label>
            </div>

            {loading && (
              <div className="loading-diagnose">
                <div className="spinner"></div>
                <p>Analisando imagem...</p>
              </div>
            )}

            {diagnosisResult && !loading && (
              <div className="diagnosis-result glass">
                <div className="result-header">
                  <span className="material-symbols-outlined result-icon">health_and_safety</span>
                  <h3>Resultado da Análise</h3>
                </div>

                <div className="result-item">
                  <span className="result-label">Doença detectada:</span>
                  <span className="result-value">{diagnosisResult.disease}</span>
                </div>

                <div className="result-item">
                  <span className="result-label">Confiança:</span>
                  <span className="result-value confidence">{diagnosisResult.confidence}%</span>
                </div>

                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${diagnosisResult.confidence}%` }}></div>
                </div>

                <div className="result-item">
                  <span className="result-label">Severidade:</span>
                  <span className={`result-value severity ${diagnosisResult.severity.toLowerCase()}`}>
                    {diagnosisResult.severity}
                  </span>
                </div>

                <div className="result-item">
                  <span className="result-label">Tratamento:</span>
                  <span className="result-value">{diagnosisResult.treatment}</span>
                </div>

                <div className="result-item">
                  <span className="result-label">Prevenção:</span>
                  <span className="result-value">{diagnosisResult.prevention}</span>
                </div>

                <button className="action-btn">
                  <span className="material-symbols-outlined">description</span>
                  Gerar relatório completo
                </button>
              </div>
            )}

            <div className="history-section">
              <h4>Histórico recente</h4>
              <div className="history-item glass">
                <span className="material-symbols-outlined history-icon">history</span>
                <div>
                  <p>Ferrugem - Soja (Setor A12)</p>
                  <small>12/03/2024</small>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB CLIMA */}
        {activeTab === 'clima' && (
          <div className="tab-pane clima-pane">
            <h2>Clima</h2>
            
            <div className="current-weather glass">
              <div className="weather-main">
                <span className="material-symbols-outlined weather-icon">
                  {weatherData.current.icon}
                </span>
                <div>
                  <span className="current-temp">{weatherData.current.temp}°C</span>
                  <span className="current-condition">{weatherData.current.condition}</span>
                </div>
              </div>
              
              <div className="weather-details">
                <div className="detail-item">
                  <span className="material-symbols-outlined">water_drop</span>
                  <span>{weatherData.current.humidity}% Umidade</span>
                </div>
                <div className="detail-item">
                  <span className="material-symbols-outlined">air</span>
                  <span>{weatherData.current.wind} km/h</span>
                </div>
              </div>
            </div>

            <h4>Previsão 5 dias</h4>
            <div className="forecast-grid">
              {weatherData.forecast.map((day, index) => (
                <div key={index} className="forecast-card glass">
                  <span className="forecast-day">{day.day}</span>
                  <span className="material-symbols-outlined forecast-icon">{day.icon}</span>
                  <span className="forecast-temp">{day.temp}°C</span>
                  <span className="forecast-rain">{day.rain}%</span>
                </div>
              ))}
            </div>

            {weatherData.alerts.length > 0 && (
              <div className="weather-alerts">
                <h4>Alertas</h4>
                {weatherData.alerts.map((alert, index) => (
                  <div key={index} className="alert-item glass">
                    <span className="material-symbols-outlined alert-icon">warning</span>
                    <span>{alert}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB DIÁRIO */}
        {activeTab === 'diario' && (
          <div className="tab-pane diario-pane">
            <div className="diario-header">
              <h2>Diário da Plantação</h2>
              <button 
                className="add-entry-btn"
                onClick={() => setShowAddEntry(!showAddEntry)}
              >
                <span className="material-symbols-outlined">add</span>
                Nova entrada
              </button>
            </div>

            {showAddEntry && (
              <div className="new-entry-form glass">
                <input 
                  type="text" 
                  placeholder="Título" 
                  value={newEntry.title}
                  onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
                />
                <textarea 
                  placeholder="Descrição"
                  value={newEntry.description}
                  onChange={(e) => setNewEntry({...newEntry, description: e.target.value})}
                />
                <select 
                  value={newEntry.type}
                  onChange={(e) => setNewEntry({...newEntry, type: e.target.value})}
                >
                  <option value="insumo">Aplicação de insumo</option>
                  <option value="irrigacao">Irrigação</option>
                  <option value="colheita">Colheita</option>
                  <option value="plantio">Plantio</option>
                  <option value="outros">Outros</option>
                </select>
                <button onClick={addDiaryEntry} className="save-btn">
                  Salvar entrada
                </button>
              </div>
            )}

            <div className="diary-timeline">
              {diaryEntries.map(entry => (
                <div key={entry.id} className={`timeline-item glass ${entry.type}`}>
                  <div className="timeline-date">
                    <span>{new Date(entry.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="timeline-content">
                    <h4>{entry.title}</h4>
                    <p>{entry.description}</p>
                    <span className="entry-type">{entry.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB MAPA */}
        {activeTab === 'mapa' && (
          <div className="tab-pane mapa-pane">
            <h2>Mapa da Fazenda</h2>
            
            <div className="map-container glass">
              <div className="map-placeholder">
                <span className="material-symbols-outlined map-icon">map</span>
                <p>Mapa interativo em desenvolvimento</p>
                <small>Em breve: visualização 3D da sua fazenda</small>
              </div>
            </div>

            <h4>Setores da Fazenda</h4>
            <div className="zones-list">
              {farmZones.map(zone => (
                <div key={zone.id} className="zone-item glass">
                  <div className="zone-header">
                    <span className="zone-name">{zone.name}</span>
                    <span className="zone-crop">{zone.crop}</span>
                  </div>
                  <div className="zone-details">
                    <span>Área: {zone.area}</span>
                    <div className="health-indicator">
                      <span>Saúde: {zone.health}%</span>
                      <div className="health-bar">
                        <div className="health-fill" style={{ width: `${zone.health}%`, background: zone.color }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB ESTOQUE */}
        {activeTab === 'estoque' && (
          <div className="tab-pane estoque-pane">
            <div className="estoque-header">
              <h2>Estoque</h2>
              <button 
                className="add-item-btn"
                onClick={() => setShowAddItem(!showAddItem)}
              >
                <span className="material-symbols-outlined">add</span>
                Adicionar
              </button>
            </div>

            {showAddEntry && (
              <div className="new-item-form glass">
                <input 
                  type="text" 
                  placeholder="Nome do produto"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                />
                <select 
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                >
                  <option value="">Categoria</option>
                  <option value="Defensivo">Defensivo</option>
                  <option value="Fertilizante">Fertilizante</option>
                  <option value="Semente">Semente</option>
                  <option value="Combustível">Combustível</option>
                  <option value="Ferramenta">Ferramenta</option>
                </select>
                <div className="quantity-inputs">
                  <input 
                    type="number" 
                    placeholder="Quantidade"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                  />
                  <select 
                    value={newItem.unit}
                    onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
                  >
                    <option value="L">L</option>
                    <option value="kg">kg</option>
                    <option value="un">un</option>
                    <option value="sacos">sacos</option>
                  </select>
                </div>
                <input 
                  type="number" 
                  placeholder="Estoque mínimo"
                  value={newItem.minStock}
                  onChange={(e) => setNewItem({...newItem, minStock: e.target.value})}
                />
                <button onClick={addInventoryItem} className="save-btn">
                  Adicionar ao estoque
                </button>
              </div>
            )}

            <div className="inventory-stats">
              <div className="stat-card glass">
                <span className="stat-value">{inventory.length}</span>
                <span>Itens totais</span>
              </div>
              <div className="stat-card glass">
                <span className="stat-value">{inventory.filter(i => i.quantity < i.minStock).length}</span>
                <span>Estoque baixo</span>
              </div>
            </div>

            <div className="inventory-list">
              {inventory.map(item => (
                <div key={item.id} className={`inventory-item glass ${item.quantity < item.minStock ? 'low-stock' : ''}`}>
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <span className="item-category">{item.category}</span>
                  </div>
                  <div className="item-quantity">
                    <span className="quantity">{item.quantity}</span>
                    <span className="unit">{item.unit}</span>
                  </div>
                  {item.quantity < item.minStock && (
                    <div className="low-stock-badge">
                      <span className="material-symbols-outlined">warning</span>
                      Estoque baixo
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <MenuBar />
    </div>
  )
}