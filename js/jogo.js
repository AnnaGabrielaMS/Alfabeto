const tecladoEscolhido = localStorage.getItem('tecladoEscolhido');

let palavraSecreta;
let palavraAtual;
const quantidadeDesafios = 5;
let quantidadeDesafiosJogados = 0;
let palavrasSorteadas = [];
let contadorDeErros = 0;
let quantidadeDeTentativas = 0;

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

const contextoSelecionado = localStorage.getItem('contextoSelecionado');

if (!contextoSelecionado) {
    alert("Nenhum contexto foi selecionado");
    window.location.href = 'contextos.html';
} else {
    iniciarDesafio();
}

function iniciarDesafio() {
    fetch('repositorio-palavras/palavras.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const contextos = data.contextos;
            const contextoAtual = contextos.find(contexto => contexto.nome.toLowerCase() === contextoSelecionado.toLowerCase());
            let palavraSorteada;

            document.getElementById('tema').innerHTML = contextoAtual.nome.toUpperCase();

            do {
                palavraSorteada = contextoAtual.palavras[Math.floor(Math.random() * contextoAtual.palavras.length)];
                palavraSecreta = palavraSorteada.nome;
            } while (palavrasSorteadas.includes(palavraSecreta));

            if (!palavrasSorteadas.includes(palavraSecreta)) {
                palavrasSorteadas.push(palavraSecreta);
            }

            palavraAtual = Array(palavraSecreta.length).fill("_"); 

            console.log("Palavra secreta sorteada:", palavraSecreta);
            document.getElementById('imagem-jogo').src = palavraSorteada.imagem;
            document.getElementById('imagem-jogo').onerror = function () {
                this.src = "/img/error.png";
            }
            
            exibirPalavra(); 

        })
        .catch(error => console.error('Erro ao carregar o JSON:', error));
}

function exibirPalavra() {
    const palavraContainer = document.getElementById('palavra');

    if (tecladoEscolhido === 'vogais') {
        for (let i = 0; i < palavraSecreta.length; i++) {
            if (isConsoante(palavraSecreta[i].toUpperCase())) {
                palavraAtual[i] = palavraSecreta[i];
            }
        }
    } else if (tecladoEscolhido === 'consoantes') {
        for (let i = 0; i < palavraSecreta.length; i++) {
            if (isVogal(palavraSecreta[i].toUpperCase())) {
                palavraAtual[i] = palavraSecreta[i];
            }
        }
    } 

    palavraContainer.textContent = palavraAtual.join(" ").toUpperCase();
}

function isVogal(letra) {
    const letraNormalizada = letra.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    return ["A", "E", "I", "O", "U"].includes(letraNormalizada);
}

function isConsoante(letra) {
    return !isVogal(letra);
}

function letraClicada(letra) {
    let acertou = false;
    
    for (let i = 0; i < palavraSecreta.length; i++) {
        const letraNormalizadaPalavra = palavraSecreta[i].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const letraNormalizadaClicada = letra.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        if (letraNormalizadaPalavra === letraNormalizadaClicada) {
            palavraAtual[i] = palavraSecreta[i];
            acertou = true;
        }
    } 

    quantidadeDeTentativas++;

    if (!acertou) {
        contadorDeErros++;
    }
    
    exibirPalavra();
    
    const botoes = document.querySelectorAll(`button[onclick="letraClicada('${letra}')"]`);
    botoes.forEach(botao => {
        if (acertou) {
            botao.style.backgroundColor = 'green';  // Define a cor verde para acertos
            botao.style.color = 'white';
        } else {
            botao.style.backgroundColor = 'red';    // Define a cor vermelha para erros
            botao.style.color = 'white';
        }
        botao.disabled = true;  // Desabilita o botão
    });

    if (!palavraAtual.includes("_")) {
        proximaRodada();
    }
}

function proximaRodada() {
    quantidadeDesafiosJogados++;

    mostrarFeedback("Parabéns!");

    if (quantidadeDesafiosJogados < quantidadeDesafios) {
        setTimeout(() => {
            resetarBotoes();
            iniciarDesafio();
        }, 1000);
    } else {
        setTimeout(() => {
            palavrasSorteadas = [];
            exibirPontuacao();
        }, 1000);
    }
}

function resetarBotoes() {
    const botoes = document.querySelectorAll('button[onclick^="letraClicada"]');
    botoes.forEach(botao => {
        botao.disabled = false;
        botao.style.color = '';
        botao.style.backgroundColor = '';
    });
}

function mostrarFeedback(mensagem) {
    const feedbackElement = document.getElementById('feedback');
    feedbackElement.innerHTML = mensagem;

    const feedbackContainer = feedbackElement.parentElement;

    feedbackContainer.style.display = 'block';
    
    // Remove a mensagem após o tempo determinado
    setTimeout(() => {
        feedbackContainer.style.display = 'none';
    }, 3000);
}


function exibirPontuacao() {
    const quantidadeDeAcertos = quantidadeDeTentativas - contadorDeErros;
    const pontuacao = (quantidadeDeAcertos / quantidadeDeTentativas) * 100;

    localStorage.setItem('pontuacao', pontuacao);
        
    // Redireciona para a página de pontuação
    window.location.href = 'pontuacao.html';
}
