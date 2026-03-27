// models/Admin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        default: 'admin'
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstLogin: {
        type: Boolean,
        default: true
    },
    failedAttempts: {
        type: Number,
        default: 0
    },
    lastFailedAttempt: {
        type: Date,
        default: null
    },
    lockedUntil: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

// Encriptar contraseña antes de guardar
adminSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Método para comparar contraseña
adminSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);