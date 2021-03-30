'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DimensionSchema = Schema({
    unidadDeMedida: { type: String, enum: ['mm', 'cm', 'm', 'pg'] },
    ancho: Number,
    largo: Number,
    alto: Number,
    diametro: Number,
    circunferencia: Number
})

module.exports = mongoose.model('Dimension', DimensionSchema)