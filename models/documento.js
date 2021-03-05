'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DocumentoSchema = Schema({
    nombre: String,
    descripcion: String,
    docUrl: String
});

module.exports = mongoose.model('Documento', DocumentoSchema)