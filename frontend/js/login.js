const passwordInput = document.getElementById("password");
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

    firebase.initializeApp(firebaseConfig);

    window.entrar = function () {  

        if (!emailInput.value || !passInput.value) {
            console.error("Preencha todos os campos!");
            return;
        }

        firebase.auth().signInWithEmailAndPassword(emailInput.value, passInput.value)
            .then(response => {
                console.log("Sucesso");
                window.location.href = "../index.html";
            })
            .catch(error => {
                console.error("Erro de login:", error.message);
                console.log(emailInput.value)
                console.log(passInput.value)
            });
    };
});
