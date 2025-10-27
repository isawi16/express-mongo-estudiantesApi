const { Schema, model } = require('mongoose');

const ProfesorSchema = Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    curp: {
        type: String,
        required: true
    },
    edad: {
        type: Number
    }
});

module.exports = model('Profesor', ProfesorSchema);
