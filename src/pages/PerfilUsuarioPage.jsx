import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import MenuInferior from '../components/MenuInferior'; 
import '../styles/PerfilUsuarioPage.css';

export default function PerfilUsuarioPage() {
    // Dados simulados do usuário (em uma aplicação real viriam de um Contexto ou API)
    const [usuario, setUsuario] = useState({
        nome: 'João Silva',
        email: 'joao.silva@exemplo.com',
        senha: 'senha123', // Senha real (seria hash no backend)
        fotoUrl: 'https://via.placeholder.com/150/007bff/ffffff?text=JS' // URL de uma foto
    });
    
    const [mostrarSenha, setMostrarSenha] = useState(false);

    // Função que seria usada para atualizar dados (simulada)
    const handleSalvar = () => {
        alert('Dados salvos! (Funcionalidade de API simulada)');
        // Aqui você faria a chamada para a API para salvar as alterações
    };

    return (
        <div className="perfil-container">
            <h1 className="titulo">
                <User size={24} style={{marginRight: '10px'}} /> 
                Meu Perfil
            </h1>

            {/* Seção da Foto */}
            <div className="perfil-foto-secao">
                <div className="foto-wrapper">
                    <img 
                        src={usuario.fotoUrl} 
                        alt={`Foto de perfil de ${usuario.nome}`} 
                        className="foto-perfil" 
                    />
                    <button className="btn-mudar-foto" title="Mudar Foto">
                        <Camera size={20} />
                    </button>
                </div>
            </div>

            {/* Campos de Informações */}
            <div className="info-campos">
                
                {/* Campo Nome */}
                <div className="campo-item">
                    <label htmlFor="nome"><User size={20} /> Nome</label>
                    <input 
                        id="nome"
                        type="text"
                        value={usuario.nome}
                        onChange={(e) => setUsuario({...usuario, nome: e.target.value})}
                    />
                </div>

                {/* Campo E-mail */}
                <div className="campo-item">
                    <label htmlFor="email"><Mail size={20} /> E-mail</label>
                    <input 
                        id="email"
                        type="email"
                        value={usuario.email}
                        onChange={(e) => setUsuario({...usuario, email: e.target.value})}
                    />
                </div>

                {/* Campo Senha */}
                <div className="campo-item">
                    <label htmlFor="senha"><Lock size={20} /> Senha</label>
                    <div className="input-senha-wrapper">
                        <input 
                            id="senha"
                            type={mostrarSenha ? "text" : "password"}
                            value={usuario.senha}
                            onChange={(e) => setUsuario({...usuario, senha: e.target.value})}
                        />
                        <button 
                            className="btn-mostrar-senha"
                            onClick={() => setMostrarSenha(!mostrarSenha)}
                            title={mostrarSenha ? "Ocultar Senha" : "Mostrar Senha"}
                        >
                            {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>
                
            </div>
            
            <button 
                className="btn-salvar" 
                onClick={handleSalvar}
            >
                Salvar Alterações
            </button>
            
            {/* O Menu Inferior fixo pode ser mantido aqui */}
            <MenuInferior /> 
        </div>
    );
}