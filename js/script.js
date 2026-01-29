// ========================================
// GSAP PREMIUM PORTFOLIO
// ========================================

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let isMobile = window.innerWidth < 900;

// ========================================
// UTILITY FUNCTIONS
// ========================================

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

// ========================================
// PRELOADER
// ========================================

function initPreloader() {
    const preloader = document.getElementById('preloader');
    const chars = document.querySelectorAll('.preloader-text .char');
    const progress = document.querySelector('.preloader-progress');

    const tl = gsap.timeline({
        onComplete: () => {
            preloader.style.display = 'none';
        }
    });

    tl.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out'
    });

    tl.to(progress, {
        width: '100%',
        duration: 1.5,
        ease: 'power2.inOut'
    }, '-=0.3');

    tl.to(chars, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        stagger: 0.03,
        ease: 'power2.in'
    }, '+=0.2');

    tl.to(preloader, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut'
    }, '-=0.2');
}

// ========================================
// CUSTOM CURSOR
// ========================================

function initCustomCursor() {
    if (isMobile) return;

    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        cursorX += (mouseX - cursorX) * 0.5;
        cursorY += (mouseY - cursorY) * 0.5;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animate);
    }

    animate();

    const hoverElements = document.querySelectorAll('a, button, .magnetic');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
}

// ========================================
// NAVIGATION
// ========================================

function initNavigation() {
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    gsap.to(nav, {
        y: 0,
        duration: 1,
        delay: 2.5,
        ease: 'power3.out'
    });

    const scrollToSection = (e) => {
        e.preventDefault();
        const target = e.target.getAttribute('href');

        gsap.to(window, {
            duration: 1.2,
            scrollTo: {
                y: target,
                offsetY: 80
            },
            ease: 'power3.inOut'
        });

        if (mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    };

    navLinks.forEach(link => link.addEventListener('click', scrollToSection));
    mobileLinks.forEach(link => link.addEventListener('click', scrollToSection));

    const sections = document.querySelectorAll('section[id]');

    const updateActiveLink = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', debounce(updateActiveLink, 50));

    const toggleMobileMenu = () => {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';

        if (mobileMenu.classList.contains('active')) {
            gsap.fromTo('.mobile-link',
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
            );
        }
    };

    navToggle.addEventListener('click', toggleMobileMenu);

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            if (currentScroll > lastScroll) {
                gsap.to(nav, { y: -100, duration: 0.3, ease: 'power2.out' });
            } else {
                gsap.to(nav, { y: 0, duration: 0.3, ease: 'power2.out' });
            }
        }

        lastScroll = currentScroll;
    });
}

// ========================================
// HERO ANIMATIONS
// ========================================

function initHeroAnimations() {
    const heroLabel = document.querySelector('.hero-label');
    const heroWords = document.querySelectorAll('.hero-title .word');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    const scrollIndicators = document.querySelectorAll('.hero-scroll-indicator');

    const tl = gsap.timeline({ delay: 2.8 });

    tl.to(heroLabel, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    tl.to(heroWords, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.05,
        ease: 'power3.out'
    }, '-=0.4');

    tl.to(heroSubtitle, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5');

    tl.to(heroButtons, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.4');

    tl.to(scrollIndicators, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.6');

    const bgLayers = document.querySelectorAll('.hero-bg-layer');
    bgLayers.forEach((layer) => {
        const speed = layer.dataset.speed || 0.5;
        gsap.to(layer, {
            y: () => -window.innerHeight * speed,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    });

    // Hero Title Refined Hover Animation
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.cursor = 'pointer';
        
        heroTitle.addEventListener('mouseenter', function() {
            // Wave-like motion with letter spacing increase
            gsap.to('.hero-title .word', {
                duration: 0.6,
                ease: 'back.out(1.2)',
                y: (i) => Math.sin(i * 0.5) * -12,
                fontWeight: 800,
                letterSpacing: '0.08em',
                opacity: 1,
                stagger: {
                    amount: 0.3,
                    from: 'start'
                }
            });

            // Subtle brightness increase (not neon)
            gsap.to(heroTitle, {
                duration: 0.6,
                filter: 'brightness(1.15) saturate(1.1)',
                ease: 'power2.out'
            });
        });

        heroTitle.addEventListener('mouseleave', function() {
            gsap.to('.hero-title .word', {
                duration: 0.7,
                ease: 'elastic.out(1, 0.4)',
                y: 0,
                fontWeight: 700,
                letterSpacing: '-0.03em',
                stagger: {
                    amount: 0.2,
                    from: 'end'
                }
            });

            gsap.to(heroTitle, {
                duration: 0.7,
                filter: 'brightness(1) saturate(1)',
                ease: 'power2.out'
            });
        });

        // Alternative: Mouse move creates a lift effect based on position
        heroTitle.addEventListener('mousemove', function(e) {
            const rect = heroTitle.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            // Create wave based on mouse position
            gsap.to('.hero-title .word', {
                duration: 0.25,
                y: (i) => {
                    const distance = Math.abs(x - 0.5) + Math.abs(y - 0.5);
                    return -Math.sin(distance * Math.PI) * 10;
                },
                ease: 'power1.out',
                stagger: 0.02
            });
        });

        heroTitle.addEventListener('mouseleave', function() {
            gsap.to('.hero-title .word', {
                duration: 0.4,
                y: 0,
                ease: 'power2.out',
                stagger: 0.02
            });
        });
    }
}

// ========================================
// STATS COUNTER
// ========================================

function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.target);

        ScrollTrigger.create({
            trigger: stat,
            start: 'top 80%',
            once: true,
            onEnter: () => {
                gsap.to(stat, {
                    textContent: target,
                    duration: 2,
                    ease: 'power2.out',
                    snap: { textContent: 1 },
                    onUpdate: function() {
                        stat.textContent = Math.ceil(this.targets()[0].textContent);
                    }
                });
            }
        });
    });
}

