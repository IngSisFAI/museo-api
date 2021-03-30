'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BajaReplicaSchema = Schema({
    fecha: Date,
    razon: { type: String, enum: ['Destrucción', 'Disolución', 'Perdida'] },
    descripcion: String,
    replica: { type: 'ObjectId', ref: 'Replica' }
});

module.exports = mongoose.model('BajaReplica', BajaReplicaSchema)