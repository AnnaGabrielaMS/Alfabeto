function atualizarRankingNaPagina(ranking) {

    const QUANTIDADE_COLOCACOES_RANKING = 5;
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

        if (JOGADOR.pontuacao !== "-"){
            pontuacao = Math.round(JOGADOR.pontuacao);
        }

        LINHA.innerHTML = `
            <td>${i + 1}°</td>
            <td>${JOGADOR.nome}</td>
            <td>${JOGADOR.pontuacao}</td>
        `;
        TABELA.appendChild(LINHA);
    }
}

// Carrega o ranking ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
    atualizarRankingNaPagina(ranking);
});

function zerarRanking() {
    localStorage.removeItem("ranking");
    atualizarRankingNaPagina([]); // Atualiza a exibição da tabela com o ranking vazio
}