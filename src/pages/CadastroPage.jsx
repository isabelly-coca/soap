import React, { useState } from "react";
import "../styles/CadastroPage.css";
import { Link } from "react-router-dom";

export default function CadastroPage() {
  // Estados dos campos
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // Função que envia os dados para o backend
  const handleCadastro = async () => {

    // 🔹 Verifica se todos os campos estão preenchidos
    if (!nome || !email || !senha || !confirmarSenha) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    // 🔹 Verifica se as senhas coincidem
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome,
          email: email,
          senha: senha,
        }),
      });

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
      } else {
        alert("Erro ao cadastrar usuário.");
      }
    } catch (error) {
      alert("Erro ao se conectar ao servidor.");
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-box">
        <h1 className="titulo">CADASTRO</h1>
        <Link to="/" className="btn-voltar">← Voltar</Link>

        <input
          type="text"
          placeholder="NOME"
          className="input-field"
          value={nome}
          required
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="email"
          placeholder="EMAIL"
          className="input-field"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="SENHA"
          className="input-field"
          value={senha}
          required
          onChange={(e) => setSenha(e.target.value)}
        />

        <input
          type="password"
          placeholder="CONFIRMAR SENHA"
          className="input-field"
          value={confirmarSenha}
          required
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />

        <button className="btn-cadastrar" onClick={handleCadastro}>
          CADASTRAR
        </button>
      </div>
    </div>
  );
}
