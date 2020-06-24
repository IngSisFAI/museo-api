'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DonacionSchema = Schema({
    fecha: Date,
    descripcion: String,
    //Documento que lo autoriza
    tipo: { type: String, enum: ['Recibida', 'Realizada'] },
    actorP: { type: Schema.Types.ObjectId, ref: 'Persona' }, //si el donador o donado es persona
    actorI: String // si el donador o donado es una institucion. 
})

module.exports = mongoose.model('Donacion', DonacionSchema)