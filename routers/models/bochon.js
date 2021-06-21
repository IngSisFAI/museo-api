'use strict'

const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const BochonSchema = Schema({
   nombre:String, 
   nroCampo:Number,
   preparador: String,
   preparadorID: String,
   tipoPreparacion:{type: String, enum:['Química', 'Mecánica','Técnicas de extracción de microfósiles','Técnicas de concentración', 'Secciones delgadas','Consolidantes y adhesivos']},
   acidosAplicados: [String],
   ejemplarAsociado: String,
   excavacionId: String,
   piezaId:String
})

module.exports = mongoose.model('Bochon', BochonSchema)