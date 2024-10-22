'use strict'

const Exhibicion = require('../models/exhibicion')
const jwt = require("jsonwebtoken");

function getExhibicionId(req, res) { // busca una Exhibicion por su ID - clave mongo
    let exhibicionId = req.params.exhibicionId
    jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
        if (error) {
            res.status(403).send({ msg: 'Acceso no permitido' });
        } else {
            Exhibicion.findById(exhibicionId, (err, exhibicionId) => {
                if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}` })
                res.json({ exhibicionId });
            })
        }
    });
}

function getExhibicionNro(req, res) { // busca una exhibicion por Nro
    jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
        if (error) {
            res.status(403).send({ msg: 'Acceso no permitido' });
        } else {
            let exhibicion = req.params.exhibicionNro
            Exhibicion.findOne({ 'nro': exhibicion }, (err, exhibicion) => {
                if (err) return res.status(500).send({ msg: `Error al realizar la peticion: ${err}` })
                res.json({ exhibicion });
            })
        }
    });
}

function getExhibiciones(req, res) {
    Exhibicion.find({}, (err, exhibiciones) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}` })
        jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
            if (error) {
                res.status(403).send({ error: 'Acceso no permitido' });
            } else {
                res.json({ exhibiciones });
            }
        });
    })
}

function saveExhibicion(req, res) {
    jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
        if (error) {
            res.status(403).send({ msg: 'Acceso no permitido' });
        } else {
            let exhibicion = new Exhibicion()
            exhibicion.nroActa = req.body.nroActa,
                exhibicion.descripcion = req.body.descripcion,
                exhibicion.fecha = req.body.fecha,
                exhibicion.fechaFin = req.body.fechaFin,
                exhibicion.ubicacion = req.body.ubicacion,
                exhibicion.tipo = req.body.tipo,
                exhibicion.responsableMuseo = req.body.responsableMuseo,
                exhibicion.responsableRecibe = req.body.responsableRecibe,
                exhibicion.institucion = req.body.institucion,
                exhibicion.foto = req.body.foto,
                exhibicion.documentacion = req.body.documentacion,
                exhibicion.save((err, exhibicionStrored) => {
                    if (err) res.status(500).send({ message: `Error al salvar en la Base de Datos:${err}` });
                    res.json({ exhibicion: exhibicionStrored });
                });
        }
    });
}

function deleteExhibicion(req, res) {
    let exhibicionId = req.params.exhibicionId
    jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
        if (error) {
            res.status(403).send({ error: 'Acceso no permitido' });
        } else {
            Exhibicion.findByIdAndRemove(exhibicionId, (err, exhibicion) => {
                if (err) return res.status(500).send(err);
                const response = {
                    message: "Exhibición satisfactoriamente borrada",
                    id: exhibicion._id
                };
                return res.status(200).send(response);
            });
        }
    });
}

function updateExhibicion(req, res) {
    let exhibicionId = req.params.exhibicionId
    let update = req.body
    console.log('POST /api/exhibicion/:ExhibicionId ***Update Exhibicion***')
    console.log(req.body)

    jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
        if (error) {
            res.status(403).send({ msg: 'Acceso no permitido' });
        } else {
            Exhibicion.findByIdAndUpdate(exhibicionId, update, (err, exhibicionUpdate) => {
                if (err) return res.status(500).send({ message: `Error al tratar de actualizar: ${err}` })
                res.json({ exhibicion: exhibicionUpdate })
            });
        }
    });
}

module.exports = {
    getExhibicionId,
    getExhibicionNro,
    getExhibiciones,
    saveExhibicion,
    deleteExhibicion,
    updateExhibicion
}