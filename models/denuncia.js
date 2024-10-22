'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DenunciaSchema = Schema({

    denunciante: String,
    paleontologo: String,
    tecnicos: [String],
    documentacion: [String],
    idArea: { type: String, ref: "Area" },
    fechaIngreso: Date
})

module.exports = mongoose.model('Denuncia', DenunciaSchema)