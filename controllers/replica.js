'use strict'

const Replica = require('../models/replica')
const jwt = require("jsonwebtoken");

function getReplicaId(req, res) { // busca una Replica por su ID - clave mongo
    let replicaId = req.params.replicaId
    jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
        if (error) {
            res.status(403).send({ msg: 'Acceso no permitido' });
        } else {
            Replica.findById(replicaId, (err, replicaId) => {
                if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}` })
                res.json({ replicaId });
            })
        }
    });
}

function getReplicaNro(req, res) { // busca una replica por Nro
    jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
        if (error) {
            res.status(403).send({ msg: 'Acceso no permitido' });
        } else {
            let replica = req.params.replicaNro
            Replica.findOne({ 'nro': replica }, (err, replica) => {
                if (err) return res.status(500).send({ msg: `Error al realizar la peticion: ${err}` })
                res.json({ replica });
            })
        }
    });
}

function getReplicas(req, res) {
    Replica.find({}, (err, replicas) => {
        if (err) return res.status(500).send({ message: `Error al realizar la peticion: ${err}` })
        jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
            if (error) {
                res.status(403).send({ error: 'Acceso no permitido' });
            } else {
                res.json({ replicas });
            }
        });
    })
}

function saveReplica(req, res) {
    jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
        if (error) {
            res.status(403).send({ msg: 'Acceso no permitido' });
        } else {
            let replica = new Replica()
            replica.nroActa = req.body.nroActa,
                replica.descripcion = req.body.descripcion,
                replica.fecha = req.body.fecha,
                replica.foto = req.body.foto,
                replica.documentacion = req.body.documentacion,
                replica.save((err, replicaStrored) => {
                    if (err) res.status(500).send({ message: `Error al salvar en la Base de Datos:${err}` });
                    res.json({ replica: replicaStrored });
                });
        }
    });
}

function deleteReplica(req, res) {
    let replicaId = req.params.replicaId
    jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
        if (error) {
            res.status(403).send({ error: 'Acceso no permitido' });
        } else {
            Replica.findByIdAndRemove(replicaId, (err, replica) => {
                if (err) return res.status(500).send(err);
                const response = {
                    message: "Replica satisfactoriamente borrada",
                    id: replica._id
                };
                return res.status(200).send(response);
            });
        }
    });
}

function updateReplica(req, res) {
    let replicaId = req.params.replicaId
    let update = req.body
    console.log('POST /api/replica/:ReplicaId ***Update Replica***')
    console.log(req.body)

    jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
        if (error) {
            res.status(403).send({ msg: 'Acceso no permitido' });
        } else {
            Replica.findByIdAndUpdate(replicaId, update, (err, replicaUpdate) => {
                if (err) return res.status(500).send({ message: `Error al tratar de actualizar: ${err}` })
                res.json({ replica: replicaUpdate })
            });
        }
    });
}

module.exports = {
    getReplicaId,
    getReplicaNro,
    getReplicas,
    saveReplica,
    deleteReplica,
    updateReplica
}