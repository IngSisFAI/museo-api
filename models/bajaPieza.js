'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BajaPiezaSchema = Schema({
    fecha: Date,
    razon: { type: String, enum: ['Destrucción', 'Disolución', 'Perdida'] },
    descripcion: String,
    pieza: { type: 'ObjectId', ref: 'Pieza' }
});

module.exports = mongoose.model('BajaPieza', BajaPiezaSchema)