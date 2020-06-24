'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MedidasReplica = Schema({
    unidadDeMedida: String,
    ancho: Number,
    largo: Number,
    alto: Number,
    diametro: Number,
    circunferencia: Number
})


const Dupla = Schema({
    nombre: String,
    descripcion: String
})

const Ubicacion = Schema({
    codRepositorio: Number,
    numEstante: Number,
    numEstanteria: Number
})

const ReplicaSchema = Schema({
    codigo: String,
    medidasReplica: MedidasReplica,
    imagenesReplica: [Dupla],
    fechaIngreso: Date,
    origen: { type: String, enum: ['Fabricado', 'Donación', 'Préstamo', 'Canje'] },
    descripcion: String,
    localidad: String,
    edad: Number,
    ubicacion: Ubicacion,
    estado: String,
    colectores: [{ type: 'ObjectId', ref: 'Persona' }],
    molde: String, //{ type: Number, ref: 'molde' },
    material: String,
    preparador: String,
    tecnicasUtilizadas: String

})

module.exports = mongoose.model('Replica', ReplicaSchema)