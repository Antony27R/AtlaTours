// admin.js - Lógica del panel de administración

const API_URL = 'https://atla-tours-backend.onrender.com/api';
let authToken = null;
let currentTours = [];

// Elementos DOM
const loginOverlay = document.getElementById('login-overlay');
const adminContent = document.getElementById('admin-content');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');
const loginError = document.getElementById('login-error');

// Notificación
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Verificar token al cargar
async function checkAuth() {
    const token = localStorage.getItem('adminToken');
    if (!token) return false;
    
    try {
        const response = await fetch(`${API_URL}/auth/verify`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        
        if (data.valid) {
            authToken = token;
            if (data.firstLogin) {
                showNotification('Es tu primer inicio. Por favor cambia tu contraseña.', 'info');
                await showChangePasswordModal();
            }
            showAdminPanel();
            return true;
        }
    } catch (error) {
        console.error('Error verificando token:', error);
    }
    
    localStorage.removeItem('adminToken');
    return false;
}

// Mostrar modal para cambiar contraseña
async function showChangePasswordModal() {
    const newPassword = prompt('Es tu primer inicio de sesión. Por favor ingresa tu nueva contraseña:');
    if (!newPassword) {
        logout();
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/auth/change-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                username: 'admin',
                currentPassword: 'adminpw01',
                newPassword: newPassword
            })
        });
        
        if (response.ok) {
            showNotification('Contraseña actualizada correctamente', 'success');
        } else {
            showNotification('Error al cambiar contraseña', 'error');
            logout();
        }
    } catch (error) {
        console.error('Error cambiando contraseña:', error);
    }
}

// Login
loginBtn.addEventListener('click', async () => {
    const username = loginUsername.value.trim();
    const password = loginPassword.value.trim();
    
    if (!username || !password) {
        loginError.textContent = 'Por favor ingresa usuario y contraseña';
        return;
    }
    
    loginBtn.disabled = true;
    loginBtn.textContent = 'Verificando...';
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            authToken = data.token;
            localStorage.setItem('adminToken', authToken);
            
            if (data.firstLogin) {
                showNotification('Es tu primer inicio. Debes cambiar tu contraseña.', 'info');
                await showChangePasswordModal();
            }
            
            showAdminPanel();
            await loadTours();
            await loadDestacados();
        } else {
            loginError.textContent = data.message || 'Credenciales incorrectas';
            if (data.reset) {
                showNotification(data.message, 'info');
            }
        }
    } catch (error) {
        console.error('Error en login:', error);
        loginError.textContent = 'Error de conexión. Intenta nuevamente.';
    } finally {
        loginBtn.disabled = false;
        loginBtn.textContent = 'Iniciar Sesión';
    }
});

// Logout
function logout() {
    localStorage.removeItem('adminToken');
    authToken = null;
    loginOverlay.style.display = 'flex';
    adminContent.style.display = 'none';
    loginUsername.value = '';
    loginPassword.value = '';
    loginError.textContent = '';
}

logoutBtn.addEventListener('click', logout);

// Mostrar panel admin
function showAdminPanel() {
    loginOverlay.style.display = 'none';
    adminContent.style.display = 'block';
}

