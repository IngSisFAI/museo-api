'use strict'

const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const BochonSchema = Schema({
   nombre: String, 
   codigoCampo: String,
   nroBochon: String,
   preparador: String,
   preparadorID: String,
   tipoPreparacion: String,
   acidosAplicados: [String],
   ejemplarAsociado: [{ type: Schema.Types.ObjectId, ref: 'Ejemplar' }],
   excavacionId: [{ type: Schema.Types.ObjectId, ref: 'Excavacion' }],
   piezasId: [String],
   piezasNames: [String], 
   infoAdicional: String  


})

module.exports = mongoose.model('Bochon', BochonSchema)