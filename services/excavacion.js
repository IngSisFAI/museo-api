const Excavacion = require("../models/excavacion");
const servicioArea = require("./area");
const servicioExploracion = require("./exploracion");

getExcavacion = (req, res) => {
    const excavacionId = req.params.excavacionId;
    let excavacionCompleta = {};

    return Excavacion.findById(excavacionId)
        .then((excavacion) => {
            Object.assign(excavacionCompleta, excavacion._doc);

            servicioArea
                .getAreaById(excavacion.idArea)
                .then((area) => {
                    excavacionCompleta.areaExcavacion = area;

                    servicioExploracion
                        .getExploracionById(excavacion.idExploracion)
                        .then((exploracion) => {
                            excavacionCompleta.exploracion = exploracion;

                            servicioArea.getAreaById(exploracion.idArea).then((area) => {
                                let areaExploracion = {};
                                Object.assign(areaExploracion, area._doc);
                                excavacionCompleta.areaExploracion = areaExploracion;

                                res.status(200).send({ excavacionCompleta });
                            });
                        });
                })
                .catch((err) =>
                    res
                    .status(500)
                    .send({ message: `Error al realizar la petición: ${err}` })
                );
        })
        .catch((err) =>
            res.status(500).send({ message: `Error al realizar la petición` })
        );
};

getExcavaciones = (req, res) => {

    console.log("paso por getExcavaciones y se cuelga");
    return Excavacion.find()
        .then((excavaciones) => {
            console.log(excavaciones);
            const excavacionesCompletas = excavaciones.map((excavacion) => {
                let excavacionCompleta = {};
                Object.assign(excavacionCompleta, excavacion._doc);
                if (excavacion.idArea != '') {
                    return servicioArea.getAreaById(excavacion.idArea).then((area) => {
                        excavacionCompleta.areaExcavacion = area;

                        return servicioExploracion
                            .getExploracion(excavacion.idExploracion)
                            .then((exploracion) => {
                                if (exploracion) {
                                    excavacionCompleta.exploracion = exploracion;

                                    return servicioArea
                                        .getAreaById(exploracion.idArea)
                                        .then((area) => {
                                            let areaExploracion = {};
                                            Object.assign(areaExploracion, area._doc);

                                            return excavacionCompleta;
                                        });
                                } else return undefined;
                            });
                    });
                }
                //else {
                //     res.status(200).send({ excavacion: excavacionCompleta });
                // }
            });

            Promise.all(excavacionesCompletas).then((todasExcavaciones) => {
                todasExcavaciones = todasExcavaciones.filter(
                    (exc) => exc !== undefined
                );
                res.status(200).send({ excavaciones: todasExcavaciones });
            });
        })
        .catch(() =>
            res.status(500).send({ message: `Error al realizar la petición` })
        );
};

getAreaExcavacion = (req, res) => {
    const excavacionId = req.params.excavacionId;

    let excavacionCompleta = {};

    return Excavacion.findById(excavacionId)
        .then((excavacion) => {
            console.log(excavacion);
            Object.assign(excavacionCompleta, excavacion._doc);
            if (excavacion.idArea != '') {
                servicioArea.getAreaById(excavacion.idArea).then((area) => {
                    excavacionCompleta.areaExcavacion = area;

                    servicioExploracion
                        .getExploracion(excavacion.idExploracion)
                        .then((exploracion) => {
                            excavacionCompleta.exploracion = exploracion;

                            servicioArea.getAreaById(exploracion.idArea).then((area) => {
                                let areaExploracion = {};
                                Object.assign(areaExploracion, area._doc);
                                excavacionCompleta.areaExploracion = areaExploracion;

                                res.status(200).send({ excavacion: excavacionCompleta });
                            });
                        });
                });
            } else {
                res.status(200).send({ excavacion: excavacionCompleta });
            }
        })
        .catch(() =>
            res.status(500).send({ message: `Error al realizar la petición` })
        );
};

crearExcavacion = (req, res) => {
    // recuperar exploracion de la excavacion
    servicioExploracion;

    // .getExploracion(req.body.exploracionId)
    // .then(exploracion => {
    // crear el area
    return servicioArea
        .crearArea({ puntos: req.body.areaExcavacion })
        .then((area) => {
            // crear el area de la excavacion
            const { puntoGPSExcavacion } = req.body;
            const puntoGPS = {
                type: "Point",
                coordinates: [puntoGPSExcavacion.lat, puntoGPSExcavacion.lng],
            };

            return res.status(200).send({
                areaId: area._id,
                puntoGps: puntoGPS,
            });

            // return excavacion
            //   .save()
            //   .then(excavacion => {
            //     servicioExploracion
            //       .setearExcavacion(exploracion, excavacion._id)
            //       .then(() => res.status(200).send({ excavacion }));
            //   })
        });
};

modificarAreaExcavacion = (req, res) => {
    Excavacion.findById(req.params.excavacionId).then((excavacion) => {
        let puntoGps;
        if (req.body.puntoGPSExcavacion) {
            puntoGps = excavacion.puntoGps;
            puntoGps.coordinates = [
                req.body.puntoGPSExcavacion.lat,
                req.body.puntoGPSExcavacion.lng,
            ];
            Excavacion.update({ _id: excavacion._id }, { $set: { puntoGps } }).catch(
                () =>
                res.status(500).send({
                    message: "Error al modificar el puntoGPS del Area de Excavacion",
                })
            );
        }

        if (req.body.areaExcavacion) {
            return servicioArea
                .getAreaById(excavacion.idArea)
                .then((areaExcavacion) => {
                    return servicioArea
                        .modificarArea(areaExcavacion._id, req.body.areaExcavacion)
                        .then(() =>
                            res.status(200).send({
                                message: "Area de Excavacion correctamente modificada",
                            })
                        )
                        .catch(() =>
                            res
                            .status(500)
                            .send({ message: "Error al modificar el Area de Excavacion" })
                        );
                })
                .catch((error) => Promise.reject(error));
        }
        return res.status(200).send({ puntoGps, idArea: excavacion.idArea });
    });
};

borrarExcavaciones = (req, res) => {
    Excavacion.remove()
        .then(() =>
            res.status(200).send({ message: `Las excavaciones han sido eliminadas` })
        )
        .catch((err) =>
            res.status(500).send({ message: `Error al borrar la excavacion: ${err}` })
        );
};

module.exports = {
    crearExcavacion,
    getExcavacionById,
    getExcavacion,
    getExcavaciones,
    modificarAreaExcavacion,
    borrarExcavaciones,
    getAreaExcavacion,
};