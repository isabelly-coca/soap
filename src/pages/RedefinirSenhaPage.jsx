import { useState } from "react";
import { Link } from "react-router-dom";
import"../styles/RedefinirSenhaPage.css";

function RedefinirSenhaPage() {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleRedefinir = () => {
    if (!novaSenha || !confirmarSenha) {
      alert("Preencha todos os campos!");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    alert("Senha redefinida com sucesso!");
  };

  return (
    <div className="reset-container">
      <div className="reset-box">
        {/* Botão Voltar */}
        <Link to="/" className="btn-voltar">← Voltar</Link>

        <h2 className="reset-title">REDEFINIR SENHA</h2>

        <label className="reset-label">Nova senha</label>
        <input
          type="password"
          className="reset-input"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)} />

        <label className="reset-label">Confirmar senha</label>
        <input
          type="password"
          className="reset-input"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)} />

        <button className="reset-button" onClick={handleRedefinir}>
          REDEFINIR
        </button>
      </div>
    </div>
  );
}

export default RedefinirSenhaPage;

