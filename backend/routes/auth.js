// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Admin = require('../models/Admin');
const LoginAttempt = require('../models/LoginAttempt');

// Configurar transporter para correo
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Obtener IP del cliente
const getClientIp = (req) => {
    return req.headers['x-forwarded-for'] || req.socket.remoteAddress;
};

// Inicializar admin por defecto (ejecutar una sola vez)
const initDefaultAdmin = async () => {
    const adminExists = await Admin.findOne({ username: 'admin' });
    if (!adminExists) {
        const defaultAdmin = new Admin({
            username: 'admin',
            password: 'adminpw01',
            email: 'juans5rivers55@gmail.com', // Cambiar por tu correo
            firstLogin: true,
            failedAttempts: 0
        });
        await defaultAdmin.save();
        console.log('✅ Administrador por defecto creado');
    }
};
initDefaultAdmin();

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const ip = getClientIp(req);
    
    try {
        const admin = await Admin.findOne({ username });
        
        // Verificar si está bloqueado
        if (admin && admin.lockedUntil && admin.lockedUntil > new Date()) {
            return res.status(423).json({ 
                message: `Cuenta bloqueada. Intenta nuevamente después de ${admin.lockedUntil}` 
            });
        }
        
        if (!admin || !(await admin.comparePassword(password))) {
            // Registrar intento fallido
            await LoginAttempt.create({ username, ip, success: false });
            
            if (admin) {
                admin.failedAttempts += 1;
                admin.lastFailedAttempt = new Date();
                
                // Bloquear después de 3 intentos fallidos
                if (admin.failedAttempts >= 3) {
                    admin.lockedUntil = new Date(Date.now() + 30 * 60 * 1000); // 30 minutos
                    
                    // Enviar correo de notificación
                    await transporter.sendMail({
                        from: process.env.EMAIL_USER,
                        to: admin.email,
                        subject: '⚠️ ATLA TOURS - Alerta de seguridad',
                        html: `
                            <h2>⚠️ Intento de acceso no autorizado</h2>
                            <p>Se han registrado 3 intentos fallidos de acceso al panel de administración.</p>
                            <p><strong>IP:</strong> ${ip}</p>
                            <p><strong>Fecha y hora:</strong> ${new Date().toLocaleString()}</p>
                            <p><strong>Usuario intentado:</strong> ${username}</p>
                            <hr>
                            <p>Por seguridad, la contraseña ha sido restablecida a:</p>
                            <p><strong>Contraseña por defecto: adminpw01</strong></p>
                            <p>Por favor inicia sesión con esta contraseña y cámbiala inmediatamente.</p>
                            <hr>
                            <p>Si no fuiste tú, contacta al soporte de inmediato.</p>
                        `
                    });
                    
                    // Resetear contraseña a default
                    admin.password = 'adminpw01';
                    admin.failedAttempts = 0;
                    admin.lockedUntil = null;
                    await admin.save();
                    
                    return res.status(401).json({ 
                        message: 'Demasiados intentos fallidos. La contraseña ha sido restablecida a la contraseña por defecto. Revisa tu correo para más información.',
                        reset: true
                    });
                }
                
                await admin.save();
            }
            
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
        
        // Login exitoso
        admin.failedAttempts = 0;
        admin.lockedUntil = null;
        await admin.save();
        
        await LoginAttempt.create({ username, ip, success: true });
        
        // Generar token con expiración de 5 minutos
        const token = jwt.sign(
            { adminId: admin._id, username: admin.username },
            process.env.JWT_SECRET,
            { expiresIn: '5m' }
        );
        
        res.json({
            token,
            firstLogin: admin.firstLogin,
            message: admin.firstLogin ? 'Primer inicio de sesión. Debes cambiar tu contraseña.' : 'Login exitoso'
        });
        
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Cambiar contraseña
router.post('/change-password', async (req, res) => {
    const { username, currentPassword, newPassword } = req.body;
    
    try {
        const admin = await Admin.findOne({ username });
        
        if (!admin) {
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }
        
        if (!(await admin.comparePassword(currentPassword))) {
            return res.status(401).json({ message: 'Contraseña actual incorrecta' });
        }
        
        admin.password = newPassword;
        admin.firstLogin = false;
        await admin.save();
        
        res.json({ message: 'Contraseña actualizada correctamente' });
        
    } catch (error) {
        console.error('Error cambiando contraseña:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Verificar token
router.get('/verify', async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ valid: false });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findById(decoded.adminId);
        
        if (!admin) {
            return res.status(401).json({ valid: false });
        }
        
        res.json({ 
            valid: true, 
            firstLogin: admin.firstLogin 
        });
        
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ valid: false, expired: true });
        }
        res.status(401).json({ valid: false });
    }
});

module.exports = router;