function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Função para redefinir a senha
function redefinir() {
    const newPassword = document.getElementById("password").value;
    const confirmPassword = document.getElementById("password2").value;

    if (newPassword !== confirmPassword) {
        alert("As senhas não coincidem. Tente novamente.");
        return;
    }

    const oobCode = getParameterByName('oobCode'); // Pegando o token da URL

    if (!oobCode) {
        alert("O código de redefinição não foi encontrado.");
        return;
    }

    // Usando o método do Firebase para redefinir a senha
    firebase.auth().confirmPasswordReset(oobCode, newPassword)
        .then(() => {
            //alert("Senha redefinida com sucesso!");
            window.location.href = "sucess.html"; // Redireciona para a página de sucesso ou login
        })
        .catch((error) => {
           // console.error("Erro ao redefinir a senha:", error);
            alert("Erro ao redefinir a senha. Tente novamente.");
        });
}

//Butao de senha
document.addEventListener("DOMContentLoaded", function() {
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");

    togglePassword.addEventListener("click", function() {
        if (passwordInput.type === "password") {
            passwordInput.type = "text"; // Mostra a senha
            togglePassword.textContent = "😳"; // Ícone de olho aberto
        } else {
            passwordInput.type = "password"; // Oculta a senha
            togglePassword.textContent = "🤫"; // Ícone de olho fechado
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const passwordInput = document.getElementById("password2");
    const togglePassword = document.getElementById("togglePassword2");

    togglePassword.addEventListener("click", function() {
        if (passwordInput.type === "password") {
            passwordInput.type = "text"; // Mostra a senha
            togglePassword.textContent = "😳"; // Ícone de olho aberto
        } else {
            passwordInput.type = "password"; // Oculta a senha
            togglePassword.textContent = "🤫"; // Ícone de olho fechado
        }
    });
});

//BOTAO ENTRAR
document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const passwordInput2 = document.getElementById("password2");
    const submitButton = document.getElementById("submitLogin");
    submitButton.disabled = true; // Desativa o botão
    submitButton.style.opacity = "0.5"; 
    submitButton.style.cursor = "not-allowed";
    submitButton.classList.add("botao-desativado");
    
    function validarCampos() {
        if (passwordInput.value.trim() !== "" && passwordInput2.value.trim() !== "") {
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

    
    passwordInput.addEventListener("input", validarCampos);
    passwordInput2.addEventListener("input", validarCampos);
    submitButton.addEventListener("click", redefinir);
});