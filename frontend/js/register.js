//Botao cadastrar
document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const nameInput = document.getElementById("name");
    const userInput = document.getElementById("user");
    const passwordInput = document.getElementById("password");
    const confirmPassInput = document.getElementById("confirmPass");
    const submitButton = document.getElementById("submitRegister");
    
    submitButton.disabled = true;
    submitButton.style.opacity = "0.5";
    submitButton.style.cursor = "not-allowed";
    submitButton.classList.add("botao-desativado");

    function validarCampos() {
        if (
            emailInput.value.trim() !== "" &&
            passwordInput.value.trim() !== "" &&
            nameInput.value.trim() !== "" &&
            userInput.value.trim() !== "" &&
            confirmPassInput.value.trim() !== ""
        ) {
            submitButton.disabled = false;
            submitButton.style.opacity = "1";
            submitButton.style.cursor = "pointer";
        } else {
            submitButton.disabled = true;
            submitButton.style.opacity = "0.5";
            submitButton.style.cursor = "not-allowed";
            submitButton.classList.add("botao-desativado");
        }
    }

    emailInput.addEventListener("input", validarCampos);
    passwordInput.addEventListener("input", validarCampos);
    nameInput.addEventListener("input", validarCampos);
    userInput.addEventListener("input", validarCampos);
    confirmPassInput.addEventListener("input", validarCampos);
});

//Botão de visualizar senha
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

document.addEventListener("DOMContentLoaded", function() {
    const passwordInput = document.getElementById("confirmPass");
    const togglePassword = document.getElementById("togglePassword2");

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

// Enviar para o Firebase
document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const nameInput = document.getElementById("name");
    const userInput = document.getElementById("user");
    const passwordInput = document.getElementById("password");
    const confirmPassInput = document.getElementById("confirmPass");
    const submitButton = document.getElementById("submitRegister");

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.firestore();

    window.registrar = function () {
        const email = emailInput.value.trim();
        const name = nameInput.value.trim();
        const username = userInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPassInput.value.trim();

        if (!email || !name || !username || !password || !confirmPassword) {
            alert("❌ Preencha todos os campos!");
            return;
        } else if (password.length < 6) {
            alert("❌ A senha deve ter pelo menos 6 caracteres!");
            return;
        } else if (password !== confirmPassword) {
            alert("❌ As senhas não coincidem!");
            return;
        }

        // Desativar botão para evitar cliques duplos
        submitButton.disabled = true;
        submitButton.style.opacity = "0.5";
        submitButton.style.cursor = "not-allowed";

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                return db.collection("users").doc(user.uid).set({
                    name: name,
                    username: username,
                    email: email
                });
            })
            .then(() => {
                alert("✅ Conta criada com sucesso!");
                window.location.href = "../login/index.html";
            })
            .catch((error) => {
                // Reativar botão em caso de erro
                submitButton.disabled = false;
                submitButton.style.opacity = "1";
                submitButton.style.cursor = "pointer";

                if (error.code === "auth/email-already-in-use") {
                    alert("❌ Este e-mail já está sendo usado!");
                } else {
                    alert(`Erro: ${error.message}`);
                }
                console.error("❌ Erro ao cadastrar:", error.message);
            });
    };
});
