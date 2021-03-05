'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MoldeSchema = Schema({
    material: String,
    ubicacion: { type: 'ObjectId', ref: 'UbicacionInterna' },
    descripcion: String,
    medidas: { type: 'ObjecId', ref: 'Dimension' }

})


module.exports = mongoose.model('Molde', MoldeSchema)