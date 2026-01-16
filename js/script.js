document.addEventListener('DOMContentLoaded', () => {
    // 1. Dark Mode Funktionalität
    const darkModeCheckbox = document.getElementById('darkModeCheckbox');
    const body = document.body;

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

    // 2. Gallery Slider Logic
    const slides = document.querySelectorAll('.gallery-slide');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    let currentSlide = 0;

    function showSlide(index) {
        // Wrap around
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        // Hide all
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
        });

        // Show current with fade in
        slides[currentSlide].classList.add('active');
        setTimeout(() => {
            slides[currentSlide].style.opacity = '1';
        }, 50);
    }

    if(nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    }

    // 3. Smooth Scroll
    const learnMoreBtn = document.querySelectorAll('.btn-pill')[2]; // 3rd button
    if(learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            document.querySelector('.about-section').scrollIntoView({ behavior: 'smooth' });
        });
    }
});
