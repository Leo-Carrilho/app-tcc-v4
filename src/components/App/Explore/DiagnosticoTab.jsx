// components/App/Explore/DiagnosticoTab.jsx
import { useState, useEffect } from 'react';
import { useCamera } from './hooks/useCamera';
import { useDiagnosisDB } from '../../../hooks/useDiagnosisDB';

export default function DiagnosticoTab() {
  const [step, setStep] = useState('options'); // options, camera, gallery, preview, analyzing, result
  const [analysisResult, setAnalysisResult] = useState(null);
  const [selectedFromDB, setSelectedFromDB] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  
  // Hook da câmera
  const {
    videoRef,
    isCameraActive,
    capturedImage,
    startCamera,
    stopCamera,
    switchCamera,
    capturePhoto,
    resetCapture
  } = useCamera();

  // Hook do banco de dados
  const {
    diagnoses,
    loading,
    saveDiagnosis,
    getDiagnosisById,
    searchByDisease
  } = useDiagnosisDB();

  // Gerenciar ciclo de vida da câmera
  useEffect(() => {
    if (step === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
  }, [step]);

  // Tirar foto e ir para preview
  const handleCapture = () => {
    const photo = capturePhoto();
    if (photo) {
      setStep('preview');
    }
  };

  // Selecionar imagem da galeria do dispositivo
  const handleGallerySelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedImage(event.target.result);
        setStep('preview');
      };
      reader.readAsDataURL(file);
    }
  };

  // Selecionar diagnóstico do banco de dados
  const handleSelectFromDB = (diagnosis) => {
    setSelectedFromDB(diagnosis);
    setCapturedImage(diagnosis.imageData);
    setStep('preview');
    setShowHistory(false);
  };

  // Analisar imagem (nova ou do banco)
  const analyzeImage = async () => {
    setStep('analyzing');
    
    // Simular processamento da IA
    setTimeout(async () => {
      // Se veio do banco, pode usar dados existentes ou reanalisar
      const result = selectedFromDB ? {
        ...selectedFromDB,
        reanalyzed: true,
        date: new Date().toISOString()
      } : {
        disease: 'Ferrugem Asiática',
        confidence: Math.floor(Math.random() * 10) + 90, // 90-99%
        severity: ['Baixa', 'Moderada', 'Alta'][Math.floor(Math.random() * 3)],
        plantType: 'Soja',
        description: 'Doença fúngica que afeta principalmente as folhas, causando manchas marrons e queda prematura.',
        treatment: 'Aplicar fungicida à base de trifloxistrobina + protioconazol. Repetir em 14 dias.',
        prevention: 'Manter espaçamento adequado, evitar irrigação noturna e realizar rotação de culturas.'
      };

      setAnalysisResult(result);
      
      // Salvar novo diagnóstico apenas se não veio do banco
      if (!selectedFromDB) {
        await saveDiagnosis({
          imageData: capturedImage,
          ...result,
          date: new Date().toISOString()
        });
      }

      setStep('result');
    }, 3000);
  };

  // Fazer novo diagnóstico
  const handleNewDiagnosis = () => {
    resetCapture();
    setAnalysisResult(null);
    setSelectedFromDB(null);
    setStep('options');
  };

  // Reanalisar imagem do banco
  const handleReanalyze = (diagnosis) => {
    setSelectedFromDB(diagnosis);
    setCapturedImage(diagnosis.imageData);
    setStep('preview');
  };

  return (
    <div className="diagnostico-container">
      {/* STEP 1: OPÇÕES PRINCIPAIS */}
      {step === 'options' && (
        <>
          <div className="section-header">
            <h2 className="section-title">
              <span className="material-symbols-outlined">biotech</span>
              Diagnóstico Rápido
            </h2>
            <div className="section-badge">
              <span className="live-dot" />
              IA em tempo real
            </div>
          </div>

          {/* Opções principais */}
          <div className="options-grid">
            <div className="option-card" onClick={() => setStep('camera')}>
              <div className="card-corner" />
              <div className="option-icon">
                <span className="material-symbols-outlined">photo_camera</span>
              </div>
              <h3>Tirar Foto</h3>
              <p>Use a câmera para fotografar a planta agora</p>
            </div>

            <div className="option-card" onClick={() => document.getElementById('gallery-input').click()}>
              <div className="card-corner" />
              <div className="option-icon">
                <span className="material-symbols-outlined">photo_library</span>
              </div>
              <h3>Galeria</h3>
              <p>Escolha uma foto do seu dispositivo</p>
              <input 
                type="file" 
                accept="image/*" 
                id="gallery-input"
                style={{ display: 'none' }}
                onChange={handleGallerySelect}
              />
            </div>

            <div className="option-card" onClick={() => setShowHistory(!showHistory)}>
              <div className="card-corner" />
              <div className="option-icon">
                <span className="material-symbols-outlined">database</span>
              </div>
              <h3>Banco de Dados</h3>
              <p>Selecione um diagnóstico anterior</p>
            </div>

            <div className="option-card">
              <div className="card-corner" />
              <div className="option-icon">
                <span className="material-symbols-outlined">history</span>
              </div>
              <h3>Histórico</h3>
              <p>Veja todos os diagnósticos salvos</p>
            </div>
          </div>

          {/* Lista do banco de dados (expansível) */}
          {showHistory && (
            <div className="database-section">
              <div className="database-header">
                <h3>
                  <span className="material-symbols-outlined">storage</span>
                  Diagnósticos no Banco de Dados
                </h3>
                <button className="close-btn" onClick={() => setShowHistory(false)}>
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {loading ? (
                <div className="loading-spinner" />
              ) : (
                <div className="database-grid">
                  {diagnoses.map(diagnosis => (
                    <div 
                      key={diagnosis.id} 
                      className="database-item"
                      onClick={() => handleSelectFromDB(diagnosis)}
                    >
                      <img 
                        src={diagnosis.imageData} 
                        alt={diagnosis.disease}
                        className="database-image"
                      />
                      <div className="database-info">
                        <h4>{diagnosis.disease}</h4>
                        <p className="date">{new Date(diagnosis.date).toLocaleDateString('pt-BR')}</p>
                        <p className="confidence">{diagnosis.confidence}% confiança</p>
                        <div className="database-badges">
                          <span className={`severity-badge ${diagnosis.severity?.toLowerCase()}`}>
                            {diagnosis.severity}
                          </span>
                          <button 
                            className="reanalyze-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReanalyze(diagnosis);
                            }}
                          >
                            <span className="material-symbols-outlined">refresh</span>
                            Reanalisar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Histórico rápido */}
          <div className="history-section">
            <h3 className="history-title">
              <span className="material-symbols-outlined">history</span>
              Diagnósticos Recentes
            </h3>
            <div className="history-grid">
              {diagnoses.slice(0, 4).map(diagnosis => (
                <div 
                  key={diagnosis.id} 
                  className="history-item"
                  onClick={() => {
                    setAnalysisResult(diagnosis);
                    setStep('result');
                  }}
                >
                  <img 
                    src={diagnosis.thumbnail || diagnosis.imageData} 
                    alt={diagnosis.disease}
                    className="history-image"
                  />
                  <div className="history-info">
                    <h4>{diagnosis.disease}</h4>
                    <p>{new Date(diagnosis.date).toLocaleDateString('pt-BR')}</p>
                    <p className="history-confidence">{diagnosis.confidence}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* STEP 2: CÂMERA */}
      {step === 'camera' && (
        <div className="camera-container">
          <video 
            ref={videoRef} 
            className="camera-video" 
            autoPlay 
            playsInline 
          />
          
          <div className="camera-overlay">
            <div className="camera-frame">
              <div className="corner tl" />
              <div className="corner tr" />
              <div className="corner bl" />
              <div className="corner br" />
            </div>
          </div>

          <div className="camera-controls">
            <button className="camera-btn" onClick={() => setStep('options')}>
              <span className="material-symbols-outlined">close</span>
            </button>
            
            <button 
              className="capture-btn" 
              onClick={handleCapture}
              disabled={!isCameraActive}
            >
              <div className="capture-inner" />
            </button>
            
            <button className="camera-btn" onClick={switchCamera}>
              <span className="material-symbols-outlined">flip_camera_ios</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PREVIEW (tanto da câmera quanto do banco) */}
      {step === 'preview' && capturedImage && (
        <div className="result-card">
          <div className="result-header">
            <img 
              src={capturedImage} 
              alt="Preview" 
              className="result-image"
            />
            <div className="result-badge">
              <span className="material-symbols-outlined">
                {selectedFromDB ? 'database' : 'preview'}
              </span>
              {selectedFromDB ? 'Do Banco de Dados' : 'Prévia'}
            </div>
            {selectedFromDB && (
              <div className="original-info">
                <small>Diagnóstico original: {selectedFromDB.disease}</small>
                <small>{new Date(selectedFromDB.date).toLocaleDateString('pt-BR')}</small>
              </div>
            )}
          </div>
          
          <div className="result-content">
            <div className="preview-actions">
              <button 
                className="preview-btn" 
                onClick={() => {
                  resetCapture();
                  setSelectedFromDB(null);
                  setStep('options');
                }}
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Voltar
              </button>
              
              <button 
                className="preview-btn primary" 
                onClick={analyzeImage}
              >
                {selectedFromDB ? 'Reanalisar com IA' : 'Analisar com IA'}
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: ANALISANDO */}
      {step === 'analyzing' && (
        <div className="analyzing-container">
          <div className="loading-logo">
            <span className="material-symbols-outlined">psychiatry</span>
          </div>
          <div className="loading-spinner" />
          <h3>Analisando imagem...</h3>
          <p className="text-secondary">
            {selectedFromDB ? 'Reanalisando diagnóstico anterior' : 'IA em processamento'}
          </p>
        </div>
      )}

      {/* STEP 5: RESULTADO */}
      {step === 'result' && analysisResult && (
        <div className="result-card">
          <div className="result-header">
            <img 
              src={capturedImage || analysisResult.imageData} 
              alt="Resultado" 
              className="result-image"
            />
            <div className="result-badge">
              <span className="material-symbols-outlined">check_circle</span>
              {analysisResult.reanalyzed ? 'Reanálise concluída' : 'Diagnóstico completo'}
            </div>
          </div>

          <div className="result-content">
            <h2 className="disease-name">{analysisResult.disease}</h2>
            
            {analysisResult.reanalyzed && (
              <div className="reanalysis-badge">
                <span className="material-symbols-outlined">sync</span>
                Reanálise em {new Date(analysisResult.date).toLocaleString('pt-BR')}
              </div>
            )}
            
            <div className="confidence-section">
              <div className="confidence-label">
                <span>Nível de confiança</span>
                <span className="confidence-value">{analysisResult.confidence}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${analysisResult.confidence}%` }} 
                />
              </div>
            </div>

            <div 
              className={`severity-tag severity-${analysisResult.severity?.toLowerCase()}`}
              style={{
                borderColor: analysisResult.severity === 'Alta' ? '#ff4444' : 
                           analysisResult.severity === 'Moderada' ? '#ffaa00' : '#00ff88',
                color: analysisResult.severity === 'Alta' ? '#ff4444' : 
                      analysisResult.severity === 'Moderada' ? '#ffaa00' : '#00ff88'
              }}
            >
              Severidade: {analysisResult.severity}
            </div>

            <div className="info-section">
              <h4>
                <span className="material-symbols-outlined">description</span>
                Descrição
              </h4>
              <p>{analysisResult.description}</p>
            </div>

            <div className="info-section">
              <h4>
                <span className="material-symbols-outlined">science</span>
                Tratamento recomendado
              </h4>
              <p>{analysisResult.treatment}</p>
            </div>

            <div className="info-section">
              <h4>
                <span className="material-symbols-outlined">shield</span>
                Prevenção
              </h4>
              <p>{analysisResult.prevention}</p>
            </div>

            <div className="result-actions">
              <button className="action-btn secondary" onClick={handleNewDiagnosis}>
                <span className="material-symbols-outlined">photo_camera</span>
                Novo Diagnóstico
              </button>
              
              <button 
                className="action-btn primary"
                onClick={() => {
                  // Salvar reanálise se veio do banco
                  if (analysisResult.reanalyzed) {
                    saveDiagnosis({
                      imageData: capturedImage,
                      ...analysisResult,
                      reanalyzed: false,
                      date: new Date().toISOString()
                    });
                  }
                  setStep('options');
                }}
              >
                <span className="material-symbols-outlined">save</span>
                {analysisResult.reanalyzed ? 'Salvar Reanálise' : 'Salvar no Banco'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}