document.addEventListener('DOMContentLoaded', function () {
    const button = document.querySelector('section button');
    const textarea = document.querySelector('section textarea');

    let db = firebase.firestore(); // Firestore
    let currentUser = null; // auth
    let userData = {}; // dados buscados da coleção users

    // Verifica se o usuário está logado
    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            alert("Você precisa estar logado para acessar esta página.");
            window.location.href = "../login/index.html";
        } else {
            currentUser = user;

            // Busca os dados do usuário na coleção 'users'
            db.collection("users").doc(user.uid).get()
                .then((doc) => {
                    if (doc.exists) {
                        userData = {
                            name: doc.data().name || "Sem nome",
                            email: doc.data().email || user.email
                        };
                    } else {
                        alert("Usuário autenticado, mas sem dados cadastrados.");
                    }
                })
                .catch((error) => {
                    console.error("Erro ao buscar dados do usuário:", error);
                    alert("Erro ao carregar os dados do usuário.");
                });
        }
    });

    // Clique no botão "Enviar"
    button.addEventListener('click', function () {
        const texto = textarea.value.trim();

        if (texto === '') {
            alert('Primeiramente preencha o campo de texto!');
            return;
        }

        if (!currentUser || !userData.email || !userData.name) {
            alert("Erro: usuário não autenticado corretamente.");
            return;
        }

        // Adiciona o report no Firestore
        db.collection("reports").add({
            texto: texto,
            email: userData.email,
            name: userData.name,
            data: new Date().toISOString()
        })
        .then(() => {
            alert("✅ Seu problema foi enviado com sucesso!");
            textarea.value = '';
            textarea.focus();
        })
        .catch((error) => {
            console.error("Erro ao enviar o report:", error);
            alert("Erro ao enviar o problema. Tente novamente.");
        });
    });
});
