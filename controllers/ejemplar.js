'use strict'

const Ejemplar = require('../models/ejemplar')
const jwt = require("jsonwebtoken");


function getejemplarId(req, res) { // busca un ejemplar por su ID - clave mongo
    let ejemplarId = req.params.ejemplarId

     Ejemplar.findById(ejemplarId,(err,ejemplarId)=>{
        if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
              
         jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
              if(error){
                  res.status(403).send({error:'Acceso no permitido'});
              }else{
                  res.json({ejemplarId});
              } 
         });

    })


}

function getejemplarNroColeccion(req, res) { // busca un ejemplar por nro de coleccion
    let ejemplar = req.params.ejemplarId
    Ejemplar.findOne({'nroColeccion':ejemplar}, (err,ejemplar)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!ejemplar) return res.status(404).send({message:`El ejemplar no existe buscada`})
        res.status(200).send({ejemplar: ejemplar})
    })
}

function getejemplarExca(req, res) { // busca los ejemplares que pertenecen a una excavación
    let excavacion = req.params.excavacionId

    Ejemplar.find({'perteneceExca':excavacion}, (err,ejemplar)=>{
        if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
              
         jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
              if(error){
                  res.status(403).send({error:'Acceso no permitido'});
              }else{
                  res.json({ ejemplar});
              } 
         });

    })



}


function getejemplares(req, res){
      Ejemplar.find({},(err,ejemplares)=>{
        if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
              
         jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
              if(error){
                  res.status(403).send({error:'Acceso no permitido'});
              }else{
                  res.json({ ejemplares});
              } 
         });

    })
}


function getejemplarHome(req, res) { // busca un ejemplar a mostrar en el home segun ubicacion
    let homeUbicacion = req.params.ejemplarId
    Ejemplar.find({'home':homeUbicacion}, (err,ejemplar)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!ejemplar) return res.status(404).send({message:`El ejemplar no existe buscada`})
        res.status(200).send({ejemplar: ejemplar})
    })
}

function saveEjemplar(req, res) {
  console.log('POST /api/ejemplar')
  console.log(req.body)


  jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
    if (error) {
      res.status(403).send({ msg: 'Acceso no permitido' });
    } else {

      let ejemplar = new Ejemplar()
      ejemplar.sigla = req.body.sigla,
        ejemplar.tipoColeccion = req.body.tipoColeccion,
        ejemplar.tipoColeccionId = req.body.tipoColeccionId,
        ejemplar.fechaIngreso = req.body.fechaIngeso,
        ejemplar.fechaBaja = req.body.fechaBaja,
        ejemplar.motivoBaja = req.body.motivoBaja,
        ejemplar.taxonReino = req.body.taxonReino,
        ejemplar.taxonFilo = req.body.taxonFilo,
        ejemplar.taxonClase = req.body.taxonClase,
        ejemplar.taxonClase = req.body.taxonClase,
        ejemplar.taxonFamilia = req.body.taxonFamilia,
        ejemplar.taxonGenero = req.body.taxonGenero,
        ejemplar.taxonEspecie = req.body.taxonEspecie,
        ejemplar.eraGeologica = req.body.eraGeologica,
        ejemplar.fotosEjemplar = req.body.fotosEjemplar,
        ejemplar.videosEjemplar = req.body.videosEjemplar,
        ejemplar.ubicacionMuseo = req.body.ubicacionMuseo,
        ejemplar.preparador = req.body.preparador,
        ejemplar.tipoIntervencion = req.body.tipoIntervencion,
        ejemplar.autores = req.body.autores,
        ejemplar.publicaciones = req.body.publicaciones,
        ejemplar.archivosCurriculum = req.body.archivosCurriculum,
        ejemplar.observacionesAdic = req.body.observacionesAdic,
        ejemplar.home = req.body.home,
        ejemplar.areaHallazgo = req.body.areaHallazgo,
        ejemplar.perteneceExca = req.body.perteneceExca


      ejemplar.save((err, ejemplarStrored) => {
        if (err) res.status(500).send({ message: `Error al salvar en la Base de Datos:${err}` });
        res.json({ ejemplar: ejemplarStrored });
      });
    }
  });


}

function updateEjemplar(req, res) {
  let ejemplarId = req.params.ejemplarId
  let update = req.body
  console.log('POST /api/ejemplar/:ejemplarId Update Ejemplar......')
  console.log(req.body)

  jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
    if (error) {
      res.status(403).send({ msg: 'Acceso no permitido' });
    } else {
      Ejemplar.findByIdAndUpdate(
        ejemplarId,
        update,
        (err, ejemplarUpdate) => {
          if (err)
            return res
              .status(500)
              .send({ message: `Error al tratar de actualizar: ${err}` });
          if (!ejemplarUpdate)
            return res.status(404).send({ message: `La Exploracion  Update no Existe` });
          res.status(200).send({ ejemplar: ejemplarUpdate });
        }
      );

    }
  });



}

