/**
 * 3D-Print-Hub - Main JavaScript
 * Vanilla JS for mobile navigation and interactions
 */

(function() {
  'use strict';

  // DOM Elements
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav__link');
  const header = document.querySelector('.header');

  // Mobile Menu Toggle
  function toggleMobileMenu() {
    const isActive = menuToggle.classList.toggle('menu-toggle--active');
    nav.classList.toggle('nav--active');
    
    // Accessibility: Update aria-expanded
    menuToggle.setAttribute('aria-expanded', isActive);
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isActive ? 'hidden' : '';
  }

  // Close mobile menu when clicking a link
  function closeMobileMenu() {
    menuToggle.classList.remove('menu-toggle--active');
    nav.classList.remove('nav--active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // Header background change on scroll
  function handleHeaderScroll() {
    if (window.scrollY > 100) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  // Intersection Observer for scroll animations
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      animatedElements.forEach(el => observer.observe(el));
    } else {
      // Fallback for older browsers
      animatedElements.forEach(el => el.classList.add('visible'));
    }
  }

  // Smooth scroll for anchor links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerHeight = header.offsetHeight;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          closeMobileMenu();
        }
      });
    });
  }

  // Initialize
  function init() {
    // Add JS enabled class for progressive enhancement
    document.documentElement.classList.add('js-enabled');
    
    // Event Listeners
    if (menuToggle) {
      menuToggle.addEventListener('click', toggleMobileMenu);
    }

    navLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });

    // Initialize features
    initScrollAnimations();
    initSmoothScroll();

    // Initial header state
    handleHeaderScroll();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
