'use strict'

const Donacion = require('../models/donacion')
const jwt = require("jsonwebtoken");

function getDonacionId(req, res) { // busca una Donación por su ID - clave mongo
    let donacionId = req.params.donacionId
    jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
        if (error) {
            res.status(403).send({ msg: 'Acceso no permitido' });
        } else {
            Donacion.findById(donacionId, (err, donacionId) => {
                if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}` })
                res.json({ donacionId });
            })
        }
    });
}

function getDonacionNro(req, res) { // busca una donación por Nro
    jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
        if (error) {
            res.status(403).send({ msg: 'Acceso no permitido' });
        } else {
            let donacion = req.params.donacionNro
            Donacion.findOne({ 'nro': donacion }, (err, donacion) => {
                if (err) return res.status(500).send({ msg: `Error al realizar la peticion: ${err}` })
                res.json({ donacion });
            })
        }
    });
}

function getDonaciones(req, res) {
    Donacion.find({}, (err, donaciones) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}` })
        jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
            if (error) {
                res.status(403).send({ error: 'Acceso no permitido' });
            } else {
                res.json({ donaciones });
            }
        });
    })
}

function saveDonacion(req, res) {
    jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
        if (error) {
            res.status(403).send({ msg: 'Acceso no permitido' });
        } else {
            let donacion = new Donacion()
            donacion.nroActa = req.body.nroActa,
                donacion.fecha = req.body.fecha,
                donacion.descripcion = req.body.descripcion,
                donacion.cantidad = req.body.cantidad,
                donacion.donador = req.body.donador,
                donacion.foto = req.body.foto,
                donacion.documentacion = req.body.documentacion,
                donacion.save((err, donacionStrored) => {
                    if (err) res.status(500).send({ message: `Error al salvar en la Base de Datos:${err}` });
                    res.json({ donacion: donacionStrored });
                });
        }
    });
}

function deleteDonacion(req, res) {
    let donacionId = req.params.donacionId
    jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
        if (error) {
            res.status(403).send({ error: 'Acceso no permitido' });
        } else {
            Donacion.findByIdAndRemove(donacionId, (err, donacion) => {
                if (err) return res.status(500).send(err);
                const response = {
                    message: "Donación satisfactoriamente borrada",
                    id: donacion._id
                };
                return res.status(200).send(response);
            });
        }
    });
}

function updateDonacion(req, res) {
    let donacionId = req.params.donacionId
    let update = req.body
    console.log('POST /api/donacion/:DonacionId ***Update Donacion***')
    console.log(req.body)

    jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
        if (error) {
            res.status(403).send({ msg: 'Acceso no permitido' });
        } else {
            Donacion.findByIdAndUpdate(donacionId, update, (err, donacionUpdate) => {
                if (err) return res.status(500).send({ message: `Error al tratar de actualizar: ${err}` })
                res.json({ donacion: donacionUpdate })
            });
        }
    });
}

module.exports = {
    getDonacionId,
    getDonacionNro,
    getDonaciones,
    saveDonacion,
    deleteDonacion,
    updateDonacion
}
