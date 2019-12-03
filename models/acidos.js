'use strict';
const mongoose = require('mongoose');
const Schema  = mongoose.Schema;


const AcidoSchema = Schema({
  nombre: String,
  comentarios: String,
});

module.exports = mongoose.model('Acidos', AcidoSchema);
