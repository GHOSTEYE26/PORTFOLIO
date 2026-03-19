// Profile Photo Interactive Effects
const profileImg = document.querySelector('.profile-img');
const profileContainer = document.querySelector('.profile-container');

// Click effect - ripple animation
profileImg.addEventListener('click', (e) => {
  const ripple = document.createElement('div');
  ripple.style.position = 'absolute';
  ripple.style.borderRadius = '50%';
  ripple.style.background = 'rgba(0, 170, 255, 0.6)';
  ripple.style.transform = 'scale(0)';
  ripple.style.animation = 'ripple 0.6s linear';
  ripple.style.left = (e.offsetX - 10) + 'px';
  ripple.style.top = (e.offsetY - 10) + 'px';
  ripple.style.width = '20px';
  ripple.style.height = '20px';
  ripple.style.zIndex = '20';

  profileContainer.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
});

// Mouse tracking effect
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
});
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

// MAGNETIC EFFECT FOR BUTTONS AND SOCIAL ICONS
const interactiveElements = document.querySelectorAll('.btn, .social a');

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

// 3D Carousel interaction - click to rotate manually
let carouselRotation = 0;
document.querySelectorAll('.carousel-item').forEach((item, index) => {
  item.addEventListener('click', () => {
    carouselRotation = -index * 60; // Rotate to bring clicked item to front
    document.querySelector('.carousel').style.transform = `rotateY(${carouselRotation}deg)`;
    document.querySelector('.carousel').style.animation = 'none'; // Pause auto-rotation
  });
});

// Resume auto-rotation on mouse leave
document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
  document.querySelector('.carousel').style.animation = 'rotateCarousel 20s linear infinite';
});

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
