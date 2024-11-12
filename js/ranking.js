function atualizarRankingNaPagina(ranking) {
    const tabela = document.querySelector(".tabela");

    // Limpa o conteúdo da tabela e adiciona o cabeçalho
    tabela.innerHTML = `
        <tr>
            <th>COLOCAÇÃO</th>
            <th>NOME</th>
            <th>PONTUAÇÃO</th>
        </tr>
    `;

    // Preenche a tabela com os dados do ranking
    for (let i = 0; i < 5; i++) {
        const jogador = ranking[i] || { nome: "-", pontuacao: "-" }; //caso não tenha os 5 jogadores
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${i + 1}°</td>
            <td>${jogador.nome}</td>
            <td>${jogador.pontuacao}</td>
        `;
        tabela.appendChild(linha);
    }
}

// Carrega o ranking ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
    atualizarRankingNaPagina(ranking);
});