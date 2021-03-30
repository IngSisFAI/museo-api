const UbicacionInterna = require('../models/ubicacionInterna')

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

exports.getUbicacionInterna = function(req, res) {
    UbicacionInterna.findById(req.params.id, (err, ubicacion) => {
        if (err) { res.status(500).send({ message: `Error en la búsqueda: ${err}` }) }
        res.status(200).json(ubicacion)
    })
}