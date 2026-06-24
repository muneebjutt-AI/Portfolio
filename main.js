// Typewriter Effect
const typewriterWords = ["Senior AI Engineer", "Multi-Agent Specialist", "RAG Architect"];
let wordIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typewriterEl = document.getElementById("typewriter");

function type() {
    const currentWord = typewriterWords[wordIdx];
    
    if (isDeleting) {
        typewriterEl.textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
    } else {
        typewriterEl.textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
    }
    
    let typeSpeed = isDeleting ? 40 : 80;
    
    if (!isDeleting && charIdx === currentWord.length) {
        typeSpeed = 1500; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % typewriterWords.length;
        typeSpeed = 500; // Pause before next word
    }
    
    setTimeout(type, typeSpeed);
}

// Mobile navigation drawer toggle
const mobileToggle = document.querySelector(".mobile-toggle");
const sidebar = document.querySelector(".sidebar");
const overlay = document.querySelector(".mobile-overlay");
const navLinks = document.querySelectorAll(".nav-link");

function toggleMenu() {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
}

mobileToggle.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);

// Close menu on link click (mobile)
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (sidebar.classList.contains("active")) {
            toggleMenu();
        }
    });
});

// Scroll Reveal with IntersectionObserver
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(el => revealObserver.observe(el));

// Active nav highlight on scroll
const sections = document.querySelectorAll("section");
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach(link => {
                if (link.getAttribute("href") === `#${id}`) {
                    link.classList.add("nav-link-active");
                } else {
                    link.classList.remove("nav-link-active");
                }
            });
        }
    });
}, {
    rootMargin: "-20% 0px -60% 0px"
});

sections.forEach(s => scrollObserver.observe(s));

// Initialize Typing on Load
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, 1000);
});
