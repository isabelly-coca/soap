import React from "react";
import "../styles/CadastroPage.css";
import { Link } from "react-router-dom";


export default function CadastroPage() {
  return (
    <div className="cadastro-container">
      <div className="cadastro-box">
        <h1 className="titulo">CADASTRO</h1>

        <Link to="/" className="btn-voltar">
        ← Voltar
        </Link>


        <input type="text" placeholder="NOME" className="input-field" />
        <input type="email" placeholder="EMAIL" className="input-field" />
        <input type="password" placeholder="SENHA" className="input-field" />
        <input type="password" placeholder="CONFIRMAR SENHA" className="input-field" />

        <button className="btn-cadastrar">CADASTRAR</button>
      </div>
    </div>
  );
}
