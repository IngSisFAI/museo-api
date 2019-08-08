'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MedidasPiezaSchema = Schema({
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

const PiezaSchema = Schema({
    identificador: String,
    tipoPieza: String,
    medidasPieza: MedidasPiezaSchema,
    imagenesPieza: [Dupla],
    fechaIngreso: Date,
    fechaBaja: Date, //Esto lo paso a la coleccion movimientos
    motivoBaja: String, //Esto lo paso a la coleccion movimiento 
    perteneceEjemplar: String,
    origen: { type: String, enum: ['ExcavaciónPropia', 'Donación', 'Préstamo', 'Canje'] },
    descripcion: String,
    localidad: String,
    edad: Number,
    ubicacion: Ubicacion,
    estado: String,
    colectores: [{ type: Number, ref: 'persona' }]

})

module.exports = mongoose.model('Pieza', PiezaSchema)