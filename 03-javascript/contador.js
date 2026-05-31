// script.js — Contador Interativo

// ============================================
// 1. SELECIONANDO OS ELEMENTOS DO DOM
// ============================================
const display = document.querySelector("#display");
const btnAumentar = document.querySelector("#btn-aumentar");
const btnDiminuir = document.querySelector("#btn-diminuir");
const btnZerar = document.querySelector("#btn-zerar");
const mensagem = document.querySelector("#mensagem");

// ============================================
// 2. ESTADO DA APLICAÇÃO
// ============================================
let contador = 0; // variável que guarda o valor atual
const MAXIMO = 10;
const MINIMO = -10;

// ============================================
// 3. FUNÇÕES
// ============================================

// Atualiza o DOM com o valor atual do contador
function atualizarDisplay() {
  display.textContent = contador;

  // Muda a cor baseado no valor
  if (contador > 0) {
    display.style.color = "#16a34a"; // verde
  } else if (contador < 0) {
    display.style.color = "#dc2626"; // vermelho
  } else {
    display.style.color = "#2563eb"; // azul (neutro)
  }
}

// Efeito de pulsação visual
function pulsar() {
  display.classList.add("pulsar");
  setTimeout(() => display.classList.remove("pulsar"), 150);
  // setTimeout executa uma função após N milissegundos
  // Você aprenderá mais sobre isso no módulo de async
}

// Exibe uma mensagem temporária
function exibirMensagem(texto) {
  mensagem.textContent = texto;
  setTimeout(() => {
    mensagem.textContent = "";
  }, 2000); // Limpa depois de 2 segundos
}

// ============================================
// 4. EVENT LISTENERS
// ============================================

btnAumentar.addEventListener("click", () => {
  if (contador >= MAXIMO) {
    exibirMensagem(`Máximo atingido: ${MAXIMO}`);
    return; // Interrompe a função aqui
  }
  contador++;       // Incrementa o estado
  atualizarDisplay(); // Atualiza a UI
  pulsar();
});

btnDiminuir.addEventListener("click", () => {
  if (contador <= MINIMO) {
    exibirMensagem(`Mínimo atingido: ${MINIMO}`);
    return;
  }
  contador--;
  atualizarDisplay();
  pulsar();
});

btnZerar.addEventListener("click", () => {
  contador = 0;
  atualizarDisplay();
  exibirMensagem("Contador zerado!");
});

// Bonus: controle pelo teclado
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp")   btnAumentar.click();
  if (e.key === "ArrowDown") btnDiminuir.click();
  if (e.key === "r" || e.key === "R") btnZerar.click();
});