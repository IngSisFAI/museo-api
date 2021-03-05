'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InstitucionSchema = Schema({
    nombre: String,
    cuit: String,
    email: String,
    telefono: String
});

module.exports = mongoose.model('Institucion', InstitucionSchema)