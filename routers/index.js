'use strict'

const express = require('express')
const personaCtrl = require('../controllers/persona')
const excavacionCtrl = require('../controllers/excavacion')
const exploracionCtrl = require('../controllers/exploracion')
const bochonCtrl = require('../controllers/bochon')
const piezaCtrl = require('../controllers/pieza')
const ejemplarCtrl = require('../controllers/ejemplar')
const homeCtrl = require('../controllers/home')
const paisCtrl = require('../controllers/pais')
const provinciaCtrl = require('../controllers/provincia')
const ciudadCtrl = require('../controllers/ciudad')
const areaCtrl = require('../controllers/area')
const acidosCtrl = require('../controllers/acidos')
const tiposPreparacionCtrl = require('../controllers/tipoPreparacion')
const coleccionCtrl = require('../controllers/coleccion')

const api = express.Router()

api.get('/info', homeCtrl.getHome) // obtiene todos los datos del Home unico documento

api.get('/persona', personaCtrl.getPersonas)
api.get('/personaId/:personaId', personaCtrl.getPersonaId)
api.get('/personaDni/:personaId', personaCtrl.getPersonaDni)
api.post('/persona', personaCtrl.savePersona)
api.delete('/persona/:personaId', personaCtrl.deletePersona) // borra el producto cuyo id es productId
api.put('/persona/:personaId', personaCtrl.updatePersona) // actualiza un producto
api.get('/personasFiltro/:unDni&:unNombre&:unApellido', personaCtrl.getPersonasFiltro)
api.get('/personaNroDoc/:personaId', personaCtrl.getPersonaNroDoc)
api.get('/personaName/:personaId', personaCtrl.getPersonaName)
api.get('/personaApellido/:personaId', personaCtrl.getPersonaApellido)
api.get('/personaNombreApellido/:unNombre&:unApellido', personaCtrl.getPersonaNombreApellido)
api.get('/personaNombreDNI/:unNombre&:unDni', personaCtrl.getPersonaNombreDNI)
api.get('/personaApellidoDNI/:unApellido&:unDni', personaCtrl.getPersonaApellidoDNI)

// Excavacion
api.get('/excavacion', excavacionCtrl.getExcavaciones)
api.get('/excavacionId/:excavacionId', excavacionCtrl.getExcavacionId)
api.get('/areaExcavacion/:excavacionId', excavacionCtrl.getAreaExcavacion)
api.get('/areasExcavaciones', excavacionCtrl.getExcavaciones)
api.get('/excavacionNombre/:excavacionId', excavacionCtrl.getExcavacionNombre)
api.get('/excavacionHome/:excavacionId', excavacionCtrl.getExcavacionesHome)
api.get('/excavacionDirector/:excavacionId', excavacionCtrl.getExcavacionesDirector)
api.get('/excavacionPaleontologo/:excavacionId', excavacionCtrl.getExcavacionesPaleontologo)
api.get('/excavacionColector/:excavacionId', excavacionCtrl.getExcavacionesColector)
api.post('/areaExcavacion', excavacionCtrl.crearExcavacion)
api.put('/areaExcavacion/:excavacionId', excavacionCtrl.modificarAreaExcavacion)
api.delete('/excavacion', excavacionCtrl.borrarExcavaciones)

api.get('/excavacionId/:excavacionId', excavacionCtrl.getExcavacionId)
api.post('/excavacion', excavacionCtrl.saveExcavacion)
api.put('/excavacion/:excavacionId', excavacionCtrl.updateExcavacion)
api.put('/excavacionBochon/:excavacionId', excavacionCtrl.updateExcavacionBochones)
api.delete('/excavacion/:excavacionId', excavacionCtrl.deleteExcavacion)
api.get('/excavacionFiltro/:unCodigo&:unNombre', excavacionCtrl.getExcavacionesFiltro)
api.get('/excavacionFiltroCode/:unCodigo', excavacionCtrl.getExcavacionesFiltroCode)
api.get('/excavacionFiltroName/:unNombre', excavacionCtrl.getExcavacionesFiltroName)

api.get('/excavacion/:excavacionId', excavacionCtrl.getExcavacion)
api.get('/excavacionPorFoto/:fotoId', excavacionCtrl.getExcavacionPorIdFoto)

api.put('/excavacion', excavacionCtrl.modificarExcavacion)
//api.delete('/excavacion', excavacionCtrl.removeExcavacion)

