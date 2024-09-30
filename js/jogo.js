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

const palavraSecreta = "AVIAO".toUpperCase();
let palavraAtual = Array(palavraSecreta.length).fill("_");

function exibirPalavra() {
    const palavraContainer = document.getElementById('palavra');

    if (tecladoEscolhido === 'vogais') {
        for (let i = 0; i < palavraSecreta.length; i++) {
            if (isConsoante(palavraSecreta[i])) {
                palavraAtual[i] = palavraSecreta[i];
            }
        }
    } else if (tecladoEscolhido === 'consoantes') {
        for (let i = 0; i < palavraSecreta.length; i++) {
            if (isVogal(palavraSecreta[i])) {
                palavraAtual[i] = palavraSecreta[i];
            }
        }
    } 

    palavraContainer.textContent = palavraAtual.join(" ");
}

function isVogal(letra) {
    return ["A", "E", "I", "O", "U"].includes(letra);
}

function isConsoante(letra) {
    return !isVogal(letra);
}

function desabilitarBotao(botao) {
    botao.disabled = true;
    botao.style.backgroundColor = 'grey';
    botao.style.color = 'white';
}

function letraClicada(letra) {
    let acertou = false;
    
    for (let i = 0; i < palavraSecreta.length; i++) {
        if (palavraSecreta[i] === letra) {
            palavraAtual[i] = letra;
            acertou = true;
        }
    }
    
    exibirPalavra();
    
    const botoes = document.querySelectorAll(`button[onclick="letraClicada('${letra}')"]`);;
    botoes.forEach(desabilitarBotao);
}

// Inicializa o jogo ao carregar a página
window.onload = function() {
    exibirPalavra();
}