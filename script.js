document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navbar = document.getElementById('navbar');
    const videoSection = document.getElementById('video-section');
    const video = document.getElementById('invitation-video');
    const invitationFullscreen = document.getElementById('invitation-fullscreen');
    const backgroundImage = document.getElementById('background-image');
    const playVideoBtn = document.getElementById('play-video-btn');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // YouTube video ID
    const youtubeVideoId = 'Yy6Wl7zHgWI';
    
    // State
    let videoStarted = false;
    
    // Show video when button is clicked
    function showVideo() {
        invitationFullscreen.classList.add('hidden');
        videoSection.classList.remove('hidden');
        
        // Set up YouTube iframe with autoplay and API
        const youtubeUrl = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&showinfo=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&enablejsapi=1&origin=${window.location.origin}`;
        video.src = youtubeUrl;
        
        videoStarted = true;
        // NO mostrar navbar durante el video
        
        // Escuchar eventos del video de YouTube
        setupYouTubeListener();
        
        // Backup: si no detecta el fin del video, usar timeout
        setTimeout(() => {
            showMainContent();
        }, 120000); // 2 minutos como backup
    }
    
    // Configurar listener para eventos de YouTube
    function setupYouTubeListener() {
        window.addEventListener('message', function(event) {
            if (event.origin !== 'https://www.youtube.com') return;
            
            try {
                const data = JSON.parse(event.data);
                // Cuando el video termina (estado 0)
                if (data.event === 'video-data-change' && data.info && data.info.playerState === 0) {
                    showMainContent();
                }
                // También escuchar directamente el evento de fin
                if (data.event === 'onStateChange' && data.info === 0) {
                    showMainContent();
                }
            } catch (e) {
                // Ignorar mensajes que no son JSON válido
            }
        });
    }
    
    // Show main content and hide video
    function showMainContent() {
        videoSection.classList.add('hidden');
        backgroundImage.classList.remove('hidden');
        navbar.classList.add('visible');
        document.querySelector('.main-content').classList.add('visible');
    }
    
    // Skip to main content directly
    function skipToContent() {
        invitationFullscreen.classList.add('hidden');
        videoStarted = true;
        showMainContent();
    }
    
    // Event listeners
    if (playVideoBtn) {
        playVideoBtn.addEventListener('click', showVideo);
    }
    
    // Skip with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !videoStarted) {
            skipToContent();
        }
    });
    
    // Skip by clicking hint
    const scrollHintBottom = document.querySelector('.scroll-hint-bottom');
    if (scrollHintBottom) {
        scrollHintBottom.addEventListener('click', function() {
            if (!videoStarted) {
                skipToContent();
            }
        });
    }
    
    // Smooth navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                if (!videoStarted) {
                    skipToContent();
                    setTimeout(() => {
                        const offsetTop = targetSection.offsetTop + window.innerHeight - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }, 300);
                } else {
                    const offsetTop = targetSection.offsetTop + window.innerHeight - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Show navbar on scroll
    window.addEventListener('scroll', function() {
        // Solo mostrar navbar si el contenido principal está visible
        const mainContent = document.querySelector('.main-content');
        if (mainContent.classList.contains('visible')) {
            navbar.classList.add('visible');
        }
        
        // Update active navigation
        updateActiveNavigation();
        
        // Simple scroll animations
        animateOnScroll();
    });
    
    // Update active navigation
    function updateActiveNavigation() {
        const scrollPosition = window.scrollY + 100;
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop + window.innerHeight;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Simple scroll animations
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.detail-card, .location-item');
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate-in');
            }
        });
    }
    
    // RSVP form handling
    const rsvpForm = document.querySelector('.rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            if (!data.name || !data.email || !data.attendance) {
                showNotification('Por favor, completa todos los campos requeridos.', 'error');
                return;
            }
            
            showNotification('¡Perfecto! Tu confirmación ha sido enviada. Nos vemos pronto.', 'success');
            this.reset();
        });
    }
    
    // Simple notification system
    function showNotification(message, type = 'success') {
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✓' : '⚠'}</span>
                <span class="notification-text">${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#2C2C2C' : '#E74C3C'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%) scale(0.9);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            font-family: var(--font-body);
            max-width: 350px;
        `;
        
        document.body.appendChild(notification);
        
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0) scale(1)';
        });
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%) scale(0.9)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 400);
        }, 4000);
    }
    
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Location buttons
    const locationBtns = document.querySelectorAll('.location-btn');
    locationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            showNotification('Abriendo ubicación en Maps...', 'success');
        });
    });
    
    // Check initial state
    function checkInitialState() {
        if (window.location.hash || window.scrollY > 100) {
            // Si hay un hash o scroll, saltar directamente al contenido
            skipToContent();
        }
    }
    
    // Initialize
    checkInitialState();
    updateActiveNavigation();
    animateOnScroll();
    
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});


// Mobile menu styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-icon {
        font-weight: bold;
        font-size: 1.1rem;
    }
    
    .notification-text {
        font-size: 0.9rem;
        line-height: 1.4;
    }
    
    @media (max-width: 768px) {
        .notification {
            right: 10px !important;
            left: 10px !important;
            top: 10px !important;
            max-width: none !important;
        }
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(255,255,255,0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            padding: 2rem;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            border-top: 1px solid var(--border-color);
        }
        
        .nav-menu.active a {
            padding: 1rem 0;
            border-bottom: 1px solid var(--border-color);
            position: relative;
        }
        
        .nav-menu.active a::after {
            bottom: 0;
            height: 2px;
            background: var(--accent-color);
            z-index: 1;
        }
    }
`;
document.head.appendChild(notificationStyles);