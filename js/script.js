const setTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  document.body.classList.remove('dark', 'transition-colors');
  if (theme === 'dark') {
    document.body.classList.add('dark');
  }
  localStorage.setItem('theme', theme);
  setTimeout(() => {
    document.body.classList.add('transition-colors');
  }, 50);
};

const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

const lenis = new Lenis({
  smooth: true,
  direction: 'vertical',
  smoothWheel: true,
  smoothTouch: true,
  wheelMultiplier: 0.5,
  duration: 0.8,
  easing: t => t * (2 - t)
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

const hardSkillsContainer = document.querySelector('.hard-skills');
if (hardSkillsContainer) {
  const hardSkillsLenis = new Lenis({
    wrapper: hardSkillsContainer,
    content: hardSkillsContainer,
    smooth: true,
    direction: 'vertical',
    smoothWheel: true,
    smoothTouch: true,
    wheelMultiplier: 0.5,
    duration: 0.8,
    easing: t => t * (2 - t)
  });
  hardSkillsLenis.scrollTo(0);
  function hardSkillsRaf(time) {
    hardSkillsLenis.raf(time);
    requestAnimationFrame(hardSkillsRaf);
  }
  requestAnimationFrame(hardSkillsRaf);
}

const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('menu-open');
    if (!isOpen) {
      mobileMenu.classList.add('menu-open');
      gsap.to(mobileMenu, { xPercent: 0, duration: 0.3, ease: 'power3.out' });
      mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
    } else {
      gsap.to(mobileMenu, {
        xPercent: -100,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => {
          mobileMenu.classList.remove('menu-open');
          mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
      });
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('menu-open')) {
        gsap.to(mobileMenu, {
          xPercent: -100,
          duration: 0.3,
          ease: 'power3.in',
          onComplete: () => {
            mobileMenu.classList.remove('menu-open');
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
          }
        });
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target) && mobileMenu.classList.contains('menu-open')) {
      gsap.to(mobileMenu, {
        xPercent: -100,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => {
          mobileMenu.classList.remove('menu-open');
          mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
      });
    }
  });
}

document.querySelectorAll('.skill-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    gsap.to(item, { scale: 1.05, duration: 0.3, ease: 'power3.out' });
  });
  item.addEventListener('mouseleave', () => {
    gsap.to(item, { scale: 1, duration: 0.3, ease: 'power3.in' });
  });
});

gsap.registerPlugin(ScrollTrigger);

function animateSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  if (sectionId === 'home') {
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
          duration: 0.8,
          stagger: 0.02,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 95%',
            end: 'bottom 5%',
            toggleActions: 'restart none restart reset'
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
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 95%',
          end: 'bottom 5%',
          toggleActions: 'restart none restart reset'
        }
      }
    );
    gsap.fromTo(ctaButton,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: section,
          start: 'top 95%',
          end: 'bottom 5%',
          toggleActions: 'restart none restart reset'
        }
      }
    );
    gsap.to(section, {
      background: 'linear-gradient(to right, #14b8a6, #4f46e5, #a855f7)',
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  } else if (sectionId === 'about') {
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
          start: 'top 95%',
          end: 'bottom 5%',
          toggleActions: 'restart none restart reset'
        }
      }
    );
    gsap.fromTo(aboutText,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 95%',
          end: 'bottom 5%',
          toggleActions: 'restart none restart reset'
        }
      }
    );
  } else if (sectionId === 'projects') {
    const projectCards = section.querySelectorAll('.project-card');
    gsap.fromTo(projectCards,
      { opacity: 0, scale: 0.7, rotation: 5 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 95%',
          end: 'bottom 5%',
          toggleActions: 'restart none restart reset'
        }
      }
    );
  } else if (sectionId === 'skills') {
    const skillContainer = section.querySelector('.container');
    const hardSkills = section.querySelector('.hard-skills');
    const softSkills = section.querySelector('.soft-skills');
    gsap.fromTo(skillContainer,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 95%',
          end: 'bottom 5%',
          toggleActions: 'restart none restart reset'
        }
      }
    );
    gsap.fromTo(hardSkills,
      { yPercent: -10 },
      {
        yPercent: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 95%',
          end: 'bottom 5%',
          toggleActions: 'restart none restart reset'
        }
      }
    );
    gsap.fromTo(softSkills,
      { yPercent: -10 },
      {
        yPercent: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 95%',
          end: 'bottom 5%',
          toggleActions: 'restart none restart reset'
        }
      }
    );
  } else if (sectionId === 'contact') {
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
          start: 'top 95%',
          end: 'bottom 5%',
          toggleActions: 'restart none restart reset'
        }
      }
    );
    gsap.fromTo(socialIcons,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: section,
          start: 'top 95%',
          end: 'bottom 5%',
          toggleActions: 'restart none restart reset'
        }
      }
    );
  }
}

document.querySelectorAll('section').forEach(section => {
  animateSection(section.id);
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    lenis.scrollTo(targetElement, {
      offset: -64,
      duration: 0.8,
      easing: t => t * (2 - t)
    });
  });
});

document.querySelectorAll('.social-icon').forEach(icon => {
  icon.addEventListener('mouseenter', () => {
    gsap.to(icon, { scale: 1.2, duration: 0.3, ease: 'back.out(1.5)' });
  });
  icon.addEventListener('mouseleave', () => {
    gsap.to(icon, { scale: 1, duration: 0.3, ease: 'power3.in' });
  });
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('mouseenter', () => {
    gsap.to(link, { scale: 1.1, duration: 0.3, ease: 'power3.out' });
  });
  link.addEventListener('mouseleave', () => {
    gsap.to(link, { scale: 1, duration: 0.3, ease: 'power3.in' });
  });
});