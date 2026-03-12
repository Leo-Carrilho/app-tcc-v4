import { useEffect } from "react"
import "../../../styles/App/Explore.css"

export default function CameraView({ videoRef, onCapture, onSwitchCamera, onClose }) {
  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  return (
    <div className="camera-container">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="camera-video"
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
        <button onClick={onClose} className="camera-btn">✕</button>
        <button onClick={onCapture} className="capture-btn">
          <div className="capture-inner" />
        </button>
        <button onClick={onSwitchCamera} className="camera-btn">🔄</button>
      </div>
    </div>
  )
}