// ==========================================================================
// THEME TOGGLE
// ==========================================================================

(function() {
    'use strict';
    
    const html = document.documentElement;
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (!themeToggle) return;
    
    /**
     * Safely get theme from localStorage
     * @returns {string|null} Stored theme or null
     */
    function getStoredTheme() {
        try {
            return localStorage.getItem('theme');
        } catch (e) {
            console.warn('localStorage access denied:', e);
            return null;
        }
    }
    
    /**
     * Safely set theme to localStorage
     * @param {string} theme - Theme to store
     */
    function setStoredTheme(theme) {
        try {
            localStorage.setItem('theme', theme);
        } catch (e) {
            console.warn('localStorage write failed:', e);
        }
    }
    
    /**
     * Apply theme to DOM
     * @param {string} theme - Theme to apply ('light' or 'dark')
     */
    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
    }
    
    /**
     * Initialize theme on page load
     */
    function initTheme() {
        const storedTheme = getStoredTheme();
        const initialTheme = storedTheme || (prefersDark.matches ? 'dark' : 'light');
        
        applyTheme(initialTheme);
        
        if (!storedTheme) {
            setStoredTheme(initialTheme);
        }
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        setStoredTheme(newTheme);
    });
    
    // Initialize
    initTheme();
})();

// ==========================================================================
// NAVIGATION - ACTIVE STATE
// ==========================================================================

(function() {
    'use strict';
    
    const navItems = document.querySelectorAll('.side-nav-item:not(.theme-toggle)');
    const homeLink = document.querySelector('.side-nav-item[href="#home"]');
    
    if (navItems.length === 0) return;
    
    // Prevent default navigation for non-working links (not home)
    navItems.forEach(item => {
        if (item !== homeLink) {
            item.addEventListener('click', function(e) {
                e.preventDefault();
            });
        }
    });
    
    // Keep home link active by default (it's the only working page)
    if (homeLink) {
        homeLink.classList.add('active');
    }
})();

// ==========================================================================
// HERO TEXT REVEAL EFFECT
// ==========================================================================

(function() {
    'use strict';
    
    const container = document.querySelector('.hero-text-container');
    const visibleText = document.querySelector('.hero-text-visible');
    const secretText = document.getElementById('secret-text');
    
    if (!container || !visibleText || !secretText) return;
    
    let isHovering = false;
    
    /**
     * Update reveal circle position
     * @param {MouseEvent} e - Mouse event
     */
    function updateRevealPosition(e) {
        const rect = visibleText.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        secretText.style.setProperty('--cursor-x', x + 'px');
        secretText.style.setProperty('--cursor-y', y + 'px');
    }
    
    // Initialize position on mouse enter
    container.addEventListener('mouseenter', function(e) {
        isHovering = true;
        updateRevealPosition(e);
    });
    
    // Update position on mouse move
    container.addEventListener('mousemove', function(e) {
        if (!isHovering) return;
        updateRevealPosition(e);
    });
    
    // Reset on mouse leave
    container.addEventListener('mouseleave', function() {
        isHovering = false;
        // Delay position reset until after fade transition completes
        setTimeout(function() {
            secretText.style.setProperty('--cursor-x', '-200px');
            secretText.style.setProperty('--cursor-y', '-200px');
        }, 150);
    });
})();

// ==========================================================================
// CUSTOM CURSOR FOR PROJECT CARDS
// ==========================================================================

(function() {
    'use strict';
    
    const customCursor = document.getElementById('customCursor');
    const cursorText = document.querySelector('.custom-cursor-text');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!customCursor || !cursorText || projectCards.length === 0) return;
    
    let isOverCard = false;
    
    /**
     * Update cursor position
     * @param {MouseEvent} e - Mouse event
     */
    function updateCursorPosition(e) {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
    }
    
    // Track mouse movement over project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            isOverCard = true;
            customCursor.classList.add('active');
            
            // Update cursor text based on card's data-project attribute
            const projectName = card.getAttribute('data-project') || 'View Project';
            cursorText.textContent = projectName;
            
            // Update cursor background color based on card's data-cursor-color attribute
            const cursorColor = card.getAttribute('data-cursor-color');
            if (cursorColor) {
                customCursor.style.backgroundColor = cursorColor;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            isOverCard = false;
            customCursor.classList.remove('active');
        });
        
        card.addEventListener('mousemove', updateCursorPosition);
    });
})();
