'use strict'

const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const UsuarioSchema = Schema({
    nombre:String,
    apellido: String,
    user: String,
    password: String, 
    permiso: Number   //(1) Administrador, (2) Usuario Museo
})

module.exports = mongoose.model('Usuarios', UsuarioSchema)