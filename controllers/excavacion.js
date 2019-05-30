'use strict';
const Excavacion = require('../models/excavacion');
const servicioExcavacion = require('../services/excavacion');

// busca una excavacion por su ID - clave mongo
const getExcavacion = (req, res) => servicioExcavacion.getExcavacion(req, res);

function getExcavacionNombre(req, res) { // busca una excavacion por nombre
    let excavacion = req.params.excavacionId
    Excavacion.findOne({'nombre':excavacion}, (err,excavacion)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!excavacion) return res.status(404).send({message:`La excavacion no existe buscada`})
        res.status(200).send({excavacion: excavacion})
    })
}

function getExcavaciones(req, res){
    Excavacion.find({},(err,excavaciones)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!excavaciones) return res.status(404).send({message:`No existen excavaciones`})
        res.status(200).send({excavaciones: excavaciones})
    })
}

function getExcavacionesHome(req,res){ //busca una excavacion para mostrar en home parametro 1 2 3
    let excavacion = req.params.excavacionId
    Excavacion.find({'muestraHome':excavacion}, (err,excavacion)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!excavacion) return res.status(404).send({message:`La excavacionHome no existe buscada`})
        res.status(200).send({excavacion: excavacion})
    })
}

function getExcavacionesDirector(req,res){
    let directorId = req.params.excavacionId
    //console.log("API-REST: ExcavacionesDirector con:"+ directorId)
    Excavacion.find({'directorId':directorId},(err,excavaciones)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!excavaciones) return res.status(404).send({message:`No existen excavaciones con el Director: ... `+ directorId})
        res.status(200).send({excavaciones: excavaciones})
    })
}

function getExcavacionesPaleontologo(req,res){
    let paleontologo = req.params.excavacionId
    //console.log("API-REST: ExcavacionesPaleontologo con:"+ paleontologo)
    Excavacion.find({'paleontologo':paleontologo},(err,excavaciones)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!excavaciones) return res.status(404).send({message:`No existen excavaciones con el Paleontologo: ... `+ paleontologo})
        res.status(200).send({excavaciones: excavaciones})
    })
}

function getExcavacionesColector(req,res){
    let colector = req.params.excavacionId
    //console.log("API-REST: ExcavacionesColector con:"+ colector);
    Excavacion.find({'colector':colector},(err,excavaciones)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!excavaciones) return res.status(404).send({message:`No existen excavaciones con el Director: ... `+ colector})
        res.status(200).send({excavaciones: excavaciones})
    })
}

const crearExcavacion = (req, res) => servicioExcavacion.crearExcavacion(req, res);
// let excavacion = new Excavacion();
// excavacion.codigo = req.body.codigo
// excavacion.nombre = req.body.nombre
// excavacion.descripcion = req.body.descripcion
// excavacion.puntoGps = req.body.puntoGps
// excavacion.fechaInicio = req.body.fechaInicio
// excavacion.fechaBaja = req.body.fechaBaja
// excavacion.motivoBaja = req.body.motivoBaja
// excavacion.director = req.body.director
// excavacion.directorId = req.body.directorId
// excavacion.paleontologo = req.body.paleontologo
// excavacion.colector = req.body.colector
// excavacion.area = req.body.area
// excavacion.localidad = req.body.localidad
// excavacion.provincia = req.body.provincia
// excavacion.bochonesEncontrados = req.body.bochonesEncontrados
// excavacion.fotosExcavacion = req.body.fotosExcavacion
// excavacion.videosExcavacion = req.body.videosExcavacion
// excavacion.muestraHome = req.body.muestraHome

const modificarExcavacion = (req, res) => servicioExcavacion.modificarExcavacion(req, res);

module.exports = {
    getExcavaciones,
    getExcavacionNombre,
    getExcavacionesHome,
    getExcavacionesDirector,
    getExcavacionesPaleontologo,
    getExcavacionesColector,
    crearExcavacion,
    getExcavacion,
    modificarExcavacion,
};
