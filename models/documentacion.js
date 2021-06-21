'use strict';
const mongoose = require('mongoose');
const Schema  = mongoose.Schema;


const DocumentacionSchema = Schema({
 tipoDocumentacion: String,
 nombre: String,
 anio: Number,
 comentarios:String});

module.exports = mongoose.model('Documentacion', DocumentacionSchema);
