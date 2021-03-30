'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImagenSchema = Schema({
    nombre: String,
    descripcion: String,
    imgUrl: String
});

ImagenSchema.methods.setImgUrl = function setImgUrl(nombreArchivo) {
    this.imgUrl = `http://localhost:3001/public/${nombreArchivo}`
}
module.exports = mongoose.model('Imagen', ImagenSchema)