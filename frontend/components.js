// components.js - Plantillas de componentes reutilizables

// Plantilla del Header
const headerTemplate = `
<header>
    <div class="container">
        <div class="logo">
            <img src="images/logo2.jpeg" alt="ATLA TOURS Logo" class="logo-img">
            <div class="logo-text-container">
                <div class="logo-text">ATLA TOURS</div>
                <div class="logo-tagline">Donde la vida fluye</div>
            </div>
        </div>
        <nav>
            <ul class="nav-menu">
                <li><a href="index.html" data-page="index">Inicio</a></li>
                <li><a href="tours.html" data-page="tours">Tours</a></li>
                <li><a href="galeria.html" data-page="galeria">Galería</a></li>
                <li><a href="testimonios.html" data-page="testimonios">Testimonios</a></li>
                <li><a href="sobre-nosotros.html" data-page="sobre-nosotros">Sobre Nosotros</a></li>
                <li><a href="contacto.html" data-page="contacto">Contacto</a></li>
            </ul>
            <div class="menu-toggle">
                <i class="fas fa-bars"></i>
            </div>
        </nav>
    </div>
</header>
`;

// Plantilla del Footer
const footerTemplate = `
<footer>
    <div class="container">
        <div class="footer-grid">
            <div class="footer-col">
                <div class="footer-logo">
                    <img src="images/logo3.png" alt="ATLA TOURS" class="footer-logo-img">
                    <div>
                        <div class="logo-text">ATLA TOURS</div>
                        <p class="tagline">Donde la vida fluye</p>
                    </div>
                </div>
                <p class="footer-description">Creamos experiencias accesibles, cuidadas y pensadas para todas las edades, donde el trayecto es tan importante como el destino.</p>
            </div>

            <div class="footer-col">
                <h4>Enlaces rápidos</h4>
                <ul>
                    <li><a href="index.html">Inicio</a></li>
                    <li><a href="tours.html">Tours</a></li>
                    <li><a href="galeria.html">Galería</a></li>
                    <li><a href="testimonios.html">Testimonios</a></li>
                    <li><a href="sobre-nosotros.html">Sobre Nosotros</a></li>
                    <li><a href="contacto.html">Contacto</a></li>
                </ul>
            </div>

            <div class="footer-col">
                <h4>Contacto</h4>
                <ul class="contact-info">
                    <li><i class="fas fa-phone"></i> 56 1423 2739</li>
                    <li><i class="fas fa-envelope"></i> yaz.rosas019@gmail.com</li>
                    <li><i class="fas fa-clock"></i> L-V: 10:00 - 20:00 hrs</li>
                    <li><i class="fas fa-map-marker-alt"></i> CDMX y alrededores</li>
                </ul>
            </div>

            <div class="footer-col">
                <h4>Síguenos</h4>
                <div class="social-links">
                    <a href="https://www.facebook.com/profile.php?id=61585925656087" target="_blank" class="social-link">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://wa.me/5215614232739" target="_blank" class="social-link">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                </div>
                <div class="newsletter">
                    <p>¿Preguntas? Escríbenos</p>
                    <a href="contacto.html" class="btn-small">Contactar</a>
                </div>
            </div>
        </div>
    </div>
    <div class="footer-bottom">
        <div class="container">
            <p>&copy; 2026 ATLA TOURS. Todos los derechos reservados. | Diseñado para viajeros que fluyen</p>
        </div>
    </div>
</footer>
`;

// Plantilla del WhatsApp Float Button
const whatsappFloatTemplate = `
<a href="https://wa.me/5215614232739?text=Hola%20ATLA%20TOURS,%20me%20interesa%20obtener%20información%20sobre%20los%20tours" class="whatsapp-float" target="_blank">
    <i class="fab fa-whatsapp"></i>
</a>
`;

// Plantilla del Page Header (para páginas internas)
const pageHeaderTemplate = (title, breadcrumbText = '') => `
<section class="page-header">
    <div class="container">
        <h1>${title}</h1>
        <div class="breadcrumb">
            <a href="index.html">Inicio</a> / <span>${breadcrumbText || title}</span>
        </div>
    </div>
</section>
`;

// Función para cargar componentes en una página
function loadComponents(currentPage) {
    // Insertar header al inicio del body
    document.body.insertAdjacentHTML('afterbegin', headerTemplate);
    
    // Insertar WhatsApp float antes del footer
    document.body.insertAdjacentHTML('beforeend', whatsappFloatTemplate);
    
    // Insertar footer al final del body
    document.body.insertAdjacentHTML('beforeend', footerTemplate);
    
    // Marcar el enlace activo en el menú
    const activeLink = document.querySelector(`.nav-menu a[data-page="${currentPage}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Inicializar funcionalidades del menú móvil después de cargar
    initMobileMenu();
    
    // Inicializar scroll effect para header
    initScrollEffect();
}

// Función para cargar componentes en la página de inicio (sin page-header)
function loadHomeComponents() {
    document.body.insertAdjacentHTML('afterbegin', headerTemplate);
    document.body.insertAdjacentHTML('beforeend', whatsappFloatTemplate);
    document.body.insertAdjacentHTML('beforeend', footerTemplate);
    
    const activeLink = document.querySelector(`.nav-menu a[data-page="index"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    initMobileMenu();
    initScrollEffect();
}

// Función para cargar page header en páginas internas
function loadPageWithHeader(pageTitle, pageId) {
    // Insertar header
    document.body.insertAdjacentHTML('afterbegin', headerTemplate);
    
    // Insertar page header después del header
    const pageHeader = pageHeaderTemplate(pageTitle, pageTitle);
    const headerElement = document.querySelector('header');
    headerElement.insertAdjacentHTML('afterend', pageHeader);
    
    // Insertar WhatsApp float
    document.body.insertAdjacentHTML('beforeend', whatsappFloatTemplate);
    
    // Insertar footer
    document.body.insertAdjacentHTML('beforeend', footerTemplate);
    
    // Marcar enlace activo
    const activeLink = document.querySelector(`.nav-menu a[data-page="${pageId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    initMobileMenu();
    initScrollEffect();
}

// Inicializar menú móvil
function initMobileMenu() {
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
}

// Inicializar efecto de scroll en header
function initScrollEffect() {
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Función para cargar cualquier componente adicional
function loadComponent(containerId, componentHtml) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = componentHtml;
    }
}