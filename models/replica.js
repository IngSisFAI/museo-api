'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReplicaSchema = Schema({
    nroActa: Number,
    descripcion: String,
    fecha: Date,
    foto: String, // foto es un archivo.jpg
    documentacion: String //Por las dudas

})

module.exports = mongoose.model('Replica', ReplicaSchema)