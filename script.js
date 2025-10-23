// Light/Dark theme toggle
const html = document.documentElement;
const themeButtons = document.querySelectorAll('.theme-btn');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'daytime';
html.setAttribute('data-theme', currentTheme === 'nighttime' ? 'dark' : 'light');

// Set active button on load
themeButtons.forEach(button => {
    if (button.getAttribute('data-theme') === currentTheme) {
        button.classList.add('active');
    } else {
        button.classList.remove('active');
    }
});

// Add click handlers to all theme buttons
themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedTheme = button.getAttribute('data-theme');
        
        // Update HTML attribute
        html.setAttribute('data-theme', selectedTheme === 'nighttime' ? 'dark' : 'light');
        
        // Save preference
        localStorage.setItem('theme', selectedTheme);
        
        // Update active state
        themeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Optional: Detect system theme preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// If no saved preference, use system preference
if (!localStorage.getItem('theme')) {
    const systemTheme = prefersDark.matches ? 'nighttime' : 'daytime';
    html.setAttribute('data-theme', prefersDark.matches ? 'dark' : 'light');
    localStorage.setItem('theme', systemTheme);
    
    themeButtons.forEach(btn => {
        if (btn.getAttribute('data-theme') === systemTheme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Listen for system theme changes
prefersDark.addEventListener('change', (e) => {
    // Only auto-update if user hasn't manually set a preference
    if (!localStorage.getItem('theme-manual')) {
        const systemTheme = e.matches ? 'nighttime' : 'daytime';
        html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        localStorage.setItem('theme', systemTheme);
        
        themeButtons.forEach(btn => {
            if (btn.getAttribute('data-theme') === systemTheme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
});
