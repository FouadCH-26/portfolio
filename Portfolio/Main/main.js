document.addEventListener('DOMContentLoaded', () => {
    // ===== تعيين روابط السوشيال ميديا بناءً على الأيقونات الجديدة =====
    const socialUrls = {
        tiktok: 'https://www.tiktok.com/@',
        whatsapp: 'https://wa.me/',
        telegram: 'https://t.me/',
        instagram: 'https://instagram.com/',
        facebook: 'https://youtube.com/'
    };

    document.querySelectorAll('.social-icons a').forEach(link => {
        const icon = link.querySelector('i');
        if (icon) {
            const classes = icon.classList;
            let platform = '';
            if (classes.contains('fa-tiktok')) platform = 'tiktok';
            else if (classes.contains('fa-whatsapp')) platform = 'whatsapp';
            else if (classes.contains('fa-telegram')) platform = 'telegram';
            else if (classes.contains('fa-instagram')) platform = 'instagram';
            else if (classes.contains('fa-youtube')) platform = 'youtube';

            if (platform) {
                // استبدل 'username' باسم المستخدم الحقيقي لكل منصة
                link.href = socialUrls[platform] + 'username';
            }
        }
    });

    // ===== تأثير عداد الأرقام الإحصائية (عند ظهورها في الشاشة) =====
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = { threshold: 0.5 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = parseInt(target.getAttribute('data-target'));
                let currentValue = 0;
                const increment = targetValue / 50; // 50 خطوة

                const updateCounter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= targetValue) {
                        target.textContent = targetValue + '+';
                        clearInterval(updateCounter);
                    } else {
                        target.textContent = Math.floor(currentValue) + '+';
                    }
                }, 30);

                observer.unobserve(target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(num => observer.observe(num));

    // ===== قائمة الجوال =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '70px';
            navMenu.style.left = '20px';
            navMenu.style.background = 'rgba(10, 10, 15, 0.95)';
            navMenu.style.backdropFilter = 'blur(10px)';
            navMenu.style.padding = '20px';
            navMenu.style.borderRadius = '10px';
            navMenu.style.border = 'var(--border-glow)';
            navMenu.style.width = '200px';
        });
    }

    // ===== تحديث الرابط النشط عند التمرير =====
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // ===== التمرير السلس عند النقر على الروابط =====
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});