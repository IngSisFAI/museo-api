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

function getReplica(req, res) { //Buscar Replica por Codigo
    let replicaId = req.params._id
    Replica.findOne({ _id: replicaId }).populate('colectores').exec((err, replica) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!replica) return res.status(404).send({ message: `La replica ${replicaId} no existe` })
        res.status(200).send({ replica: replica })
    })
}

function getReplicas(req, res) { // Retornar todas las replicas de la coleccion
    Replica.find({}, (err, replicas) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!replicas) return res.status(404).send({ message: `No existen Replicas` })
        res.status(200).send({ replicas: replicas })
    })
}

function updateReplica(req, res) {
    Replica.findByIdAndUpdate(req.params._id, { $set: req.body }, (err, replicaActulizada) => {
        if (err) return res.status(500).send({ message: `Error al realizar la actualizacion: ${err}` })
        if (!replicaActulizada) return res.status(404).send({ message: `No se encontro la replica` })
        res.status(200).send({ replicaActulizada })
    })
}

module.exports = {
    saveReplica,
    getReplica,
    getReplicas,
    updateReplica
}