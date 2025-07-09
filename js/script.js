// Theme Toggle with localStorage
const themeToggle = document.getElementById('theme-toggle');
const setTheme = (theme) => {
  document.body.classList.remove('dark');
  if (theme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
  localStorage.setItem('theme', theme);
  // Force DOM update
  setTimeout(() => {
    document.body.classList.add('transition-colors');
  }, 50);
};

// Initialize Lenis for Hard Skills smooth scrolling
const hardSkillsContainer = document.querySelector('.hard-skills');
if (hardSkillsContainer) {
  const lenis = new Lenis({
    wrapper: hardSkillsContainer,
    content: hardSkillsContainer,
    smooth: true,
    direction: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    duration: 2,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // Custom ease for smoothness
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Function to animate sections
function animateSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  // Kill existing tweens for the section
  gsap.killTweensOf(section.querySelectorAll('*'));

  if (sectionId === 'home') {
    // Home: Zoom-in title, slide subtitle, bounce button
    const titleText = section.querySelector('.title-text');
    const subtitle = section.querySelector('.subtitle');
    const ctaButton = section.querySelector('.cta-button');
    if (titleText) {
      const text = titleText.textContent;
      titleText.innerHTML = text.split('').map(char => `<span>${char === ' ' ? ' ' : char}</span>`).join('');
      gsap.fromTo(titleText.querySelectorAll('span'),
        { opacity: 0, scale: 0.5, rotation: 10 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.03,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            end: 'bottom 10%',
            toggleActions: 'restart none restart reset',
            id: `scroll-${sectionId}`,
            once: false
          }
        }
      );
    }
    gsap.fromTo(subtitle,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 90%',
          end: 'bottom 10%',
          toggleActions: 'restart none restart reset',
          id: `scroll-${sectionId}-extra`,
          once: false
        }
      }
    );
    gsap.fromTo(ctaButton,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: section,
          start: 'top 90%',
          end: 'bottom 10%',
          toggleActions: 'restart none restart reset',
          id: `scroll-${sectionId}-extra2`,
          once: false
        }
      }
    );
    gsap.to(section, {
      background: 'linear-gradient(to right, #14b8a6, #4f46e5, #a855f7)', // Teal to indigo to purple
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  } else if (sectionId === 'about') {
    // About: Zoom/rotate image, slide-up text
    const profileImg = section.querySelector('.profile-img');
    const aboutText = section.querySelector('.about-text');
    gsap.fromTo(profileImg,
      { opacity: 0, scale: 0.8, rotation: 5 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 90%',
          end: 'bottom 10%',
          toggleActions: 'restart none restart reset',
          id: `scroll-${sectionId}`,
          once: false
        }
      }
    );
    gsap.fromTo(aboutText.querySelectorAll('span'),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.02,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 90%',
          end: 'bottom 10%',
          toggleActions: 'restart none restart reset',
          id: `scroll-${sectionId}-extra`,
          once: false
        }
      }
    );
  } else if (sectionId === 'projects') {
    // Projects: Zoom and tilt project cards
    const projectCards = section.querySelectorAll('.project-card');
    gsap.fromTo(projectCards,
      { opacity: 0, scale: 0.7, rotation: 5 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 90%',
          end: 'bottom 10%',
          toggleActions: 'restart none restart reset',
          id: `scroll-${sectionId}`,
          once: false
        }
      }
    );
  } else if (sectionId === 'skills') {
    // Skills: Scale container, parallax Hard Skills list
    const skillContainer = section.querySelector('.container');
    const hardSkills = section.querySelector('.hard-skills');
    gsap.fromTo(skillContainer,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 90%',
          end: 'bottom 10%',
          toggleActions: 'restart none restart reset',
          id: `scroll-${sectionId}`,
          once: false
        }
      }
    );
    gsap.fromTo(hardSkills,
      { yPercent: -10 },
      {
        yPercent: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 90%',
          end: 'bottom 10%',
          toggleActions: 'restart none restart reset',
          id: `scroll-${sectionId}-extra`,
          once: false
        }
      }
    );
  } else if (sectionId === 'contact') {
    // Contact: Vertical stretch text, pop-in icons
    const contactContent = section.querySelector('.contact-content');
    const socialIcons = section.querySelectorAll('.social-icon');
    gsap.fromTo(contactContent,
      { opacity: 0, scaleY: 0.5 },
      {
        opacity: 1,
        scaleY: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 90%',
          end: 'bottom 10%',
          toggleActions: 'restart none restart reset',
          id: `scroll-${sectionId}`,
          once: false
        }
      }
    );
    gsap.fromTo(socialIcons,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: section,
          start: 'top 90%',
          end: 'bottom 10%',
          toggleActions: 'restart none restart reset',
          id: `scroll-${sectionId}-extra`,
          once: false
        }
      }
    );
  }
}

// Initialize animations for all sections
document.querySelectorAll('section').forEach(section => {
  animateSection(section.id);
});

// Smooth Scroll and Re-trigger Animations for Navbar Links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: 'smooth'
    });
    // Re-trigger animation for the target section
    setTimeout(() => {
      ScrollTrigger.getById(`scroll-${targetId}`)?.kill();
      ScrollTrigger.getById(`scroll-${targetId}-extra`)?.kill();
      ScrollTrigger.getById(`scroll-${targetId}-extra2`)?.kill();
      animateSection(targetId);
    }, 500); // Delay to allow scroll to complete
  });
});

// Animate social icons on hover
document.querySelectorAll('.social-icon').forEach(icon => {
  icon.addEventListener('mouseenter', () => {
    gsap.to(icon, { scale: 1.2, duration: 0.3, ease: 'back.out(1.5)' });
  });
  icon.addEventListener('mouseleave', () => {
    gsap.to(icon, { scale: 1, duration: 0.3 });
  });
});

// Animate navbar links on hover
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('mouseenter', () => {
    gsap.to(link, { scale: 1.1, duration: 0.3 });
  });
  link.addEventListener('mouseleave', () => {
    gsap.to(link, { scale: 1, duration: 0.3 });
  });
});