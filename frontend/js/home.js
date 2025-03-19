//Substitui quando logado
document.addEventListener("DOMContentLoaded", function () {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // Usuário está logado
            const perfilLink = document.querySelector("#linkLoginPerfil");
            const btnRegister = document.querySelector("#btn-register");
            const btnLogin = document.querySelector("#btn-login");

            // Modificar o link para a tela de perfil
            if (perfilLink) {
                perfilLink.href = "perfil/index.html";  // Redireciona para o perfil
                perfilLink.innerHTML = `<div id="iconPerfil">
                                        <img src="../../img/Icon Login main.png" alt="Icon">
                                    </div>`;
            }

            // Esconder o botão de registro
            if (btnRegister) {
                btnRegister.style.display = "none"; // Esconde o botão de registro
            }

            // Alterar o botão de login para "Começar"
            if (btnLogin) {
                btnLogin.innerHTML = `Começar`;
                btnLogin.onclick = function () {
                    window.location.href = "dashboard/index.html";  // Redireciona para outra tela
                };
            }
        } else {
            console.log('O usuário não está logado')
        }
    });
});

