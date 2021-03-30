const dimension = require('../models/dimension')
const Dimension = require('../models/dimension')

exports.saveDimension = function(req, res) {
    const dimension = new Dimension({
        unidadDeMedida: req.body.unidadDeMedida,
        ancho: req.body.ancho,
        largo: req.body.largo,
        alto: req.body.alto,
        diametro: req.body.diametro,
        circunferencia: req.body.circunferencia
    })

    dimension.save(function(err) {
        if (err) { res.status(500).send({ message: `Error al guardar el registro: ${err}` }) }
        res.status(200).json(dimension)
    })
}

exports.editDimension = function(req, res) {
    Dimension.findById(req.params.id, (err, dimension) => {
        if (err) { res.status(500).send({ message: `Error en la busqueda ${err}` }) }

        dimension.unidadDeMedida = req.body.unidadDeMedida
        dimension.ancho = req.body.ancho
        dimension.largo = req.body.largo
        dimension.alto = req.body.alto
        dimension.diametro = req.body.diametro
        dimension.circunferencia = req.body.circunferencia

        dimension.save(function(err) {
            if (err) { res.status(500).send({ message: `Error al guardar el registro: ${err}` }) }
            res.status(200).json(dimension)
        })
    })
}

exports.getDimension = function(req, res) {
    Dimension.findById(req.params.id, (err, dimension) => {
        if (err) { res.status(500).send({ message: `Error en la busqueda ${err}` }) }
        res.status(200).json(dimension)
    })
}