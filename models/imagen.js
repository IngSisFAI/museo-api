'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImagenSchema = Schema({
    nombre: String,
    descripcion: String,
    imgUrl: String
});

module.exports = mongoose.model('Imagen', ImagenSchema)