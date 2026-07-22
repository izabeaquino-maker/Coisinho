// ===================================================
// ESTADO E VARIÁVEIS DO JOGO
// ===================================================
let itemsCollected = {
  leite: false,
  trigo: false,
  ovo: false,
  manteiga: false
};

let totalItems = 0;

// ===================================================
// NAVEGAÇÃO E FLUXO DO JOGO
// ===================================================

// Inicia o jogo ao clicar em PLAY
function startGame() {
  switchScreen('start-screen', 'bakery-screen');
}

// Função genérica para trocar de tela
function switchScreen(fromId, toId) {
  document.getElementById(fromId).classList.remove('active');
  document.getElementById(toId).classList.add('active');
}

// ===================================================
// FASE 1: PADARIA
// ===================================================

// Coletar itens na padaria
function collectItem(id, name) {
  if (!itemsCollected[id]) {
    itemsCollected[id] = true;
    totalItems++;
    
    // Esconde o item coletado da tela
    document.getElementById(id).style.display = 'none';
    
    const dialog = document.getElementById('bakery-dialog');
    dialog.innerText = `Você pegou: ${name}! (${totalItems}/4)`;
    
    if (totalItems === 4) {
      dialog.innerText = "Você pegou todos os ingredientes! Agora vá até a SAÍDA!";
    }
  }
}

// Tentar sair da padaria
function tryExit() {
  if (totalItems === 4) {
    // Exibe conquista do assalto
    showAchievement("Assaltante de padaria 🥖");
    
    // Aguarda a animação da conquista e vai para a cozinha
    setTimeout(() => {
      switchScreen('bakery-screen', 'kitchen-screen');
    }, 2500);
  } else {
    const dialog = document.getElementById('bakery-dialog');
    dialog.innerText = "Você ainda não pegou todos os ingredientes! A missão ainda não terminou...";
  }
}

// ===================================================
// FASE 2: COZINHA & FESTA
// ===================================================

// Misturar os ingredientes na bacia
function mixIngredients() {
  // Oculta a bacia e revela o bolo
  document.getElementById('mixing-bowl').style.display = 'none';
  document.getElementById('cake').style.display = 'block';

  // Dispara a conquista do bolo com o texto exato
  showAchievement("Bolo de leite ninho com maracuja...embora o de chocolate com maracuja seja melhor 🍰");

  // Aparece seu avatar, canta parabéns e solta os confetes
  setTimeout(() => {
    document.getElementById('amiga').style.display = 'block';
    document.getElementById('kitchen-dialog').innerText = "🎉 feliz aniversario Coisinho 🎉";
    createConfetti();
  }, 3500);
}

// ===================================================
// SISTEMA DE CONQUISTAS E EFEITOS
// ===================================================

// Pop-up de conquista
function showAchievement(text) {
  const popup = document.getElementById('achievement-popup');
  const title = document.getElementById('achievement-title');
  
  title.innerText = text;
  popup.classList.add('show');
  
  setTimeout(() => {
    popup.classList.remove('show');
  }, 3500);
}

// Chuva de confetes no final
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