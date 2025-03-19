document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");

    if (email) {
        document.getElementById("emailMessage").innerHTML = `Enviamos um email de verificação para ${censurarEmail(email)}`;
    }
});

function censurarEmail(email) {
    const [local, domain] = email.split("@"); // Divide em duas partes: antes e depois do "@"

    if (local.length <= 3) {
        return `${local[0]}**@${domain}`; // Se for um nome muito curto, esconde tudo menos a primeira letra
    }

    const parteVisivel = local.slice(0, 2); // Mostra os dois primeiros caracteres
    const parteOculta = "*".repeat(local.length - 2); // Substitui o restante por "*"

    return `${parteVisivel}${parteOculta}@${domain}`;
}
