import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/ConfirmacaoEmail.css";// Certifique-se de que o nome do CSS está correto

const CODIGO_DIGITOS = 6; 

export default function LinkEnviadoPage() {
    const [codigo, setCodigo] = useState(new Array(CODIGO_DIGITOS).fill(""));
    const [carregando, setCarregando] = useState(false);
    const [mensagem, setMensagem] = useState("");
    
    const inputRefs = useRef([]); 
    const navigate = useNavigate();

    // Lógica de handleChange e handleKeyDown (permanece a mesma)
    const handleChange = (element, index) => {
        const valor = element.value;
        if (isNaN(valor) || valor.length > 1) return;

        const novoCodigo = [...codigo];
        novoCodigo[index] = valor;
        setCodigo(novoCodigo);

        if (valor !== "" && index < CODIGO_DIGITOS - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && codigo[index] === "" && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    // Lógica de handleVerificar (permanece a mesma)
    const handleVerificar = async () => {
        const codigoCompleto = codigo.join("");
        
        if (codigoCompleto.length !== CODIGO_DIGITOS) {
            setMensagem("O código deve ter 6 dígitos.");
            return;
        }

        setCarregando(true);
        setMensagem("");

        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const codigoCorreto = "123456"; 
        const sucessoSimulado = codigoCompleto === codigoCorreto;

        if (sucessoSimulado) {
            navigate('/redefinir-senha'); 
        } else {
            setMensagem("Código inválido ou expirado. Tente novamente.");
        }
        setCarregando(false);
    };

    return (
        <div className="reset-container">
            <div className="reset-box">
                
                <Link to="/confirmacao-email" className="btn-voltar">
                    ← Reenviar E-mail
                </Link>

                <h2 className="reset-title">DIGITE O CÓDIGO</h2>
                
                {/* 💡 SUBSTITUIÇÃO 1: Usando classe para mensagem de instrução */}
                <p className="codigo-instrucao-texto">
                    Insira o código de {CODIGO_DIGITOS} dígitos que você recebeu no seu e-mail.
                </p>

                {/* 💡 SUBSTITUIÇÃO 2: Usando classe para contêiner de inputs */}
                <div className="codigo-input-container">
                    {codigo.map((d, index) => (
                        <input
                            key={index}
                            type="text"
                            name={`codigo-${index}`}
                            maxLength="1"
                            value={d}
                            onChange={e => handleChange(e.target, index)}
                            onKeyDown={e => handleKeyDown(e, index)}
                            ref={el => inputRefs.current[index] = el}
                            disabled={carregando}
                            
                            // 💡 SUBSTITUIÇÃO 3: Usando classe para o input individual
                            className="codigo-input"
                        />
                    ))}
                </div>
                

{mensagem && (
    <p 
        // ✅ O atributo className DEVE estar dentro da tag de abertura <p>
        className="mensagem-feedback"
        // ✅ Estilo condicional (para deixar vermelho se for erro)
        style={{ color: mensagem.includes("inválido") ? 'red' : '#3d4b68' }}
    >
        {mensagem}
    </p>
)}        
                
                <button 
                    // 💡 SUBSTITUIÇÃO 5: Usando classe auxiliar para largura do botão
                    className="reset-button verificar" 
                    onClick={handleVerificar}
                    disabled={carregando}
                >
                    {carregando ? "VERIFICANDO..." : "VERIFICAR CÓDIGO"}
                </button>
            </div>
        </div>
    );
}