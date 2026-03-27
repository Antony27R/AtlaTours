document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle para móviles
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Filtros de tours
    const filterButtons = document.querySelectorAll('.filter-btn');
    const tourItems = document.querySelectorAll('.tour-detailed');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                tourItems.forEach(tour => {
                    if (filterValue === 'all' || tour.getAttribute('data-category').includes(filterValue)) {
                        tour.style.display = 'grid';
                    } else {
                        tour.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Filtros de galería
    const galleryFilters = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryFilters.length > 0) {
        galleryFilters.forEach(button => {
            button.addEventListener('click', function() {
                galleryFilters.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Galería de imágenes en tours
    window.changeImage = function(tourId, imageNumber) {
        const mainImage = document.getElementById(`main-image-${tourId}`);
        const thumbnails = document.querySelectorAll(`#${tourId} .thumbnail`);
        
        if (mainImage) {
            // Las imágenes ya tienen URLs definidas, solo cambiamos la clase active
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            thumbnails[imageNumber - 1].classList.add('active');
        }
    };
    
    // Lightbox para galería
    const galleryImages = document.querySelectorAll('.gallery-item');
    
    if (galleryImages.length > 0) {
        galleryImages.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                const imgAlt = this.querySelector('img').alt;
                
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <span class="close-lightbox">&times;</span>
                        <img src="${imgSrc}" alt="${imgAlt}">
                    </div>
                `;
                
                document.body.appendChild(lightbox);
                
                const closeBtn = lightbox.querySelector('.close-lightbox');
                closeBtn.addEventListener('click', function() {
                    document.body.removeChild(lightbox);
                });
                
                lightbox.addEventListener('click', function(e) {
                    if (e.target === lightbox) {
                        document.body.removeChild(lightbox);
                    }
                });
            });
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'var(--shadow)';
        }
    });
    
    // Formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const phone = document.getElementById('phone')?.value || '';
            const tour = document.getElementById('tour')?.value || '';
            const message = document.getElementById('message')?.value || '';
            
            const whatsappMessage = `Hola ATLA TOURS,%0A%0A*Nuevo mensaje desde la página web*%0A%0A*Nombre:* ${encodeURIComponent(name)}%0A*Correo:* ${encodeURIComponent(email)}%0A*Teléfono:* ${encodeURIComponent(phone)}%0A*Tour de interés:* ${encodeURIComponent(tour)}%0A*Mensaje:* ${encodeURIComponent(message)}`;
            
            window.open(`https://wa.me/5215614232739?text=${whatsappMessage}`, '_blank');
            
            contactForm.reset();
        });
    }
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle para móviles
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Filtros de tours
    const filterButtons = document.querySelectorAll('.filter-btn');
    const tourItems = document.querySelectorAll('.tour-detailed');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                tourItems.forEach(tour => {
                    if (filterValue === 'all' || tour.getAttribute('data-category').includes(filterValue)) {
                        tour.style.display = 'grid';
                    } else {
                        tour.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Filtros de galería
    const galleryFilters = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryFilters.length > 0) {
        galleryFilters.forEach(button => {
            button.addEventListener('click', function() {
                galleryFilters.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Galería de imágenes en tours
    window.changeImage = function(tourId, imageNumber) {
        const mainImage = document.getElementById(`main-image-${tourId}`);
        const thumbnails = document.querySelectorAll(`#${tourId} .thumbnail`);
        
        if (mainImage) {
            // Las imágenes ya tienen URLs definidas, solo cambiamos la clase active
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            thumbnails[imageNumber - 1].classList.add('active');
        }
    };
    
    // Lightbox para galería
    const galleryImages = document.querySelectorAll('.gallery-item');
    
    if (galleryImages.length > 0) {
        galleryImages.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                const imgAlt = this.querySelector('img').alt;
                
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <span class="close-lightbox">&times;</span>
                        <img src="${imgSrc}" alt="${imgAlt}">
                    </div>
                `;
                
                document.body.appendChild(lightbox);
                
                const closeBtn = lightbox.querySelector('.close-lightbox');
                closeBtn.addEventListener('click', function() {
                    document.body.removeChild(lightbox);
                });
                
                lightbox.addEventListener('click', function(e) {
                    if (e.target === lightbox) {
                        document.body.removeChild(lightbox);
                    }
                });
            });
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'var(--shadow)';
        }
    });
    
    // Formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const phone = document.getElementById('phone')?.value || '';
            const tour = document.getElementById('tour')?.value || '';
            const message = document.getElementById('message')?.value || '';
            
            const whatsappMessage = `Hola ATLA TOURS,%0A%0A*Nuevo mensaje desde la página web*%0A%0A*Nombre:* ${encodeURIComponent(name)}%0A*Correo:* ${encodeURIComponent(email)}%0A*Teléfono:* ${encodeURIComponent(phone)}%0A*Tour de interés:* ${encodeURIComponent(tour)}%0A*Mensaje:* ${encodeURIComponent(message)}`;
            
            window.open(`https://wa.me/5215614232739?text=${whatsappMessage}`, '_blank');
            
            contactForm.reset();
        });
    }
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});