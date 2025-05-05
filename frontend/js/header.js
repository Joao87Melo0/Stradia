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
                perfilLink.href = "../perfil/index.html";  // Redireciona para o perfil
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
}); 