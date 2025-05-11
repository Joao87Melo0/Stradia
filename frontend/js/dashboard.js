const container = document.querySelector('.estradas-container');
const leftBtn = document.querySelector('.arrow-left');
const rightBtn = document.querySelector('.arrow-right');

console.log("Usuário atual:", firebase.auth().currentUser);

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

leftBtn.addEventListener('click', () => {
    container.scrollLeft -= 350;
});

rightBtn.addEventListener('click', () => {
    container.scrollLeft += 350;
});

document.addEventListener("DOMContentLoaded", function () {
    // Firebase init redundante removido (já feito acima)

    const db = firebase.firestore();

    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            window.alert("Você precisa estar logado para acessar a dashboard.");
            window.location.href = "../login/index.html";
        } else {
            const uid = user.uid;
            const userRef = db.collection("users").doc(uid);

            userRef.get()
                .then(doc => {
                    if (doc.exists) {
                        const username = doc.data().username;
                        const titulo = document.getElementById("tituloBoasVindas");
                        if (titulo) {
                            titulo.innerText = `Bem vindo, ${username}!`;
                        }
                    } else {
                        console.warn("Usuário não encontrado no Firestore.");
                    }
                })
                .catch(error => {
                    console.error("Erro ao buscar dados do usuário:", error);
                });
        }
    });

    // Barra de pesquisa
    const input = document.getElementById("searchdashboard");

    const estradas = [
        { nome: "AM-010", img: "../../../img/am010.png", url: "estrada/am010.html" },
        { nome: "AM-020", img: "../../../img/am020.png", url: "estrada/am020.html" },
        { nome: "AM-070", img: "../../../img/am070.png", url: "estrada/am070.html" },
        { nome: "AM-240", img: "../../../img/am240.png", url: "estrada/am240.html" },
        { nome: "AM-254", img: "../../../img/am254.png", url: "estrada/am254.html" },
        { nome: "AM-343", img: "../../../img/am343.png", url: "estrada/am343.html" },
        { nome: "AM-352", img: "../../../img/am352.png", url: "estrada/am352.html" },
        { nome: "AM-354", img: "../../../img/am354.png", url: "estrada/am354.html" },
        { nome: "AM-363", img: "../../../img/am363.png", url: "estrada/am363.html" },
        { nome: "AM-366", img: "../../../img/am366.png", url: "estrada/am366.html" },
        { nome: "AM-449", img: "../../../img/am449.png", url: "estrada/am449.html" },
        { nome: "BR-174", img: "../../../img/br174.png", url: "estrada/br174.html" },
        { nome: "BR-230", img: "../../../img/br230.png", url: "estrada/br230.html" },
        { nome: "BR-317", img: "../../../img/br317.png", url: "estrada/br317.html" },
        { nome: "BR-319", img: "../../../img/br319.png", url: "estrada/br319.html" }
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
            botao.onclick = async () => {
                await acessarEstrada(estrada.nome, estrada.url);
            };

            bloco.appendChild(info);
            bloco.appendChild(botao);
            resultDiv.appendChild(bloco);
        });

        sec1Dash.insertBefore(resultDiv, historicoBtn);
        setTimeout(() => {
            resultDiv.classList.add("ativa");
        }, 10);
    }

    // Corrigido botão de filtros
    const botao = document.getElementById("botaoFiltros");
    const filtros = document.getElementById("filtros");

    if (botao && filtros) {
        botao.addEventListener("click", () => {
            if (filtros.style.display === "none" || filtros.style.display === "") {
                filtros.style.display = "block";
            } else {
                filtros.style.display = "none";
            }
        });
    }

    // Inicia com 10 aleatórias
    atualizarEstradas();
});

const estradas = [
    { nome: 'AM-010', img: '../../../img/am010.png', categorias: ['Metropolitana', 'Bom'] },
    { nome: 'AM-070', img: '../../../img/am070.png', categorias: ['Metropolitana', 'Regular'] },
    { nome: 'AM-240', img: '../../../img/am240.png', categorias: ['Interior', 'Ruim'] },
    { nome: 'AM-254', img: '../../../img/am254.png', categorias: ['Metropolitana', 'Péssimo'] },
    { nome: 'AM-343', img: '../../../img/am343.png', categorias: ['Interior', 'Péssimo'] },
    { nome: 'AM-352', img: '../../../img/am352.png', categorias: ['Metropolitana', 'Péssimo'] },
    { nome: 'AM-354', img: '../../../img/am354.png', categorias: ['Metropolitana', 'Péssimo'] },
    { nome: 'AM-363', img: '../../../img/am363.png', categorias: ['Interior', 'Péssimo'] },
    { nome: 'AM-366', img: '../../../img/am366.png', categorias: ['Interior', 'Péssimo'] },
    { nome: 'AM-449', img: '../../../img/am449.png', categorias: ['Interior', 'Péssimo'] },
    { nome: 'BR-174', img: '../../../img/br174.png', categorias: ['Metropolitana', 'Péssimo'] },
    { nome: 'BR-230', img: '../../../img/br230.png', categorias: ['Interior', 'Péssimo'] },
    { nome: 'BR-317', img: '../../../img/br317.png', categorias: ['Interior', 'Péssimo'] },
    { nome: 'BR-319', img: '../../../img/br319.png', categorias: ['Interior', 'Péssimo'] },
];

const containner = document.querySelector('.estradas-container');
const botoesFiltro = document.querySelectorAll('.escolha');

let filtrosAtivos = [];

botoesFiltro.forEach(botao => {
    botao.addEventListener('click', () => {
        const categoria = botao.textContent.trim();

        if (filtrosAtivos.includes(categoria)) {
            filtrosAtivos = filtrosAtivos.filter(f => f !== categoria);
            botao.style.backgroundColor = '';
        } else {
            filtrosAtivos.push(categoria);
            botao.style.backgroundColor = 'lightblue';
        }

        atualizarEstradas();
    });
});

function atualizarEstradas() {
    let filtradas;

    if (filtrosAtivos.length === 0) {
        filtradas = embaralharArray(estradas).slice(0, 10);
    } else {
        filtradas = estradas.filter(estrada =>
            filtrosAtivos.every(filtro => estrada.categorias.includes(filtro))
        );

        if (filtradas.length < 10) {
            const restantes = estradas.filter(e => !filtradas.includes(e));
            const adicionais = embaralharArray(restantes).slice(0, 10 - filtradas.length);
            filtradas = filtradas.concat(adicionais);
        }
    }

    exibirEstradas(filtradas);
}

function exibirEstradas(lista) {
    containner.innerHTML = '';

    lista.forEach(estrada => {
        const div = document.createElement('div');
        div.className = 'estrada';

        const img = document.createElement('img');
        img.src = estrada.img;
        img.alt = estrada.nome;

        const btn = document.createElement('button');
        btn.textContent = estrada.nome;
        btn.onclick = async () => {
            const estradaUrl = `estrada/${estrada.nome.toLowerCase().replace('-', '')}.html`;
            await acessarEstrada(estrada.nome, estradaUrl);
        };

        div.appendChild(img);
        div.appendChild(btn);
        containner.appendChild(div);
    });
}

function embaralharArray(array) {
    const a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
    