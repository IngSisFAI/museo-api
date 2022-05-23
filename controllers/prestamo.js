'use strict'

const Prestamo = require('../models/prestamo')
const jwt = require("jsonwebtoken");

function getprestamoId(req, res) { // busca un prestamo por su ID - clave mongo
    let prestamoId = req.params.prestamoId
    Prestamo.findById(prestamoId, (err, prestamoId) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}` })
        jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
            if (error)
                res.status(403).send({ error: 'Acceso no permitido' });
            else
                res.json({ prestamoId });
        });
    })
}

function getprestamoNroActa(req, res) { // busca un prestamo por su nro
    let prestamoNro = req.params.prestamoNro
    Prestamo.findOne({ 'nroprestamo': prestamoNro }, (err, prestamoNro) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}` })
        jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
            if (error)
                res.status(403).send({ error: 'Acceso no permitido' });
            else
                res.json({ prestamo: prestamoNro });
        });
    })
}

function getprestamos(req, res) { // busca todas los pretamos

    Prestamo.find({}, (err, prestamos) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}` })
        jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
            if (error)
                res.status(403).send({ error: 'Acceso no permitido' });
            else
                res.json({ prestamos });
        });
    })
}

function savePrestamo(req, res) {
    jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
        if (error) {
            res.status(403).send({ msg: 'Acceso no permitido' });
        } else {

            let prestamo = new Prestamo()
            prestamo.nroActa = req.body.nroActa,
                prestamo.fechaInicio = req.body.fechaInicio,
                prestamo.fechaFin = req.body.fechaFin,
                prestamo.descripcion = req.body.descripcion,
                prestamo.paleontologoResponsable = req.body.paleontologoResponsable,
                prestamo.institucion = req.body.institucion,
                prestamo.ejemplar = req.body.ejemplar,
                prestamo.observacion = req.body.observacion,
                prestamo.documentacion = req.body.documentacion,
                prestamo.save((err, prestamoStrored) => {
                    if (err) res.status(500).send({ message: `Error al salvar en la Base de Datos:${err}` });
                    res.json({ prestamo: prestamoStrored });
                });
        }
    });
}

function updatePrestamo(req, res) {
    let prestamoId = req.params.prestamoId
    let update = req.body
    jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
        if (error) {
            res.status(403).send({ msg: 'Acceso no permitido' });
        } else {
            Prestamo.findByIdAndUpdate(
                prestamoId,
                update,
                (err, prestamoUpdate) => {
                    if (err)
                        return res
                            .status(500)
                            .send({ message: `Error al tratar de actualizar: ${err}` });
                    if (!prestamoUpdate)
                        return res.status(404).send({ message: `La actualización de Prestamo no Existe` });
                    res.status(200).send({ prestamo: prestamoUpdate });
                }
            );
        }
    });
}

function deletePrestamo(req, res) {
    let prestamoId = req.params.prestamoId
    jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
        if (error)
            res.status(403).send({ error: 'Acceso no permitido' });
        else {
            Prestamo.findByIdAndRemove(prestamoId, (err, prestamo) => {
                if (err) return res.status(500).send(err);
                const response = {
                    message: "Prestamo satisfactoriamente borrada",
                    id: prestamo._id
                };
                return res.status(200).send(response);
            });
        }
    });
}

module.exports = {
    getprestamoId,
    getprestamoNroActa,
    getprestamos,
    savePrestamo,
    updatePrestamo,
    deletePrestamo
}