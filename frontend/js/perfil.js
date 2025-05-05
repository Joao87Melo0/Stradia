    document.addEventListener("DOMContentLoaded", () => {
        const nomeUsuario = document.getElementById("nomeUsuario");
        const imgPerfil = document.getElementById("fotoPerfil");

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const uid = user.uid;
                const db = firebase.firestore();

                db.collection("users").doc(uid).get()
                    .then(doc => {
                        if (doc.exists) {
                            const dados = doc.data();

                            // Exibe o nome de usuário
                            nomeUsuario.textContent = `${dados.username}`;
                            preencherDadosConta(dados);

                            // Se já houver uma foto de perfil salva, mostra
                            if (dados.photoURL) {
                                imgPerfil.src = dados.photoURL;
                            }
                        } else {
                            console.error("Usuário não encontrado no Firestore.");
                        }
                    })
                    .catch(error => {
                        console.error("Erro ao buscar dados:", error);
                    });
            } else {
                // Redireciona se não estiver logado
                window.location.href = "../login/index.html";
            }

            const preencherDadosConta = (dados) => {
                const nomePessoal = document.querySelector("#especial").previousElementSibling.querySelector(".dado123 p");
                const nomeUsuario = document.querySelector("#especial .dado123 p");
                const senha = document.querySelector("#especial").nextElementSibling.querySelector(".dado123 p");
            
                // Preenche os campos com os dados do Firestore
                nomePessoal.textContent = dados.name || "Nome não cadastrado";
                nomeUsuario.textContent = dados.username || "Usuário não cadastrado";
                senha.textContent = "********"; // Não é possível obter a senha real
            };
            
        });
    });


    //Foto de perfil
    document.addEventListener("DOMContentLoaded", function () {
        const perfilDiv = document.querySelector(".circle-perfil");
        const perfilImg = perfilDiv.querySelector("img");
        const perfilTexto = perfilDiv.querySelector("p");
    
        // Criar input de upload oculto
        const inputFile = document.createElement("input");
        inputFile.type = "file";
        inputFile.accept = "image/*";
        inputFile.style.display = "none";
        document.body.appendChild(inputFile);
    
        // Ao clicar na div, simula clique no input
        perfilDiv.addEventListener("click", () => {
            inputFile.click();
        });
    
        inputFile.addEventListener("change", async (e) => {
            const file = e.target.files[0];
            if (!file) return;
    
            const user = firebase.auth().currentUser;
            if (!user) {
                alert("Usuário não está logado.");
                return;
            }
    
            const storageRef = firebase.storage().ref(`perfil/${user.uid}`);
            try {
                // Upload da imagem
                await storageRef.put(file);
                const url = await storageRef.getDownloadURL();
    
                // Salvar ou atualizar a URL no Firestore
                const db = firebase.firestore();
                await db.collection("users").doc(user.uid).set({
                    UserImg: url  // Usando o campo 'UserImg' conforme seu código
                }, { merge: true });
    
                // Atualizar interface com a nova imagem e texto
                perfilImg.src = url;
                perfilTexto.textContent = "Alterar Imagem"; // Mudando o texto para "Alterar Imagem"
            } catch (error) {
                console.error("Erro ao fazer upload da imagem:", error);
                alert("Erro ao enviar imagem. Tente novamente.");
            }
        });
    
        // Verificar se já existe imagem no Firestore ao carregar a página
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                const db = firebase.firestore();
                const doc = await db.collection("users").doc(user.uid).get();
                if (doc.exists && doc.data().UserImg) {  // Acessando o campo UserImg
                    perfilImg.src = doc.data().UserImg;
                    perfilTexto.textContent = "Alterar Imagem"; // Atualizando o texto
                }
            }
        });
    });
    
//Deslogar

document.addEventListener("DOMContentLoaded", function() {
    // Espera o carregamento da página para garantir que o botão esteja disponível
    const btnDeslogar = document.getElementById("btnDeslogar");

    // Verifica se o botão foi encontrado
    if (btnDeslogar) {
        btnDeslogar.addEventListener("click", function () {
            const confirmacao = confirm("Você tem certeza que deseja sair?");
            
            if (confirmacao) {
                // Desloga o usuário
                firebase.auth().signOut().then(() => {
                    // Após deslogar, redireciona para a página inicial
                    window.location.href = "../index.html"; // Altere para o caminho correto
                }).catch((error) => {
                    console.error("Erro ao deslogar: ", error);
                    alert("Ocorreu um erro ao deslogar. Tente novamente.");
                });
            } else {
                console.log("Deslogamento cancelado");
            }
        });
    } else {
        console.log("Botão de deslogar não encontrado");
    }
});

//Esqueci a senha
document.addEventListener("DOMContentLoaded", function () {
    const esqueciSenha = document.getElementById("esqueciSenha");
    const emailDisplay = document.getElementById("emailDisplay");

    function censurarEmail(email) {
        const [user, domain] = email.split("@");
        if (user.length > 4) {
            return `${user.slice(0, 2)}**${user.slice(-2)}@${domain}`;
        }
        return `${user[0]}**@${domain}`; // Se for um nome curto, oculta quase tudo
    }

    if (esqueciSenha) {
        esqueciSenha.addEventListener("click", function (event) {
            event.preventDefault(); // Impede o comportamento padrão do link

            const user = firebase.auth().currentUser;

            if (!user || !user.email) {
                return;
            }

            const email = user.email;

            firebase.auth().sendPasswordResetEmail(email)
                .then(() => {
                    if (emailDisplay) {
                        emailDisplay.innerHTML = `E-mail de recuperação enviado para <br> ${censurarEmail(email)}`;
                    }
                    window.location.href = "sucess.html";
                })
                .catch((error) => {
                    console.error("Erro ao enviar e-mail:", error);
                });
        });
    }
});

//mudar nome e username

document.addEventListener("DOMContentLoaded", () => {
    const botoesAlterar = document.querySelectorAll(".alterar-dados button");
    const textosDados = document.querySelectorAll(".alterar-dados .dado123 p");

    firebase.auth().onAuthStateChanged(async (user) => {
        if (!user) return;

        const db = firebase.firestore();
        const docRef = db.collection("users").doc(user.uid);
        const doc = await docRef.get();

        if (doc.exists) {
            const data = doc.data();

            // Preencher os dados atuais na tela
            if (textosDados[0]) textosDados[0].textContent = data.name || "Não definido";
            if (textosDados[1]) textosDados[1].textContent = data.username || "Não definido";
            if (textosDados[2]) textosDados[2].textContent = "*********";
        }

        // Botão 0: alterar nome pessoal
        if (botoesAlterar[0]) {
            botoesAlterar[0].addEventListener("click", async () => {
                const novoNome = prompt("Digite o novo nome pessoal:");
                if (novoNome && novoNome.trim() !== "") {
                    await docRef.set({ name: novoNome }, { merge: true });
                    textosDados[0].textContent = novoNome;
                    alert("Nome pessoal alterado com sucesso!");
                }
            });
        }

        // Botão 1: alterar nome de usuário
        if (botoesAlterar[1]) {
            botoesAlterar[1].addEventListener("click", async () => {
                const novoUsername = prompt("Digite o novo nome de usuário:");
                if (novoUsername && novoUsername.trim() !== "") {
                    await docRef.set({ username: novoUsername }, { merge: true });
                    textosDados[1].textContent = novoUsername;
                    alert("Nome de usuário alterado com sucesso!");
                }
            });
        }

        // Botão 2 (esqueciSenha) já está sendo tratado em outro script, não será refeito aqui
    });
});
