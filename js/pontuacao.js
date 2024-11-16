document.addEventListener("DOMContentLoaded", () => {
    // Obtém a pontuação do localStorage
    const PONTUACAO = parseInt(localStorage.getItem('pontuacao'), 10);

    // Exibe a pontuação na página
    document.getElementById('pontuacao').innerHTML = "VOCÊ OBTEVE " + PONTUACAO + "% DE ACERTO.";

    // Configura a mensagem e a imagem com base na pontuação
    const IMAGEM_PONTUACAO = document.getElementById('imagem-pontuacao');
    const MENSAGEM_PONTUACAO = document.getElementById('mensagem-resultado');

    if (PONTUACAO === 100) {
        confetti({
            particleCount: 200,
            spread: 70,
            origin: { y: 0.6 },
        });
        IMAGEM_PONTUACAO.src = 'img/pontuacao/0erros.png';
        MENSAGEM_PONTUACAO.innerHTML = "PARABÉNS! VOCÊ FOI SENSACIONAL!";
    } else if (PONTUACAO >= 90) {
        IMAGEM_PONTUACAO.src = 'img/pontuacao/2erros.png';
        MENSAGEM_PONTUACAO.innerHTML = "EXCELENTE, QUASE PERFEITO!";
    } else if (PONTUACAO >= 80) {
        IMAGEM_PONTUACAO.src = 'img/pontuacao/4erros.png';
        MENSAGEM_PONTUACAO.innerHTML = "MANDOU MUITO BEM!";
    } else if (PONTUACAO >= 70) {
        IMAGEM_PONTUACAO.src = 'img/pontuacao/6erros.png';
        MENSAGEM_PONTUACAO.innerHTML = "ÓTIMO TRABALHO!";
    } else if (PONTUACAO >= 60) {
        IMAGEM_PONTUACAO.src = 'img/pontuacao/8erros.png';
        MENSAGEM_PONTUACAO.innerHTML = "BOA TENTATIVA, CONTINUE ASSIM!";
    } else if (PONTUACAO >= 50) {
        IMAGEM_PONTUACAO.src = 'img/pontuacao/10erros.png';
        MENSAGEM_PONTUACAO.innerHTML = "VOCÊ ESTÁ INDO BEM!";
    } else if (PONTUACAO >= 40) {
        IMAGEM_PONTUACAO.src = 'img/pontuacao/12erros.png';
        MENSAGEM_PONTUACAO.innerHTML = "CONTINUE TENTANDO!";
    } else if (PONTUACAO >= 30) {
        IMAGEM_PONTUACAO.src = 'img/pontuacao/14erros.png';
        MENSAGEM_PONTUACAO.innerHTML = "NÃO DESISTA, VOCÊ CONSEGUE!";
    } else if (PONTUACAO >= 20) {
        IMAGEM_PONTUACAO.src = 'img/pontuacao/16erros.png';
        MENSAGEM_PONTUACAO.innerHTML = "PERSISTÊNCIA É A CHAVE!";
    } else if (PONTUACAO >= 10) {
        IMAGEM_PONTUACAO.src = 'img/pontuacao/18erros.png';
        MENSAGEM_PONTUACAO.innerHTML = "CADA ERRO É UM PASSO PARA O ACERTO!";
    } else {
        IMAGEM_PONTUACAO.src = 'img/pontuacao/20erros.png';
        MENSAGEM_PONTUACAO.innerHTML = "NÃO FOI DESSA VEZ, TENTE NOVAMENTE!";
    }

    // Verifica se o jogador está no ranking
    const ranking = JSON.parse(localStorage.getItem("ranking") || []);
    const NOME_JOGADOR = localStorage.getItem('nome-jogador');
    console.log("nome do jogador: " + NOME_JOGADOR);

    if (ranking.some(jogador => jogador.nome === NOME_JOGADOR)) {
        console.log("Jogador encontrado no ranking");
        document.getElementById('jogador-ranking').innerHTML = "VOCÊ ESTÁ NO RANKING!";
    }
    }
)

// Função para repetir o desafio
function repetirDesafio() {
    const contextoSelecionado = localStorage.getItem('contextoSelecionado');
    const tecladoEscolhido = localStorage.getItem('tecladoEscolhido');

    if (contextoSelecionado) {
        window.location.href = `jogo.html?contexto=${contextoSelecionado}&niveis=${tecladoEscolhido}`;
    } else {
        window.location.href = 'contextos.html';
    }
}
