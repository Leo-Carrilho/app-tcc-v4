import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useCamera } from "../Explore/hooks/useCamera"
import { useGallery } from "../Explore/hooks/useGallery"
import { useDiagnostico } from "../Explore/hooks/useDiagnostico"
import CameraView from "./CameraView"
import ResultCard from "./ResultCard"
import HistoryList from "./HistoryList"
import "../../../styles/App/Explore.css"

import Lottie from "lottie-react";

import cameraa from "../../../../public/assets/icons/camera.json";
import galeria from "../../../../public/assets/icons/galeria.json";

export default function DiagnosticoTab() {
  const [mode, setMode] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  
  const camera = useCamera()
  const gallery = useGallery()
  const diagnostico = useDiagnostico()

  const handleImageCapture = async (imageData) => {
    setPreviewImage(imageData)
    camera.stopCamera()
    await diagnostico.analyzeImage(imageData)
  }

  const handleGalleryPick = async () => {
    try {
      const imageData = await gallery.pickFromGallery()
      setPreviewImage(imageData)
      await diagnostico.analyzeImage(imageData)
    } catch (error) {
      console.error("Erro:", error)
    }
  }

  const resetAll = () => {
    setMode(null)
    setPreviewImage(null)
    diagnostico.resetDiagnosis()
    gallery.resetSelection()
    camera.resetCapture()
  }

  const retakePhoto = () => {
    setPreviewImage(null)
    diagnostico.resetDiagnosis()
    camera.startCamera()
  }

  if (!previewImage && !diagnostico.diagnosisResult && !mode) {
    return (
      <div className="diagnostico-container">
        <div className="options-grid">
          <motion.button
            className="option-card"
            onClick={() => {
              setMode('camera')
              camera.startCamera()
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="option-icon">
            <Lottie animationData={cameraa} loop={true} className="step-lottie"/>
            </div>
            <h3>Tirar Foto</h3>
            <p>Use a câmera do celular</p>
          </motion.button>

          <motion.button
            className="option-card"
            onClick={handleGalleryPick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="option-icon"> <Lottie animationData={galeria} loop={true} className="step-lottie"/></div>
            <h3>Galeria</h3>
            <p>Escolha uma foto</p>
          </motion.button>
        </div>

        <HistoryList history={diagnostico.history} />
      </div>
    )
  }

  return (
    <div className="diagnostico-container">
      <AnimatePresence>
        {mode === 'camera' && camera.isCameraActive && !previewImage && (
          <CameraView
            videoRef={camera.videoRef}
            onCapture={() => {
              const image = camera.capturePhoto()
              if (image) handleImageCapture(image)
            }}
            onSwitchCamera={camera.switchCamera}
            onClose={() => {
              camera.stopCamera()
              setMode(null)
            }}
          />
        )}

        {previewImage && !diagnostico.isAnalyzing && !diagnostico.diagnosisResult && (
          <motion.div 
            className="preview-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <img src={previewImage} alt="Preview" className="preview-image" />
            <div className="preview-actions">
              <button onClick={retakePhoto} className="preview-btn">🔄 Refazer</button>
              <button onClick={() => diagnostico.analyzeImage(previewImage)} className="preview-btn primary">🔍 Analisar</button>
            </div>
          </motion.div>
        )}

        {diagnostico.isAnalyzing && (
          <motion.div 
            className="analyzing-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="spinner" />
            <p>Analisando imagem...</p>
          </motion.div>
        )}

        {diagnostico.diagnosisResult && (
          <ResultCard 
            result={diagnostico.diagnosisResult}
            image={previewImage}
            onNewDiagnosis={resetAll}
          />
        )}
      </AnimatePresence>
    </div>
  )
}