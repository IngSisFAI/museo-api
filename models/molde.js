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

const MoldeSchema = Schema({
    material: String,
    ubicacion: { type: Schema.Types.ObjectId, ref: 'UbicacionInterna' },
    descripcion: String,
    medidas: DimensionSchema

})

module.exports = mongoose.model('Molde', MoldeSchema)