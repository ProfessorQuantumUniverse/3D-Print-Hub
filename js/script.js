/* ============================================================
   GLOBAL SCRIPT - CLEANED & FIXED
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. HEADER LADEN (FETCH) --- */
    const headerContainer = document.getElementById('global-header');
    
    // Falls du lokal arbeitest oder die Pfade anders sind, passe dies an:
    const headerPath = '/3D-Print-Hub/header.html'; 
    // HINWEIS: Wenn das nicht geht, probiere './header.html'

    /* --- ZUSATZ FÜR BUCHEN SEITE (Terminal Logic) --- */
    const modal = document.getElementById('bookingModal');
    const openBtn = document.getElementById('openTerminalBtn');
    const closeBtn = document.getElementById('closeTerminalBtn');

    if (headerContainer) {
        fetch(headerPath)
            .then(response => {
                if (!response.ok) throw new Error(`Header Error: ${response.status}`);
                return response.text();
            })
            .then(html => {
                headerContainer.innerHTML = html;
                
                // Nach dem Laden: Active State setzen
                setActiveMenuItem();
                
                // Debugging: Prüfen ob Button da ist
                console.log("Header geladen via Fetch.");
            })
            .catch(error => {
                console.error('Fehler beim Laden des Headers:', error);
                // Fallback: Zeige Fehlermeldung im Header
                headerContainer.innerHTML = "<p style='color:white; text-align:center; padding:20px;'>Header konnte nicht geladen werden.</p>";
            });
    } else {
        // Falls kein Header-Container da ist (z.B. statische Seite), trotzdem Active setzen
        setActiveMenuItem();
    }

    /* --- 2. DARK MODE --- */
    const darkModeCheckbox = document.getElementById('darkModeCheckbox');
    const body = document.body;

    // Gespeichertes Theme laden
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

    /* --- 3. 3D TEXT & BACKGROUND EFFECT --- */
    const textElement = document.querySelector('.giant-3d-text');
    if (textElement) {
        textElement.addEventListener('mousemove', (e) => {
            const rect = textElement.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xWalk = (x / rect.width * 2) - 1;
            const yWalk = (y / rect.height * 2) - 1;
            
            const tiltX = yWalk * -15; 
            const tiltY = xWalk * 15;
            const depthFactor = 1.5; 
            const shadowX = xWalk * -1 * depthFactor;
            const shadowY = yWalk * -1 * depthFactor;

            let shadowString = '';
            // Layering Loop
            for(let i = 1; i <= 5; i++) shadowString += `${shadowX * i}px ${shadowY * i}px 0 #888, `;
            for(let i = 6; i <= 30; i++) shadowString += `${shadowX * i}px ${shadowY * i}px 0 #E98E68, `;
            for(let i = 31; i <= 40; i++) shadowString += `${shadowX * i}px ${shadowY * i}px 0 #333, `;
            shadowString += `${shadowX * 55}px ${shadowY * 55}px 40px rgba(0,0,0,0.6)`;

            requestAnimationFrame(() => {
                textElement.style.setProperty('--rX', `${tiltX}deg`);
                textElement.style.setProperty('--rY', `${tiltY}deg`);
                textElement.style.setProperty('--tz', `30px`);
                textElement.style.textShadow = shadowString;
            });
        });

        textElement.addEventListener('mouseleave', () => {
            textElement.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), text-shadow 0.5s';
            textElement.style.setProperty('--rX', `0deg`);
            textElement.style.setProperty('--rY', `0deg`);
            textElement.style.setProperty('--tz', `0px`);
            textElement.style.textShadow = '0 0 0 rgba(0,0,0,0)';
            setTimeout(() => { if(!textElement.matches(':hover')) textElement.style.transition = ''; }, 500);
        });
        
        textElement.addEventListener('mouseenter', () => {
             textElement.style.transition = 'transform 0.1s linear, text-shadow 0s';
        });
    }

    // Background Mouse Move
    const bgWrapper = document.querySelector('.background-wrapper');
    if (bgWrapper) {
        document.addEventListener('mousemove', (e) => {
            bgWrapper.style.setProperty('--mouse-x', `${e.clientX}px`);
            bgWrapper.style.setProperty('--mouse-y', `${e.clientY}px`);
        });
    }

  /* =====================================================================
   MODAL & FORM LOGIC (Buchen Page)
   ===================================================================== */
    function initBookingModal() {
        const openBtn = document.getElementById('openBookingModalBtn');
        const modal = document.getElementById('bookingModalOverlay');
        const closeBtn = document.getElementById('closeModalBtn');
        
        // Debugging: Prüfen ob Elemente gefunden wurden
        if (!openBtn) {
            console.warn('Booking Button (openBookingModalBtn) nicht gefunden.');
            return; 
        }
        if (!modal) {
            console.error('Modal Overlay (bookingModalOverlay) nicht gefunden.');
            return;
        }

        console.log('Booking System initialisiert.');

        // OPEN
        openBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Verhindert Springen nach oben
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Scroll Lock
        });

        // CLOSE (X-Button)
        if(closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }

        // CLOSE (Background Click)
        modal.addEventListener('click', (e) => {
            if(e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Direkt ausführen
    initBookingModal();

    // STEP LOGIC (Radio Buttons & Weiter)
    const radioInputs = document.querySelectorAll('input[name="order-type"]');
    const nextBtn = document.getElementById('nextStepBtn');
    const step1 = document.getElementById('modal-step-1');
    const step2 = document.getElementById('modal-step-2');
    const prevBtn = document.getElementById('prevStepBtn');
    const dynamicZones = document.querySelectorAll('.dynamic-zone');

    if(radioInputs.length > 0) {
        radioInputs.forEach(radio => {
            radio.addEventListener('change', () => {
                if(nextBtn) {
                    nextBtn.disabled = false;
                    nextBtn.classList.remove('disabled');
                }
            });
        });
    }

    if(nextBtn) {
        nextBtn.addEventListener('click', () => {
            const checkedRadio = document.querySelector('input[name="order-type"]:checked');
            if(!checkedRadio) return; // Sicherheit

            const selectedType = checkedRadio.value;
            
            step1.classList.add('hidden');
            step2.classList.remove('hidden');

            dynamicZones.forEach(zone => zone.classList.add('hidden'));
            const activeZone = document.getElementById(`dynamic-${selectedType}`);
            if(activeZone) activeZone.classList.remove('hidden');
        });
    }

    if(prevBtn) {
        prevBtn.addEventListener('click', () => {
            step2.classList.add('hidden');
            step1.classList.remove('hidden');
        });
    }

    /* --- 5. SLIDER LOGIC (Kompatibilität für beide Varianten) --- */
    // Variante A: Opacity Slider (Home)
    const slidesA = document.querySelectorAll('.gallery-slide');
    if (slidesA.length > 0) {
        const nextBtn = document.querySelector('.next-btn');
        const prevBtn = document.querySelector('.prev-btn');
        let currentSlideA = 0;

        function showSlideA(index) {
            if (index >= slidesA.length) currentSlideA = 0;
            else if (index < 0) currentSlideA = slidesA.length - 1;
            else currentSlideA = index;

            slidesA.forEach(slide => { slide.classList.remove('active'); slide.style.opacity = '0'; });
            slidesA[currentSlideA].classList.add('active');
            setTimeout(() => { slidesA[currentSlideA].style.opacity = '1'; }, 50);
        }
        if(nextBtn) nextBtn.addEventListener('click', () => showSlideA(currentSlideA + 1));
        if(prevBtn) prevBtn.addEventListener('click', () => showSlideA(currentSlideA - 1));
    }

    // Variante B: Transform Slider (Gallery Page)
    const track = document.getElementById('slidesTrack');
    if (track) {
        let currentSlideB = 0;
        const totalSlidesB = document.querySelectorAll('.slide').length;
        const captions = ["Interface", "Benchy", "Precision"];
        const captionElement = document.getElementById('slideCaption');

        // Wir hängen die Funktion ans window Objekt, falls HTML Buttons onclick="" nutzen
        window.changeSlide = function(direction) {
            currentSlideB += direction;
            if (currentSlideB >= totalSlidesB) currentSlideB = 0;
            else if (currentSlideB < 0) currentSlideB = totalSlidesB - 1;
            
            track.style.transform = `translateX(-${currentSlideB * 100}%)`;
            
            if (captionElement) {
                captionElement.style.opacity = 0;
                setTimeout(() => {
                    captionElement.innerText = captions[currentSlideB] || "";
                    captionElement.style.opacity = 1;
                }, 200);
            }
        };
    }
    
    /* --- 6. ORDER STATUS LOGIC --- */
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const val = document.getElementById('orderInput').value;
            const tableBody = document.getElementById('tableBody');
            const resultsContainer = document.getElementById('resultsTableContainer');
            
            if (val.length > 3) { // Simple Validierung
                tableBody.innerHTML = `<tr><td>${val}</td><td>In Bearbeitung</td><td>3D-Hub</td><td>2 Tage</td></tr>`;
                resultsContainer.classList.remove('hidden');
            }
        });
    }

    /* --- 7. SMOOTH SCROLL BUTTON --- */
    // Wählt den 3. Button in der Hero Card aus
    const learnMoreBtns = document.querySelectorAll('.btn-pill');
    if(learnMoreBtns.length >= 3) {
        learnMoreBtns[2].addEventListener('click', () => {
            const target = document.querySelector('#about') || document.querySelector('.about-section-tech');
            if(target) target.scrollIntoView({ behavior: 'smooth' });
        });
    }
});