// ========================================
// TEXT REVEAL ANIMATIONS
// ========================================

function initTextRevealAnimations() {
    const revealTexts = document.querySelectorAll('.reveal-text');

    revealTexts.forEach(element => {
        const content = element.children[0] || element;

        gsap.from(content, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                once: true
            }
        });
    });

    const splitTitles = document.querySelectorAll('.section-title .word');

    splitTitles.forEach(word => {
        gsap.from(word, {
            opacity: 0,
            y: 80,
            rotationX: -90,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: word.closest('.section-title'),
                start: 'top 85%',
                once: true
            }
        });
    });
}

// ========================================
// IMAGE REVEAL ANIMATIONS
// ========================================

function initImageRevealAnimations() {
    const aboutImageReveal = document.querySelector('.about-image-reveal');
    if (aboutImageReveal) {
        gsap.to(aboutImageReveal, {
            scaleX: 0,
            duration: 1.2,
            ease: 'power3.inOut',
            transformOrigin: 'right',
            scrollTrigger: {
                trigger: aboutImageReveal,
                start: 'top 75%',
                once: true
            }
        });
    }

    const workImageReveals = document.querySelectorAll('.work-image-reveal');
    workImageReveals.forEach(reveal => {
        gsap.to(reveal, {
            scaleX: 0,
            duration: 1.2,
            ease: 'power3.inOut',
            transformOrigin: 'right',
            scrollTrigger: {
                trigger: reveal,
                start: 'top 80%',
                once: true
            }
        });
    });
}

// ========================================
// WORK ANIMATIONS
// ========================================

function initWorkAnimations() {
    const workItems = document.querySelectorAll('.work-item');

    workItems.forEach(item => {
        const number = item.querySelector('.work-number');
        const content = item.querySelector('.work-content');
        const imageWrapper = item.querySelector('.work-image-wrapper');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                once: true
            }
        });

        if (number) {
            tl.from(number, {
                opacity: 0,
                x: -30,
                duration: 0.8,
                ease: 'power3.out'
            });
        }

        tl.from(content, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.6');

        tl.from(imageWrapper, {
            opacity: 0,
            scale: 0.8,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.6');

        const workImage = item.querySelector('.work-image');
        gsap.to(workImage, {
            yPercent: -20,
            ease: 'none',
            scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
}

// ========================================
// EXPERIENCE ANIMATIONS
// ========================================

function initExperienceAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach(item => {
        gsap.from(item, {
            opacity: 0,
            x: -50,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                once: true
            }
        });
    });

    const skillCategories = document.querySelectorAll('.skill-category');

    skillCategories.forEach((category, index) => {
        gsap.from(category, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: category,
                start: 'top 85%',
                once: true
            }
        });
    });
}

// ========================================
// MAGNETIC EFFECT
// ========================================

function initMagneticEffect() {
    if (isMobile) return;

    const magneticElements = document.querySelectorAll('.magnetic');

    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(element, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        element.addEventListener('mouseleave', () => {
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
}

// ========================================
// FORM HANDLING
// ========================================

function initFormHandling() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    const inputs = document.querySelectorAll('.form-input, .form-textarea');

    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        input.addEventListener('blur', () => {
            gsap.to(input, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        if (!name || !email || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }

        setTimeout(() => {
            showFormMessage('Thank you! I\'ll get back to you soon.', 'success');
            form.reset();

            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 5000);
        }, 500);
    });
}

function showFormMessage(text, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;

    gsap.from(formMessage, {
        opacity: 0,
        y: -10,
        duration: 0.5,
        ease: 'power3.out'
    });
}

// ========================================
// INITIALIZE
// ========================================

function init() {
    window.scrollTo(0, 0);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startAnimations);
    } else {
        startAnimations();
    }

    function startAnimations() {
        initPreloader();

        setTimeout(() => {
            initCustomCursor();
            initNavigation();
            initHeroAnimations();
            initStatsCounter();
            initTextRevealAnimations();
            initImageRevealAnimations();
            initWorkAnimations();
            initExperienceAnimations();
            initMagneticEffect();
            initFormHandling();

            setTimeout(() => ScrollTrigger.refresh(), 100);
        }, 3000);
    }
}

init();

// ========================================
// WINDOW RESIZE
// ========================================

window.addEventListener('resize', debounce(() => {
    isMobile = window.innerWidth < 900;
    ScrollTrigger.refresh();
}, 250));

// ========================================
// PAGE VISIBILITY
// ========================================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        gsap.globalTimeline.pause();
    } else {
        gsap.globalTimeline.resume();
    }
});