import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CheckSquare, Calendar, User } from "lucide-react"; // Importando os ícones
import "../styles/MenuInferior.css"; // Assumindo que o CSS foi atualizado para usar .footer-icon (ou .icon)

export default function MenuInferior() {
  const location = useLocation();

  // Defina a URL do avatar (pode ser hardcoded ou vir de um estado/contexto)
  const perfilImageUrl = "https://i.imgur.com/Z9bV8iB.png";

  return (
    <div className="footer-menu">
      
      {/* ITEM TAREFAS */}
      <div className={`footer-item ${location.pathname === "/tarefas" ? "ativo" : ""}`}>
        <Link to="/tarefas" className="footer-link">
          <CheckSquare className="footer-icon" size={24} /> {/* Substituído a <img> por CheckSquare */}
          <span>TAREFAS</span>
        </Link>
      </div>

      {/* ITEM CALENDÁRIO */}
      <div className={`footer-item ${location.pathname === "/calendario-page" ? "ativo" : ""}`}>
        <Link to="/calendario-page" className="footer-link">
          <Calendar className="footer-icon" size={24} /> {/* Substituído a <img> por Calendar */}
          <span>CALENDÁRIO</span>
        </Link>
      </div>

{/* ITEM PERFIL (Mantendo <img> para o Avatar) */}
<Link to="/perfil-page" className="footer-item">
  {/* O avatar geralmente permanece como <img> ou componente de imagem */}
  <img
    src={perfilImageUrl}
    alt="Perfil"
    className="perfil-icon" // Mantendo a classe que deve estilizar a imagem como círculo
  />
</Link>
    </div>
  );
}
