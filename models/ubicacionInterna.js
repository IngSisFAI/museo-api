'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UbicacionInternaSchema = Schema({
    codRepositorio: Number,
    numEstante: Number,
    numEstanteria: Number
})

UbicacionInternaSchema.statics.crearUbicacion = function(codRepositorio, numEstante, numEstanteria, cb) {

    this.existe(codRepositorio, numEstante, numEstanteria, (err, ubicacion) => {
        if (err) { console.log(err) }
        if (!ubicacion) {
            let nuevaUbicacion = this.crearInstancia(codRepositorio, numEstante, numEstanteria);
            nuevaUbicacion.save(cb)
        }
    })
}

UbicacionInternaSchema.statics.crearInstancia = function(codRepositorio, numEstante, numEstanteria) {
    return new this({
        codRepositorio: codRepositorio,
        numEstante: numEstante,
        numEstanteria: numEstanteria
    })
}

UbicacionInternaSchema.statics.existe = function(aCodRepositorio, aNumEstante, aNumEstanteria, cb) {
    return this.findOne({ codRepositorio: aCodRepositorio, numEstante: aNumEstante, numEstanteria: aNumEstanteria }, cb);
}



module.exports = mongoose.model('UbicacionInterna', UbicacionInternaSchema)