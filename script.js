/* ===================================================
   ESTADO E VARIÁVEIS DO JOGO
   =================================================== */
let itemsCollected = {
  leite: false,
  trigo: false,
  ovo: false,
  manteiga: false
};

let totalItems = 0;

/* ===================================================
   NAVEGAÇÃO E FLUXO DAS TELAS
   =================================================== */

// Inicia o jogo ao clicar no botão PLAY
function startGame() {
  switchScreen('start-screen', 'bakery-screen');
}

// Alterna a exibição das telas do jogo
function switchScreen(fromId, toId) {
  document.getElementById(fromId).classList.remove('active');
  document.getElementById(toId).classList.add('active');
}

/* ===================================================
   FASE 1: PADARIA (ROUBO DOS INGREDIENTES)
   =================================================== */

// Coleta os itens ao clicar neles
function collectItem(id, name) {
  if (!itemsCollected[id]) {
    itemsCollected[id] = true;
    totalItems++;
    
    // Esconde o item coletado da padaria
    document.getElementById(id).style.display = 'none';
    
    const dialog = document.getElementById('bakery-dialog');
    dialog.innerText = `Você pegou: ${name}! (${totalItems}/4)`;
    
    if (totalItems === 4) {
      dialog.innerText = "Você pegou todos os ingredientes! Agora vá para a SAÍDA!";
    }
  }
}

// Valida se o Coisinho pode sair da padaria
function tryExit() {
  if (totalItems === 4) {
    // Dispara a conquista exata solicitada
    showAchievement("assaltante de padaria 🥖");
    
    // Transiciona para a cozinha após exibir a conquista
    setTimeout(() => {
      switchScreen('bakery-screen', 'kitchen-screen');
    }, 2500);
  } else {
    const dialog = document.getElementById('bakery-dialog');
    dialog.innerText = "Você ainda não pegou todos os ingredientes! A missão continua...";
  }
}

/* ===================================================
   FASE 2: COZINHA E PARABÉNS
   =================================================== */

// Mistura os ingredientes na bacia e faz o bolo aparecer
function mixIngredients() {
  // Esconde a bacia e mostra o bolo pronto
  document.getElementById('mixing-bowl').style.display = 'none';
  document.getElementById('cake').style.display = 'block';

  // Dispara a conquista do bolo com a frase personalizada
  showAchievement("Bolo de leite ninho com maracuja...embora o de chocolate com maracuja seja melhor 🍰");

  // Aparece o seu avatar, toca o parabéns e solta confetes
  setTimeout(() => {
    document.getElementById('amiga').style.display = 'block';
    document.getElementById('kitchen-dialog').innerText = "🎉 feliz aniversario Coisinho 🎉";
    createConfetti();
  }, 3500);
}

/* ===================================================
   SISTEMA DE POP-UP DE CONQUISTAS E CONFETES
   =================================================== */

// Exibe o banner de conquista no topo da tela
function showAchievement(text) {
  const popup = document.getElementById('achievement-popup');
  const title = document.getElementById('achievement-title');
  
  title.innerText = text;
  popup.classList.add('show');
  
  setTimeout(() => {
    popup.classList.remove('show');
  }, 3500);
}

// Gera a chuva de confetes pixelados no final
function createConfetti() {
  const colors = ['#00ffcc', '#ff007f', '#ffe600', '#8a2be2', '#57c7ff'];
  const container = document.getElementById('game-container');
  
  for (let i = 0; i < 60; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(confetti);
  }
}