function deleteEjemplar(req, res) {
  let ejemplarId = req.params.ejemplarId


  jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
    if (error) {
      res.status(403).send({ error: 'Acceso no permitido' });
    } else {

      Ejemplar.findByIdAndRemove(ejemplarId, (err, ejemplar) => {
        if (err) return res.status(500).send(err);
        const response = {
          message: "Ejemplar satisfactoriamente borrada",
          id: ejemplar._id
        };
        return res.status(200).send(response);
      });
    }
  });



}

function getEjemplaresFiltro(req, res){
   let nroColeccion = req.params.unNroColeccion
   let nombre = req.params.unNombre
   let ubicacion = req.params.unaUbicacion
 
		Ejemplar.find({ 'nroColeccion':nroColeccion,'nombre':nombre, 'ubicacionMuseo':ubicacion}, (err,ejemplar)=>{
			if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
			if(!ejemplar) return res.status(404).send({message:`El ejemplar buscado no existe`})
			res.status(200).send({ejemplares: ejemplar})
		})
   
}

function getEjemplaresNroColNom(req, res){
   let nroColeccion = req.params.unNroColeccion
   let nombre = req.params.unNombre
   
 
		Ejemplar.find({ 'nroColeccion':nroColeccion,'nombre':nombre}, (err,ejemplar)=>{
			if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
			if(!ejemplar) return res.status(404).send({message:`El ejemplar buscado no existe`})
			res.status(200).send({ejemplares: ejemplar})
		})
   
}

function getEjemplaresUbicacionNom(req, res){
   let ubicacion = req.params.unaUbicacion
   let nombre = req.params.unNombre
   
 
		Ejemplar.find({ 'ubicacionMuseo':ubicacion,'nombre':nombre}, (err,ejemplar)=>{
			if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
			if(!ejemplar) return res.status(404).send({message:`El ejemplar buscado no existe`})
			res.status(200).send({ejemplares: ejemplar})
		})
   
}

function getEjemplaresUbicacionNroCol(req, res){
   let ubicacion = req.params.unaUbicacion
   let nroColeccion = req.params.unNroColeccion
   
 
		Ejemplar.find({ 'ubicacionMuseo':ubicacion,'nroColeccion':nroColeccion}, (err,ejemplar)=>{
			if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
			if(!ejemplar) return res.status(404).send({message:`El ejemplar buscado no existe`})
			res.status(200).send({ejemplares: ejemplar})
		})
   
}


function getEjemplaresNroColeccion(req, res){
   let nroColeccion = req.params.unNroColeccion
   
 
		Ejemplar.find({'nroColeccion':nroColeccion}, (err,ejemplar)=>{
			if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
			if(!ejemplar) return res.status(404).send({message:`El ejemplar buscado no existe`})
			res.status(200).send({ejemplares: ejemplar})
		})
   
}


function getEjemplaresNombre(req, res){
   let nombre = req.params.unNombre
   
 
		Ejemplar.find({'nombre':nombre}, (err,ejemplar)=>{
			if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
			if(!ejemplar) return res.status(404).send({message:`El ejemplar buscado no existe`})
			res.status(200).send({ejemplares: ejemplar})
		})
   
}

function getEjemplaresUbicacion(req, res){
   let ubicacion = req.params.unaUbicacion

		Ejemplar.find({ 'ubicacionMuseo':ubicacion}, (err,ejemplar)=>{
			if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
			if(!ejemplar) return res.status(404).send({message:`El ejemplar buscado no existe`})
			res.status(200).send({ejemplares: ejemplar})
		})
   
}

function getEjemplarPorIdFoto(req, res) { // busca una excavacion por nombre
    let ejemplar = req.params.fotoId
    Ejemplar.findOne({'fotosEjemplar._id':ejemplar}, (err,ejemplar)=>{
        if(err) return res.status(500).send({message:`Error al realizar la petición: ${err}`})
        if(!ejemplar) return res.status(404).send({message:`Ejemplar buscado no existe`})
        res.status(200).send({ejemplar: ejemplar})
    })
}

module.exports ={
   getejemplarNroColeccion,
   getejemplares,
   getejemplarId,
   getejemplarHome,
   getejemplarExca,
   saveEjemplar,
   updateEjemplar,
   deleteEjemplar,
   getEjemplaresFiltro,
   getEjemplaresNroColNom,
   getEjemplaresUbicacionNom,
   getEjemplaresUbicacionNroCol,
   getEjemplaresNroColeccion,
   getEjemplaresNombre,
   getEjemplaresUbicacion,
   getEjemplarPorIdFoto
}