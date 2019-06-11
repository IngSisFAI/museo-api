const Excavacion = require('../models/excavacion');
const servicioArea = require('./area');
const servicioExploracion = require('./exploracion');

getExcavacion = (req, res) => {
  const excavacionId = req.params.excavacionId;
  let excavacionCompleta = {};

  return Excavacion.findById(excavacionId)
  .then(excavacion => {
    Object.assign(excavacionCompleta, excavacion._doc);
  
    servicioArea.getAreaById(excavacion.idArea)
    .then(area => {
      excavacionCompleta.areaExcavacion = area;

      servicioExploracion.getExploracionById(excavacion.idExploracion)
      .then(exploracion => {
        excavacionCompleta.exploracion = exploracion;

        servicioArea.getAreaById(exploracion.idArea)
        .then(area => {
          let areaExploracion = {};
          Object.assign(areaExploracion, area._doc);
          excavacionCompleta.areaExploracion = areaExploracion;

          res.status(200).send({ excavacionCompleta });
        })
      });
    })
    .catch(err => res.status(500).send({message:`Error al realizar la petición: ${err}`}));
  })
  .catch(err => res.status(500).send({message:`Error al realizar la petición`}));
};


crearExcavacion = (req, res) => {
  // crear el area
  return servicioArea.crearArea({ puntos: req.body.areaExcavacion })
  .then(area => {
    // crear la excavacion
    const { puntoGPSExcavacion } = req.body;
    const puntoGPS = {
      type: 'Point',
      coordinates: [puntoGPSExcavacion.lat, puntoGPSExcavacion.lng],
    };
   
    // crear la exploracion
    servicioExploracion.crearExploracion({
      puntos: req.body.areaExploracion,
    })
    .then(exploracion => {
      const excavacion = new Excavacion({
        nombre: 'excavacion 1',
        idCiudad: 14, //Neuquen
        idProvincia: 14, //Neuquen
        idPais: 1, //Argentina
        idExploracion: exploracion._id,
        idArea: area._id,
        puntoGps: puntoGPS,
      });

      return excavacion.save()
        .then(excavacion => res.status(200).send({ excavacion }))
        .catch(() => res.status(500).send({ message: 'Error al insertar la excavacion en la Base de Datos'}))
    })
    .catch(() => res.status(500).send({ message: 'Error al crear el area de la exploracion en la Base de Datos' }));
  })
  .catch(() => res.status(500).send({ message: 'Error al crear el area de la excavacion en la Base de Datos' }));
};


modificarExcavacion = (req, res) => {
  // modificar area exploracion
  return servicioExploracion.modificarAreaExploracion({
    idExploracion: req.body.idExploracion,
    areaExploracion: req.body.areaExploracion,
  })
  .then(exploracion => {
    console.log('***************** exito ', exploracion)
    res.status(200).send({ exploracion })
  })
  .catch((err) => {
    console.log('***** NOOOOOOOOOOOOOOOOOO', err)
    return res.status(500).send({ message: 'Error al MODIFCIAR el area de la exploracion' });
  });
};


module.exports = {
  crearExcavacion,
  getExcavacion,
  modificarExcavacion,
};
