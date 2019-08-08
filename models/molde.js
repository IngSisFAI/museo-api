'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Ubicacion = Schema({
    codRepositorio: Number,
    numEstante: Number,
    numEstanteria: Number
})
const MoldeSchema = Schema({
    material: String,
    ubicacion: Ubicacion,
    descripcion: String
})


module.exports = mongoose.model('Molde', MoldeSchema)