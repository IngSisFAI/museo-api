'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DonacionSchema = Schema({
    fecha: Date,
    descripcion: String,
    documentos: [{ type: 'ObjectId', ref: 'Documento' }],
    tipo: { type: String, enum: ['Recibida', 'Realizada'] },
    actorP: { type: Schema.Types.ObjectId, ref: 'Persona' }, //si el donador o donado es persona
    actorI: { type: Schema.Types.ObjectId, ref: 'Institucion' }, // si el donador o donado es una institucion. 
    elementoP: { type: Schema.Types.ObjectId, ref: 'Pieza' },
    elementoR: { type: Schema.Types.ObjectId, ref: 'Replica' }
})

module.exports = mongoose.model('Donacion', DonacionSchema)