import React from "react";
import "../styles/LoginPage.css"; 
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="logo">SOP</h1>

        <input type="email" placeholder="EMAIL" className="input-field" />
        <input type="password" placeholder="SENHA" className="input-field" />

        <button className="login-button">
        <Link to="/tarefas" className="tarefas-link">
       LOGIN
       </Link></button>
        <br />

        <div className="links">
       <Link to="/confirmacao-email" className="cadastroemail-link">
       ESQUECI MINHA SENHA
       </Link>
        <Link to="/cadastro" className="cadastro-link">
         NÃO TEM CADASTRO? CADASTRAR
        </Link>
        </div>

      </div>
    </div>
  );
}
