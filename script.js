document.addEventListener('DOMContentLoaded', () => {
    
    // --- Set current year in footer ---
    document.getElementById('year').textContent = new Date().getFullYear();

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Quick mobile menu override since CSS display:none was used for desktop-first approach
    if(window.innerWidth < 900) {
        navLinks.style.display = 'none';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(10, 10, 12, 0.95)';
        navLinks.style.padding = '2rem 0';
        navLinks.style.backdropFilter = 'blur(10px)';
        navLinks.style.borderBottom = '1px solid var(--border-glass)';
    }

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
        }
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if(window.innerWidth < 900) {
                hamburger.classList.remove('active');
                navLinks.style.display = 'none';
            }
        });
    });

    // Handle resize events to restore desktop menu
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 900) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.background = 'transparent';
            navLinks.style.padding = '0';
            navLinks.style.borderBottom = 'none';
        } else {
            navLinks.style.display = 'none';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(10, 10, 12, 0.95)';
            navLinks.style.padding = '2rem 0';
            navLinks.style.borderBottom = '1px solid var(--border-glass)';
        }
    });

    // --- Accordion Logic ---
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            accordionItems.forEach(acc => {
                acc.classList.remove('active');
                acc.querySelector('.accordion-body').style.maxHeight = null;
            });

            // Open clicked item if it wasn't already active
            if (!isActive) {
                item.classList.add('active');
                const body = item.querySelector('.accordion-body');
                body.style.maxHeight = body.scrollHeight + "px";
            }
        });
    });

    // Initialize first accordion body height
    const firstVal = document.querySelector('.accordion-item.active .accordion-body');
    if(firstVal) {
        firstVal.style.maxHeight = firstVal.scrollHeight + "px";
    }

    // --- Scroll Reveal Observers ---
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- Simple Parallax Effect (Optional JS extension) ---
    // The CSS background-attachment: fixed handles this primarily, 
    // but if we used the img tag, this JS would drive it.
    /*
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const parallaxBg = document.querySelector('.manifesto-bg-image img');
        if(parallaxBg) {
             parallaxBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
    });
    */
});
