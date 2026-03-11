// components/Profile/FarmInfoView.jsx
export default function FarmInfoView({ farmData, onAddFarm, onEditFarm, formatPhone }) {
  if (!farmData) {
    return (
      <div className="profile-card glass empty-farm">
        <div className="empty-state-tech">
          <div className="empty-icon-container">
            <span className="material-symbols-outlined empty-icon">agriculture</span>
            <div className="empty-ring"></div>
            <div className="empty-ring-2"></div>
          </div>
          <h4>Nenhuma fazenda cadastrada</h4>
          <p>Comece cadastrando sua primeira fazenda para ativar o monitoramento</p>
          <button className="empty-action-btn" onClick={onAddFarm}>
            <span className="material-symbols-outlined">add</span>
            <span>Cadastrar Fazenda</span>
            <div className="btn-glow"></div>
          </button>
        </div>
      </div>
    )
  }

  const farmItems = [
    { icon: "badge", label: "Nome da Fazenda", value: farmData.name },
    { icon: "square_foot", label: "Área Total", value: farmData.area_total ? `${parseFloat(farmData.area_total).toFixed(1)} ha` : null },
    { icon: "location_on", label: "Localização", value: farmData.municipio && farmData.uf ? `${farmData.municipio}/${farmData.uf}` : null },
    { icon: "pin_drop", label: "Bairro", value: farmData.bairro },
    { icon: "mail", label: "CEP", value: farmData.cep },
    { icon: "grass", label: "Cultura", value: farmData.plantacao },
    { icon: "call", label: "Telefone", value: farmData.telefone ? formatPhone(farmData.telefone) : null },
    { icon: "badge", label: "Tipo", value: farmData.tipo_proprietario === "PF" ? "Pessoa Física" : "Pessoa Jurídica" },
    { icon: "calendar_today", label: "Data de Aquisição", value: farmData.data_aquisicao ? new Date(farmData.data_aquisicao).toLocaleDateString('pt-BR') : null }
  ]

  return (
    <div className="profile-card glass">
      <div className="card-corner"></div>
      <div className="card-header">
        <div className="header-icon">
          <span className="material-symbols-outlined">agriculture</span>
          <div className="icon-glow"></div>
        </div>
        <h3>Minha Fazenda</h3>
        <div className="header-line"></div>
      </div>
      
      <div className="card-content">
        {farmItems.map((item, index) => (
          item.value && (
            <div key={index} className="info-item-tech">
              <div className="info-label">
                <span className="material-symbols-outlined">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              <div className="info-value">
                {item.value}
                <div className="value-glow"></div>
              </div>
            </div>
          )
        ))}

        <button className="edit-farm-btn" onClick={onEditFarm}>
          <span className="material-symbols-outlined">edit</span>
          <span>Editar Fazenda</span>
          <div className="btn-glow"></div>
          <div className="btn-progress"></div>
        </button>
      </div>
    </div>
  )
}