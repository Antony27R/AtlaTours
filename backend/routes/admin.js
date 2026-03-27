// routes/admin.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Admin = require('../models/Admin');
const Tour = require('../models/Tour');

// Obtener estadísticas (solo admin)
router.get('/stats', authMiddleware, async (req, res) => {
    try {
        const totalTours = await Tour.countDocuments();
        const toursRealizados = await Tour.countDocuments({ estado: 'realizado' });
        const toursProximos = await Tour.countDocuments({ estado: 'proximo' });
        
        res.json({
            totalTours,
            toursRealizados,
            toursProximos,
            lastLogin: new Date()
        });
    } catch (error) {
        console.error('Error obteniendo estadísticas:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Obtener información del admin
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const admin = await Admin.findById(req.adminId).select('-password');
        res.json(admin);
    } catch (error) {
        console.error('Error obteniendo perfil:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router;