'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BajaMoldeSchema = Schema({
    fecha: Date,
    razon: { type: String, enum: ['Destrucción', 'Disolución', 'Perdida'] },
    descripcion: String,
    molde: { type: 'ObjectId', ref: 'Molde' }
});

module.exports = mongoose.model('BajaMolde', BajaMoldeSchema)