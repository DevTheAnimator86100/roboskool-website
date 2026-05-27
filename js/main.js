document.addEventListener('DOMContentLoaded', () => {
    
    // Select Elements
    const navbar = document.getElementById('navbar');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    // 1. Scroll Effect for Glassmorphism Background
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });

    // 2. Custom Mobile Menu Logic (Replaces Bootstrap Collapse)
    let isMenuOpen = false;
    
    mobileBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            // Show menu
            mobileMenu.classList.remove('hidden');
            // Change hamburger icon to an 'X'
            menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        } else {
            // Hide menu
            mobileMenu.classList.add('hidden');
            // Change 'X' icon back to hamburger
            menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    
    // Select Elements for Navbar
    const navbar = document.getElementById('navbar');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    // 1. Scroll Effect for Glassmorphism Background
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });

    // 2. Custom Mobile Menu Logic
    let isMenuOpen = false;
    
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                // Show menu
                mobileMenu.classList.remove('hidden');
                // Change hamburger icon to an 'X'
                menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
            } else {
                // Hide menu
                mobileMenu.classList.add('hidden');
                // Change 'X' icon back to hamburger
                menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
            }
        });
    }
});

// 3. Courses Tab Switching Logic
    const tabBtns = document.querySelectorAll('.course-tab-btn');
    const tracks = document.querySelectorAll('.course-track');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            // Hide all tracks
            tracks.forEach(track => {
                track.classList.remove('active');
                track.classList.add('hidden');
            });

            // Show target track
            const targetId = btn.getAttribute('data-target');
            const targetTrack = document.getElementById(targetId);
            
            targetTrack.classList.remove('hidden');
            // Small timeout to allow display:block to apply before animating opacity
            setTimeout(() => {
                targetTrack.classList.add('active');
            }, 10);
        });
    });

    // 4. Dynamic Footer Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 5. Prevent Form Default Submission (For visual testing)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // You can replace this with your actual form submission logic later
            const btn = contactForm.querySelector('button[type="submit"] span');
            const originalText = btn.textContent;
            
            btn.textContent = 'Message Sent!';
            setTimeout(() => {
                btn.textContent = originalText;
                contactForm.reset();
            }, 3000);
        });
    }