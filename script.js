// Light/Dark theme toggle with localStorage error handling
(function() {
    'use strict';
    
    const html = document.documentElement;
    const themeButtons = document.querySelectorAll('.theme-btn');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
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
    
    // Helper: Update theme in DOM and buttons
    function applyTheme(theme) {
        const dataTheme = theme === 'nighttime' ? 'dark' : 'light';
        html.setAttribute('data-theme', dataTheme);
        
        themeButtons.forEach(btn => {
            if (btn.getAttribute('data-theme') === theme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    // Initialize theme on page load
    function initTheme() {
        const storedTheme = getStoredTheme();
        const initialTheme = storedTheme || (prefersDark.matches ? 'nighttime' : 'daytime');
        
        applyTheme(initialTheme);
        
        // Save initial theme if none was stored
        if (!storedTheme) {
            setStoredTheme(initialTheme);
        }
    }
    
    // Add click handlers to theme buttons
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedTheme = button.getAttribute('data-theme');
            applyTheme(selectedTheme);
            setStoredTheme(selectedTheme);
        });
    });
    
    // Initialize theme
    initTheme();
})();

// Secret Text Reveal Effect
(function() {
    'use strict';
    
    const container = document.querySelector('.intro-reveal-container');
    const secretText = document.getElementById('secret-text');
    
    if (!container || !secretText) return;
    
    let isHovering = false;
    const padding = 64; // var(--space-2xl) = 64px
    
    // Initialize position immediately on mouse enter
    container.addEventListener('mouseenter', function(e) {
        isHovering = true;
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left - padding;
        const y = e.clientY - rect.top - padding;
        
        secretText.style.setProperty('--cursor-x', x + 'px');
        secretText.style.setProperty('--cursor-y', y + 'px');
    });
    
    // Update reveal position on mouse move
    container.addEventListener('mousemove', function(e) {
        if (!isHovering) return;
        
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left - padding;
        const y = e.clientY - rect.top - padding;
        
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

// Side Navigation - Scroll Spy & Smooth Scroll
(function() {
    'use strict';
    
    const navLinks = document.querySelectorAll('.side-nav-link');
    const sections = document.querySelectorAll('section[id], footer[id]');
    
    if (navLinks.length === 0 || sections.length === 0) return;
    
    // Smooth scroll on click
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Scroll spy - update active state based on scroll position
    function updateActiveNav() {
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Initial update
    updateActiveNav();
})();

// Mobile Menu Toggle
(function() {
    'use strict';
    
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const sideNav = document.getElementById('side-nav');
    const overlay = document.getElementById('mobile-menu-overlay');
    const navLinks = document.querySelectorAll('.side-nav-link');
    
    if (!menuToggle || !sideNav || !overlay) return;
    
    // Toggle menu
    function toggleMenu() {
        const isActive = sideNav.classList.contains('active');
        
        if (isActive) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    function openMenu() {
        sideNav.classList.add('active');
        overlay.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    }
    
    function closeMenu() {
        sideNav.classList.remove('active');
        overlay.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = ''; // Restore scroll
    }
    
    // Event listeners
    menuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sideNav.classList.contains('active')) {
            closeMenu();
        }
    });
})();
