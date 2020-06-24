'use strict'

const Donacion = require('../models/donacion')
const DetalleDonacion = require('../models/detalleDonacion')

function saveDonacion(req, res) {

    let donacion = new Donacion()
    donacion.fecha = req.body.fecha
    donacion.descripcion = req.body.descripcion
    donacion.tipo = req.body.tipo
    donacion.actorP = req.body.actorP
    donacion.actorI = req.body.actor
    donacion.save((err, donacionStored) => {
        if (err) res.status(500).send({ message: `Error al salvar en la Base de Datos:${err}` })

    })
    let detalle = req.body.detalle //arreglo de json con todas las piezas/replicas asociadas a una donacion
    let detalleTam = detalle.length

    for (let i = 0; i < detalleTam; i++) {

        let unDetalle = new DetalleDonacion()
        unDetalle.donacion = donacion.id
        unDetalle.elementoR = detalle[i].elementoR
        unDetalle.elementoP = detalle[i].elementoP

        unDetalle.save((er, unDetalleStored) => {
            if (er) res.status(500).send({ message: `Error al salvar en la Base de Datos:${er}` })
        })
    }

    res.status(200).send({ donacion })
}

function getDonaciones(req, res) {
    Donacion.find().populate('actorP').exec((err, donaciones) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!donaciones) return res.status(404).send({ message: `No existen Donaciones` })
        res.status(200).send({ donaciones })
    })
}

module.exports = {
    saveDonacion,
    getDonaciones
}