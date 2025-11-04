// Light/Dark theme toggle with localStorage
(function() {
    'use strict';
    
    const html = document.documentElement;
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (!themeToggle) return;
    
    // Helper: Safely get from localStorage
    function getStoredTheme() {
        try {
            return localStorage.getItem('theme');
        } catch (e) {
            console.warn('localStorage access denied:', e);
            return null;
        }
    }
    
    // Helper: Safely set to localStorage
    function setStoredTheme(theme) {
        try {
            localStorage.setItem('theme', theme);
        } catch (e) {
            console.warn('localStorage write failed:', e);
        }
    }
    
    // Helper: Update theme in DOM
    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
    }
    
    // Initialize theme on page load
    function initTheme() {
        const storedTheme = getStoredTheme();
        const initialTheme = storedTheme || (prefersDark.matches ? 'dark' : 'light');
        
        applyTheme(initialTheme);
        
        // Save initial theme if none was stored
        if (!storedTheme) {
            setStoredTheme(initialTheme);
        }
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        setStoredTheme(newTheme);
    });
    
    // Initialize theme
    initTheme();
})();

// Side Navigation - Active state management
(function() {
    'use strict';
    
    const navItems = document.querySelectorAll('.side-nav-item:not(.theme-toggle)');
    
    if (navItems.length === 0) return;
    
    // Handle click on nav items
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Prevent default for now since pages don't exist yet
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
})();

// Secret Text Reveal Effect
(function() {
    'use strict';
    
    const container = document.querySelector('.hero-text-container');
    const visibleText = document.querySelector('.hero-text-visible');
    const secretText = document.getElementById('secret-text');
    
    if (!container || !visibleText || !secretText) return;
    
    let isHovering = false;
    
    // Initialize position immediately on mouse enter
    container.addEventListener('mouseenter', function(e) {
        isHovering = true;
        const rect = visibleText.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        secretText.style.setProperty('--cursor-x', x + 'px');
        secretText.style.setProperty('--cursor-y', y + 'px');
    });
    
    // Update reveal position on mouse move
    container.addEventListener('mousemove', function(e) {
        if (!isHovering) return;
        
        const rect = visibleText.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Update CSS custom properties for reveal position
        secretText.style.setProperty('--cursor-x', x + 'px');
        secretText.style.setProperty('--cursor-y', y + 'px');
    });
    
    // Reset on mouse leave
    container.addEventListener('mouseleave', function() {
        isHovering = false;
        // Delay position reset until after the fade transition completes (150ms)
        setTimeout(function() {
            secretText.style.setProperty('--cursor-x', '-200px');
            secretText.style.setProperty('--cursor-y', '-200px');
        }, 150);
    });
})();
