import React, { useState } from "react";
import "../styles/TarefasPage.css";
import { Link } from "react-router-dom";
import MenuInferior from "../components/MenuInferior";
import MenuSuperior from "../components/MenuSuperior";

// Valores fixos para os seletores (melhora a usabilidade)
const PRIORIDADES = ["Baixa", "Média", "Alta"];
const CATEGORIAS = ["Trabalho", "Pessoal", "Finanças", "Saúde", "Estudos", "Outro"];

// Função utilitária para gerar IDs únicos (melhor do que usar index)
let nextId = 4;

export default function TarefasPage() {
  // 1. ESTRUTURA DE ESTADO DE TAREFAS ATUALIZADA
  const [tarefas, setTarefas] = useState([
    
    {
      id: 2,
      titulo: "Pagar fatura do cartão",
      descricao: "Acessar o app do banco e realizar o pagamento.",
      categoria: "Finanças",
      data: "2025-11-10",
      prioridade: "Alta",
      concluida: false,
    },
    {
      id: 3,
      titulo: "Ler livro",
      descricao: "Ler as próximas 10 páginas do livro atual.",
      categoria: "Estudos",
      data: "2025-11-09",
      prioridade: "Média",
      concluida: true, // Exemplo de tarefa já concluída
    },
  ]);

  // Novo estado para controlar a tarefa e seus dados enquanto está sendo editada
  const [edicaoAtual, setEdicaoAtual] = useState(null); // Objeto da tarefa em edição ou null

  // ------------------------------------
  // FUNÇÕES DE AÇÃO (Concluir, Excluir, Editar)
  // ------------------------------------

  // Função para alternar o estado de 'concluida'
  const alternarTarefa = (id) => {
    // Se estiver no modo de edição, não faz nada
    if (edicaoAtual && edicaoAtual.id === id) return; 

    setTarefas(
      tarefas.map((t) =>
        t.id === id ? { ...t, concluida: !t.concluida } : t
      )
    );
  };

  // Função para excluir uma tarefa
  const excluirTarefa = (id, e) => {
    e.stopPropagation(); // Evita que o clique no botão ative a alternarTarefa
    setTarefas(tarefas.filter((t) => t.id !== id));
  };

  // Função para iniciar o modo de edição
  const iniciarEdicao = (tarefa, e) => {
    e.stopPropagation();
    // Clona o objeto da tarefa para não modificar o estado original diretamente
    setEdicaoAtual({ ...tarefa }); 
  };

  // Função para atualizar os campos enquanto o usuário digita/seleciona
  const handleEdicaoChange = (e) => {
    const { name, value } = e.target;
    setEdicaoAtual({
      ...edicaoAtual,
      [name]: value, // Atualiza o campo dinamicamente (titulo, descricao, etc.)
    });
  };

  // Função para salvar a edição
  const salvarEdicao = (e) => {
    e.preventDefault(); // Impede o recarregamento da página se estiver dentro de um form
    
    // Atualiza o array principal de tarefas
    setTarefas(
      tarefas.map((t) =>
        t.id === edicaoAtual.id ? edicaoAtual : t // Substitui a tarefa antiga pela nova
      )
    );
    setEdicaoAtual(null); // Sai do modo de edição
  };

  const cancelarEdicao = () => {
    setEdicaoAtual(null);
  };

  // ------------------------------------
  // COMPONENTE DE EDIÇÃO (Formulário)
  // ------------------------------------

  const EdicaoForm = ({ tarefa }) => (
    <form onSubmit={salvarEdicao} className="edicao-form">
      {/* TÍTULO */}
      <input
        type="text"
        name="titulo"
        value={edicaoAtual.titulo}
        onChange={handleEdicaoChange}
        placeholder="Título"
        required
      />

      {/* DESCRIÇÃO */}
      <textarea
        name="descricao"
        value={edicaoAtual.descricao}
        onChange={handleEdicaoChange}
        placeholder="Descrição da tarefa"
      />

      <div className="edicao-row">
        {/* CATEGORIA */}
        <select 
            name="categoria" 
            value={edicaoAtual.categoria} 
            onChange={handleEdicaoChange}
        >
            {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        {/* PRIORIDADE */}
        <select 
            name="prioridade" 
            value={edicaoAtual.prioridade} 
            onChange={handleEdicaoChange}
        >
            {PRIORIDADES.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      {/* DATA */}
      <label>Data:</label>
      <input
        type="date"
        name="data"
        value={edicaoAtual.data}
        onChange={handleEdicaoChange}
      />
      
      {/* BOTÕES DE AÇÃO */}
      <div className="botoes-salvar-cancelar">
        <button type="submit" className="btn-salvar">Salvar</button>
        <button type="button" onClick={cancelarEdicao} className="btn-cancelar">Cancelar</button>
      </div>
    </form>
  );

  // ------------------------------------
  // RENDERIZAÇÃO PRINCIPAL
  // ------------------------------------

  return (
    <div className="tarefas-container">
      <MenuSuperior />
      <h1 className="titulo-tarefas">TAREFAS</h1>

      <div className="lista-tarefas">
        {tarefas.map((tarefa) => {
          const isEditing = edicaoAtual && edicaoAtual.id === tarefa.id;

          return (
            <div
              key={tarefa.id}
              className={`tarefa-item ${tarefa.concluida ? "concluida" : ""}`}
              onClick={() => alternarTarefa(tarefa.id)} 
            >
              {isEditing ? (
                // RENDERIZA O FORMULÁRIO DE EDIÇÃO
                <EdicaoForm tarefa={tarefa} />
              ) : (
                // MODO DE VISUALIZAÇÃO AJUSTADO
                <>
                  <input
                    type="checkbox"
                    checked={tarefa.concluida}
                    readOnly
                  />
                  
                  <div className="tarefa-detalhes">
                    {/* LINHA 1: TÍTULO E PRIORIDADE */}
                    <div className="tarefa-header-info">
                        <span className="tarefa-titulo">{tarefa.titulo}</span>
                        <span className="tarefa-prioridade">Prioridade: {tarefa.prioridade}</span>
                    </div>

                    {/* LINHA 2: CATEGORIA E DATA */}
                    <div className="tarefa-meta-info">
                        <span className="tarefa-categoria">Categoria: {tarefa.categoria}</span>
                        <span className="tarefa-data">Data: {new Date(tarefa.data).toLocaleDateString('pt-BR')}</span>
                    </div>
                    
                    {/* DESCRIÇÃO (opcional) */}
                    {tarefa.descricao && <p className="tarefa-descricao">{tarefa.descricao}</p>} 
                  </div>

                  {/* Botões de Ação */}
                  <div className="botoes-acao">
                    <button 
                      className="btn-editar" 
                      onClick={(e) => iniciarEdicao(tarefa, e)}
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button 
                      className="btn-excluir" 
                      onClick={(e) => excluirTarefa(tarefa.id, e)}
                      title="Excluir"
                    >
                      🗑️
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <Link to="/cadastrar-tarefa" className="btn-add">
        +
      </Link>

      <MenuInferior />
    </div>
  );
}
