document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check for saved user preference, if any, on load of the website
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    if (currentTheme) {
        body.classList.add(currentTheme);

        if (currentTheme === 'dark-mode') {
            toggleSwitch.checked = true;
        }
    }

    // Switch theme function
    function switchTheme(e) {
        if (e.target.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }

    toggleSwitch.addEventListener('change', switchTheme);
    
    // Smooth scroll for buttons (optional if you add IDs later)
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Simple bounce effect visual feedback
            this.style.transform = "scale(0.95)";
            setTimeout(() => {
                this.style.transform = "scale(1)";
            }, 100);
        });
    });
});
