const Area = require("../models/area");

getAreaById = (idArea) => Area.findById(idArea);

crearArea = (areaData) => {
  const coordinates = [];
  areaData.puntos.forEach((punto) => {
    coordinates.push([punto.lat, punto.lng]);
  });
  coordinates.push([areaData.puntos[0].lat, areaData.puntos[0].lng]);
  const locacion = {
    type: "Polygon",
    coordinates: [coordinates],
  };

  const area = new Area({
    nombre: "",
    idCiudad: 14, // Neuquen - podriamos agregarlo al form
    idProvincia: 14, // Neuquen - podriamos agregarlo al form
    idPais: 1, // Argetina
    locacion,
  });

  return area.save();
};

modificarArea = (idArea, nuevaArea) => {
  const locacion = {
    coordinates: [nuevaArea.map((c) => [c.lat, c.lng])],
  };
  return Area.update({ _id: idArea }, { $set: { locacion } });
};

eliminarArea = (req, res) => {
  return res.status(200).send({ result: "area eliminada" });
  // const { areaId } = req.params;
  // Area.remove({ '_id': areaId }, (err, value) => {
  //     if (err) return res.status(500).send(`Error al intentar eliminar area: ${areaId}`);
  //     if (value.result.n > 0) return res.status(200).send();
  //     return res.status(400).send('Bar Request');
  //     });
};

getAreas = (req, res) => {
  Area.find({}, (err, areas) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al realizar la petición: ${err}` });
    if (!areas) return res.status(404).send({ message: `No existen areas` });
    res.status(200).send({ areas: areas });
  });
};

module.exports = {
  getAreaById,
  crearArea,
  modificarArea,
  eliminarArea,
  getAreas,
};
