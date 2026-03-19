// Profile Photo Interactive Effects
const profileImg = document.querySelector('.profile-img');
const profileContainer = document.querySelector('.profile-container');

// Check if device supports touch
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Click/Tap effect - ripple animation
function handleProfileInteraction(e) {
  const ripple = document.createElement('div');
  ripple.style.position = 'absolute';
  ripple.style.borderRadius = '50%';
  ripple.style.background = 'rgba(0, 170, 255, 0.6)';
  ripple.style.transform = 'scale(0)';
  ripple.style.animation = 'ripple 0.6s linear';
  ripple.style.pointerEvents = 'none';
  ripple.style.zIndex = '20';

  // Handle both mouse and touch events
  const clientX = e.clientX || (e.touches && e.touches[0].clientX);
  const clientY = e.clientY || (e.touches && e.touches[0].clientY);
  const rect = profileContainer.getBoundingClientRect();

  ripple.style.left = (clientX - rect.left - 10) + 'px';
  ripple.style.top = (clientY - rect.top - 10) + 'px';
  ripple.style.width = '20px';
  ripple.style.height = '20px';

  profileContainer.appendChild(ripple);

  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.remove();
    }
  }, 600);
}

profileImg.addEventListener(isTouchDevice ? 'touchstart' : 'click', handleProfileInteraction);

// Mouse tracking effect - only on non-touch devices
if (!isTouchDevice) {
  profileContainer.addEventListener('mousemove', (e) => {
    const rect = profileContainer.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (y / rect.height) * 20;
    const rotateY = -(x / rect.width) * 20;

    profileImg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  profileContainer.addEventListener('mouseleave', () => {
    profileImg.style.transform = '';
  });
}

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// MOBILE MENU TOGGLE
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

// Close menu when clicking a link
document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
  });
});

// TYPING EFFECT – No page jump version

const typing = document.querySelector(".typing");

// All words – find the longest one to set width
const words = [
  "Aspiring Developer",
  "Tech Enthusiast",
  "Problem Solver"
];

// Find longest word length for fixed width
const longest = words.reduce((a, b) => a.length > b.length ? a : b);
const charCount = longest.length;

// Set fixed width based on character count (approx 0.6em per char + padding)
typing.style.minWidth = `${charCount * 0.6}em`;
typing.style.display = "inline-block";
typing.style.overflow = "hidden";       // prevents visual flicker
typing.style.whiteSpace = "nowrap";     // keeps text in one line

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const current = words[wordIndex];

  if (deleting) {
    typing.textContent = current.substring(0, charIndex--);
  } else {
    typing.textContent = current.substring(0, charIndex++);
  }

  if (!deleting && charIndex === current.length) {
    setTimeout(() => { deleting = true; }, 1200);
  } 
  else if (deleting && charIndex === 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeEffect, deleting ? 50 : 90);
}

// Start the effect
typeEffect();

// RESUME MODAL
function openResume() {
  const resumeBtn = document.querySelector('button[onclick="openResume()"]');
  resumeBtn.classList.add('loading');

  // Simulate loading time
  setTimeout(() => {
    document.getElementById("resumeModal").style.display = "flex";
    resumeBtn.classList.remove('loading');
  }, 1500);
}

function closeResume() {
  document.getElementById("resumeModal").style.display = "none";
}

// Performance optimizations for mobile
const isMobile = window.innerWidth <= 768;

// Reduce animation complexity on mobile
if (isMobile) {
  // Disable continuous animations that might cause lag
  document.documentElement.style.setProperty('--animation-duration', '0.3s');

  // Use passive listeners for better scroll performance
  window.addEventListener('scroll', () => {
    document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
} else {
  // OPTIONAL: Section fade-in + navbar shadow on scroll
  const sections = document.querySelectorAll('.section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(section => observer.observe(section));

  window.addEventListener('scroll', () => {
    document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}
// Certificate Modal
function openCertModal(element) {
  const fullSrc = element.getAttribute('data-full');
  document.getElementById('certFullImg').src = fullSrc;
  document.getElementById('certModal').style.display = 'flex';
}

function closeCertModal() {
  document.getElementById('certModal').style.display = 'none';
  document.getElementById('certFullImg').src = ''; // clear src
}

// MAGNETIC EFFECT FOR BUTTONS AND SOCIAL ICONS - Optimized for mobile
const interactiveElements = document.querySelectorAll('.btn, .social a');

if (!isTouchDevice) {
  interactiveElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = 60;

      if (distance < maxDistance) {
        const strength = (maxDistance - distance) / maxDistance;
        const moveX = (x / distance) * strength * 10;
        const moveY = (y / distance) * strength * 10;

        element.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${strength * 5}deg)`;
      }
    });

    element.addEventListener('mouseleave', () => {
      element.style.transform = '';
    });
  });
}

// BUTTON CLICK SOUND EFFECT (visual feedback)
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.style.animation = 'none';
    setTimeout(() => {
      btn.style.animation = 'btnPulse 2s ease-in-out infinite';
    }, 10);
  });
});

// Close modal when clicking outside content
document.getElementById('certModal').addEventListener('click', function(e) {
  if (e.target === this) {
    closeCertModal();
  }
});

// Extra protection: disable right-click on full image
document.getElementById('certFullImg').addEventListener('contextmenu', e => e.preventDefault());

// Performance optimization: Defer non-critical animations
document.addEventListener('DOMContentLoaded', function() {
  // Delay heavy animations until page is loaded
  setTimeout(() => {
    // Enable carousel rotation after initial load
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
      if (!isMobile) {
        carousel.style.animation = 'rotateCarousel 20s linear infinite';
      }
    });
  }, 1000);
});

// Touch-friendly carousel interaction
if (isTouchDevice) {
  document.querySelectorAll('.carousel-item').forEach((item, index) => {
    item.addEventListener('touchstart', () => {
      // Stop auto-rotation on touch
      document.querySelector('.carousel').style.animation = 'none';
    });
  });
}

// Project Accordion Logic
document.querySelectorAll(".project").forEach(project => {
  project.addEventListener("click", () => {
    // Close other expanded projects
    document.querySelectorAll(".project.expanded").forEach(expanded => {
      if (expanded !== project) {
        expanded.classList.remove("expanded");
      }
    });
    
    // Toggle current project
    project.classList.toggle("expanded");
  });
}); 
