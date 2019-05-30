'use strict';
const mongoose = require('mongoose');
const Schema  = mongoose.Schema;


const ExploracionSchema = new Schema({
  idExploracion: String,
  nombre: String,
  fecha: Date,
  idArea: { type: String, ref: 'Area' },
});

module.exports = mongoose.model('Exploracion', ExploracionSchema);
