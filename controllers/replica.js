'use strict'

const Replica = require('../models/replica')
const UbicacionInterna = require('../models/ubicacionInterna')
const crearError = require('http-errors')


async function saveReplica(req, res, next) {
    try {
        const ubicacionInterna = await UbicacionInterna.findOne({
            codRepositorio: req.body.ubicacionInterna.codRepositorio,
            numEstante: req.body.ubicacionInterna.numEstante,
            numEstanteria: req.body.ubicacionInterna.numEstanteria
        })

        if (ubicacionInterna) throw crearError(500, `El lugar esta ocupado`)

        const nuevaUbicacion = new UbicacionInterna({
            codRepositorio: req.body.ubicacionInterna.codRepositorio,
            numEstante: req.body.ubicacionInterna.numEstante,
            numEstanteria: req.body.ubicacionInterna.numEstanteria
        })

        await nuevaUbicacion.save()

        const replica = new Replica({
            codigo: req.body.codigo,
            numeroDePieza: req.body.pieza,
            medidas: req.body.medidas,
            //imagenesReplica: req.body.imagenesReplica, Esto lo cargamos despues con otra operacion
            fechaIngreso: req.body.fechaIngreso,
            origen: req.body.origen,
            descripcion: req.body.descripcion,
            edad: req.body.edad,
            ubicacionInterna: nuevaUbicacion._id,
            estado: req.body.estado,
            //preparadores: req.body.preparadores, // hacer el chequeo de los preparadores
            molde: req.body.molde,
            material: req.body.material,
            tecnicasUtilizadas: req.body.tecnicasUtilizadas
        })
        res.status(200).send(await replica.save())
    } catch (err) {
        next(err)
    }

}

async function getReplica(req, res, next) {
    try {
        const replica = await (await Replica.findById(req.params.id)).populate('colectores')
        if (!replica) throw crearError(400, 'No existe replica')
        res.status(200).send(replica)
    } catch (err) {
        next(err)
    }
}

async function getReplicas(req, res, next) {
    try {
        const replicas = await Replica.find({})
        if (!replicas) throw crearError(400, 'No existen Replicas')
        res.status(200).send(replicas)
    } catch (err) {
        next(err)
    }
}

async function updateReplica(req, res, next) {
    try {
        const replica = await Replica.findByIdAndUpdate(req.params._id, { $set: req.body })
        if (!replica) throw crearError(400, 'No se encontro la replica')
        res.status(200).send(replica)
    } catch (err) {
        next(err);
    }
}



module.exports = {
    saveReplica,
    getReplica,
    getReplicas,
    updateReplica
}