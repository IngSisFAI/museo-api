'use strict';
const mongoose = require('mongoose');
const Schema  = mongoose.Schema;


const TipoPreparacionSchema = Schema({
  nombre: String,
  comentarios: String
});

module.exports = mongoose.model('TipoPreparacion', TipoPreparacionSchema, 'tipoPreparacion');