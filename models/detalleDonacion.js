'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DetalleDonacionSchema = Schema({
    donacion: { type: Schema.Types.ObjectId, ref: 'Donacion' },
    elementoR: { type: Schema.Types.ObjectId, ref: 'Replica' }, //si estoy donando una replica
    elementoP: { type: Schema.Types.ObjectId, ref: 'Pieza' } // si estoy donando una pieza

})

module.exports = mongoose.model('DetalleDonacion', DetalleDonacionSchema)