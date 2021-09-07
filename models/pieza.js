'use strict'

const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const MedidasPiezaSchema = Schema({
    ancho:String,
    largo: String,
    alto: String,
    diametro: String,
    circunferencia: String
})

const Dupla = Schema({
    nombre:String,
    descripcion:String
})

const PiezaSchema = Schema({
   identificador: String,
   tipoPieza: String,
   medidasPieza:MedidasPiezaSchema,
   imagenesPieza:[Dupla],
   fechaIngreso:Date,
   fechaBaja:Date,
   motivoBaja:String,
   perteneceEjemplar: String,
   origen: String
})

module.exports = mongoose.model('Pieza', PiezaSchema)