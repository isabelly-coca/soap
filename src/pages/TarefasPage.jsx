import React, { useState, useEffect } from "react";
import "../styles/TarefasPage.css";
import { Link } from "react-router-dom";
import MenuInferior from "../components/MenuInferior";
import MenuSuperior from "../components/MenuSuperior";

const PRIORIDADES = ["Baixa", "Média", "Alta"];

/* =======================================================
   FORMULÁRIO DE EDIÇÃO — FORA DO COMPONENTE PRINCIPAL
   ======================================================= */
function EdicaoForm({
  edicaoAtual,
  handleEdicaoChange,
  salvarEdicao,
  cancelarEdicao,
  categorias,
}) {
  return (
    <form onSubmit={salvarEdicao} className="edicao-form">
      <input
        type="text"
        name="titulo"
        value={edicaoAtual.titulo}
        onChange={handleEdicaoChange}
        placeholder="Título"
        required
      />

      <textarea
        name="descricao"
        value={edicaoAtual.descricao || ""}
        onChange={handleEdicaoChange}
        placeholder="Descrição da tarefa"
      />

      <div className="edicao-row">
        <select
          name="categoria"
          value={edicaoAtual.categoria}
          onChange={handleEdicaoChange}
        >
          {categorias.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          name="prioridade"
          value={edicaoAtual.prioridade}
          onChange={handleEdicaoChange}
        >
          {PRIORIDADES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <label>Data:</label>
      <input
        type="date"
        name="data"
        value={edicaoAtual.data}
        onChange={handleEdicaoChange}
      />

      <div className="botoes-salvar-cancelar">
        <button type="submit" className="btn-salvar">
          Salvar
        </button>
        <button type="button" onClick={cancelarEdicao} className="btn-cancelar">
          Cancelar
        </button>
      </div>
    </form>
  );
}

/* =======================================================
   COMPONENTE PRINCIPAL DA PÁGINA
   ======================================================= */
export default function TarefasPage() {
  const [tarefas, setTarefas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [edicaoAtual, setEdicaoAtual] = useState(null);
  const [filtro, setFiltro] = useState({ categoria: "", prioridade: "" });

  // Carregar tarefas e categorias
  useEffect(() => {
    const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || [];
    const categoriasSalvas =
      JSON.parse(localStorage.getItem("categorias")) || [
        "Trabalho",
        "Pessoal",
        "Finanças",
        "Saúde",
        "Estudos",
        "Outro",
      ];

    setTarefas(tarefasSalvas);
    setCategorias(categoriasSalvas);
  }, []);

  // Filtro
  const tarefasFiltradas = tarefas.filter((t) => {
    const catOk = !filtro.categoria || t.categoria === filtro.categoria;
    const prioOk = !filtro.prioridade || t.prioridade === filtro.prioridade;
    return catOk && prioOk;
  });

  // Alternar conclusão
  const alternarConclusao = (id) => {
    const novas = tarefas.map((t) =>
      t.id === id ? { ...t, concluida: !t.concluida } : t
    );
    setTarefas(novas);
    localStorage.setItem("tarefas", JSON.stringify(novas));
  };

  // Excluir
  const excluirTarefa = (id, e) => {
    e.stopPropagation();
    const novas = tarefas.filter((t) => t.id !== id);
    setTarefas(novas);
    localStorage.setItem("tarefas", JSON.stringify(novas));
  };

  // Iniciar edição
  const iniciarEdicao = (tarefa, e) => {
    e.stopPropagation();
    setEdicaoAtual({ ...tarefa });
  };

  // Alterações no formulário de edição
  const handleEdicaoChange = (e) => {
    const { name, value } = e.target;
    setEdicaoAtual({ ...edicaoAtual, [name]: value });
  };

  // Salvar edição
  const salvarEdicao = (e) => {
    e.preventDefault();
    const novas = tarefas.map((t) =>
      t.id === edicaoAtual.id ? edicaoAtual : t
    );
    setTarefas(novas);
    localStorage.setItem("tarefas", JSON.stringify(novas));
    setEdicaoAtual(null);
  };

  const cancelarEdicao = () => setEdicaoAtual(null);

  return (
    <div className="tarefas-container">
      <MenuSuperior setFiltro={setFiltro} categorias={categorias} />
      <h1 className="titulo-tarefas">TAREFAS</h1>

      <div className="lista-tarefas">
        {tarefasFiltradas.length > 0 ? (
          tarefasFiltradas.map((tarefa) => {
            const isEditing = edicaoAtual && edicaoAtual.id === tarefa.id;

            return (
              <div
                key={tarefa.id}
                className={`tarefa-item ${
                  tarefa.concluida ? "concluida" : ""
                }`}
              >
                {isEditing ? (
                  <EdicaoForm
                    edicaoAtual={edicaoAtual}
                    handleEdicaoChange={handleEdicaoChange}
                    salvarEdicao={salvarEdicao}
                    cancelarEdicao={cancelarEdicao}
                    categorias={categorias}
                  />
                ) : (
                  <>
                    <div className="tarefa-conteudo">
                      <input
                        type="checkbox"
                        checked={tarefa.concluida}
                        onChange={() => alternarConclusao(tarefa.id)}
                        className="tarefa-checkbox"
                      />

                      <span
                        className={`tarefa-titulo ${
                          tarefa.concluida ? "concluida" : ""
                        }`}
                      >
                        {tarefa.titulo}
                      </span>
                    </div>

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
          })
        ) : (
          <p className="sem-tarefas">Nenhuma tarefa encontrada.</p>
        )}
      </div>

      <Link to="/cadastrar-tarefa" className="btn-add">
        +
      </Link>

      <MenuInferior />
    </div>
  );
}


