const tecladoEscolhido = localStorage.getItem('tecladoEscolhido');
if (tecladoEscolhido === 'vogais') {
    document.getElementById('vogais').style.display = 'block';
    document.getElementById('consoantes').style.display = 'none';
    document.getElementById('alfabeto').style.display = 'none';
} else if (tecladoEscolhido === 'consoantes') {
    document.getElementById('vogais').style.display = 'none';
    document.getElementById('consoantes').style.display = 'block';
    document.getElementById('alfabeto').style.display = 'none';
} else {
    document.getElementById('vogais').style.display = 'none';
    document.getElementById('consoantes').style.display = 'none';
    document.getElementById('alfabeto').style.display = 'block';
}

const palavraSecreta = "Ovelha".toUpperCase();
let palavraAtual = Array(palavraSecreta.length).fill("_");

// Função que atualiza a exibição dos traços no HTML
function exibirPalavra() {
    const palavraContainer = document.getElementById('palavra');
    palavraContainer.textContent = palavraAtual.join(" ");
}

function desabilitarBotao(botao) {
    botao.disabled = true;
    botao.style.backgroundColor = 'grey';
    botao.style.color = 'white';
}

function letraClicada(letra) {
    let acertou = false;
    
    // Verifica se a letra está na palavra secreta
    for (let i = 0; i < palavraSecreta.length; i++) {
        if (palavraSecreta[i] === letra) {
            palavraAtual[i] = letra;
            acertou = true;
        }
    }
    
    // Atualiza a exibição da palavra na tela
    exibirPalavra();
    
    // Desabilitar o botão após o clique
    const botoes = document.querySelectorAll(`button[onclick="letraClicada('${letra}')"]`);;
    botoes.forEach(desabilitarBotao);
}

// Inicializa o jogo ao carregar a página
window.onload = function() {
    exibirPalavra();
}