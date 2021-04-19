const Molde = require('../models/molde')
const UbicacionInterna = require('../models/ubicacionInterna')
const crearError = require('http-errors')

async function saveMolde(req, res, next) {
    try {
        const ubicacionInterna = await UbicacionInterna.findOne({
            codRepositorio: req.body.ubicacionInterna.codRepositorio,
            numEstante: req.body.ubicacionInterna.numEstante,
            numEstanteria: req.body.ubicacionInterna.numEstanteria
        })
        if (ubicacionInterna) throw crearError(500, 'El lugar esta ocupado')

        const nuevaUbicacion = new UbicacionInterna({
            codRepositorio: req.body.ubicacionInterna.codRepositorio,
            numEstante: req.body.ubicacionInterna.numEstante,
            numEstanteria: req.body.ubicacionInterna.numEstanteria
        })

        await nuevaUbicacion.save()

        const molde = new Molde({
            material: req.body.materia,
            ubicacion: nuevaUbicacion._id,
            descripcion: req.body.descripcion,
            medidas: req.body.medidas
        })

        res.status(200).send(await molde.save())

    } catch (err) {
        next(err)
    }
}

async function getMolde(req, res, next) {
    try {
        const molde = await Molde.findById(req.params.id)
        if (!molde) throw crearError(400, 'No se encontraron moldes')
        console.log(molde)
        res.status(200).send(molde)
    } catch (err) {
        next(err)
    }
}

async function getMoldes(req, res, next) {
    try {
        const moldes = await Molde.find({})
        if (!moldes) throw crearError(400, 'No existen moldes')
        res.status(200).send(moldes)
    } catch (err) {
        next(err)
    }
}

async function deleteMolde(req, res, next) {
    try {
        const molde = await Molde.findByIdAndDelete(req.params.id)
        if (!molde) throw crearError(400, 'No existe el molde')
            //liberar ubicacion
        const ubicacion = await UbicacionInterna.findByIdAndDelete(molde.ubicacion)
        if (!ubicacion) throw crearError(400, 'No existe la ubicacion')

        res.status(200).json({ molde, ubicacion })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    saveMolde,
    getMolde,
    getMoldes,
    deleteMolde
}