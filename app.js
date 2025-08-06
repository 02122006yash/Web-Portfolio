// Minimal JavaScript for Portfolio - Under 100 lines
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality (15-20 lines)
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navMenu.classList.toggle('show');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('show');
                navToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('show');
                navToggle.classList.remove('active');
            }
        });
    }
    
    // Smooth scrolling for all anchor links (10-15 lines)
    const allAnchorLinks = document.querySelectorAll('a[href*="#"]');
    allAnchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just a hash or external link
            if (!href || href === '#' || href.includes('http')) return;
            
            e.preventDefault();
            const targetId = href.startsWith('#') ? href : '#' + href;
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 72;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Skills progress bar animation on scroll (15-20 lines)
    const skillItems = document.querySelectorAll('.skill__item');
    if (skillItems.length > 0) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector('.skill__progress');
                    if (progressBar) {
                        // Trigger the CSS animation
                        progressBar.style.animationPlayState = 'running';
                        progressBar.style.animationDelay = '0.5s';
                    }
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });
        
        skillItems.forEach(item => skillObserver.observe(item));
    }
    
    // Contact form validation (20-30 lines)
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            if (!nameInput || !emailInput || !messageInput) {
                showMessage('Form elements not found.', 'error');
                return;
            }
            
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();
            
            // Reset message
            hideMessage();
            
            // Validate fields
            if (!name) {
                showMessage('Please enter your name.', 'error');
                nameInput.focus();
                return;
            }
            
            if (!email) {
                showMessage('Please enter your email address.', 'error');
                emailInput.focus();
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address.', 'error');
                emailInput.focus();
                return;
            }
            
            if (!message) {
                showMessage('Please enter your message.', 'error');
                messageInput.focus();
                return;
            }
            
            // Success
            showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        });
    }
    
    // Helper functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showMessage(text, type) {
        if (formMessage) {
            formMessage.textContent = text;
            formMessage.className = `form-message ${type}`;
            formMessage.style.display = 'block';
            
            if (type === 'success') {
                setTimeout(() => hideMessage(), 5000);
            }
        }
    }
    
    function hideMessage() {
        if (formMessage) {
            formMessage.style.display = 'none';
            formMessage.className = 'form-message';
        }
    }
    
    console.log('Portfolio JavaScript loaded successfully');
});