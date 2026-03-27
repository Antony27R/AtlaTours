// models/Tour.js
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    titulo: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    duracion: {
        type: String,
        required: true
    },
    ubicacion: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: ['realizado', 'proximo'],
        default: 'proximo'
    },
    destacado: {
        type: Boolean,
        default: false
    },
    descripcion: {
        type: String,
        required: true
    },
    descripcionLarga: {
        type: String,
        default: ''
    },
    itinerario: [{
        hora: String,
        actividad: String
    }],
    incluye: [String],
    precios: [{
        tipo: String,
        precio: String
    }],
    promociones: [{
        descripcion: String,
        precio: String
    }],
    reservaNota: {
        type: String,
        default: 'Aparta tu lugar con $300'
    },
    imagenes: [String],
    ordenDestacado: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Tour', tourSchema);