document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) loadingScreen.classList.add('hidden');
    }, 500);

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (mobileMenu) mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    const header = document.getElementById('header');
    const backToTop = document.getElementById('back-to-top');
    
    if (header && backToTop) {
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(function() {
                const scrolled = window.scrollY > 100;
                header.classList.toggle('scrolled', scrolled);
                backToTop.classList.toggle('visible', scrolled);
            }, 10);
        });
    }

    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }

    const heroScrollBtn = document.getElementById('hero-scroll-btn');
    if (heroScrollBtn) {
        heroScrollBtn.addEventListener('click', function() {
            const featuresSection = document.querySelector('.features');
            if (featuresSection) {
                featuresSection.scrollIntoView({behavior: 'smooth'});
            }
        });
    }

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    if (animateElements.length > 0) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {threshold: 0.1});

        animateElements.forEach(function(element) {
            observer.observe(element);
        });
    }

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.getElementById('header') ? document.getElementById('header').offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({top: targetPosition, behavior: 'smooth'});
                history.replaceState(null, null, targetId);
            }
        });
    });
});