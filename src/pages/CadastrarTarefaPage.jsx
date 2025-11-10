import React from "react";
import "../styles/CadastrarTarefaPage.css";
import MenuSuperior from "../components/MenuSuperior";
import MenuInferior from "../components/MenuInferior";

// Removendo imports não utilizados, como CheckSquare, Calendar e Link do react-router-dom, pois o MenuInferior será importado em App.js
// import { CheckSquare, Calendar } from "lucide-react"; 
// import { Link } from "react-router-dom"; 

export default function CadastrarTarefaPage() {
  return (
    // Certifique-se de que o CSS para esta página tenha padding-bottom suficiente
    // para o conteúdo não ser escondido pelo menu fixo que será colocado no App.js
    <div className="cadastro-container">
       {/* Menu superior fixo */}
            <MenuSuperior />
      
      <h1 className="titulo">CADASTRAR TAREFA</h1>

      <form className="form-tarefa">
        <div className="input-group">
          <label>CATEGORIA</label>
          <input type="text" placeholder=" " />
        </div>

        <div className="input-group">
          <label>TÍTULO</label>
          <input type="text" placeholder=" " />
        </div>

        <div className="input-group">
          <label>DESCRIÇÃO</label>
          <textarea placeholder=" " rows="3"></textarea>
        </div>

        <div className="input-group">
          <label>DATA</label>
          <input type="date" />
        </div>

        <div className="input-group">
          <label>PRIORIDADE</label>
          <input type="text" placeholder=" " />
        </div>

        <button type="button" className="btn-cadastrar">
          CADASTRAR
        </button>
      </form>

         {/* Menu inferior fixo */}
            <MenuInferior />


      
    </div>
  );
}