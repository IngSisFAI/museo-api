'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DenunciaSchema = Schema({
    nroDenuncia: String,
    denunciante: String,
    fechaIngreso: Date,
    paleontologo: String,
    tecnicos: [String],
    documentacion: [String],
    idArea: {type: String, ref: 'area'}


})

module.exports = mongoose.model('Denuncia', DenunciaSchema)