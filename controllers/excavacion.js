"use strict";
const Excavacion = require("../models/excavacion");
const Exploracion = require("../models/exploracion");
const jwt = require("jsonwebtoken");



const servicioExcavacion = require("../services/excavacion");

// busca una excavacion por su ID - clave mongo
const getExcavacion = (req, res) => servicioExcavacion.getExcavacion(req, res);

const getAreaExcavacion = (req, res) =>
  servicioExcavacion.getAreaExcavacion(req, res);

function getExcavacionNombre(req, res) {
  // busca una excavacion por nombre
  let excavacion = req.params.excavacionId;
  Excavacion.findOne({ nombre: excavacion }, (err, excavacion) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al realizar la petición: ${err}` });
    if (!excavacion)
      return res
        .status(404)
        .send({ message: `La excavacion no existe buscada` });
    res.status(200).send({ excavacion: excavacion });
  });
}

const getExcavaciones = (req, res) =>
  servicioExcavacion.getExcavaciones(req, res);

function getExcavacionesHome(req, res) {
  //busca una excavacion para mostrar en home parametro 1 2 3
  let excavacion = req.params.excavacionId;
  Excavacion.find({ muestraHome: excavacion }, (err, excavacion) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al realizar la petición: ${err}` });
    if (!excavacion)
      return res
        .status(404)
        .send({ message: `La excavacionHome no existe buscada` });

    res.status(200).send({ excavacion });
  });
}

function getExcavacionesDirector(req, res) {
  let directorId = req.params.excavacionId;
  Excavacion.find({ directorId: directorId }, (err, excavaciones) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al realizar la petición: ${err}` });
    if (!excavaciones)
      return res.status(404).send({
        message: `No existen excavaciones con el Director: ... ` + directorId,
      });
    res.status(200).send({ excavaciones: excavaciones });
  });
}

function getExcavacionesPaleontologo(req, res) {
  let paleontologo = req.params.excavacionId;
  Excavacion.find({ paleontologo: paleontologo }, (err, excavaciones) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al realizar la petición: ${err}` });
    if (!excavaciones)
      return res.status(404).send({
        message:
          `No existen excavaciones con el Paleontologo: ... ` + paleontologo,
      });
    res.status(200).send({ excavaciones: excavaciones });
  });
}

function getExcavacionesColector(req, res) {
  let colector = req.params.excavacionId;
  Excavacion.find({ colector: colector }, (err, excavaciones) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al realizar la petición: ${err}` });
    if (!excavaciones)
      return res.status(404).send({
        message: `No existen excavaciones con el Director: ... ` + colector,
      });
    res.status(200).send({ excavaciones: excavaciones });
  });
}



function saveExcavacion(req, res) {
  console.log("POST /api/excavacion");

  let excavacion = new Excavacion();
  excavacion.nombreArea = req.body.nombreArea;
  excavacion.codigoCampo = req.body.codigoCampo;
  excavacion.fechaInicio = req.body.fechaInicio;
  excavacion.fechaTermino = req.body.fechaTermino;
  excavacion.director = req.body.director;
  excavacion.directorId = req.body.directorId;
  excavacion.auxiliares = req.body.auxiliares;
  excavacion.profesionales = req.body.profesionales;
  excavacion.muestraHome = req.body.muestraHome;
  excavacion.tipoHallazgo = req.body.tipoHallazgo;
  excavacion.archivoDenuncia = req.body.archivoDenuncia;
  excavacion.idExploracion = req.body.idExploracion;
  excavacion.datosGeologicos = req.body.datosGeologicos;
  excavacion.datosTaxonomicos = req.body.datosTaxonomicos;
  excavacion.idArea = req.body.idArea;
  excavacion.puntoGps = req.body.puntoGPS;
  excavacion.idCiudad = req.body.idCiudad;
  excavacion.idProvincia = req.body.idProvincia;
  excavacion.iPais = req.body.idPais;
  excavacion.bochonesEncontrados = req.body.bochonesEncontrados;
  excavacion.fotosExcavacion = req.body.fotosExcavacion;
  excavacion.videosExcavacion = req.body.videosExcavacion;


 console.log("Excavacion:", req.body);
  

  jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
    if (error) {
     
      res.status(403).send({ msg: 'Acceso no permitido', error: error });
    } else {


      excavacion.save((err, excavacionStored) => {
        if (err) {
          return res
            .status(500)
            .send({ message: `Error al salvar en la Base de Datos:${err}` });
        }

       /* Exploracion.findById({_id:excavacion.idExploracion})
          .then((exploracion) => {
            return Exploracion.update(
              { _id: exploracion._id },
              {
                $set: {
                  idExcavaciones: [
                    ...exploracion.idExcavaciones,
                    excavacionStored._id,
                  ],
                },
              }
            );
          })
          .catch(() =>
            res
              .status(500)
              .send({ message: `Error al salvar en la Base de Datos:${err}` })
          );*/

       // res.status(200).send({ excavacion: excavacionStored });
 
        res.json({ excavacion: excavacionStored });

      });

    }
  });


}

/*function getExcavacionId(req, res) {
  // busca una excavacion por su ID - clave mongo
  let excavacionId = req.params.excavacionId;
  Excavacion.findById(excavacionId, (err, excavacionId) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al realizar la petición: ${err}` });
    if (!excavacionId)
      return res.status(404).send({ message: `La excavacion no existe` });
    res.status(200).send({ excavacionId: excavacionId });
  });
}*/


