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
    receptorResponsable: String,
    institucion: String,
    direccion: String,
    ejemplar: String,
    observacion: String,
    foto: String,
    documentacion: String,
    domicilio: String
})

module.exports = mongoose.model('Prestamo', PrestamoSchema)