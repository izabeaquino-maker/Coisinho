// ==========================================
// ESTADO DO JOGO E VARIÁVEIS CULINÁRIAS
// ==========================================
let itemsCollected = [];
const totalItems = ['leite', 'trigo', 'ovo', 'manteiga'];
let cakeMade = false;

// Elementos da DOM (Interface)
const msgBox = document.getElementById('msg-box');
const achievementPopup = document.getElementById('achievement-popup');
const achievementText = document.getElementById('achievement-text');

// ==========================================
// 1. TELA DE INÍCIO & MENSAGENS
// ==========================================

// Iniciar o Jogo
function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('bakery-scene').style.display = 'block';
    updateMsg("Sua missão: Clique e roube os ingredientes para o bolo (Leite, Trigo, Ovo e Manteiga) e fuja pela SAÍDA!");
}

// Atualizar caixa de texto na tela
function updateMsg(text) {
    msgBox.innerHTML = text;
}

// Mostrar Pop-up de Conquistas
function showAchievement(text, callback) {
    achievementText.innerText = text;
    achievementPopup.classList.add('show');
    
    // Esconde o pop-up após 4 segundos e executa a próxima ação
    setTimeout(() => {
        achievementPopup.classList.remove('show');
        if (callback) callback();
    }, 4000);
}

// ==========================================
// 2. FASE 1: PADARIA (O ASSALTO)
// ==========================================

// Coletar Ingredientes na Padaria
function collectItem(id, name) {
    if (!itemsCollected.includes(id)) {
        itemsCollected.push(id);
        
        // Esconde o item coletado
        document.getElementById('item-' + id).style.display = 'none';
        
        // Move o Coisinho até onde o item estava
        const itemElem = document.getElementById('item-' + id);
        const coisinho = document.getElementById('coisinho-bakery');
        coisinho.style.left = itemElem.style.left;

        // Verifica se já pegou tudo
        if (itemsCollected.length === totalItems.length) {
            updateMsg("Você pegou todos os ingredientes! Agora vá para a SAÍDA!");
        } else {
            updateMsg(`Você pegou o ${name}! Faltam ${totalItems.length - itemsCollected.length} ingrediente(s).`);
        }
    }
}

// Tentar Sair da Padaria
function tryExit() {
    if (itemsCollected.length < totalItems.length) {
        updateMsg("Você ainda não pegou todos os ingredientes! A padaria não pode ser roubada pela metade!");
    } else {
        // Move o Coisinho até a porta
        document.getElementById('coisinho-bakery').style.left = '700px';
        
        // Desbloqueia a primeira conquista e avança o mapa
        setTimeout(() => {
            showAchievement("Assaltante de padaria", () => {
                goToKitchen();
            });
        }, 500);
    }
}

// ==========================================
// 3. FASE 2: COZINHA (O BOLO & PARABÉNS)
// ==========================================

// Mudar para a Cozinha
function goToKitchen() {
    document.getElementById('bakery-scene').style.display = 'none';
    document.getElementById('kitchen-scene').style.display = 'block';
    updateMsg("Clique na bacia para misturar todos os ingredientes e fazer o bolo!");
}

// Misturar Bolo na Bacia
function mixCake() {
    if (cakeMade) return; // Evita clicar várias vezes
    cakeMade = true;

    const bowl = document.getElementById('bowl');
    
    // Efeito visual de sacudir a bacia
    bowl.style.transform = 'rotate(10deg)';
    setTimeout(() => bowl.style.transform = 'rotate(-10deg)', 150);
    setTimeout(() => bowl.style.transform = 'rotate(0deg)', 300);

    // Surge o bolo e a conquista especial
    setTimeout(() => {
        document.getElementById('cake').style.display = 'block';
        
        showAchievement("Bolo de leite ninho com maracujá...embora o de chocolate com maracujá seja melhor", () => {
            finalBirthdayScene();
        });
    }, 600);
}

// Cena Final de Parabéns
function finalBirthdayScene() {
    // Revela seu avatar na tela
    const myAvatar = document.getElementById('my-avatar');
    myAvatar.style.display = 'block';
    
    // Posiciona os dois avatares lado a lado no bolo
    document.getElementById('coisinho-kitchen').style.left = '200px';
    myAvatar.style.right = '200px';

    // Mensagem de Feliz Aniversário
    updateMsg("🎉 🎶 Parabéns pra você, nesta data querida... 🎶 🎉<br><br><b>FELIZ ANIVERSÁRIO, COISINHO! ❤️</b>");
}
