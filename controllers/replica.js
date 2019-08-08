'use strict'

const Replica = require('../models/replica')

function saveReplica(req, res, next) {
    try {
        let replica = new Replica()
        replica.codigo = req.body.codigo
        replica.medidasReplica = req.body.medidasReplica
        replica.imagenReplica = req.body.imagenReplica
        replica.fechaIngreso = req.body.fechaIngreso
        replica.origen = req.body.origen
        replica.descripcion = req.body.descripcion
        replica.localidad = req.body.localidad
        replica.edad = req.body.edad
        replica.ubicacion = req.body.ubicacion
        replica.estado = "disponible"
        replica.colectores = req.body.colectores
        replica.molde = req.body.molde
        replica.material = req.body.material

        replica.save()
        res.status(200).send({ replica })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    saveReplica
}