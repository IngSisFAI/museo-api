'use strict'

const UbicacionInterna = require('../models/ubicacionInterna')
const ejemplar = require('../models/ejemplar')
const Pieza = require('../models/pieza')


function getpiezaId(req, res) { // busca una pieza por su ID - clave mongo
    let piezaId = req.params.piezaId
    Pieza.findById(piezaId, (err, pieza) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!piezaId) return res.status(404).send({ message: `La pieza no existe` })
        res.status(200).send({ pieza: pieza })
    })
}

function getpiezaIdentificador(req, res) { // busca una pieza por su identificador
    let piezaIdentificador = req.params.piezaId
    Pieza.findOne({ 'identificador': piezaIdentificador }, (err, pieza) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!pieza) return res.status(404).send({ message: `La pieza no existe buscada` })
        res.status(200).send({ pieza: pieza })
    })
}

function getpiezaEjemplar(req, res) { // busca las piezas asociadas a un Ejemplar
    let idEjemplar = req.params.piezaId
    Pieza.find({ 'perteneceEjemplar': idEjemplar }, (err, pieza) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!pieza) return res.status(404).send({ message: `No existen Piezas para el Ejemplar` })
        res.status(200).send({ pieza: pieza })
    })
}

function getpiezas(req, res) {
    Pieza.find({}, (err, piezas) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!piezas) return res.status(404).send({ message: `No existen piezas` })
        res.status(200).send({ piezas: piezas })
    })
}

function savePieza(req, res) {

    //ejemplar.findById(req.body.nroColeccion, (err, ejemplar) => {
    //   if (err) { res.status(500).send({ message: `Error al realizar la busqueda ${err}` }) }
    //  if (!ejemplar) { res.status(400).send({ message: 'Ejemplar no encontrado' }) }
    // })

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

            let pieza = new Pieza({
                numeroDePieza: req.body.numeroDePieza,
                nroColeccion: req.body.nroColeccion,
                tipoPieza: req.body.tipoPieza,
                medidas: req.body.medidas,
                imagenesPieza: req.body.imagenesPieza,
                fechaIngreso: req.body.fechaIngreso,
                fechaBaja: req.body.fechaBaja, //Esto lo paso a la coleccion movimientos
                motivoBaja: req.body.motivoBaja, //Esto lo paso a la coleccion movimiento 
                perteneceEjemplar: req.body.perteneceEjemplar,
                origen: req.body.origen,
                descripcion: req.body.origen,
                localidad: req.body.localidad,
                edad: req.body.edad,
                ubicacion: ubicacion._id,
                estado: req.body.estado,
                colectores: req.body.colectores
            })

            pieza.save((err, piezaAlmacenada) => {
                if (err) res.status(500).send({ message: `Error al salvar en la Base de Datos:${err}` })
                return res.status(200).send({ piezaAlmacenada })
            })

        })
    })
}

module.exports = {
    getpiezas,
    getpiezaId,
    getpiezaIdentificador,
    getpiezaEjemplar,
    savePieza
}