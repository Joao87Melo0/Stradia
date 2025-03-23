document.querySelectorAll('.faq').forEach(faq => {
    faq.addEventListener('click', () => {
        // Fecha todas as outras FAQs antes de abrir a clicada
        document.querySelectorAll('.faq').forEach(item => {
            if (item !== faq) {
                item.classList.remove('open');
                item.querySelector('.faq-answer').style.display = 'none';
                item.querySelector('.faq-question').classList.remove('active');
            }
        });

        // Alterna a classe 'open' apenas para o clicado
        const answer = faq.querySelector('.faq-answer');
        const question = faq.querySelector('.faq-question');

        if (faq.classList.contains('open')) {
            faq.classList.remove('open');
            answer.style.display = 'none';
            question.classList.remove('active');
        } else {
            faq.classList.add('open');
            answer.style.display = 'block';
            question.classList.add('active');
        }
    });
});
