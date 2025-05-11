document.addEventListener("DOMContentLoaded", () => {
    const auth = firebase.auth();
    const db = firebase.firestore();
    const estradas = [
        { nome: "AM-010", img: "../../../img/am010.png", url: "estrada/am010.html" },
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
        { nome: "BR-319", img: "../../../img/br319.png", url: "estrada/br319.html" },
        { nome: "BR-317", img: "../../../img/br317.png", url: "estrada/br317.html" },
        { nome: "BR-230", img: "../../../img/br230.png", url: "estrada/br230.html" }
    ];

    const section = document.querySelector("#historico section");
    const h1 = section?.querySelector("h1");

    auth.onAuthStateChanged(async (user) => {
        if (!user) {
            window.location.href = "../login/index.html";
            return;
        }

        try {
            const docRef = db.collection("users").doc(user.uid);
            const doc = await docRef.get();
            const data = doc.data();
            const historico = data?.historico || [];

            section.innerHTML = "";
            section.appendChild(h1);
            
            //Botao limpar historico
            const botaoLimpar = document.createElement("button");
            botaoLimpar.textContent = "Limpar";
            botaoLimpar.onclick = async () => {
                try {
                    // Limpa as entradas do histórico, mas mantém o campo 'historico'
                    await docRef.update({
                        historico: firebase.firestore.FieldValue.delete()  // Isso irá deletar apenas as entradas, não o campo inteiro.
                    });

                    // Após limpar, recarregue a página para refletir
                    location.reload();
                } catch (err) {
                    console.error("Erro ao apagar histórico:", err);
                }
            };

            section.appendChild(botaoLimpar);



            if (historico.length === 0) {
                const p = document.createElement("p");
                p.textContent = "Você ainda não possui histórico.";
                p.style.color = "white";
                section.appendChild(p);
                return;
            }

            historico
                .sort((a, b) => new Date(b.data) - new Date(a.data))
                .forEach((item) => {
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
                            }
                        };

                    bloco.appendChild(info);
                    bloco.appendChild(botao);
                    section.appendChild(bloco);
                });

        } catch (error) {
            console.error("Erro ao carregar histórico:", error);
            section.innerHTML = "";
            section.appendChild(h1);
            const p = document.createElement("p");
            p.textContent = "Erro ao carregar histórico.";
            section.appendChild(p);
        }
    });
});