/* ============================================================
   FUNKTIONEN AUSSERHALB (Scope)
   ============================================================ */

/* --- A. ACTIVE MENU ITEM SETZEN --- */
function setActiveMenuItem() {
    const path = window.location.pathname;
    // Dateinamen extrahieren (z.B. "materialien")
    let page = path.split("/").pop().replace('.html', '');
    
    // Fallbacks
    if (page === '' || page === 'index' || page === '3D-Print-Hub') page = 'home';

    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        // Wenn data-page="home" und wir sind auf home -> active
        if (item.getAttribute('data-page') === page) {
            item.classList.add('active');
        }
        // Fallback: Prüfen ob href den Namen enthält
        else if (item.getAttribute('href').includes(page + '.html')) {
            item.classList.add('active');
        }
    });
}


/* --- B. SCROLL PROGRESS BAR --- */
window.addEventListener('scroll', () => {
    const scrollBar = document.getElementById('scrollProgress');
    if(scrollBar) {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        scrollBar.style.width = scrolled + "%";
    }
});


/* --- C. ROBUSTES MOBILE MENU (EVENT DELEGATION) --- */
/* Dies ist der wichtigste Teil für den Fix! */
document.addEventListener('click', function(e) {
    
    // Helper zum Schließen
    function closeMenu() {
        const menuBtn = document.getElementById('mobileMenuBtn');
        const menuOverlay = document.getElementById('mobileMenuOverlay');
        
        if (menuBtn && menuOverlay) {
            menuBtn.classList.remove('menu-open');
            menuOverlay.classList.remove('active');
            
            const textSpan = menuBtn.querySelector('.menu-text');
            if (textSpan) textSpan.innerText = "Menu";
        }
    }

    // 1. HAMBURGER BUTTON CLICK
    // Wir suchen nach dem Button oder einem Kind davon
    const menuBtn = e.target.closest('#mobileMenuBtn');
    if (menuBtn) {
        e.preventDefault();
        const menuOverlay = document.getElementById('mobileMenuOverlay');
        const textSpan = menuBtn.querySelector('.menu-text');

        if (menuOverlay) {
            const isClosed = !menuBtn.classList.contains('menu-open');
            
            if (isClosed) {
                // Öffnen
                menuBtn.classList.add('menu-open');
                menuOverlay.classList.add('active');
                if (textSpan) textSpan.innerText = "Close";
            } else {
                // Schließen
                closeMenu();
            }
        }
        return; 
    }

    // 2. CLOSE BUTTON (X) CLICK
    if (e.target.closest('.menu-close-btn')) {
        e.preventDefault();
        closeMenu();
        return;
    }

    // 3. LINK CLICK IM MENÜ
    if (e.target.closest('.menu-item') || e.target.closest('.mobile-link')) {
        closeMenu();
    }
});