api.get('/bochon', bochonCtrl.getbochones)
api.get('/bochonId/:bochonId', bochonCtrl.getbochonId)
api.get('/bochonCampo/:bochonId', bochonCtrl.getbochonCampo)
api.get('/bochonEjemplar/:bochonId', bochonCtrl.getbochonEjemplar)
api.post('/bochon', bochonCtrl.saveBochon)
api.get('/bochonNombre/:nombre', bochonCtrl.getBochonNombre)
api.get('/bochonUnNombre/:nombre', bochonCtrl.getBochonUnNombre)
api.put('/bochon/:bochonId', bochonCtrl.updateBochon)
api.delete('/bochon/:bochonId', bochonCtrl.deleteBochon)

api.get('/pieza', piezaCtrl.getpiezas)
api.get('/piezaId/:piezaId', piezaCtrl.getpiezaId)
api.get('/piezaIdentificador/:piezaId', piezaCtrl.getpiezaIdentificador)
api.get('/piezaEjemplar/:piezaId', piezaCtrl.getpiezaEjemplar)
api.post('/pieza', piezaCtrl.savePieza)


api.get('/ejemplar', ejemplarCtrl.getejemplares)
api.get('/ejemplarId/:ejemplarId', ejemplarCtrl.getejemplarId)
api.get('/ejemplarNroColeccion/:ejemplarId', ejemplarCtrl.getejemplarNroColeccion)
api.get('/ejemplarHome/:ejemplarId', ejemplarCtrl.getejemplarHome)
api.get('/ejemplarExca/:ejemplarId', ejemplarCtrl.getejemplarExca)
api.get('/ejemplarPorFoto/:fotoId', ejemplarCtrl.getEjemplarPorIdFoto)
//api.post('/ejemplar', ejemplarCtrl.saveEjemplar)

// Exploracion
api.get('/areaExploracion/:exploracionId', exploracionCtrl.getExploracionById)
api.get('/areaExploracion', exploracionCtrl.getExploraciones)
api.post('/areaExploracion', exploracionCtrl.crearAreaExploracion)
api.delete('/exploracion', exploracionCtrl.borrarExploraciones)
api.put('/areaExploracion/:exploracionId', exploracionCtrl.modificarAreaExploracion)


// Area
// api.get('/area', areaCtrl.getAreaById)
// api.put('/area', areaCtrl.updateArea)
// api.delete('/area', areaCtrl.removeArea)

//Exploracion

api.get('/exploracion', exploracionCtrl.getExploraciones)
api.post('/exploracion', exploracionCtrl.saveExploracion)
api.get('/exploracionId/:exploracionId', exploracionCtrl.getExploracionId)
api.get('/exploracionesFiltro/:unNombre', exploracionCtrl.getExploracionesFiltro)
api.put('/exploracion/:exploracionId', exploracionCtrl.updateExploracion) // actualiza un producto
api.delete('/exploracion/:exploracionId', exploracionCtrl.deleteExploracion)


//pais
api.get('/pais', paisCtrl.getPaises)

//provincia
api.get('/provincia', provinciaCtrl.getProvincias)
api.get('/provinciaIdPais/:paisId', provinciaCtrl.getProvinciaIdPais)

//Ciudad
api.get('/ciudad', ciudadCtrl.getCiudades)
api.get('/ciudadIdProv/:provId', ciudadCtrl.getCiudadIdProv)



// Area
api.get('/area', areaCtrl.getAreas)

//Ejemplar
api.post('/ejemplar', ejemplarCtrl.saveEjemplar)
api.put('/ejemplar/:ejemplarId', ejemplarCtrl.updateEjemplar)
api.delete('/ejemplar/:ejemplarId', ejemplarCtrl.deleteEjemplar)

api.get('/ejemplarFiltro/:unNroColeccion&:unNombre&:unaUbicacion', ejemplarCtrl.getEjemplaresFiltro)
api.get('/ejemplarFiltroNroColNom/:unNroColeccion&:unNombre', ejemplarCtrl.getEjemplaresNroColNom)
api.get('/ejemplarFiltroUbicacionNom/:unaUbicacion&:unNombre', ejemplarCtrl.getEjemplaresUbicacionNom)
api.get('/ejemplarFiltroUbicacionNroCol/:unaUbicacion&:unNroColeccion', ejemplarCtrl.getEjemplaresUbicacionNroCol)
api.get('/ejemplarFiltroNroColeccion/:unNroColeccion', ejemplarCtrl.getEjemplaresNroColeccion)
api.get('/ejemplarFiltroNombre/:unNombre', ejemplarCtrl.getEjemplaresNombre)
api.get('/ejemplarFiltroUbicacion/:unaUbicacion', ejemplarCtrl.getEjemplaresUbicacion)


//acidos
api.get('/acido', acidosCtrl.getAcidos)

//tipos preparacion
api.get('/tipoPreparacion', tiposPreparacionCtrl.getTiposPreparacion)


//acidos
api.get('/coleccion', coleccionCtrl.getColecciones)

module.exports = api