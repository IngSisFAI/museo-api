'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DonacionSchema = Schema({
    nroActa: Number,
    fecha: Date,
    descripcion: String,
    cantidad: Number,
    donador: String,
    foto: String, // foto es un archivo.jpg
    documentacion: String
})

module.exports = mongoose.model('Donacion', DonacionSchema)