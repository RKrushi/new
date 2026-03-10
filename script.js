// ============================================
// MOBILE MENU TOGGLE
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'all 0.6s ease';
  observer.observe(section);
});

// ============================================
// COUNTER ANIMATION FOR STATS
// ============================================
const counters = document.querySelectorAll('.stat-number');
let hasAnimated = false;

const animateCounters = () => {
  if (hasAnimated) return;
  
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const increment = target / 100;
    
    const updateCounter = () => {
      const current = +counter.innerText;
      
      if (current < target) {
        counter.innerText = Math.ceil(current + increment);
        setTimeout(updateCounter, 20);
      } else {
        counter.innerText = target + (counter.parentElement.querySelector('p').innerText.includes('Satisfaction') ? '%' : '+');
      }
    };
    
    updateCounter();
  });
  
  hasAnimated = true;
};

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
    }
  });
}, { threshold: 0.5 });

if (statsSection) {
  statsObserver.observe(statsSection);
}

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.backdropFilter = 'blur(10px)';
  } else {
    navbar.style.background = 'var(--white)';
  }
});

// ============================================
// SMOOTH SCROLL FOR ALL LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const offsetTop = target.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================
// ACTIVE NAVIGATION HIGHLIGHT
// ============================================
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});