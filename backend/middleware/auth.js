// middleware/auth.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ message: 'No autorizado. Token no proporcionado.' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.adminId = decoded.adminId;
        req.username = decoded.username;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Sesión expirada. Por favor inicia sesión nuevamente.' });
        }
        return res.status(401).json({ message: 'Token inválido.' });
    }
};

module.exports = authMiddleware;