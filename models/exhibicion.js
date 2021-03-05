'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExhibicionSchema = Schema({
    fechaInicio: Date,
    fechaFin: Date,
    descripcion: String,
    documentos: [{ type: 'ObjectId', ref: 'Documento' }],
    tipo: { type: String, enum: ['Interna', 'Itinerante'] },
    responsable: { type: Schema.Types.ObjectId, ref: 'Persona' },
    actorP: { type: Schema.Types.ObjectId, ref: 'Persona' }, //si la muestra es para persona
    actorI: { type: Schema.Types.ObjectId, ref: 'Institucion' }, // si la muestra es para una institucion. 
    piezas: [{ type: Schema.Types.ObjectId, ref: 'Pieza' }],
    replicas: [{ type: Schema.Types.ObjectId, ref: 'Replica' }]
})

module.exports = mongoose.model('Exhibicion', ExhibicionSchema)