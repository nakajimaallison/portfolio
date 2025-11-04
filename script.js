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
