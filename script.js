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
    let videoEnded = false;
    
    // Show video when button is clicked
    function showVideo() {
        invitationFullscreen.classList.add('hidden');
        videoSection.classList.remove('hidden');
        
        videoStarted = true;
        // NO mostrar navbar durante el video
        
        // Crear el player de YouTube directamente
        setupYouTubePlayer();
        
        // Timeout principal para cuando termine el video (ajustar según duración real)
        setTimeout(() => {
            console.log("Video timeout reached, showing main content");
            showMainContent();
        }, 45000); // 45 segundos - ajusta según la duración real de tu video
    }
    
    // Variable para el player
    let player;
    
    // Configurar el player de YouTube
    function setupYouTubePlayer() {
        // Cargar la API si no está cargada
        if (!window.YT) {
            console.log("Loading YouTube API...");
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            
            // Configurar callback cuando la API esté lista
            window.onYouTubeIframeAPIReady = function() {
                console.log("YouTube API ready!");
                createPlayer();
            };
        } else {
            console.log("YouTube API already loaded");
            createPlayer();
        }
    }
    
    // Crear el player
    function createPlayer() {
        console.log("Creating YouTube player...");
        player = new YT.Player('invitation-video', {
            height: '100%',
            width: '100%',
            videoId: youtubeVideoId,
            playerVars: {
                'autoplay': 1,
                'mute': 0,
                'controls': 1,
                'rel': 0,
                'modestbranding': 1,
                'showinfo': 0,
                'fs': 0
            },
            events: {
                'onStateChange': onPlayerStateChange,
                'onReady': function(event) {
                    console.log("YouTube player is ready!");
                }
            }
        });
    }
    
    // Detectar cuando termina el video
    function onPlayerStateChange(event) {
        console.log("YouTube player state changed:", event.data);
        if (event.data == YT.PlayerState.ENDED) {
            console.log("El vídeo ha terminado 🎉");
            showMainContent();
        }
    }
    
    // Show main content and hide video
    function showMainContent() {
        videoSection.classList.add('hidden');
        backgroundImage.classList.remove('hidden');
        document.querySelector('.main-content').classList.add('visible');
        navbar.classList.add('visible');
        
        // Iniciar música de fondo
        const backgroundMusic = document.getElementById('background-music');
        if (backgroundMusic) {
            backgroundMusic.volume = 0.25; // Volumen bajo
            backgroundMusic.play().catch(error => {
                console.log('No se pudo reproducir la música automáticamente:', error);
            });
        }
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
            
            // Cerrar menú móvil al hacer clic en un enlace
            const navMenu = document.querySelector('.nav-menu');
            const navToggle = document.querySelector('.nav-toggle');
            if (navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                if (!videoStarted) {
                    skipToContent();
                    setTimeout(() => {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                } else {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
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
    
    
    
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    
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


