const UbicacionInterna = require('../models/ubicacionInterna')
const crearError = require('http-errors')
exports.saveUbicacionInterna = function(req, res) {
    const ubicacion = new UbicacionInterna({

        codRepositorio: req.body.codRepositorio,
        numEstante: req.body.numEstante,
        numEstanteria: req.body.numEstanteria
    })

    ubicacion.save(function(err) {
        if (err) { res.status(500).send({ message: `Error al guardar el registro: ${err}` }) }
        res.status(200).json(ubicacion)
    })
}

exports.editUbicacionInterna = function(req, res) {
    UbicacionInterna.findById(req.params.id, (err, ubicacion) => {
        if (err) { res.status(500).send({ message: `Error en la busqueda: ${err}` }) }

        ubicacion.codRepositorio = req.body.codRepositorio
        ubicacion.numEstante = req.body.numEstante
        ubicacion.numEstanteria = req.body.numEstanteria
        ubicacion.save(function(err) {
            if (err) { res.status(500).send({ message: `Error al guardar el registro: ${err}` }) }
            res.status(200).json(ubicacion)
        })
    })
}

/*exports.getUbicacionInterna = function(req, res) {
    UbicacionInterna.findById(req.params.id, (err, ubicacion) => {
        if (err) { res.status(500).send({ message: `Error en la búsqueda: ${err}` }) }
        res.status(200).json(ubicacion)
    })
}*/

exports.getUbicacionInterna = async function(req, res, next) {
    try {
        const ubicacionInterna = await UbicacionInterna.findById(req.params.id)
        if (!ubicacionInterna) throw crearError(400, 'No se encontro la ubicación interna')
        res.status(200).json(ubicacionInterna)
    } catch (err) {
        next(err)
    }
}