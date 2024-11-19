function atualizarRankingNaPagina(ranking) {
    const QUANTIDADE_COLOCACOES_RANKING = 5; //top 5 no ranking
    const TABELA = document.querySelector(".tabela");

    // Limpa o conteúdo da tabela e adiciona o cabeçalho
    TABELA.innerHTML = `
        <tr>
            <th>COLOCAÇÃO</th>
            <th>NOME</th>
            <th>PONTUAÇÃO</th>
        </tr>
    `;

    // Preenche a tabela com os dados do ranking
    for (let i = 0; i < QUANTIDADE_COLOCACOES_RANKING; i++) {
        const JOGADOR = ranking[i] || { nome: "-", pontuacao: "-" }; //caso não tenha os 5 jogadores
        const LINHA = document.createElement("tr");

        const NOME = JOGADOR.nome;
        let pontuacao = JOGADOR.pontuacao;
        if (JOGADOR.pontuacao !== "-"){
            pontuacao = Math.round(JOGADOR.pontuacao); //arredonda a pontuação caso tenha um valor
        }
        
        LINHA.innerHTML = `
            <td>${i + 1}°</td>
            <td>${NOME}</td>
            <td>${pontuacao}</td>
        `;
        TABELA.appendChild(LINHA);
    }
}

// Carrega o ranking ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    const RANKING = JSON.parse(localStorage.getItem("ranking")) || [];
    atualizarRankingNaPagina(RANKING);
});

function zerarRanking() {
    localStorage.removeItem("ranking");
    atualizarRankingNaPagina([]);
    
    esconderConfirmacaoZerarRanking();

    const PARAGRAFO_CONFIRMACAO = document.getElementById('sucesso');

    PARAGRAFO_CONFIRMACAO.innerHTML = "Ranking zerado com sucesso!"

    const CONTAINER_PARAGRAFO = PARAGRAFO_CONFIRMACAO.parentElement;
    CONTAINER_PARAGRAFO.style.display = 'block';

    setTimeout(() => {
        CONTAINER_PARAGRAFO.style.display = 'none';
    }, 5000);
}

function mostrarConfirmacaoZerarRanking() {
    const CONFIRMAR = document.querySelector('.confirmacao-zerar-ranking');
    CONFIRMAR.style.display = 'block';
}

function esconderConfirmacaoZerarRanking() {
    const CONFIRMAR = document.querySelector('.confirmacao-zerar-ranking');
    CONFIRMAR.style.display = 'none';
}