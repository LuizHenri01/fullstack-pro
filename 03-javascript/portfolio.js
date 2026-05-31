const botoesSelecao = document.querySelectorAll('[data-alvo]');
const paines = document.querySelectorAll('.painel-item');

function ativarPainel(alvoId) {
  paines.forEach((painel) => {
    painel.classList.toggle('ativo', painel.id === alvoId);
  });

  botoesSelecao.forEach((botao) => {
    botao.classList.toggle('ativo', botao.dataset.alvo === alvoId);
  });
}

botoesSelecao.forEach((botao) => {
  botao.addEventListener('click', () => {
    ativarPainel(botao.dataset.alvo);
  });
});

if (botoesSelecao.length > 0) {
  ativarPainel(botoesSelecao[0].dataset.alvo);
}