function getExcavacionId(req, res) { 
   // busca una persona por su ID - clave mongo
   let excavacionId = req.params.excavacionId;

   jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
          if(error){
                res.status(403).send({msg:'Acceso no permitido'});
           }else{
                   Excavacion.findById(excavacionId, (err,excavacionId)=>{
                      if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
                      res.json({excavacionId });
                   })
           
         }

   });

}



/*function updateExcavacion(req, res) {
  let excavacionId = req.params.excavacionId;
  let update = req.body;
  console.log("POST /api/excavacion/:ExcavacionId UpdateExcavacion......");
  console.log(req.body);

  Excavacion.findByIdAndUpdate(
    excavacionId,
    update,
    (err, excavacionUpdate) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al tratar de actualizar: ${err}` });
      if (!excavacionUpdate)
        return res
          .status(404)
          .send({ message: `La excavacion Update no Existe` });
      res.status(200).send({ excavacion: excavacionUpdate });
    }
  );
}*/

function updateExcavacion(req,res){
    let excavacionId = req.params.excavacionId;
    let update = req.body;
    console.log("PUT /api/excavacion/:ExcavacionId UpdateExcavacion......");
   console.log(req.body);

     jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
              if(error){
                  res.status(403).send({msg:'Acceso no permitido'});
              }else{
                           Excavacion.findByIdAndUpdate(excavacionId, update, (err, excavacionUpdate)=>{
                                 if(err) return  res.status(500).send({message: `Error al tratar de actualizar: ${err}`})
                                 res.json({excavacion: excavacionUpdate})
                           });
                    } 
    });
}

function deleteExcavacion(req, res) {
  let excavacionId = req.params.excavacionId;

  jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
    if (error) {
      res.status(403).send({ error: 'Acceso no permitido' });
    } else {

      Excavacion.findByIdAndRemove(excavacionId, (err, excavacion) => {
        if (err) return res.status(500).send(err);
        const response = {
          message: "Ejemplar satisfactoriamente borrada",
          id: excavacion._id
        };
        return res.status(200).send(response);
      });
    }
  });

}



function updateExcavacionBochones(req, res) {
  let excavacionId = req.params.excavacionId;
  let update = req.body;
  console.log(
    "POST /api/excavacionBochon/:ExcavacionId UpdateExcavacion......"
  );
  console.log(req.body);

  Excavacion.findByIdAndUpdate(
    excavacionId,
    update,
    (err, excavacionUpdate) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al tratar de actualizar: ${err}` });
      if (!excavacionUpdate)
        return res
          .status(404)
          .send({ message: `La excavacion Update no Existe` });
      res.status(200).send({ excavacion: excavacionUpdate });
    }
  );
}



function getExcavacionesFiltro(req, res) {
  let codigo = req.params.unCodigo;
  let nombre = req.params.unNombre;

  Excavacion.find({ codigo: codigo, nombre: nombre }, (err, excavacion) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al realizar la petición: ${err}` });
    if (!excavacion)
      return res
        .status(404)
        .send({ message: `La excavacion no existe buscada` });
    res.status(200).send({ excavaciones: excavacion });
  });
}

function getExcavacionesFiltroCode(req, res) {
  let codigo = req.params.unCodigo;

  Excavacion.find({ codigo: codigo }, (err, excavacion) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al realizar la petición: ${err}` });
    if (!excavacion)
      return res
        .status(404)
        .send({ message: `La excavacion no existe buscada` });
    res.status(200).send({ excavaciones: excavacion });
  });
}

function getExcavacionesFiltroName(req, res) {
  let nombre = req.params.unNombre;

  Excavacion.find({ nombre: nombre }, (err, excavacion) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al realizar la petición: ${err}` });
    if (!excavacion)
      return res
        .status(404)
        .send({ message: `La excavacion no existe buscada` });
    res.status(200).send({ excavaciones: excavacion });
  });
}

const crearExcavacion = (req, res) =>
  servicioExcavacion.crearExcavacion(req, res);

const modificarExcavacion = (req, res) =>
  servicioExcavacion.modificarExcavacion(req, res);

const modificarAreaExcavacion = (req, res) =>
  servicioExcavacion.modificarAreaExcavacion(req, res);

const borrarExcavaciones = (req, res) =>
  servicioExcavacion.borrarExcavaciones(req, res);

function getExcavacionPorIdFoto(req, res) {
  // busca una excavacion por nombre
  let excavacion = req.params.fotoId;
  Excavacion.findOne(
    { "fotosExcavacion._id": excavacion },
    (err, excavacion) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al realizar la petición: ${err}` });
      if (!excavacion)
        return res
          .status(404)
          .send({ message: `La excavacion no existe buscada` });
      res.status(200).send({ excavacion: excavacion });
    }
  );
}

function getAllExcavaciones(req, res){
      Excavacion.find({},(err,excavaciones)=>{
        if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
              
         jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
              if(error){
                  res.status(403).send({error:'Acceso no permitido'});
              }else{
                  res.json({ excavaciones });
              } 
         });

    })
}


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
  saveExcavacion,
  getExcavacionId,
  updateExcavacion,
  deleteExcavacion,
  getExcavacionesFiltro,
  getExcavacionesFiltroCode,
  getAreaExcavacion,
  modificarAreaExcavacion,
  borrarExcavaciones,
  getExcavacionesFiltroName,
  updateExcavacionBochones,
  getExcavacionPorIdFoto,
  getAllExcavaciones
};
