'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UbicacionInternaSchema = Schema({
    codRepositorio: Number,
    numEstante: Number,
    numEstanteria: Number
})

module.exports = mongoose.model('UbicacionInterna', UbicacionInternaSchema)