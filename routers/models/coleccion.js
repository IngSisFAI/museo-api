'use strict';
const mongoose = require('mongoose');
const Schema  = mongoose.Schema;


const ColeccionSchema = Schema({
  nombre: String,
  iniciales: String
});

module.exports = mongoose.model('Colecciones', ColeccionSchema);
