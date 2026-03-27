const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Conectado a MongoDB'))
    .catch(err => console.error('❌ Error:', err));

const tourSchema = new mongoose.Schema({
    id: String,
    titulo: String,
    categoria: String,
    fecha: String,
    duracion: String,
    ubicacion: String,
    estado: String,
    destacado: Boolean,
    descripcion: String,
    descripcionLarga: String,
    itinerario: [{ hora: String, actividad: String }],
    incluye: [String],
    precios: [{ tipo: String, precio: String }],
    promociones: [{ descripcion: String, precio: String }],
    reservaNota: String,
    imagenes: [String],
    ordenDestacado: Number
});

const Tour = mongoose.model('Tour', tourSchema);

const tours = [
    // =========================
    // TE-PATHÉ (CORREGIDO)
    // =========================
    {
        id: "te-pathe",
        titulo: "Te-Pathé, Ixmiquilpan, Hidalgo",
        categoria: "1dia realizado",
        fecha: "15 de marzo, 2026",
        duracion: "1 día (ida y vuelta)",
        ubicacion: "Hidalgo",
        estado: "realizado",
        destacado: true,
        ordenDestacado: 1,
        descripcion: "Disfruta de aguas templadas, toboganes y diversión familiar.",
        descripcionLarga: "Disfruta un día completo de diversión y descanso en uno de los mejores balnearios de aguas templadas de Hidalgo. Relájate en sus albercas templadas, diviértete en los toboganes, la alberca de olas y deja que los más pequeños jueguen en las áreas infantiles, mientras tú te desconectas en el río lento. Ubicado cerca de CDMX y Querétaro, es ideal para todas las edades.",
        
        itinerario: [
            { hora: "05:00 AM", actividad: "Cita en punto de reunión - La llantera Avante Nativitas" },
            { hora: "05:30 AM", actividad: "Salida puntual rumbo a Hidalgo" },
            { hora: "08:00 AM", actividad: "Llegada al Santuario del Señor de las Maravillas" },
            { hora: "08:00 - 09:30 AM", actividad: "Tiempo libre para desayuno y recorrido" },
            { hora: "09:30 AM", actividad: "Salida rumbo al balneario" },
            { hora: "10:30 - 07:30 PM", actividad: "Tiempo libre en el balneario" },
            { hora: "06:00 PM", actividad: "Salida a CDMX" },
            { hora: "09:00 - 10:30 PM", actividad: "Llegada aproximada a CDMX" }
        ],

        incluye: [
            "Viaje redondo ida y vuelta",
            "Entrada al balneario",
            "Seguro de viajero",
            "Coordinación ATLA TOURS",
            "Acceso a todas las atracciones"
        ],

        precios: [
            { tipo: "Adultos", precio: "$700" },
            { tipo: "Adultos mayores (INAPAM)", precio: "$600" },
            { tipo: "Infantes (menos de 3 años)", precio: "Gratis (sentados en las piernas de sus padres)" }
        ],

        promociones: [],
        reservaNota: "Aparta tu lugar con $300",

        imagenes: [
            "https://lh3.googleusercontent.com/pw/AP1GczPml6xZH4ze6J-b2uFys4kLOVS5uIITdWLF8ft7j55u_VI-W3x2qEjbvdvMcQShZaj4Q1lCN9O8jnS2rWUpmtc5a3HyVQ_SyMT9HxGiQznyHOldt101jl6r95OrvXLg7jEJ-xLcEXMLLl3IgFtTpdS_=w487-h255-s-no-gm",
            "https://lh3.googleusercontent.com/pw/AP1GczOJ_SnPIIroHy35tM3AZhjk9mHBuYg3iT7qzFSDodHPrR2OxnJ3-8bVpotoiTVkWNpK-2aUreMWLXGc3qL0K75VGGb1DWVdsImBEZhpwVrf-4uKelr5_BsHmA8-goCiTnS0mohb4Of0fkijCCGtxTaJ=w686-h914-s-no-gm",
            "https://lh3.googleusercontent.com/pw/AP1GczOJ2-Edh7fi47NfTeGpf945Q4V5R9Wg4jfVMXmxp_Ns5bZzhhWGIcQMfE57LQ2KvcLTuTOlfK1kMhfcl09FHm5tfaVLzGdsWGPZnaY4uTk1qhkevLfDVzmFmsxBIFuB2fopzKMwnrXC2RBq9r65S-PY=w600-h400-s-no-gm"
        ]
    },

    // =========================
    // EL GEISER (CORREGIDO)
    // =========================
    {
        id: "geiser",
        titulo: "El Geiser, Tecozautla, Hidalgo",
        categoria: "1dia proximo",
        fecha: "17 de Mayo, 2026",
        duracion: "1 día (ida y vuelta)",
        ubicacion: "Hidalgo",
        estado: "proximo",
        destacado: true,
        ordenDestacado: 2,

        descripcion: "Aguas termales y recorrido por Tecozautla.",
        descripcionLarga: "Descubre las maravillosas aguas termales de El Geiser en Tecozautla, Hidalgo. Disfruta de un día de relajación en sus pozas termales y conoce su centro histórico.",

        itinerario: [
            { hora: "05:00 AM", actividad: "Llegada al punto de salida" },
            { hora: "05:30 AM", actividad: "Salida de CDMX" },
            { hora: "09:00 AM", actividad: "Llegada al balneario El Geiser" },
            { hora: "09:00 - 03:30 PM", actividad: "Tiempo libre" },
            { hora: "03:30 PM", actividad: "Salida a Tecozautla" },
            { hora: "04:00 - 05:30 PM", actividad: "Recorrido en el centro" },
            { hora: "05:45 PM", actividad: "Salida a CDMX" },
            { hora: "09:00 - 09:30 PM", actividad: "Llegada aproximada" }
        ],

        incluye: [
            "Transporte redondo",
            "Entrada al balneario El Geiser",
            "Seguro de viajero",
            "Coordinación ATLA TOURS"
        ],

        precios: [
            { tipo: "Precio regular", precio: "$850" },
            { tipo: "Primeras 10 personas (contado)", precio: "$750" },
            { tipo: "Familias de 4 o más personas", precio: "$800 c/u" }
        ],

        promociones: [
            { descripcion: "Primeras 10 personas (contado)", precio: "$750" },
            { descripcion: "Familias de 4 o más", precio: "$800 c/u" }
        ],

        reservaNota: "¡Aprovecha las Ofertas! Aparta tu lugar con $300",

        imagenes: [
            "https://lh3.googleusercontent.com/pw/AP1GczNxA9RJ88LK8m4FbDPxPnF0iOvwBMfQLbIwfbr2sNpThEY8KiTgRnyk-ubmi1_NUKxB7DtmY-1CthEWIwZrcA_NqHpqK0O2HnyG1rqiza14HRwkkYZiMNcbY1nU-E8dAO3dXazG_dyjABr7L45Y5NsW=w220-h190-s-no-gm"
        ]
    },

    // =========================
    // ACAPULCO (YA ESTABA BIEN)
    // =========================
    {
        id: "acapulco",
        titulo: "Acapulco, Guerrero - Zona Diamante y Puerto Marqués",
        categoria: "2dias proximo",
        fecha: "Noviembre 2026 (último fin de semana)",
        duracion: "2 días / 1 noche",
        ubicacion: "Guerrero",
        estado: "proximo",
        destacado: true,
        ordenDestacado: 3,

        descripcion: "Escapada a playas paradisíacas.",
        descripcionLarga: "Escápate a Acapulco, disfruta la Zona Diamante, Puerto Marqués y la Quebrada.",

        itinerario: [
            { hora: "Día 1 - 06:00 AM", actividad: "Salida desde CDMX" },
            { hora: "Día 1 - 11:00 AM", actividad: "Llegada y check-in" },
            { hora: "Día 1 - 12:00 PM", actividad: "Tiempo libre en playa" },
            { hora: "Día 1 - 06:00 PM", actividad: "Visita a la Quebrada" },
            { hora: "Día 2 - 08:00 AM", actividad: "Desayuno" },
            { hora: "Día 2 - 04:00 PM", actividad: "Salida a CDMX" }
        ],

        incluye: [
            "Transporte redondo",
            "Hospedaje",
            "Desayuno",
            "Seguro de viajero"
        ],

        precios: [
            { tipo: "Habitación doble", precio: "$1,800" },
            { tipo: "Niños (3-10 años)", precio: "$1,200" },
            { tipo: "Individual", precio: "$2,500" }
        ],

        promociones: [],
        reservaNota: "Aparta con $500",

        imagenes: [
            "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd"
        ]
    }
];

async function migrate() {
    try {
        await Tour.deleteMany({});
        console.log('🗑️ Tours eliminados');

        for (const tour of tours) {
            await Tour.create(tour);
            console.log(`✅ ${tour.titulo}`);
        }

        console.log('🎉 Migración completada');
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

migrate();