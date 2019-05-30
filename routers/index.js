'use strict'

const express = require('express')
const personaCtrl = require('../controllers/persona')
const excavacionCtrl = require ('../controllers/excavacion')
const bochonCtrl = require('../controllers/bochon')
const piezaCtrl = require('../controllers/pieza')
const ejemplarCtrl = require('../controllers/ejemplar')
const homeCtrl = require('../controllers/home')
const exploracionCtrl = require('../controllers/exploracion')
const api = express.Router()

api.get('/info',homeCtrl.getHome) // obtiene todos los datos del Home unico documento

api.get('/persona', personaCtrl.getPersonas)
api.get('/personaId/:personaId', personaCtrl.getPersonaId)
api.get('/personaDni/:personaId', personaCtrl.getPersonaDni)
api.post('/persona', personaCtrl.savePersona)
api.delete('/persona/:personaId',personaCtrl.deletePersona) // borra el producto cuyo id es productId
api.put('/persona/:personaId',personaCtrl.updatePersona) // actualiza un producto
api.get('/personasFiltro/:unDni?&:unNombre?&:unApellido?', personaCtrl.getPersonasFiltro)

// Excavacion
api.get('/excavacion', excavacionCtrl.getExcavaciones)
api.get('/excavacionNombre/:excavacionId',excavacionCtrl.getExcavacionNombre)
api.get('/excavacionHome/:excavacionId', excavacionCtrl.getExcavacionesHome)
api.get('/excavacionDirector/:excavacionId', excavacionCtrl.getExcavacionesDirector)
api.get('/excavacionPaleontologo/:excavacionId', excavacionCtrl.getExcavacionesPaleontologo)
api.get('/excavacionColector/:excavacionId',excavacionCtrl.getExcavacionesColector)

api.get('/excavacion/:excavacionId', excavacionCtrl.getExcavacion)
api.post('/excavacion', excavacionCtrl.crearExcavacion)
api.put('/excavacion', excavacionCtrl.modificarExcavacion)
//api.delete('/excavacion', excavacionCtrl.removeExcavacion)

api.get('/bochon',bochonCtrl.getbochones)
api.get('/bochonId/:bochonId',bochonCtrl.getbochonId)
api.get('/bochonCampo/:bochonId',bochonCtrl.getbochonCampo)
api.get('/bochonEjemplar/:bochonId',bochonCtrl.getbochonEjemplar)
api.post('/bochon',bochonCtrl.saveBochon)

api.get('/pieza', piezaCtrl.getpiezas)
api.get('/piezaId/:piezaId', piezaCtrl.getpiezaId)
api.get('/piezaIdentificador/:piezaId', piezaCtrl.getpiezaIdentificador)
api.get('/piezaEjemplar/:piezaId', piezaCtrl.getpiezaEjemplar)
api.post('/pieza', piezaCtrl.savePieza)

api.get('/ejemplar', ejemplarCtrl.getejemplares)
api.get('/ejemplarId/:ejemplarId',ejemplarCtrl.getejemplarId)
api.get('/ejemplarNroColeccion/:ejemplarId', ejemplarCtrl.getejemplarNroColeccion)
api.get('/ejemplarHome/:ejemplarId',ejemplarCtrl.getejemplarHome)
api.get('/ejemplarExca/:ejemplarId',ejemplarCtrl.getejemplarExca)
api.post('/ejemplar', ejemplarCtrl.saveEjemplar)


// Area
// api.get('/area', areaCtrl.getAreaById)
// api.put('/area', areaCtrl.updateArea)
// api.delete('/area', areaCtrl.removeArea)

//Exploracion

api.get('/exploracion', exploracionCtrl.getExploraciones)
api.post('/exploracion', exploracionCtrl.saveExploracion)
api.get('/exploracionId/:exploracionId', exploracionCtrl.getExploracionId)
api.get('/exploracionesFiltro/:unNombre', exploracionCtrl.getExploracionesFiltro)
api.put('/exploracion/:exploracionId',exploracionCtrl.updateExploracion) // actualiza un producto
api.delete('/exploracion/:exploracionId',exploracionCtrl.deleteExploracion)



module.exports = api