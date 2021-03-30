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

const PiezaSchema = Schema({
    numeroDePieza: String,
    nroColeccion: { type: Schema.Types.ObjectId, ref: 'Ejemplar' },
    tipoPieza: String,
    medidas: DimensionSchema,
    imagenesPieza: [{ type: Schema.Types.ObjectId, ref: 'Imagen' }],
    fechaIngreso: Date,
    fechaBaja: Date, //Esto lo paso a la coleccion bajas
    motivoBaja: String, //Esto lo paso a la coleccion bajas 
    perteneceEjemplar: String,
    origen: { type: String, enum: ['excavación propia', 'donación', 'préstamo', 'canje'] },
    descripcion: String,
    localidad: String,
    edad: Number,
    ubicacion: { type: Schema.Types.ObjectId, ref: 'UbicacionInterna' },
    estado: String,
    colectores: [{ type: Number, ref: 'Persona' }]

})

module.exports = mongoose.model('Pieza', PiezaSchema)