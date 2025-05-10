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

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM carregado");

    const auth = firebase.auth();
    const db = firebase.firestore();
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


    const section = document.querySelector("#historico section");
    if (!section) {
        console.error("Section não encontrada no DOM");
        return;
    }

    const h1 = section.querySelector("h1");

    auth.onAuthStateChanged(async (user) => {
        if (!user) {
            console.warn("Usuário não autenticado. Redirecionando...");
            window.location.href = "../login/index.html";
            return;
        }

        console.log("Usuário autenticado:", user.uid);

        try {
            const docRef = db.collection("users").doc(user.uid);
            const doc = await docRef.get();

            if (!doc.exists) {
                console.warn("Documento do usuário não existe.");
                section.innerHTML = "";
                section.appendChild(h1);
                const p = document.createElement("p");
                p.textContent = "Você ainda não possui histórico.";
                section.appendChild(p);
                return;
            }

            const data = doc.data();
            const historico = data?.historico || [];

            console.log("Histórico recuperado:", historico);

            section.innerHTML = "";
            section.appendChild(h1);

            if (historico.length === 0) {
                const p = document.createElement("p");
                p.textContent = "Você ainda não possui histórico.";
                p.style.color = "white";
                section.appendChild(p);
                return;
            }

            historico
                .sort((a, b) => new Date(b.data) - new Date(a.data))
                .forEach((item, index) => {
                    console.log(`Adicionando item ${index}:`, item);

                    const bloco = document.createElement("div");
                    bloco.className = "bloco-historico";

                    const info = document.createElement("div");
                    info.className = "info-historico";

                    const img = document.createElement("img");
                    img.src = item.imagem;
                    img.alt = item.nome;

                    const texto = document.createElement("div");
                    const h2 = document.createElement("h2");
                    h2.textContent = item.nome;

                    const h3 = document.createElement("h3");
                    h3.textContent = new Date(item.data).toLocaleString("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "short"
                    });

                    texto.appendChild(h2);
                    texto.appendChild(h3);
                    info.appendChild(img);
                    info.appendChild(texto);

                    const botao = document.createElement("button");
                    botao.textContent = "Visitar";
                    botao.onclick = () => {
                        const estradaEncontrada = estradas.find(e => e.nome === item.nome);
                        if (estradaEncontrada) {
                            acessarEstrada(estradaEncontrada.nome, estradaEncontrada.url);
                        } else {
                            console.warn("Estrada não encontrada:", item.nome);
                        }
                    };                    

                    bloco.appendChild(info);
                    bloco.appendChild(botao);
                    section.appendChild(bloco);
                });

        } catch (error) {
            console.error("Erro ao buscar histórico:", error);
            section.innerHTML = "";
            section.appendChild(h1);
            const p = document.createElement("p");
            p.textContent = "Erro ao carregar histórico.";
            section.appendChild(p);
        }
    });
});
