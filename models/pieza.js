'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PiezaSchema = Schema({
    numeroDePieza: String,
    nroColeccion: { type: String, ref: 'Ejemplar' },
    tipoPieza: String,
    medidas: { type: 'ObjecId', ref: 'Dimension' },
    imagenesPieza: [{ type: 'ObjectId', ref: 'Imangen' }],
    fechaIngreso: Date,
    fechaBaja: Date, //Esto lo paso a la coleccion movimientos
    motivoBaja: String, //Esto lo paso a la coleccion movimiento 
    perteneceEjemplar: String,
    origen: { type: String, enum: ['ExcavaciónPropia', 'Donación', 'Préstamo', 'Canje'] },
    descripcion: String,
    localidad: String,
    edad: Number,
    ubicacion: { type: 'ObjectId', ref: 'UbicacionInterna' },
    estado: String,
    colectores: [{ type: Number, ref: 'Persona' }]

})

module.exports = mongoose.model('Pieza', PiezaSchema)