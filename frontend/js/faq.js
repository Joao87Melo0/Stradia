document.querySelectorAll('.faq').forEach(faq => {
    const question = faq.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // Se já estiver aberto, fecha
        if (faq.classList.contains('open')) {
            faq.classList.remove('open');
        } else {
            // Fecha todos os outros
            document.querySelectorAll('.faq').forEach(item => item.classList.remove('open'));
            // Abre o clicado
            faq.classList.add('open');
        }
    });
});
