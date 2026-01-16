document.addEventListener('DOMContentLoaded', () => {
    // 1. Dark Mode Funktionalität
    const darkModeCheckbox = document.getElementById('darkModeCheckbox');
    const body = document.body;

    // Prüfen, ob der Nutzer schon mal da war und eine Einstellung hat
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('darkmode');
        if(darkModeCheckbox) darkModeCheckbox.checked = true;
    }

    if(darkModeCheckbox) {
        darkModeCheckbox.addEventListener('change', function() {
            if (this.checked) {
                body.classList.add('darkmode');
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.remove('darkmode');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // 2. Smooth Scroll für "Mehr erfahren"
    const learnMoreBtn = document.querySelector('.btn-pill:nth-child(3)');
    if(learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            const aboutSection = document.querySelector('.about-section');
            if(aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // 3. Button Click Animation (Feedback)
    const allButtons = document.querySelectorAll('button, .pill-link');
    allButtons.forEach(btn => {
        btn.addEventListener('mousedown', () => {
            btn.style.transform = 'scale(0.95)';
        });
        btn.addEventListener('mouseup', () => {
            btn.style.transform = 'scale(1.03)'; // Back to hover state or 1
            setTimeout(() => {
                btn.style.transform = ''; // Clear inline style
            }, 150);
        });
    });
});
