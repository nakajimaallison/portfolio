// Time-of-day theme functionality
const html = document.documentElement;
const themeButtons = document.querySelectorAll('.theme-btn');

// Check for saved theme preference or default to sunrise
const currentTheme = localStorage.getItem('theme') || 'sunrise';
html.setAttribute('data-theme', currentTheme);

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
        html.setAttribute('data-theme', selectedTheme);
        
        // Save preference
        localStorage.setItem('theme', selectedTheme);
        
        // Update active state
        themeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Optional: Add fade-in animation on load
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

// Optional: Auto-update theme based on actual time of day
function getTimeOfDayTheme() {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 8) return 'sunrise';      // 5am-8am
    else if (hour >= 8 && hour < 17) return 'daytime'; // 8am-5pm
    else if (hour >= 17 && hour < 20) return 'sunset'; // 5pm-8pm
    else return 'nighttime';                           // 8pm-5am
}

// Uncomment the lines below to enable auto theme based on time of day
// (Will override manual selection every time page loads)
/*
const autoTheme = getTimeOfDayTheme();
html.setAttribute('data-theme', autoTheme);
localStorage.setItem('theme', autoTheme);
themeButtons.forEach(btn => {
    if (btn.getAttribute('data-theme') === autoTheme) {
        btn.classList.add('active');
    } else {
        btn.classList.remove('active');
    }
});
*/
