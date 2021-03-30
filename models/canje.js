'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CanjeSchema = Schema({
    fecha: Date,
    descripcion: String,
    documentos: [{ type: 'ObjectId', ref: 'Documento' }],
    institucion: { type: Schema.Types.ObjectId, ref: 'Institucion' },
    piezasEntradas: [{ type: Schema.Types.ObjectId, ref: 'Pieza' }],
    replicasEntradas: [{ type: Schema.Types.ObjectId, ref: 'Replica' }],
    piezasSalidas: [{ type: Schema.Types.ObjectId, ref: 'Pieza' }],
    replicasSalidas: [{ type: Schema.Types.ObjectId, ref: 'Replica' }]
})

module.exports = mongoose.model('Canje', CanjeSchema)