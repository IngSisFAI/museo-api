'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExhibicionSchema = Schema({
    nroActa: Number,
    descripcion: String,
    fecha: Date,
    fechaFin: Date,
    ubicacion: String,
    tipo: String,
    responsableMuseo: String,
    responsableRecibe: String,
    institucion: String,
    foto: String, // foto es un archivo.jpg
    documentacion: String
})

module.exports = mongoose.model('Exhibicion', ExhibicionSchema)