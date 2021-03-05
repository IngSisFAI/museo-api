'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReplicaSchema = Schema({
    codigo: String, //nro de replica
    numeroDePieza: { type: String, ref: 'Pieza' },
    medidas: { type: 'ObjectId', ref: 'Dimension' },
    imagenesReplica: [{ type: 'ObjectId', ref: 'Imangen' }],
    fechaIngreso: Date,
    origen: { type: String, enum: ['Fabricado', 'Donación', 'Préstamo', 'Canje'] },
    descripcion: String,
    edad: Number,
    ubicacion: { type: 'ObjectId', ref: 'UbicacionInterna' },
    estado: String,
    colectores: [{ type: 'ObjectId', ref: 'Persona' }], //sacar por que no corresponde
    molde: String, //{ type: Number, ref: 'molde' },
    material: String,
    preparador: String,
    tecnicasUtilizadas: String

})

module.exports = mongoose.model('Replica', ReplicaSchema)