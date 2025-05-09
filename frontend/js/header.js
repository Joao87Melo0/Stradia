    //Substitui quando logado
    document.addEventListener("DOMContentLoaded", function () {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // Usuário está logado
                const loginLink = document.querySelector("#linkLogin");
                const perfilLink = document.querySelector("#linkPerfil");
                const btnRegister = document.querySelector("#btn-register");
                const btnLogin = document.querySelector("#btn-login");

                // Modificar o link para a tela de perfil
                if (loginLink) {
                    loginLink.style.display = "none";
                }

                if (perfilLink) {
                    perfilLink.style.display = "block";
                }

                // Esconder o botão de registro
                if (btnRegister) {
                    btnRegister.innerHTML = 'Começar';
                    btnRegister.style = 'font-weight: 600;'
                    btnRegister.onclick = function () {
                        window.location.href = "../dashboard/index.html";
                    };
                }

                // Alterar o botão de login para "Começar"
                if (btnLogin) {
                    btnLogin.innerHTML = '<img src="../../../img/Icon Login main.png" alt="">Perfil';
                    btnLogin.onclick = function () {
                        window.location.href = "../perfil/index.html";  // Redireciona para outra tela
                    };
                }
            } else {
                console.log('O usuário não está logado')
            }
        });
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                const uid = user.uid;
                const userRef = firebase.firestore().collection('users').doc(uid);
        
                try {
                    const doc = await userRef.get();
                    if (doc.exists && doc.data().imageUrl) {
                        const imageUrl = doc.data().imageUrl;
        
                        const iconPerfil2 = document.querySelector('#iconPerfil2');
                        if (iconPerfil2) {
                            iconPerfil2.style.backgroundImage = `url(${imageUrl})`;
                            iconPerfil2.style.backgroundSize = 'cover';
                            iconPerfil2.style.backgroundPosition = 'center';
                            iconPerfil2.style.borderRadius = '50%';
                            iconPerfil2.style.width = '40px';     // ajuste conforme necessário
                            iconPerfil2.style.height = '40px';    // ajuste conforme necessário
        
                            // Remove imagem padrão
                            const img = iconPerfil2.querySelector('img');
                            if (img) img.remove();
                        }
                    }
                } catch (error) {
                    console.error("Erro ao aplicar imagem no header:", error);
                }
            }
        });        
    }); 