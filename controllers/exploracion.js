"use strict";
const servicioExploracion = require("../services/exploracion");
const Exploracion = require("../models/exploracion");
const servicioArea = require("../services/area");
const jwt = require("jsonwebtoken");

function saveExploracion(req, res) {
  console.log("POST /api/exploracion");
  console.log(req.body);

  jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
    if (error) {
      res.status(403).send({ msg: 'Acceso no permitido' });
    } else {

      let exploracion = new Exploracion();
      exploracion.nombreArea = req.body.nombreArea;
      exploracion.fechaInicio = req.body.fechaInicio;
      exploracion.fechaTermino = req.body.fechaTermino;
      exploracion.directorId = req.body.directorId;
      exploracion.integrantesGrupo = req.body.integrantesGrupo;
      exploracion.idArea = req.body.idArea;
      exploracion.empresa = req.body.empresa;
      exploracion.proyectoInvestigacion = req.body.proyectoInvestigacion;
      exploracion.otrasEspecificaciones = req.body.otrasEspecificaciones;
      exploracion.archAutorizaciones = req.body.archAutorizaciones;
      exploracion.detallePicking = req.body.detallePicking;
      exploracion.imagenesExploracion = req.body.imagenesExploracion;



      exploracion.save((err, exploracionStored) => {
        if (err) res.status(500).send({ message: `Error al salvar en la Base de Datos:${err}` });
        res.json({ exploracion: exploracionStored });
      });
    }
  });
}

function getExploracionId(req, res) {
  let exploracionId = req.params.exploracionId;

  jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
    if (error) {
      res.status(403).send({ msg: 'Acceso no permitido' });
    } else {

      Exploracion.findById(exploracionId, (err, exploracionId) => {
        if (err)
          return res
            .status(500)
            .send({ message: `Error al realizar la petición: ${err}` });
        if (!exploracionId)
          return res.status(404).send({ message: `La exploracion no existe` });
        res.status(200).send({ exploracionId: exploracionId });
      });


    }
  });

}

function updateExploracion(req, res) {
  let exploracionId = req.params.exploracionId;
  let update = req.body;
  console.log(
    "POST /api/exploracion/:ExploracionId UpdateExploracion......",
    req.params.exploracionId
  );
  console.log(req.body);

  jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
    if (error) {
      res.status(403).send({ msg: 'Acceso no permitido' });
    } else {
      Exploracion.findByIdAndUpdate(
        exploracionId,
        update,
        (err, exploracionUpdate) => {
          if (err)
            return res
              .status(500)
              .send({ message: `Error al tratar de actualizar: ${err}` });
          if (!exploracionUpdate)
            return res.status(404).send({ message: `La persona Update no Existe` });
          res.status(200).send({ exploracion: exploracionUpdate });
        }
      );

    }
  });


}

function deleteExploracion(req, res) {
  let exploracionId = req.params.exploracionId;

jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
    if (error) {
      res.status(403).send({ msg: 'Acceso no permitido' });
    } else {

  	Exploracion.findByIdAndRemove(exploracionId, (err, exploracion) => {
    		// As always, handle any potential errors:
    		if (err) return res.status(500).send(err);
    		// We'll create a simple object to send back with a message and the id of the document that was removed
    		// You can really do this however you want, though.
    		const response = {
      			message: "Exploracion satisfactoriamente borrada",
      			id: exploracion._id
    			};
   			 return res.status(200).send(response);
  	});
     }
});
}

function getExploracionesFiltro(req, res) {
  let nombre = req.params.unNombre;

  Exploracion.find({ nombre: { $regex: nombre } }, (err, exploracion) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al realizar la petición: ${err}` });
    if (!exploracion)
      return res
        .status(404)
        .send({ message: `La exploracion buscada no existe` });
    res.status(200).send({ exploraciones: exploracion });

    return servicioArea.getAreaById(exploracion.idArea).then(area => {
      let areaExploracion = {};
      Object.assign(areaExploracion, area._doc);

      exploracion.areaGeografica = areaExploracion;

      return res.status(200).send({ exploraciones: exploracion });
    });
  });
}

const getExploracionById = (req, res) =>
  servicioExploracion.getExploracionById(req, res);

const getExploraciones = (req, res) =>
  servicioExploracion.getExploraciones(req, res);

const crearAreaExploracion = (req, res) => {
  const areaExploracion = {
    puntos: req.body.areaExploracion,
    nombre: req.body.nombre
  };

  return servicioExploracion
    .crearAreaExploracion(areaExploracion)
    .then(exploracion => res.status(200).send({ exploracion }))
    .catch(() =>
      res.status(500).send({
        message: "Error al insertar la exploracion en la Base de Datos"
      })
    );
};

const borrarExploraciones = (req, res) => {
  servicioExploracion
    .borrarExploraciones()
    .then(() =>
      res.status(200).send({ message: `Las exploraciones han sido eliminadas` })
    )
    .catch(err =>
      res
        .status(500)
        .send({ message: `Error al borrar la exploracion: ${err}` })
    );
};

const modificarAreaExploracion = (req, res) =>
  servicioExploracion.modificarAreaExploracion(req, res);

function getAllExploraciones(req, res){
      Exploracion.find({},(err,exploraciones)=>{
        if(err) return res.status(500).send({message:`Error al realizar la peticion: ${err}`})
              
         jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
              if(error){
                  res.status(403).send({error:'Acceso no permitido'});
              }else{
                  res.json({ exploraciones });
              } 
         });

    })
}


module.exports = {
  getExploracionById,
  getExploraciones,
  crearAreaExploracion,
  borrarExploraciones,
  modificarAreaExploracion,
  saveExploracion,
  getExploracionId,
  updateExploracion,
  deleteExploracion,
  getExploracionesFiltro,
 getAllExploraciones
};
