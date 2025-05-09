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

