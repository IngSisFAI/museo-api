'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PrestamoSchema = Schema({
    fechaInicio: Date,
    fechaFin: Date,
    descripcion: String,
    documentos: [{ type: 'ObjectId', ref: 'Documento' }],
    tipo: { type: String, enum: ['Realizado', 'Recibido'] },
    responsable: { type: Schema.Types.ObjectId, ref: 'Persona' },
    institucion: { type: Schema.Types.ObjectId, ref: 'Institucion' },
    piezas: [{ type: Schema.Types.ObjectId, ref: 'Pieza' }],
    replicas: [{ type: Schema.Types.ObjectId, ref: 'Replica' }]
})

module.exports = mongoose.model('Prestamo', PrestamoSchema)