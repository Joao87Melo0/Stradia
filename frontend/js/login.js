const submitLogin = document.getElementById("submitLogin")

//VERIFICAR SE O CAMPO EMAIL ESTA PREENCHIDO 

//ESQUECI A SENHA
document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const linkEsqueciSenha = document.getElementById("esqueciSenha");

    function verificarEntrada() {
        if (emailInput.value.trim() === "") {
            linkEsqueciSenha.style.pointerEvents = "none";
            linkEsqueciSenha.style.opacity = "0.5";
        } else {
            linkEsqueciSenha.style.pointerEvents = "auto"; 
            linkEsqueciSenha.style.opacity = "1";
        }
    }

    emailInput.addEventListener("input", verificarEntrada);
    verificarEntrada();
});

//BOTAO ENTRAR
document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const submitButton = document.getElementById("submitLogin");
    submitButton.disabled = true; // Desativa o botão
    submitButton.style.opacity = "0.5"; 
    submitButton.style.cursor = "not-allowed";
    submitButton.classList.add("botao-desativado");
    
    function validarCampos() {
        if (emailInput.value.trim() !== "" && passwordInput.value.trim() !== "") {
            submitButton.disabled = false; // Ativa o botão
            submitButton.style.opacity = "1"; 
            submitButton.style.cursor = "pointer";
        } else {
            submitButton.disabled = true; // Desativa o botão
            submitButton.style.opacity = "0.5"; 
            submitButton.style.cursor = "not-allowed";
            submitButton.classList.add("botao-desativado");
            
        }
    }

    emailInput.addEventListener("input", validarCampos);
    passwordInput.addEventListener("input", validarCampos);
});

//FIREBASE 

document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const passInput = document.getElementById("password");
    const lembrar = document.getElementById("lembrar");  // Verificando o checkbox diretamente
    const submitButton = document.getElementById("submitLogin");

    // Adicionando o evento para o botão de login
    window.entrar = function () {
        if (!emailInput.value || !passInput.value) {
            console.error("Preencha todos os campos!");
            return;
        }

        // Verificando a persistência com base no checkbox "lembrar-me"
        const persistenceType = lembrar.checked
            ? firebase.auth.Auth.Persistence.LOCAL  // Mantém login após fechar o navegador
            : firebase.auth.Auth.Persistence.SESSION;  // Mantém login até fechar a aba

        firebase.auth().setPersistence(persistenceType)
            .then(() => {
                // Efetua o login
                return firebase.auth().signInWithEmailAndPassword(emailInput.value, passInput.value);
            })
            .then(response => {
                console.log("Login bem-sucedido!");
                window.location.href = "../index.html";  // Redireciona para a página inicial
            })
            .catch(error => {
                console.error("Erro de login:", error.message);
                alert("E-mail ou senha incorreto! Por favor tente novamente");
            });
    };
});


//Butao de senha
document.addEventListener("DOMContentLoaded", function() {
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");

    togglePassword.addEventListener("click", function() {
        if (passwordInput.type === "password") {
            passwordInput.type = "text"; 
            togglePassword.innerText = "visibility"; 
        } else {
            passwordInput.type = "password"; 
            togglePassword.innerText = "visibility_off"; 
        }
    });
});

//Esqueci minha senha

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
            
            const email = document.getElementById("email").value;

            if (!email) {
                alert("Por favor, insira seu e-mail antes de redefinir a senha.");
                return;
            }

            firebase.auth().sendPasswordResetEmail(email)
                .then(() => {
                    if (emailDisplay) {
                        emailDisplay.innerHTML = `E-mail de recuperação enviado para <br> ${censurarEmail(email)}`;
                    }
                    window.location.href = "sucess.html";
                })
                .catch((error) => {
                    console.error("Erro ao enviar e-mail:", error);
                    alert("Erro ao enviar e-mail. Verifique se o e-mail está correto.");
                });
        });
    }
});