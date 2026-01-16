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

document.addEventListener('DOMContentLoaded', () => {
    const step1 = document.getElementById('booking-step-1');
    const step2 = document.getElementById('booking-step-2');
    const btnToStep2 = document.getElementById('btn-to-step-2');
    const btnBackTo1 = document.getElementById('btn-back-to-1');
    const orderTypeSelect = document.getElementById('order-type');
    
    const shippingCheckbox = document.getElementById('shipping');
    const addressField = document.getElementById('address-field');

    // Navigation zu Schritt 2
    btnToStep2.addEventListener('click', () => {
        const selection = orderTypeSelect.value;
        if (!selection) {
            alert('Bitte wählen Sie eine Bestellart aus.');
            return;
        }

        step1.classList.add('hidden');
        step2.classList.remove('hidden');

        // Alle dynamischen Felder verstecken
        document.querySelectorAll('.dynamic-content').forEach(el => el.classList.add('hidden'));

        // Gewünschtes Feld anzeigen
        if (selection === 'file') document.getElementById('field-file').classList.remove('hidden');
        if (selection === 'design') document.getElementById('field-design').classList.remove('hidden');
        if (selection === 'link') document.getElementById('field-link').classList.remove('hidden');
    });

    // Zurück zu Schritt 1
    btnBackTo1.addEventListener('click', () => {
        step2.classList.add('hidden');
        step1.classList.remove('hidden');
    });

    // Adresse einblenden wenn Postsendung gewählt
    shippingCheckbox.addEventListener('change', () => {
        if (shippingCheckbox.checked) {
            addressField.classList.remove('hidden');
        } else {
            addressField.classList.add('hidden');
        }
    });
});

let currentSlide = 0;
const captions = [
    "Das intuitive Touch-Interface unserer Drucker im Einsatz.",
    "Ein wunderbares grünes Benchy-Boot.",
    "Präzision in Aktion: Ein Bambu Lab Drucker bei der Arbeit."
];

function updateSlider() {
    const track = document.getElementById('slidesTrack');
    const captionElement = document.getElementById('slideCaption');
    
    // Verschiebe den Track
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update Text mit leichtem Fade-Effekt
    captionElement.style.opacity = 0;
    setTimeout(() => {
        captionElement.innerText = captions[currentSlide];
        captionElement.style.opacity = 1;
    }, 200);
}

function changeSlide(direction) {
    const totalSlides = document.querySelectorAll('.slide').length;
    currentSlide += direction;

    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    updateSlider();
}

// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    updateSlider();
});

document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submitBtn');
    const orderInput = document.getElementById('orderInput');
    const resultsContainer = document.getElementById('resultsTableContainer');
    const tableBody = document.getElementById('tableBody');

    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const val = orderInput.value;
            
            if (val === "1234" || val === "123456" || val === "555555") {
                // Beispiel-Daten wie im Video bei Sekunde 0:14
                tableBody.innerHTML = `
                    <tr>
                        <td>${val}</td>
                        <td>fertig</td>
                        <td>jhv</td>
                        <td>7</td>
                    </tr>
                `;
                resultsContainer.classList.remove('hidden');
                
                // Optional: Scroll zum Ergebnis
                resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (val !== "") {
                // Fallback falls eine andere Nummer eingegeben wird
                tableBody.innerHTML = `
                    <tr>
                        <td>${val}</td>
                        <td>NaN</td>
                        <td>NaN</td>
                        <td>NaN</td>
                    </tr>
                `;
                resultsContainer.classList.remove('hidden');
            }
        });
    }
});
