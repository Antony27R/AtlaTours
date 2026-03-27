// routes/tours.js
const express = require('express');
const router = express.Router();
const Tour = require('../models/Tour');
const authMiddleware = require('../middleware/auth');

// Obtener todos los tours (público)
router.get('/', async (req, res) => {
    try {
        const tours = await Tour.find().sort({ createdAt: -1 });
        res.json(tours);
    } catch (error) {
        console.error('Error obteniendo tours:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Obtener tours destacados (para index)
router.get('/destacados', async (req, res) => {
    try {
        const tours = await Tour.find({ destacado: true })
            .sort({ ordenDestacado: 1, createdAt: -1 })
            .limit(3);
        res.json(tours);
    } catch (error) {
        console.error('Error obteniendo tours destacados:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Obtener un tour por ID (público)
router.get('/:id', async (req, res) => {
    try {
        const tour = await Tour.findOne({ id: req.params.id });
        if (!tour) {
            return res.status(404).json({ message: 'Tour no encontrado' });
        }
        res.json(tour);
    } catch (error) {
        console.error('Error obteniendo tour:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Crear nuevo tour (solo admin)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const existingTour = await Tour.findOne({ id: req.body.id });
        if (existingTour) {
            return res.status(400).json({ message: 'Ya existe un tour con este ID' });
        }
        
        const tour = new Tour(req.body);
        await tour.save();
        
        res.status(201).json(tour);
    } catch (error) {
        console.error('Error creando tour:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Actualizar tour (solo admin)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const tour = await Tour.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!tour) {
            return res.status(404).json({ message: 'Tour no encontrado' });
        }
        
        res.json(tour);
    } catch (error) {
        console.error('Error actualizando tour:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Eliminar tour (solo admin)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const tour = await Tour.findOneAndDelete({ id: req.params.id });
        
        if (!tour) {
            return res.status(404).json({ message: 'Tour no encontrado' });
        }
        
        res.json({ message: 'Tour eliminado correctamente' });
    } catch (error) {
        console.error('Error eliminando tour:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Actualizar destacados (solo admin)
router.post('/destacados/update', authMiddleware, async (req, res) => {
    try {
        const { destacados } = req.body; // Array de IDs de tours destacados
        
        // Resetear todos los destacados
        await Tour.updateMany({}, { destacado: false, ordenDestacado: 0 });
        
        // Marcar los nuevos destacados
        for (let i = 0; i < destacados.length; i++) {
            await Tour.findOneAndUpdate(
                { id: destacados[i] },
                { destacado: true, ordenDestacado: i + 1 }
            );
        }
        
        res.json({ message: 'Destacados actualizados correctamente' });
    } catch (error) {
        console.error('Error actualizando destacados:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router;