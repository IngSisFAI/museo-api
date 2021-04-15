'use strict'

const Replica = require('../models/replica')
const Pieza = require('../models/pieza')
const Persona = require('../models/persona')
const crearError = require('http-errors')

function saveReplica(req, res, next) {

    // Y si acá la req.body.numeroDePieza es null?
    Pieza.findById(req.body.numeroDePieza, (err, pieza) => {
            if (err) { res.status(500).send({ message: `Error al realizar la busqueda ${err}` }) }
            if (pieza) { pieza = pieza._id }
            UbicacionInterna.findOne({
                codRepositorio: req.body.ubicacionInterna.codRepositorio,
                numEstante: req.body.ubicacionInterna.numEstante,
                numEstanteria: req.body.ubicacionInterna.numEstanteria
            }, (err, ubicacion) => {
                if (err) { return res.status(500).send({ message: `Error en busqueda ${err}` }) }
                if (ubicacion) { return res.status(500).send({ message: 'Ubicacion no disponible' }) }
                let nuevaUbicacion = new UbicacionInterna({
                    codRepositorio: req.body.ubicacionInterna.codRepositorio,
                    numEstante: req.body.ubicacionInterna.numEstante,
                    numEstanteria: req.body.ubicacionInterna.numEstanteria
                })
                nuevaUbicacion.save((err, ubicacion) => {
                    if (err) { return res.status(500).send({ message: `Error en alta ${err}` }) }

                    for (let i = 0; i < req.body.preparadores.length; i++) {
                        Persona.findById(req.body.prepadores[i], (err, preparador) => {
                            if (err) { return res.status(500).send({ message: `Error en busaqueda preparador` }) }
                        })
                    }

                    let replica = new Replica({
                        codigo: req.body.codigo,
                        numeroDePieza: pieza,
                        medidas: req.body.medidas,
                        imagenesPieza: req.body.imagenesPieza,
                        fechaIngreso: req.body.fechaIngreso,
                        origen: req.body.origen,
                        descripcion: req.body.origen,
                        edad: req.body.edad,
                        ubicacion: ubicacion._id,
                        estado: req.body.estado,
                        preparadores: req.body.preparadores, // hacer el chequeo de los preparadores
                        molde: req.body.molde,
                        material: req.body.material,
                        tecnicasUtilizadas: req.body.tecnicasUtilizadas

                    })

                    pieza.save((err, piezaAlmacenada) => {
                        if (err) res.status(500).send({ message: `Error al salvar en la Base de Datos:${err}` })
                        return res.status(200).send({ piezaAlmacenada })
                    })

                })

            })


        })
        /* try {
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
         }*/
}

function getReplica(req, res) { //Buscar Replica por Codigo

    let replicaId = req.params._id
    Replica.findOne({ _id: replicaId }).populate('colectores').exec((err, replica) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!replica) return res.status(404).send({ message: `La replica ${replicaId} no existe` })
        res.status(200).send({ replica: replica })
    })
}
/** 
function getReplicas(req, res) { // Retornar todas las replicas de la coleccion
    Replica.find({}, (err, replicas) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!replicas) return res.status(404).send({ message: `No existen Replicas` })
        res.status(200).send({ replicas: replicas })
    })
}
*/
async function getReplicas(req, res, next) {
    try {
        const replicas = await Replica.find({})
        if (!replicas) throw crearError(400, 'No existe Replicas')
            //throw crearError(400, 'mensaje de prueba', { hola: 'hola' })
        res.status(200).send({ replicas })
    } catch (err) {
        next(err)
    }
}

/*function updateReplica(req, res) {
    Replica.findByIdAndUpdate(req.params._id, { $set: req.body }, (err, replicaActulizada) => {
        if (err) return res.status(500).send({ message: `Error al realizar la actualizacion: ${err}` })
        if (!replicaActulizada) return res.status(404).send({ message: `No se encontro la replica` })
        res.status(200).send({ replicaActulizada })
    })
}*/

async function updateReplica(req, res, next) {
    try {
        const replica = await Replica.findByIdAndUpdate(req.params._id, { $set: req.body })
        if (!replica) throw crearError(404, 'No se encontro la replica')
        res.status(200).send({ replica })
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