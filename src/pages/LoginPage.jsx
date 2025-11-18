import React, { useState } from "react";
import "../styles/LoginPage.css";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  // Estados dos campos
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Função de validação de email
  const emailValido = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = () => {
    if (!email || !senha) {
      alert("Por favor, preencha o email e a senha!");
      return;
    }

    if (!emailValido(email)) {
      alert("Por favor, insira um email válido! Exemplo: nome@dominio.com");
      return;
    }

    // Aqui você pode validar com o backend mais tarde
    navigate("/tarefas");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="logo">SOP</h1>

        <input 
          type="email" 
          placeholder="EMAIL *" 
          className="input-field" 
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input 
          type="password" 
          placeholder="SENHA *" 
          className="input-field" 
          value={senha}
          required
          onChange={(e) => setSenha(e.target.value)}
        />

        <button className="login-button" onClick={handleLogin}>
          LOGIN
        </button>

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



