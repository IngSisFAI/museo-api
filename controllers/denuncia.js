'use strict'

const Denuncia = require('../models/denuncia')
const jwt = require("jsonwebtoken");

function getdenunciaId(req, res) { // busca una denuncia por su ID - clave mongo
    let denunciaId = req.params.denunciaId
    Denuncia.findById(denunciaId, (err, denunciaId) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}` })
        jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
            if (error)
                res.status(403).send({ error: 'Acceso no permitido' });
            else
                res.json({ denunciaId });
        });
    })
}

function getdenunciaNro(req, res) { // busca una denuncia por su nro
    let denunciaNro = req.params.denunciaId
    Denuncia.findOne({ 'nroDenuncia': denunciaNro }, (err, denunciaNro) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}` })
        jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
            if (error)
                res.status(403).send({ error: 'Acceso no permitido' });
            else
                res.json({ denunciaNro: denunciaNro });
        });
    })
}

function getdenuncias(req, res) { // busca todas las denuncias

    Denuncia.find({}, (err, denuncias) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}` })
        jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
            if (error)
                res.status(403).send({ error: 'Acceso no permitido' });
            else
                res.json({ denuncias });
        });
    })
}

function saveDenuncia(req, res) {
    jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
        if (error) {
            res.status(403).send({ msg: 'Acceso no permitido' });
        } else {

            let denuncia = new Denuncia()
            denuncia.nroDenuncia = req.body.nroDenuncia,
                denuncia.denunciante = req.body.denunciante,
                denuncia.fechaIngreso = req.body.fechaIngeso,
                denuncia.paleontologo = req.body.paleontologo,
                denuncia.tecnicos = req.body.tecnicos,
                denuncia.documentacion = req.body.documentacion,
                denuncia.idArea = req.body.idArea,

                denuncia.save((err, denunciaStrored) => {
                    if (err) res.status(500).send({ message: `Error al salvar en la Base de Datos:${err}` });
                    res.json({ denuncia: denunciaStrored });
                });
        }
    });
}

function updateDenuncia(req, res) {
    let denunciaId = req.params.denunciaId
    let update = req.body
    jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
        if (error) {
            res.status(403).send({ msg: 'Acceso no permitido' });
        } else {
            Denuncia.findByIdAndUpdate(
                denunciaId,
                update,
                (err, denunciaUpdate) => {
                    if (err)
                        return res
                            .status(500)
                            .send({ message: `Error al tratar de actualizar: ${err}` });
                    if (!denunciaUpdate)
                        return res.status(404).send({ message: `La Denuncia  Update no Existe` });
                    res.status(200).send({ denuncia: denunciaUpdate });
                }
            );
        }
    });
}

function deleteDenuncia(req, res) {
    let denunciaId = req.params.denunciaId
    jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
        if (error)
            res.status(403).send({ error: 'Acceso no permitido' });
        else {
            Denuncia.findByIdAndRemove(denunciaId, (err, denuncia) => {
                if (err) return res.status(500).send(err);
                const response = {
                    message: "Denuncia satisfactoriamente borrada",
                    id: denuncia._id
                };
                return res.status(200).send(response);
            });
        }
    });
}

module.exports = {
    getdenunciaId,
    getdenuncias,
    getdenuncias,
    saveDenuncia,
    updateDenuncia,
    deleteDenuncia
}