// Cargar todos los tours
async function loadTours() {
    try {
        const response = await fetch(`${API_URL}/tours`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        currentTours = await response.json();
        renderToursList();
    } catch (error) {
        console.error('Error cargando tours:', error);
        showNotification('Error cargando tours', 'error');
    }
}

// Renderizar lista de tours
function renderToursList() {
    const container = document.getElementById('tours-list');
    if (!container) return;
    
    container.innerHTML = currentTours.map(tour => `
        <div class="tour-admin-card" data-id="${tour.id}">
            <div class="tour-admin-info">
                <h4>${tour.titulo}</h4>
                <p>ID: ${tour.id} | ${tour.fecha} | ${tour.duracion}</p>
                <p>Estado: ${tour.estado === 'realizado' ? '✅ Realizado' : '⏳ Próximo'}</p>
            </div>
            <div class="tour-admin-actions">
                <button class="btn-edit" onclick="editTour('${tour.id}')">✏️ Editar</button>
                <button class="btn-delete" onclick="deleteTour('${tour.id}')">🗑️ Eliminar</button>
            </div>
        </div>
    `).join('');
}

// Cargar tours para destacados
async function loadDestacados() {
    try {
        const response = await fetch(`${API_URL}/tours`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        const tours = await response.json();
        
        const container = document.getElementById('destacados-list');
        if (!container) return;
        
        container.innerHTML = tours.map(tour => `
            <div class="tour-admin-card">
                <div class="tour-admin-info">
                    <h4>${tour.titulo}</h4>
                    <p>ID: ${tour.id}</p>
                </div>
                <div class="tour-admin-actions">
                    <button class="btn-toggle ${tour.destacado ? 'destacado' : ''}" 
                            onclick="toggleDestacado('${tour.id}', ${!tour.destacado})">
                        ${tour.destacado ? '⭐ Destacado' : '☆ Marcar como destacado'}
                    </button>
                </div>
            </div>
        `).join('');
        
        // Guardar selección temporal
        window.tempDestacados = tours.filter(t => t.destacado).map(t => t.id);
    } catch (error) {
        console.error('Error cargando destacados:', error);
    }
}

// Alternar destacado
window.toggleDestacado = (tourId, isDestacado) => {
    if (!window.tempDestacados) window.tempDestacados = [];
    
    if (isDestacado && window.tempDestacados.length >= 3) {
        showNotification('Solo se pueden seleccionar hasta 3 tours destacados', 'error');
        return;
    }
    
    if (isDestacado) {
        if (!window.tempDestacados.includes(tourId)) {
            window.tempDestacados.push(tourId);
        }
    } else {
        window.tempDestacados = window.tempDestacados.filter(id => id !== tourId);
    }
    
    // Actualizar UI
    const buttons = document.querySelectorAll(`[onclick*="toggleDestacado('${tourId}'"]`);
    buttons.forEach(btn => {
        if (isDestacado) {
            btn.classList.add('destacado');
            btn.innerHTML = '⭐ Destacado';
        } else {
            btn.classList.remove('destacado');
            btn.innerHTML = '☆ Marcar como destacado';
        }
    });
};

// Guardar destacados
document.getElementById('save-destacados-btn')?.addEventListener('click', async () => {
    try {
        const response = await fetch(`${API_URL}/tours/destacados/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ destacados: window.tempDestacados || [] })
        });
        
        if (response.ok) {
            showNotification('Destacados actualizados correctamente', 'success');
        } else {
            showNotification('Error al actualizar destacados', 'error');
        }
    } catch (error) {
        console.error('Error guardando destacados:', error);
        showNotification('Error de conexión', 'error');
    }
});

// Eliminar tour
window.deleteTour = async (tourId) => {
    const confirm = window.confirm(`¿Estás seguro de eliminar el tour? Esta acción no se puede deshacer.`);
    if (!confirm) return;
    
    try {
        const response = await fetch(`${API_URL}/tours/${tourId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        
        if (response.ok) {
            showNotification('Tour eliminado correctamente', 'success');
            await loadTours();
            await loadDestacados();
        } else {
            showNotification('Error al eliminar tour', 'error');
        }
    } catch (error) {
        console.error('Error eliminando tour:', error);
        showNotification('Error de conexión', 'error');
    }
};

// Editar tour
window.editTour = async (tourId) => {
    const tour = currentTours.find(t => t.id === tourId);
    if (!tour) return;
    
    // Abrir modal de edición (por simplicidad, usamos prompt)
    const nuevosDatos = prompt('Editar título:', tour.titulo);
    if (nuevosDatos && nuevosDatos !== tour.titulo) {
        try {
            const response = await fetch(`${API_URL}/tours/${tourId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({ ...tour, titulo: nuevosDatos })
            });
            
            if (response.ok) {
                showNotification('Tour actualizado correctamente', 'success');
                await loadTours();
                await loadDestacados();
            } else {
                showNotification('Error al actualizar tour', 'error');
            }
        } catch (error) {
            console.error('Error actualizando tour:', error);
            showNotification('Error de conexión', 'error');
        }
    }
};

// Crear nuevo tour
document.getElementById('create-tour-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const itinerarioText = document.getElementById('tour-itinerario').value;
    const incluyeText = document.getElementById('tour-incluye').value;
    const preciosText = document.getElementById('tour-precios').value;
    const promocionesText = document.getElementById('tour-promociones').value;
    const imagenesText = document.getElementById('tour-imagenes').value;
    
    const tourData = {
        id: document.getElementById('tour-id').value.trim(),
        titulo: document.getElementById('tour-titulo').value.trim(),
        categoria: document.getElementById('tour-categoria').value.trim(),
        fecha: document.getElementById('tour-fecha').value.trim(),
        duracion: document.getElementById('tour-duracion').value.trim(),
        ubicacion: document.getElementById('tour-ubicacion').value.trim(),
        estado: document.getElementById('tour-estado').value,
        descripcion: document.getElementById('tour-descripcion').value.trim(),
        descripcionLarga: document.getElementById('tour-descripcion-larga').value.trim(),
        itinerario: itinerarioText.split('\n').filter(l => l.trim()).map(line => {
            const [hora, actividad] = line.split('|').map(s => s.trim());
            return { hora: hora || '', actividad: actividad || '' };
        }),
        incluye: incluyeText.split('\n').filter(l => l.trim()),
        precios: preciosText.split('\n').filter(l => l.trim()).map(line => {
            const [tipo, precio] = line.split('|').map(s => s.trim());
            return { tipo: tipo || '', precio: precio || '' };
        }),
        promociones: promocionesText.split('\n').filter(l => l.trim()).map(line => {
            const [descripcion, precio] = line.split('|').map(s => s.trim());
            return { descripcion: descripcion || '', precio: precio || '' };
        }),
        reservaNota: document.getElementById('tour-reserva-nota').value.trim() || 'Aparta tu lugar con $300',
        imagenes: imagenesText.split('\n').filter(l => l.trim()),
        destacado: false,
        ordenDestacado: 0
    };
    
    try {
        const response = await fetch(`${API_URL}/tours`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(tourData)
        });
        
        if (response.ok) {
            showNotification('Tour creado correctamente', 'success');
            document.getElementById('create-tour-form').reset();
            await loadTours();
            await loadDestacados();
        } else {
            const error = await response.json();
            showNotification(error.message || 'Error al crear tour', 'error');
        }
    } catch (error) {
        console.error('Error creando tour:', error);
        showNotification('Error de conexión', 'error');
    }
});

// Vista previa en tiempo real
const previewFields = ['tour-titulo', 'tour-fecha', 'tour-duracion', 'tour-ubicacion', 'tour-descripcion'];
previewFields.forEach(fieldId => {
    document.getElementById(fieldId)?.addEventListener('input', updatePreview);
});
document.getElementById('tour-itinerario')?.addEventListener('input', updatePreview);
document.getElementById('tour-incluye')?.addEventListener('input', updatePreview);
document.getElementById('tour-precios')?.addEventListener('input', updatePreview);

function updatePreview() {
    const previewContent = document.getElementById('preview-content');
    if (!previewContent) return;
    
    const titulo = document.getElementById('tour-titulo')?.value || 'Sin título';
    const fecha = document.getElementById('tour-fecha')?.value || 'Fecha no especificada';
    const duracion = document.getElementById('tour-duracion')?.value || 'Duración no especificada';
    const ubicacion = document.getElementById('tour-ubicacion')?.value || 'Ubicación no especificada';
    const descripcion = document.getElementById('tour-descripcion')?.value || 'Sin descripción';
    
    previewContent.innerHTML = `
        <h5>${titulo}</h5>
        <p><strong>📅 Fecha:</strong> ${fecha}</p>
        <p><strong>⏱️ Duración:</strong> ${duracion}</p>
        <p><strong>📍 Ubicación:</strong> ${ubicacion}</p>
        <p><strong>📝 Descripción:</strong> ${descripcion.substring(0, 100)}${descripcion.length > 100 ? '...' : ''}</p>
    `;
}

// Pestañas
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        const tabId = `tab-${btn.dataset.tab}`;
        document.getElementById(tabId).classList.add('active');
        
        if (btn.dataset.tab === 'tours') loadTours();
        if (btn.dataset.tab === 'destacados') loadDestacados();
    });
});

// Inicializar
checkAuth();