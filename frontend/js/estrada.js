//Barra de pesquisa
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("searchdashboard");

    const estradas = [
        { nome: "AM-010", img: "../../../../img/am010.png", url: "am010.html" },
        { nome: "AM-070", img: "../../../../img/am070.png", url: "am070.html" },
        { nome: "AM-240", img: "../../../../img/am240.png", url: "am240.html" },
        { nome: "AM-254", img: "../../../../img/am254.png", url: "am254.html" },
        { nome: "AM-343", img: "../../../../img/am343.png", url: "am343.html" },
        { nome: "AM-352", img: "../../../../img/am352.png", url: "am352.html" },
        { nome: "AM-354", img: "../../../../img/am354.png", url: "am354.html" },
        { nome: "AM-363", img: "../../../../img/am363.png", url: "am363.html" },
        { nome: "AM-366", img: "../../../../img/am366.png", url: "am366.html" },
        { nome: "AM-449", img: "../../../../img/am449.png", url: "am449.html" }
    ];

    const sec1Dash = document.querySelector(".sec-1-dash");
    const historicoBtn = sec1Dash.querySelector("div:last-of-type");

    let resultDiv = null;

    input.addEventListener("input", () => {
        const termo = input.value.trim().toLowerCase();

        if (resultDiv) {
            resultDiv.classList.remove("ativa");
            setTimeout(() => {
                if (resultDiv) {
                    resultDiv.remove();
                    resultDiv = null;
                }
                if (termo !== "") criarResultados(termo);
            }, 300);
        } else {
            if (termo !== "") criarResultados(termo);
        }
    });

    function criarResultados(termo) {
        const resultados = estradas.filter(estrada => {
            // Adicionando a lógica para pesquisar sem o hífen
            const nomeSemHifen = estrada.nome.replace("-", "").toLowerCase();
            return nomeSemHifen.includes(termo) || estrada.nome.toLowerCase().includes(termo);
        }).slice(0, 3);

        if (resultados.length === 0) return;

        resultDiv = document.createElement("div");
        resultDiv.className = "result-pesquisa";

        resultados.forEach(estrada => {
            const bloco = document.createElement("div");
            bloco.className = "bloco-pesquisa";

            const info = document.createElement("div");
            info.className = "info-pesquisa";

            const img = document.createElement("img");
            img.src = estrada.img;
            img.alt = estrada.nome.toLowerCase();

            const divTexto = document.createElement("div");
            const h2 = document.createElement("h2");
            h2.textContent = estrada.nome;

            divTexto.appendChild(h2);
            info.appendChild(img);
            info.appendChild(divTexto);

            const botao = document.createElement("button");
            botao.textContent = "Visitar";
            botao.onclick = () => acessarEstrada(estrada.nome, estrada.url);

            bloco.appendChild(info);
            bloco.appendChild(botao);
            resultDiv.appendChild(bloco);
        });

        sec1Dash.insertBefore(resultDiv, historicoBtn);
        setTimeout(() => {
            resultDiv.classList.add("ativa");
        }, 10);
    }
});
