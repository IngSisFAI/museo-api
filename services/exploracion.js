const Exploracion = require('../models/exploracion');
const servicioArea = require('./area');

getExploracionById = idExploracion => Exploracion.findById(idExploracion);

crearExploracion = ({ puntos, idExcavacion }) => {
  return servicioArea.crearArea({ puntos })
  .then(area => {
    const exploracion = new Exploracion({
      fecha: new Date(),
      idExcavacion: idExcavacion,
      idArea: area._id,
    });

    return exploracion.save();
  })
  .catch(() => new Error('Error al insertar el area de la exploracion en la Base de Datos'));
};

modificarAreaExploracion = ({ idExploracion, areaExploracion}) => {
  return Exploracion.update({ _id: idExploracion }, areaExploracion);
  // NO esta modificando

};


module.exports = {
  crearExploracion,
  getExploracionById,
  modificarAreaExploracion,
};
  