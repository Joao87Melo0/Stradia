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
document.addEventListener("DOMContentLoaded", async () => {
    const perfilDiv = document.querySelector('.circle-perfil');

    if (!perfilDiv) {
        console.error("Div de perfil não encontrada.");
        return;
    }

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
            const uid = user.uid;
            const userRef = firebase.firestore().collection('users').doc(uid);

            try {
                const doc = await userRef.get();
                if (doc.exists && doc.data().imageUrl) {
                    const imageUrl = doc.data().imageUrl;

                    perfilDiv.style.backgroundImage = `url(${imageUrl})`;
                    perfilDiv.style.backgroundSize = 'cover';
                    perfilDiv.style.backgroundPosition = 'center';
                    perfilDiv.style.borderRadius = '50%';        
                    perfilDiv.style.width = '170px';
                    perfilDiv.style.height = '170px';

                    const img = perfilDiv.querySelector('img');
                    if (img) img.remove();

                    const p = perfilDiv.querySelector('p');
                    if (p) p.textContent = 'Trocar foto+';
                    p.style.left ='20px';
                    p.style.top ='70px';
                }
            } catch (error) {
                console.error("Erro ao buscar imagem no Firestore:", error);
            }
        }
    });

    perfilDiv.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const user = firebase.auth().currentUser;
            if (!user) {
                console.error("Usuário não autenticado");
                return;
            }

            // Converte a imagem para base64
            const toBase64 = (file) => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result.split(',')[1]); // só o base64 puro
                reader.onerror = error => reject(error);
            });

            const base64Image = await toBase64(file);

            // Envia para o imgbb
            const formData = new FormData();
            formData.append('key', 'f239e89b38c6f6787bce1c987eea6a33');
            formData.append('image', base64Image);

            const response = await fetch('https://api.imgbb.com/1/upload', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error("Falha ao fazer upload no imgbb");
            }

            const imageUrl = result.data.url;

            const uid = user.uid;
            const userRef = firebase.firestore().collection('users').doc(uid);

            console.log("Salvando URL permanente no Firestore:", imageUrl);
            await userRef.set({ imageUrl: imageUrl }, { merge: true });

            perfilDiv.style.backgroundImage = `url(${imageUrl})`;
            perfilDiv.style.backgroundSize = 'cover';
            perfilDiv.style.backgroundPosition = 'center';
            perfilDiv.style.borderRadius = '50%';
            perfilDiv.style.width = '170px';
            perfilDiv.style.height = '170px';

            const img = perfilDiv.querySelector('img');
            if (img) img.remove();

            const p = perfilDiv.querySelector('p');
            if (p) p.textContent = 'Trocar foto+';
            p.style.left ='20px';
            p.style.top ='70px';

            console.log("URL da imagem salva e aplicada com sucesso!");

        } catch (error) {
            console.error("Erro geral ao salvar imagem:", error);
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
