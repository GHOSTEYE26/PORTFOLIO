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

// TYPING EFFECT
const typing = document.querySelector(".typing");
const words = [
  "Aspiring Developer",
  "Tech Enthusiast",
  "Problem Solver"
];

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
    setTimeout(() => deleting = true, 1200);
  } 
  else if (deleting && charIndex === 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeEffect, deleting ? 50 : 90);
}

typeEffect();

// RESUME MODAL
function openResume() {
  document.getElementById("resumeModal").style.display = "flex";
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

// Close modal when clicking outside content
document.getElementById('certModal').addEventListener('click', function(e) {
  if (e.target === this) {
    closeCertModal();
  }
});

// Extra protection: disable right-click on full image
document.getElementById('certFullImg').addEventListener('contextmenu', e => e.preventDefault());

// Optional: Reverse direction on click or something fun
document.querySelector('.reel-container').addEventListener('dblclick', () => {
  document.querySelector('.reel-track').style.animationDirection = 
    document.querySelector('.reel-track').style.animationDirection === 'reverse' ? 'normal' : 'reverse';
});
