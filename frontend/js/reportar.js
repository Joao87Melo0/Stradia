document.addEventListener('DOMContentLoaded', function() {
    // Seleciona o botão e o textarea
    const button = document.querySelector('section button');
    const textarea = document.querySelector('section textarea');
    
    // Adiciona o evento de clique ao botão
    button.addEventListener('click', function() {
        // Limpa o conteúdo do textarea
        if(textarea.value == '')
            alert('Primeiramente preencha o campo de texto!');
        else{

        textarea.value = '';
        
        // Mostra o alerta
        alert('Seu problema foi enviado com sucesso!');
        
        // Opcional: Foca no textarea novamente
        textarea.focus();
        }
    });
});

// Coloque no início do seu JavaScript em qualquer página que precise de autenticação
document.addEventListener("DOMContentLoaded", function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            window.alert("Você precisa estar logado para acessar esta página.");
            window.location.href = "../login/index.html";
        }
        // O restante do seu código pode continuar aqui
    });
});