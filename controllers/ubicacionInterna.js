const UbicacionInterna = require('../models/ubicacionInterna')
const crearError = require('http-errors')

exports.saveUbicacionInterna = async function(req, res, next) {
    try {
        const ubicacion = new UbicacionInterna({
            codRepositorio: req.body.codRepositorio,
            numEstante: req.body.numEstante,
            numEstanteria: req.body.numEstanteria
        })
        res.status(200).json(await ubicacion.save())
    } catch (err) {
        next(err)
    }
}

exports.editUbicacionInterna = async function(req, res, next) {
    try {
        const ubicacionInterna = await UbicacionInterna.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!ubicacionInterna) throw crearError(400, 'No se encontro la ubicacion interna')
        await ubicacionInterna.save()
        res.status(200).json(ubicacionInterna)
    } catch (err) {
        next(err)
    }
}

exports.getUbicacionInterna = async function(req, res, next) {
    try {
        const ubicacionInterna = await UbicacionInterna.findById(req.params.id)
        if (!ubicacionInterna) throw crearError(400, 'No se encontro la ubicación interna')
        res.status(200).json(ubicacionInterna)
    } catch (err) {
        next(err)
    }
}