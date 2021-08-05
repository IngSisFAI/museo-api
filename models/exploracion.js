'use strict';
const mongoose = require('mongoose');
const Schema  = mongoose.Schema;


const ExploracionSchema = new Schema({
  nombreArea: String,
  fechaInicio: Date,
  fechaTermino: Date, 
  directorId: String,
  integrantesGrupo: [String],
  idExcavaciones: [ 
    { type: String, ref: 'Excavacion' }
  ],
  idArea: { type: String, ref: 'Area' },
  empresa: String,
  proyectoInvestigacion: String,
  otrasEspecificaciones: String, 
  archAutorizaciones:[String],
  detallePicking: String,
  imagenesExploracion:[String]
});


module.exports = mongoose.model('Exploracion', ExploracionSchema);
