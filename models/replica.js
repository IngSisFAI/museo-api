'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DimensionSchema = Schema({
    unidadDeMedida: { type: String, enum: ['mm', 'cm', 'm', 'pg'] },
    ancho: Number,
    largo: Number,
    alto: Number,
    diametro: Number,
    circunferencia: Number
})

const ReplicaSchema = Schema({
    codigo: String, //nro de replica
    numeroDePieza: { type: String, ref: 'Pieza' },
    medidas: DimensionSchema,
    imagenesReplica: [{ type: Schema.Types.ObjectId, ref: 'Imagen' }],
    fechaIngreso: Date,
    origen: { type: String, enum: ['Fabricado', 'Donación', 'Préstamo', 'Canje'] },
    descripcion: String,
    edad: Number,
    ubicacion: { type: Schema.Types.ObjectId, ref: 'UbicacionInterna' },
    estado: String,
    preparadores: [{ type: 'ObjectId', ref: 'Persona' }], //sacar por que no corresponde
    molde: { type: Schema.Types.ObjectId, ref: 'Molde' }, //{ type: Number, ref: 'molde' },
    material: String,
    tecnicasUtilizadas: String

})

module.exports = mongoose.model('Replica', ReplicaSchema)