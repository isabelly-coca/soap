import React, { useState } from "react";
// 💡 IMPORTANTE: Importe 'useNavigate' para o redirecionamento
import { Link, useNavigate } from "react-router-dom"; 
// Certifique-se de que o nome do seu CSS está correto (era ResetSenha.css, mas se vc renomeou...)
import "../styles/ConfirmacaoEmail.css"; 

// Se o nome do arquivo for Confirmacao_Email.jsx, mantenha:
// export default function ConfirmacaoEmail() { 
export default function ConfirmacaoEmail() { 
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  
  // 💡 Inicializar o hook de navegação
  const navigate = useNavigate(); 

  const handleSolicitar = async () => {
    if (!email) {
      setMensagem("Por favor, informe seu e-mail.");
      return;
    }

    setCarregando(true);
    setMensagem("");

    // ----------------------------------------------------
    // 💡 SIMULAÇÃO DE CHAMADA DE API
    // ----------------------------------------------------
    // Apenas aguardamos 2 segundos para simular a latência da rede
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulação: A resposta é sempre um SUCESSO.
    const sucessoSimulado = true;
    // ----------------------------------------------------


    if (sucessoSimulado) {
      // Se a simulação for bem-sucedida, NAVEGUE para a tela de feedback
      // (Assumindo que a rota é '/link-enviado' conforme discutido anteriormente)
      navigate('/link-enviado'); 
    } else {
      // Este bloco só seria executado se a simulação fosse 'false'
      setMensagem("Ocorreu um erro ao processar. Tente novamente.");
      setCarregando(false);
    }
    
    // 💡 NOTA: Não precisamos de 'catch' na simulação, apenas na API real.
  };

  return (
    <div className="reset-container">
      <div className="reset-box">
        
        <Link to="/" className="btn-voltar">
          ← Voltar
        </Link>
        
        <h2 className="reset-title">SOLICITAR REDEFINIÇÃO</h2> 
        
        <label className="reset-label">E-mail</label>
        <input 
          type="email" 
          placeholder="Seu endereço de e-mail" 
          className="reset-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={carregando}
        />

        {mensagem && (
          <p style={{ color: mensagem.includes("Erro") ? 'red' : '#3d4b68', margin: '15px 0' }}>
            {mensagem}
          </p>
        )}

        <button 
          className="reset-button"
          onClick={handleSolicitar}
          disabled={carregando}
        >
          {carregando ? "ENVIANDO..." : "ENVIAR LINK"}
        </button>
      </div>
    </div>
  );
}
