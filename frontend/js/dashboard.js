const container = document.querySelector('.estradas-container');
const leftBtn = document.querySelector('.arrow-left');
const rightBtn = document.querySelector('.arrow-right');

leftBtn.addEventListener('click', () => {
    container.scrollLeft -= 350; // agora é um número
});

rightBtn.addEventListener('click', () => {
    container.scrollLeft += 350; // agora é um número
});

document.addEventListener("DOMContentLoaded", function () {
    // Verifica se Firebase já está inicializado
    if (!firebase.apps.length) {
        firebase.initializeApp({
            apiKey: "AIzaSyBvu0mtO55x6nmZUNx-ZkHADLXm9kPMptc",
            authDomain: "stradia-dc4ec.firebaseapp.com",
            projectId: "stradia-dc4ec",
            storageBucket: "stradia-dc4ec.firebasestorage.app",
            messagingSenderId: "779122798948",
            appId: "1:779122798948:web:2b5323947f8bf371a98a71",
            measurementId: "G-B8DFHXJSCP"
        });
    }

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
});

//Historico
// historico.js

// Função para salvar o histórico
async function acessarEstrada(nomeEstrada, urlEstrada) {
    const user = firebase.auth().currentUser;
    if (!user) {
        window.location.href = '../login/index.html';
        return;
    }

    const uid = user.uid;
    const firestore = firebase.firestore();
    const historicoRef = firestore.collection('users').doc(uid);

    // Obter URL da imagem com base no nome da estrada (exemplo: AM-320 → am320.png)
    const nomeArquivo = nomeEstrada.toLowerCase().replace('-', '') + '.png';
    const urlImagem = `../../../img/${nomeArquivo}`;

    try {
        const doc = await historicoRef.get();
        let historico = doc.exists && doc.data().historico ? doc.data().historico : [];

        // Remover entrada duplicada (com mesmo nome de estrada)
        historico = historico.filter(item => item.nome !== nomeEstrada);

        // Adiciona a nova entrada no topo
        historico.unshift({
            nome: nomeEstrada,
            imagem: urlImagem,
            data: new Date().toISOString()
        });

        // Limita a 10 entradas
        if (historico.length > 10) historico = historico.slice(0, 10);

        await historicoRef.set({ historico }, { merge: true });

        // Redireciona após salvar
        window.location.href = urlEstrada;
    } catch (error) {
        console.error("Erro ao salvar histórico:", error);
    }
}

//Barra de pesquisa
document.addEventListener("DOMContentLoaded", () => {
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
        { nome: "AM-449", img: "../../../img/am449.png", url: "estrada/am449.html" }
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

//Filtros

document.addEventListener("DOMContentLoaded", () => {
    const botao = document.getElementById("botaoFiltros");
    const filtros = document.getElementById("filtros");

    botao.addEventListener("click", () => {
        if (filtros.style.display === "none" || filtros.style.display === "") {
            filtros.style.display = "block";
        } else {
            filtros.style.display = "none";
        }
    });
});
