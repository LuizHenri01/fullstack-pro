// script.js — Aplicativo de Tarefas Completo

// ============================================================
// SELECIONANDO OS ELEMENTOS DO DOM
// ============================================================
const form         = document.querySelector("#form");
const inputTarefa  = document.querySelector("#input-tarefa");
const lista        = document.querySelector("#lista");
const contadores   = document.querySelector("#contadores");
const botoesFiltro = document.querySelectorAll(".filtro");

// ============================================================
// ESTADO DA APLICAÇÃO
// Sempre que o estado mudar, chamamos renderizar() para
// atualizar o DOM. Isso é o padrão "state-driven UI".
// ============================================================
let tarefas = [];         // array de objetos tarefa
let filtroAtual = "todas"; // qual filtro está ativo

// ============================================================
// FUNÇÕES PURAS — só manipulam dados, não o DOM
// ============================================================

function criarTarefa(texto) {
  return {
    id: Date.now(),          // ID único baseado no timestamp
    texto: texto.trim(),
    concluida: false,
  };
}

function tarefasFiltradas() {
  if (filtroAtual === "pendentes")  return tarefas.filter(t => !t.concluida);
  if (filtroAtual === "concluidas") return tarefas.filter(t => t.concluida);
  return tarefas; // "todas"
}

// ============================================================
// FUNÇÕES DE RENDERIZAÇÃO — atualizam o DOM
// ============================================================

function renderizar() {
  const filtradas = tarefasFiltradas();

  // Atualiza o contador
  const total     = tarefas.length;
  const concluidas = tarefas.filter(t => t.concluida).length;
  contadores.textContent = `${total} tarefa${total !== 1 ? "s" : ""} · ${concluidas} concluída${concluidas !== 1 ? "s" : ""}`;

  // Renderiza a lista
  if (filtradas.length === 0) {
    lista.innerHTML = `<li class="vazio">
      ${tarefas.length === 0 ? "Nenhuma tarefa ainda." : "Nenhuma tarefa nesse filtro."}
    </li>`;
    return;
  }

  // Cria o HTML de cada tarefa
  lista.innerHTML = filtradas.map(tarefa => `
    <li class="tarefa ${tarefa.concluida ? "concluida" : ""}" data-id="${tarefa.id}">
      <div
        class="tarefa-checkbox"
        role="checkbox"
        aria-checked="${tarefa.concluida}"
        aria-label="Marcar como ${tarefa.concluida ? "pendente" : "concluída"}"
      >${tarefa.concluida ? "✓" : ""}</div>
      <span class="tarefa-texto">${tarefa.texto}</span>
      <button class="btn-remover" aria-label="Remover tarefa">×</button>
    </li>
  `).join("");
}

// ============================================================
// EVENT LISTENERS
// ============================================================

// Adicionar tarefa
form.addEventListener("submit", (e) => {
  e.preventDefault(); // ← impede o reload da página!

  const texto = inputTarefa.value.trim();
  if (!texto) return; // não adiciona tarefa vazia

  tarefas.push(criarTarefa(texto));
  inputTarefa.value = "";
  inputTarefa.focus();
  renderizar();
});

// Concluir / remover — event delegation no container
lista.addEventListener("click", (e) => {
  const tarefa = e.target.closest(".tarefa");
  if (!tarefa) return; // clicou fora de qualquer tarefa

  const id = Number(tarefa.dataset.id);

  if (e.target.classList.contains("tarefa-checkbox") ||
      e.target.classList.contains("tarefa-texto")) {
    // Alterna o estado concluída
    const t = tarefas.find(t => t.id === id);
    if (t) t.concluida = !t.concluida;
    renderizar();
  }

  if (e.target.classList.contains("btn-remover")) {
    // Remove do array
    tarefas = tarefas.filter(t => t.id !== id);
    renderizar();
  }
});

// Filtros — event delegation nos botões de filtro
document.querySelector(".filtros").addEventListener("click", (e) => {
  const btn = e.target.closest(".filtro");
  if (!btn) return;

  // Remove ativo de todos os filtros
  botoesFiltro.forEach(b => b.classList.remove("ativo"));

  // Ativa o clicado
  btn.classList.add("ativo");
  filtroAtual = btn.dataset.filtro;

  renderizar();
});

// Atalhos de teclado
document.addEventListener("keydown", (e) => {
  // Ctrl+Z: desfaz última adição
  if (e.ctrlKey && e.key === "z" && tarefas.length > 0) {
    tarefas.pop();
    renderizar();
  }
});

// ============================================================
// INICIALIZAÇÃO
// ============================================================
renderizar();