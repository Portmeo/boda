document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const navbar = document.getElementById('navbar');
    const videoHero = document.getElementById('video-hero');
    const video = document.getElementById('invitation-video');
    const invitationFullscreen = document.getElementById('invitation-fullscreen');
    const staticImageHero = document.getElementById('static-image-hero');
    const staticImage = document.getElementById('static-invitation-image');
    const playVideoBtn = document.getElementById('play-video-btn');
    
    // ID del video de YouTube 
    let youtubeVideoId = 'Yy6Wl7zHgWI';
    // Skip button ya no existe en el diseño minimalista
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section');
    const storyItems = document.querySelectorAll('.story-item');
    
    // Estado del video e imagen
    let hasScrolled = false;
    let videoPlaying = false;
    let videoStarted = false;
    let staticImageShowing = false;
    
    // No bloquear scroll - comportamiento normal de web
    
    // Función para ajustar video según aspect ratio (YouTube se ajusta automáticamente)
    function adjustVideoSize() {
        if (!video) return;
        
        // Para YouTube iframe, simplemente asegurar que ocupe toda la pantalla
        video.style.width = '100vw';
        video.style.height = '100vh';
    }
    
    // Función para mostrar video
    function showVideo() {
        invitationFullscreen.classList.add('hidden');
        videoHero.classList.remove('hidden');
        
        // Configurar el iframe de YouTube con API habilitada para control
        const youtubeUrl = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&showinfo=0&fs=0&cc_load_policy=0&iv_load_policy=3&autohide=1&enablejsapi=1`;
        video.src = youtubeUrl;
        
        // Configurar Intersection Observer para pausar/reanudar video cuando salga del viewport
        setupVideoVisibilityObserver();
        
        videoPlaying = true;
        videoStarted = true;
        
        // Mostrar navbar inmediatamente
        navbar.classList.add('visible');
        
        // Simular duración del video y mostrar imagen después (ajustar según duración real)
        setTimeout(() => {
            showStaticImage();
        }, 60000); // 60 segundos, ajustar según la duración real del video
        
        // Listener para mensajes del iframe de YouTube
        window.addEventListener('message', function(event) {
            if (event.origin !== 'https://www.youtube.com') return;
            
            try {
                const data = JSON.parse(event.data);
                if (data.event === 'video-progress') {
                    // Aquí podríamos manejar el progreso del video si fuera necesario
                } else if (data.event === 'video-pause') {
                    // Video pausado - mostrar imagen
                    showImageFrame();
                } else if (data.event === 'video-play') {
                    // Video reanudado - ocultar imagen
                    showVideoFrame();
                }
            } catch (e) {
                // Ignorar mensajes que no son JSON válido
            }
        });
    }
    
    // Función para mostrar imagen estática
    function showStaticImage() {
        staticImageHero.classList.remove('hidden');
        staticImageShowing = true;
        // Ajustar imagen según aspect ratio
        adjustStaticImageSize();
    }
    
    // Función para alternar entre video e imagen
    function showVideoFrame() {
        video.style.display = 'block';
        staticImageHero.classList.add('hidden');
    }
    
    function showImageFrame() {
        video.style.display = 'none';
        staticImageHero.classList.remove('hidden');
        // Asegurar que la imagen esté en la misma posición que el video
        staticImageHero.style.position = 'fixed';
        staticImageHero.style.top = '0';
        staticImageHero.style.left = '0';
        staticImageHero.style.width = '100%';
        staticImageHero.style.height = '100vh';
        staticImageHero.style.zIndex = '998';
    }
    
    // Función para ajustar imagen estática según aspect ratio
    function adjustStaticImageSize() {
        if (!staticImage) return;
        
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const windowAspectRatio = windowWidth / windowHeight;
        const imageAspectRatio = 16 / 9; // Asumiendo que la imagen es 16:9
        
        if (windowAspectRatio > imageAspectRatio) {
            // Ventana más ancha que la imagen - ajustar por altura
            staticImage.style.width = (windowHeight * imageAspectRatio) + 'px';
            staticImage.style.height = windowHeight + 'px';
        } else {
            // Ventana más alta que la imagen - ajustar por ancho
            staticImage.style.width = windowWidth + 'px';
            staticImage.style.height = (windowWidth / imageAspectRatio) + 'px';
        }
    }
    
    // Función para saltar video y ir al contenido
    function skipToContent() {
        invitationFullscreen.classList.add('hidden');
        videoStarted = true;
        
        // Mostrar imagen estática en lugar del video
        showStaticImage();
        
        // Mostrar navbar inmediatamente
        navbar.classList.add('visible');
    }
    
    // Event listeners para los botones
    if (playVideoBtn) {
        playVideoBtn.addEventListener('click', showVideo);
    }
    
    // Skip button removido del diseño minimalista
    
    // Función para configurar el observer de visibilidad del video
    function setupVideoVisibilityObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.target === videoHero) {
                    if (entry.isIntersecting) {
                        // Video visible - mostrar video y ocultar imagen
                        if (videoPlaying && video.src) {
                            video.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                            showVideoFrame();
                        }
                    } else {
                        // Video fuera del viewport - pausar y mostrar imagen
                        if (videoPlaying && video.src) {
                            video.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                            showImageFrame();
                        }
                    }
                }
            });
        }, {
            threshold: 0.1 // Se considera visible si al menos 10% está en viewport
        });
        
        observer.observe(videoHero);
    }
    
    // Ajustar video e imagen al cargar y redimensionar
    adjustVideoSize();
    adjustStaticImageSize();
    window.addEventListener('resize', function() {
        adjustVideoSize();
        adjustStaticImageSize();
    });
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            adjustVideoSize();
            adjustStaticImageSize();
        }, 100);
    });
    
    // Permitir saltar con tecla Escape o tocando el hint
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !videoStarted) {
            skipToContent();
        }
    });
    
    // Permitir saltar tocando el hint bottom
    const scrollHintBottom = document.querySelector('.scroll-hint-bottom');
    if (scrollHintBottom) {
        scrollHintBottom.addEventListener('click', function() {
            if (!videoStarted) {
                skipToContent();
            }
        });
    }
    
    // Variable para optimizar el parallax
    let ticking = false;
    
    // Manejo del scroll normal
    window.addEventListener('scroll', function() {
        // Mostrar navbar siempre una vez que se haya iniciado la experiencia o si hay scroll
        if (videoStarted || window.scrollY > 100) {
            navbar.classList.add('visible');
        }
        
        // Optimizar parallax con requestAnimationFrame
        if (!ticking) {
            requestAnimationFrame(function() {
                applyParallaxEffect();
                ticking = false;
            });
            ticking = true;
        }
        
        // Actualizar navegación activa
        updateActiveNavigation();
        
        // Animaciones en scroll
        animateOnScroll();
    });
    
    // Actualizar navegación activa
    function updateActiveNavigation() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop + window.innerHeight; // Ajuste para main-content
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
    
    // Animaciones en scroll
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
    
    // Navegación suave
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Si aún no se ha iniciado la experiencia, iniciarla primero
                if (!videoStarted) {
                    skipToContent();
                    // Esperar un poco antes de hacer scroll
                    setTimeout(() => {
                        const offsetTop = targetSection.offsetTop + window.innerHeight - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }, 300);
                } else {
                    const offsetTop = targetSection.offsetTop + window.innerHeight - 80; // Ajuste para main-content
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Manejo del formulario RSVP
    const rsvpForm = document.querySelector('.rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validación básica
            if (!data.name || !data.email || !data.attendance) {
                showNotification('Por favor, completa todos los campos requeridos.', 'error');
                return;
            }
            
            // Simular envío exitoso
            showNotification('¡Perfecto! Tu confirmación ha sido enviada. Nos vemos pronto.', 'success');
            
            // Limpiar formulario
            this.reset();
        });
    }
    
    // Sistema de notificaciones mejorado
    function showNotification(message, type = 'success') {
        // Remover notificación existente
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
        
        // Estilos CSS inline para la notificación
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
        
        // Animar entrada
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0) scale(1)';
        });
        
        // Remover después de 4 segundos
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
    
    // Efecto parallax sutil en el hero
    window.addEventListener('scroll', function() {
        if (!hasScrolled) {
            const scrolled = window.pageYOffset;
            const heroText = document.querySelector('.hero-text');
            if (heroText) {
                const rate = scrolled * 0.5;
                heroText.style.transform = `translateY(${rate}px)`;
            }
        }
    });
    
    // Menu móvil toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Animación de entrada para elementos de la timeline
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos que necesitan animación
    storyItems.forEach(item => {
        observer.observe(item);
    });
    
    // Manejo de botones de ubicación
    const locationBtns = document.querySelectorAll('.location-btn');
    locationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Aquí integrarías con Google Maps o la API de mapas que prefieras
            showNotification('Abriendo ubicación en Maps...', 'success');
        });
    });
    
    // Inicialización
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Función para verificar si debemos mostrar el navbar al cargar
    function checkInitialNavbarState() {
        // Si hay un hash en la URL o si hemos hecho scroll, mostrar navbar
        if (window.location.hash || window.scrollY > 100) {
            videoStarted = true;
            navbar.classList.add('visible');
            // Ocultar pantalla de introducción si hay un hash o scroll
            invitationFullscreen.classList.add('hidden');
        }
    }
    
    // Llamadas iniciales
    checkInitialNavbarState();
    updateActiveNavigation();
    animateOnScroll();
    
    // Verificación adicional para estado inicial
    setTimeout(() => {
        if (window.scrollY > 0 || window.location.hash) {
            if (!videoStarted) {
                videoStarted = true;
                navbar.classList.add('visible');
                invitationFullscreen.classList.add('hidden');
            }
        }
    }, 500);
    
    // Función para aplicar efecto parallax a la imagen estática
    function applyParallaxEffect() {
        // Solo aplicar parallax si la imagen estática está visible
        if (!staticImageHero.classList.contains('hidden') && staticImage) {
            const scrolled = window.pageYOffset;
            const imageRect = staticImageHero.getBoundingClientRect();
            
            // Solo aplicar parallax cuando la imagen esté en viewport
            if (imageRect.top < window.innerHeight && imageRect.bottom > 0) {
                // Calcular la posición relativa de la imagen en el viewport
                const imageCenter = imageRect.top + imageRect.height / 2;
                const viewportCenter = window.innerHeight / 2;
                const distance = imageCenter - viewportCenter;
                
                // Efecto parallax más sutil basado en la posición
                const parallaxRate = distance * 0.1;
                
                // Aplicar transformación parallax suave
                staticImage.style.transform = `translateY(${parallaxRate}px) scale(1.02)`;
                
                // También aplicar un efecto sutil al texto superpuesto
                const scrollHint = document.querySelector('.scroll-hint-over-image');
                if (scrollHint) {
                    scrollHint.style.transform = `translateY(${parallaxRate * 0.5}px)`;
                }
            }
        }
    }
    
    // Comportamiento normal de scroll - sin bloqueos
});

// Función para copiar número de cuenta
function copyAccountNumber() {
    const accountNumber = "ES16 0237 0185 3091 7415 4973";
    
    // Usar la API moderna de clipboard si está disponible
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(accountNumber).then(() => {
            showNotification('Número de cuenta copiado al portapapeles', 'success');
        }).catch(() => {
            fallbackCopyTextToClipboard(accountNumber);
        });
    } else {
        // Fallback para navegadores más antiguos
        fallbackCopyTextToClipboard(accountNumber);
    }
}

// Función de respaldo para copiar texto
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showNotification('Número de cuenta copiado al portapapeles', 'success');
        } else {
            showNotification('No se pudo copiar automáticamente. Selecciona y copia manualmente.', 'error');
        }
    } catch (err) {
        showNotification('No se pudo copiar automáticamente. Selecciona y copia manualmente.', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Estilos adicionales para notificaciones
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
        }
    }
`;
document.head.appendChild(notificationStyles);