import React from 'react';
import { Filter, Bell } from 'lucide-react';
import '../styles/MenuSuperior.css';

export default function MenuSuperior() {
  
  // Função de exemplo para o filtro
  const handleFiltroClick = () => {
    console.log('Filtro clicado! Abre o painel de filtros.');
    // Implementar a lógica de abrir o modal ou painel de filtros
  };

  // Função de exemplo para o sino
  const handleNotificacaoClick = () => {
    console.log('Sino clicado! Abre a lista de notificações.');
    // Implementar a lógica de exibir as notificações
  };

  return (
    <header className="menu-superior-container">
      
      {/* Lado Esquerdo: Filtro */}
      <button 
        className="menu-icon-btn filtro-btn"
        onClick={handleFiltroClick}
        aria-label="Filtro"
      >
        <Filter size={24} />
      </button>

      {/* Lado Direito: Sino de Notificação */}
      <button 
        className="menu-icon-btn notificacao-btn"
        onClick={handleNotificacaoClick}
        aria-label="Notificações"
      >
        <Bell size={24} />
      </button>

    </header>
  );
}