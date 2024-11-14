const TECLADO_ESCOLHIDO = localStorage.getItem('tecladoEscolhido');
const QUANTIDADE_DESAFIOS = 5;
let palavraSecreta;
let palavraAtual;
let quantidadeDesafiosJogados = 0;
let palavrasSorteadas = [];
let contadorDeErros = 0;
let quantidadeDeTentativas = 0;
const CONTEXTO_SELECIONADO = localStorage.getItem('contextoSelecionado');

if (!CONTEXTO_SELECIONADO) {
    alert("Nenhum contexto foi selecionado");
    window.location.href = 'contextos.html';
} else {
    if (TECLADO_ESCOLHIDO === 'vogais') {
        document.getElementById('vogais').style.display = 'block';
        document.getElementById('consoantes').style.display = 'none';
        document.getElementById('alfabeto').style.display = 'none';
    } else if (TECLADO_ESCOLHIDO === 'consoantes') {
        document.getElementById('vogais').style.display = 'none';
        document.getElementById('consoantes').style.display = 'block';
        document.getElementById('alfabeto').style.display = 'none';
    } else {
        document.getElementById('vogais').style.display = 'none';
        document.getElementById('consoantes').style.display = 'none';
        document.getElementById('alfabeto').style.display = 'block';
    }
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
            const CONTEXTOS = data.contextos;
            const CONTEXTO_ATUAL = CONTEXTOS.find(contexto => contexto.nome.toLowerCase() === CONTEXTO_SELECIONADO.toLowerCase());
            let palavraSorteada;

            document.getElementById('tema').innerHTML = CONTEXTO_ATUAL.nome.toUpperCase();

            do {
                palavraSorteada = CONTEXTO_ATUAL.palavras[Math.floor(Math.random() * CONTEXTO_ATUAL.palavras.length)];
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
    const PALAVRA_CONTAINER = document.getElementById('palavra');

    if (TECLADO_ESCOLHIDO === 'vogais') {
        for (let i = 0; i < palavraSecreta.length; i++) {
            if (isConsoante(palavraSecreta[i].toUpperCase())) {
                palavraAtual[i] = palavraSecreta[i];
            }
        }
    } else if (TECLADO_ESCOLHIDO === 'consoantes') {
        for (let i = 0; i < palavraSecreta.length; i++) {
            if (isVogal(palavraSecreta[i].toUpperCase())) {
                palavraAtual[i] = palavraSecreta[i];
            }
        }
    } 

    PALAVRA_CONTAINER.textContent = palavraAtual.join(" ").toUpperCase();
}

function isVogal(letra) {
    const LETRA_NORMALIZADA = letra.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    return ["A", "E", "I", "O", "U"].includes(LETRA_NORMALIZADA);
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
    
    const BOTOES = document.querySelectorAll(`button[onclick="letraClicada('${letra}')"]`);
    BOTOES.forEach(botao => {
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

function desabilitarBotoes() {
    const BOTOES = document.querySelectorAll('button[onclick^="letraClicada"]');
    BOTOES.forEach(botao => {
        botao.disabled = true;})
}

function proximaRodada() {
    desabilitarBotoes();
    quantidadeDesafiosJogados++;

    mostrarFeedback("Parabéns!");

    if (quantidadeDesafiosJogados < QUANTIDADE_DESAFIOS) {
        setTimeout(() => {
            resetarBotoes();
            iniciarDesafio();
        }, 1000);
    } else {
        setTimeout(() => {
            palavrasSorteadas = [];
            finalizarPartida();
        }, 1000);
    }
}

function resetarBotoes() {
    const BOTOES = document.querySelectorAll('button[onclick^="letraClicada"]');
    BOTOES.forEach(botao => {
        botao.disabled = false;
        botao.style.color = '';
        botao.style.backgroundColor = '';
    });
}

function finalizarPartida() {
    desabilitarBotoes();
    exibirPontuacao();
    const PONTUACAO = parseInt(localStorage.getItem('pontuacao'), 10);

    document.getElementById('pontuacao-jogador').innerHTML = "Sua pontuação: " + PONTUACAO;

    const NOME_FORM = document.querySelector('.recuperar-nome');
    NOME_FORM.style.display = 'block';  // Mostra a caixa de nome

    // Adiciona um listener para o envio do nome
    const FORM = document.querySelector('.recuperar-nome form');
    FORM.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o comportamento padrão de recarregar a página

        const NOME_JOGADOR = document.getElementById('nomeJogador').value;

        if (NOME_JOGADOR) {
            let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

            ranking.push({ nome: NOME_JOGADOR, pontuacao: PONTUACAO });
            ranking.sort((a, b) => b.pontuacao - a.pontuacao);        

            localStorage.setItem("ranking", JSON.stringify(ranking));

            NOME_FORM.style.display = 'none';
        
            setTimeout(() => {
                window.location.href = 'pontuacao.html';
            }, 2000);
        } else {
            alert("Por favor, insira um nome antes de confirmar.");
        }
    });
}


function mostrarFeedback(mensagem) {
    const FEEDBACK_ELEMENT = document.getElementById('feedback');
    FEEDBACK_ELEMENT.innerHTML = mensagem;

    const FEEDBACK_CONTAINER = FEEDBACK_ELEMENT.parentElement;

    FEEDBACK_CONTAINER.style.display = 'block';
    
    // Remove a mensagem após o tempo determinado
    setTimeout(() => {
        FEEDBACK_CONTAINER.style.display = 'none';
    }, 3000);
}


function exibirPontuacao() {
    const QUATIDADE_ACERTOS = quantidadeDeTentativas - contadorDeErros;
    let pontuacao = (QUATIDADE_ACERTOS / quantidadeDeTentativas) * 100;
    parseFloat(pontuacao.toFixed(2));

    localStorage.setItem('pontuacao', pontuacao);
}
