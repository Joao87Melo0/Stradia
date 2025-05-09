document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM carregado");

    const auth = firebase.auth();
    const db = firebase.firestore();

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
                        const nomeFormatado = item.nome.toLowerCase().replace("-", "");
                        location.href = `estrada/${nomeFormatado}.html`;
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
