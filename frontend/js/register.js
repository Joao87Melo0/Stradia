//Botao cadastrar
document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const nameInput = document.getElementById("name");
    const userInput = document.getElementById("user");
    const passwordInput = document.getElementById("password");
    const confirmPassInput = document.getElementById("confirmPass");
    const submitButton = document.getElementById("submitRegister")
    submitButton.disabled = true; // Desativa o botão
    submitButton.style.opacity = "0.5"; 
    submitButton.style.cursor = "not-allowed";
    submitButton.classList.add("botao-desativado");
    
    function validarCampos() {
        if (emailInput.value.trim() !== "" && passwordInput.value.trim() !== "" && nameInput.value.trim() !== "" && userInput.value.trim() !== "" && confirmPassInput.value.trim() !== "") {
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
    nameInput.addEventListener("input", validarCampos);
    userInput.addEventListener("input", validarCampos);
    confirmPassInput.addEventListener("input", validarCampos);
});

//Enviar para o firebase
document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const nameInput = document.getElementById("name");
    const userInput = document.getElementById("user");
    const passwordInput = document.getElementById("password");
    const confirmPassInput = document.getElementById("confirmPass");

    // Inicializar Firebase e Firestore
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.firestore(); // Conectar ao Firestore

    window.registrar = function () {
        const email = emailInput.value.trim();
        const name = nameInput.value.trim();
        const username = userInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPassInput.value.trim();

        // Validação dos campos
        if (!email || !name || !username || !password || !confirmPassword) {
            alert("❌ Preencha todos os campos!");
            return;
        } else if (password !== confirmPassword) {
            alert("❌ As senhas não coincidem!");
            return;
        }

        // Criar usuário no Firebase Authentication
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                // Adicionar dados no Firestore
                return db.collection("users").doc(user.uid).set({
                    name: name,
                    username: username,
                    email: email
                });
            })
            .then(() => {
                alert("✅ Conta criada com sucesso!");
                window.location.href = "../login/index.html"; // Redireciona para login
            })
            .catch((error) => {
                console.error("❌ Erro ao cadastrar:", error.message);
                alert(`Erro: ${error.message}`);
            });
    }
});

