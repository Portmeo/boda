document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const navbar = document.getElementById("navbar");
  const videoSection = document.getElementById("video-section");
  const invitationFullscreen = document.getElementById("invitation-fullscreen");
  const backgroundImage = document.getElementById("background-image");
  const playVideoBtn = document.getElementById("play-video-btn");
  const navLinks = document.querySelectorAll(".nav-menu a");

  // YouTube video ID
  const youtubeVideoId = "Yy6Wl7zHgWI";

  // State
  let videoStarted = false;
  let player;

  // Show video when button is clicked
  function showVideo() {
    invitationFullscreen.classList.add("hidden");
    videoSection.classList.remove("hidden");
    videoStarted = true;
    setupYouTubePlayer();

    // Fallback timeout
    setTimeout(() => {
      showMainContent();
    }, 45000);
  }

  // Setup YouTube player
  function setupYouTubePlayer() {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = function () {
        createPlayer();
      };
    } else {
      createPlayer();
    }
  }

  // Create YouTube player
  function createPlayer() {
    player = new YT.Player("invitation-video", {
      height: "100%",
      width: "100%",
      videoId: youtubeVideoId,
      playerVars: {
        autoplay: 1,
        mute: 0,
        controls: 1,
        rel: 0,
        modestbranding: 1,
        showinfo: 0,
        fs: 0,
      },
      events: {
        onStateChange: function (event) {
          if (event.data == YT.PlayerState.ENDED) {
            showMainContent();
          }
        },
      },
    });
  }

  // Show main content
  function showMainContent() {
    videoSection.classList.add("hidden");
    backgroundImage.classList.remove("hidden");
    document.querySelector(".main-content").classList.add("visible");
    navbar.classList.add("visible");

    // Start background music
    const backgroundMusic = document.getElementById("background-music");
    if (backgroundMusic) {
      backgroundMusic.volume = 0.25;
      backgroundMusic.play().catch((error) => {
        console.log("No se pudo reproducir la música automáticamente:", error);
      });
    }
  }

  // Skip to main content
  function skipToContent() {
    invitationFullscreen.classList.add("hidden");
    videoStarted = true;
    showMainContent();
  }

  // Event listeners
  if (playVideoBtn) {
    playVideoBtn.addEventListener("click", showVideo);
  }

  // Skip with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !videoStarted) {
      skipToContent();
    }
  });

  // Skip by clicking hint
  const scrollHintBottom = document.querySelector(".scroll-hint-bottom");
  if (scrollHintBottom) {
    scrollHintBottom.addEventListener("click", function () {
      if (!videoStarted) {
        skipToContent();
      }
    });
  }

  // Navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Close mobile menu
      const navMenu = document.querySelector(".nav-menu");
      const navToggle = document.querySelector(".nav-toggle");
      if (navMenu && navToggle) {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
      }

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        if (!videoStarted) {
          skipToContent();
          setTimeout(() => {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }, 300);
        } else {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // Update active navigation on scroll
  window.addEventListener("scroll", function () {
    const mainContent = document.querySelector(".main-content");
    if (mainContent.classList.contains("visible")) {
      navbar.classList.add("visible");
      updateActiveNavigation();
    }
  });

  // Update active navigation
  function updateActiveNavigation() {
    const scrollPosition = window.scrollY + 100;
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop + window.innerHeight;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  // Logo click to scroll to top
  const logoLink = document.getElementById("logo-link");
  if (logoLink) {
    logoLink.addEventListener("click", function (e) {
      e.preventDefault();

      // Close mobile menu
      const navMenu = document.querySelector(".nav-menu");
      const navToggle = document.querySelector(".nav-toggle");
      if (navMenu && navToggle) {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Mobile menu toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });
  }

  // Check initial state
  function checkInitialState() {
    if (window.location.hash || window.scrollY > 100) {
      skipToContent();
    }
  }

  // Copy account number function
  window.copyAccountNumber = function () {
    const accountNumber = "ES16 0237 0185 3091 7415 4973";
    navigator.clipboard
      .writeText(accountNumber)
      .then(() => {
        // Silent copy - no visual feedback
      })
      .catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = accountNumber;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      });
  };

  // Initialize
  checkInitialState();
  updateActiveNavigation();
});
