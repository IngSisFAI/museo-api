const { HttpError } = require('http-errors')
const Institucion = require('../models/institucion')
const crearError = require('http-errors')

async function saveInstitucion(req, res, next) {
    try {
        const institucion = new Institucion({
            nombre: req.body.nombre,
            cuit: req.body.cuit,
            email: req.body.email,
            telefono: req.body.telefono
        })

        res.status(200).send(await institucion.save())

    } catch (err) {
        next(err)
    }
}

async function getInstituciones(req, res, next) {
    try {
        const instituciones = await Institucion.find()
        if (!instituciones) throw crearError(400, 'No se encontraron instituciones')
        res.status(200).send(instituciones)
    } catch (err) {
        next(err)
    }
}

async function getInstitucion(req, res, next) {
    try {
        const institucion = await Institucion.findById(req.params.id)
        if (!institucion) throw crearError(400, `No se encontro institucion con id ${req.params.id}`)
        res.status(200).send(institucion)
    } catch (err) {
        next(err)
    }
}

async function updateInstitucion(req, res, next) {
    try {
        const institucionActualizada = await Institucion.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        if (!institucionActualizada) throw crearError(400, `No se encontro institucion con id ${req.params.id}`)
        res.status(200).send(institucionActualizada)
    } catch (err) {
        next(err)
    }
}

async function deleteInstitucion(req, res, next) {
    try {
        const institucion = await Institucion.findByIdAndDelete(req.params.id)
        if (!institucion) throw crearError(400, 'No se encontro institucion')
        res.status(200).send(institucion)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    saveInstitucion,
    getInstituciones,
    getInstitucion,
    updateInstitucion,
    deleteInstitucion
}