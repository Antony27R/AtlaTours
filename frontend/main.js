// main.js - Funcionalidades comunes para todas las páginas

document.addEventListener('DOMContentLoaded', function() {
    // Filtros de tours (si existen en la página)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const tourItems = document.querySelectorAll('.tour-detailed');
    
    if (filterButtons.length > 0 && tourItems.length > 0) {
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
    
    // Filtros de galería (si existen en la página)
    const galleryFilters = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryFilters.length > 0 && galleryItems.length > 0) {
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
    
    // Galería de imágenes en tours (cambio de thumbnail)
    window.changeImage = function(tourId, imageNumber) {
        const mainImage = document.getElementById(`main-image-${tourId}`);
        const thumbnails = document.querySelectorAll(`#${tourId} .thumbnail`);
        
        if (mainImage && thumbnails.length > 0) {
            // Cambiar la imagen principal según la URL del thumbnail
            const newSrc = thumbnails[imageNumber - 1].src;
            mainImage.src = newSrc;
            
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

// Inyectar estilos para lightbox dinámicamente
const lightboxStyles = `
.lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    cursor: pointer;
}

.lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
}

.lightbox-content img {
    max-width: 100%;
    max-height: 90vh;
    border-radius: 10px;
}

.close-lightbox {
    position: absolute;
    top: -40px;
    right: 0;
    color: white;
    font-size: 2.5rem;
    cursor: pointer;
    background: none;
    border: none;
}

.close-lightbox:hover {
    color: var(--accent-color);
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = lightboxStyles;
document.head.appendChild(styleSheet);