import React, { useState, useEffect } from "react";
import "../styles/CadastrarTarefaPage.css";
import MenuSuperior from "../components/MenuSuperior";
import MenuInferior from "../components/MenuInferior";

export default function CadastrarTarefaPage() {
  const [categorias, setCategorias] = useState([]);
  const [novaCategoria, setNovaCategoria] = useState("");
  const [form, setForm] = useState({
    categoria: "",
    titulo: "",
    descricao: "",
    data: "",
    prioridade: "",
  });

  // Carrega categorias salvas ao iniciar
  useEffect(() => {
    const categoriasSalvas = JSON.parse(localStorage.getItem("categorias")) || [
      "Trabalho",
      "Pessoal",
      "Finanças",
      "Estudos",
    ];
    setCategorias(categoriasSalvas);
  }, []);

  // Salva nova categoria
  const cadastrarNovaCategoria = () => {
    if (novaCategoria.trim() && !categorias.includes(novaCategoria)) {
      const novas = [...categorias, novaCategoria];
      setCategorias(novas);
      localStorage.setItem("categorias", JSON.stringify(novas));
      setNovaCategoria("");
      alert("Categoria cadastrada com sucesso!");
    }
  };

  // Atualiza campos
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCadastrar = () => {
    // 🔹 Valida campos obrigatórios
    if (!form.categoria || !form.titulo || !form.data || !form.prioridade) {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || [];
    const novaTarefa = { ...form, id: Date.now(), concluida: false };
    localStorage.setItem("tarefas", JSON.stringify([...tarefasSalvas, novaTarefa]));

    alert("Tarefa cadastrada com sucesso!");
    window.location.href = "/tarefas";
  };

  return (
    <div className="pagina-cadastro">
      <MenuSuperior />

      <div className="titulo-container">
        <h1 className="titulo">CADASTRAR TAREFA</h1>
      </div>

      <div className="cadastro-container">
        <form className="form-tarefa" onSubmit={(e) => e.preventDefault()}>
          
          {/* CATEGORIA EXISTENTE */}
          <div className="input-group">
            <label>CATEGORIA EXISTENTE *</label>
            <select
              name="categoria"
              required
              value={form.categoria}
              onChange={handleChange}
            >
              <option value="">Selecione...</option>
              {categorias.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* NOVA CATEGORIA */}
          <div className="input-group nova-categoria-group">
            <label>NOVA CATEGORIA</label>
            <div className="nova-categoria-input">
              <input
                type="text"
                value={novaCategoria}
                onChange={(e) => setNovaCategoria(e.target.value)}
                placeholder="Digite o nome da nova categoria"
              />
              <button
                type="button"
                onClick={cadastrarNovaCategoria}
                className="btn-nova-categoria"
              >
                +
              </button>
            </div>
          </div>

          {/* TÍTULO */}
          <div className="input-group">
            <label>TÍTULO *</label>
            <input
              type="text"
              name="titulo"
              required
              value={form.titulo}
              onChange={handleChange}
              placeholder="Título da tarefa"
            />
          </div>

          {/* DESCRIÇÃO */}
          <div className="input-group">
            <label>DESCRIÇÃO</label>
            <textarea
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              placeholder="Detalhes da tarefa"
              rows="3"
            ></textarea>
          </div>

          {/* DATA */}
          <div className="input-group">
            <label>DATA *</label>
            <input
              type="date"
              name="data"
              required
              value={form.data}
              onChange={handleChange}
            />
          </div>

          {/* PRIORIDADE */}
          <div className="input-group">
            <label>PRIORIDADE *</label>
            <select
              name="prioridade"
              required
              value={form.prioridade}
              onChange={handleChange}
            >
              <option value="">Selecione...</option>
              <option value="Baixa">Baixa</option>
              <option value="Média">Média</option>
              <option value="Alta">Alta</option>
            </select>
          </div>

          <div className="botao-centralizado">
            <button
              type="button"
              className="btn-cadastrar"
              onClick={handleCadastrar}
            >
              CADASTRAR
            </button>
          </div>

        </form>
      </div>

      <MenuInferior />
    </div>
  );
}

