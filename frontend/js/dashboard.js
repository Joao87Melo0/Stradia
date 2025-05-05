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
