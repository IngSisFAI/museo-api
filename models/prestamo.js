'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

//va adentro o afuera


const PrestamoSchema = Schema({
    nroActa: String,
    fechaInicio: Date,
    fechaFin: Date,
    descripcion: String,
    paleontologoResponsable: String,
    institucion: String,
    ejemplar: String,
    observacion: String,
    foto: String,
    documentacion: String
})

module.exports = mongoose.model('Prestamo', PrestamoSchema)