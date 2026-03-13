// src/components/App/Explore/DiagnosticoTab.jsx
import { useState } from 'react';
import { useDiagnosisDB } from '../../../hooks/useDiagnosisDB';
import { useCamera } from './hooks/useCamera';

export default function DiagnosticoTab() {
  const {
    diagnoses,
    loading,
    error,
    stats,
    saveDiagnosis,
    deleteDiagnosis,
    search
  } = useDiagnosisDB();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDiagnoses, setFilteredDiagnoses] = useState([]);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);
  const { capturedImage, startCamera, capturePhoto } = useCamera();

  // Buscar ao digitar
  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim()) {
      const results = await search({ disease: term });
      setFilteredDiagnoses(results);
    } else {
      setFilteredDiagnoses([]);
    }
  };

  // Processar imagem e salvar
  const handleAnalyze = async () => {
    // Simular resultado da IA
    const diagnosisResult = {
      imageData: capturedImage,
      disease: 'Ferrugem Asiática',
      confidence: 98,
      severity: 'Moderada',
      plantType: 'Soja',
      description: 'Doença fúngica que afeta as folhas...',
      treatment: 'Aplicar fungicida...'
    };

    await saveDiagnosis(diagnosisResult);
  };

  return (
    <div className="diagnostico-container">
      {/* Estatísticas */}
      {stats && (
        <div className="stats-cards">
          <div className="stat-card">
            <span className="material-symbols-outlined">photo_camera</span>
            <div>
              <h3>{stats.total}</h3>
              <p>Total de Diagnósticos</p>
            </div>
          </div>
          <div className="stat-card">
            <span className="material-symbols-outlined">grass</span>
            <div>
              <h3>{Object.keys(stats.byPlantType).length}</h3>
              <p>Tipos de Plantas</p>
            </div>
          </div>
          <div className="stat-card">
            <span className="material-symbols-outlined">analytics</span>
            <div>
              <h3>{stats.averageConfidence.toFixed(1)}%</h3>
              <p>Confiança Média</p>
            </div>
          </div>
        </div>
      )}

      {/* Barra de busca */}
      <div className="search-bar">
        <span className="material-symbols-outlined">search</span>
        <input
          type="text"
          placeholder="Buscar por doença..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Lista de diagnósticos */}
      <div className="diagnoses-list">
        <h3>Histórico de Diagnósticos</h3>
        
        {loading && <div className="loading">Carregando...</div>}
        {error && <div className="error">{error}</div>}

        <div className="diagnoses-grid">
          {(searchTerm ? filteredDiagnoses : diagnoses).map(diagnosis => (
            <div 
              key={diagnosis.id} 
              className="diagnosis-card"
              onClick={() => setSelectedDiagnosis(diagnosis)}
            >
              {diagnosis.imageData && (
                <img 
                  src={diagnosis.imageData} 
                  alt={diagnosis.disease}
                  className="diagnosis-image"
                />
              )}
              <div className="diagnosis-info">
                <h4>{diagnosis.disease}</h4>
                <p className="plant-type">{diagnosis.plantType}</p>
                <div className="confidence-bar">
                  <div 
                    className="confidence-fill"
                    style={{ width: `${diagnosis.confidence}%` }}
                  />
                </div>
                <p className="confidence">{diagnosis.confidence}% confiança</p>
                <p className="date">
                  {new Date(diagnosis.date).toLocaleDateString('pt-BR')}
                </p>
                <span className={`severity-badge ${diagnosis.severity?.toLowerCase()}`}>
                  {diagnosis.severity}
                </span>
              </div>
              <button 
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm('Deletar diagnóstico?')) {
                    deleteDiagnosis(diagnosis.id);
                  }
                }}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          ))}
        </div>

        {diagnoses.length === 0 && !loading && (
          <div className="empty-state">
            <span className="material-symbols-outlined">image_search</span>
            <p>Nenhum diagnóstico encontrado</p>
            <button onClick={startCamera}>
              Fazer primeiro diagnóstico
            </button>
          </div>
        )}
      </div>

      {/* Modal de detalhes */}
      {selectedDiagnosis && (
        <div className="modal-overlay" onClick={() => setSelectedDiagnosis(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedDiagnosis(null)}>
              <span className="material-symbols-outlined">close</span>
            </button>
            
            <img src={selectedDiagnosis.imageData} alt={selectedDiagnosis.disease} />
            
            <h2>{selectedDiagnosis.disease}</h2>
            
            <div className="modal-details">
              <p><strong>Planta:</strong> {selectedDiagnosis.plantType}</p>
              <p><strong>Confiança:</strong> {selectedDiagnosis.confidence}%</p>
              <p><strong>Severidade:</strong> {selectedDiagnosis.severity}</p>
              <p><strong>Data:</strong> {new Date(selectedDiagnosis.date).toLocaleString('pt-BR')}</p>
              
              <h4>Descrição</h4>
              <p>{selectedDiagnosis.description}</p>
              
              <h4>Tratamento</h4>
              <p>{selectedDiagnosis.treatment}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}