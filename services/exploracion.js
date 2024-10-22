const Exploracion = require("../models/exploracion");
const Excavacion = require("../models/excavacion");
const Area = require("../models/area");
// const servicioExcavacion = require('./excavacion');
const servicioArea = require("./area");
const servicioExcavacion = require("./excavacion");
const jwt = require("jsonwebtoken");


getExcavacionById = (excavacionId) => {
    return Excavacion.findById(excavacionId)
        .then((excavacion) => {
            let excavacionCompleta = {};
            Object.assign(excavacionCompleta, excavacion._doc);

            return servicioArea.getAreaById(excavacion.idArea).then((area) => {
                let areaExcavacion = {};
                Object.assign(areaExcavacion, area._doc);
                excavacionCompleta.areaExcavacion = areaExcavacion;

                return excavacionCompleta;
            });
        })
        .catch((err) => Promise.reject(`Error al recuperar la excavacion: ${err}`));
};
getExploracionById = async(req, res) => {
    try {
        const exploracion = await Exploracion.findById(req.params.exploracionId);
        const exploracionCompleta = {};
        //console.log(exploracion);
        const area = await servicioArea.getAreaById(exploracion.idArea);
        exploracionCompleta.areaExploracion = area;

        const ids = exploracion.idExcavaciones;
        const excavacionesCompletas = [];
        console.log(ids)
        for (const id of ids) {
            var excavacion = await Excavacion.findById(id);
            if (excavacion) {
                var areaExcavacion = {};
                areaExcavacion = await Area.findById(excavacion.idArea);
                //conviero la excavacion a objeto para poder agregar la propiedad areaExcavacion
                excavacion = excavacion.toObject();
                excavacion.areaExcavacion = areaExcavacion;
                excavacionesCompletas.push(excavacion);
            }
        }

        exploracionCompleta.excavaciones = excavacionesCompletas;
        res.status(200).send({ exploracion: exploracionCompleta });
    } catch (error) {
        res.status(500).send({ message: `Error al realizar la petición` });
    }
};

// getExploracionById = (req, res) => {

//     return Exploracion.findById(req.params.exploracionId)
//         .then((exploracion) => {
//             const exploracionCompleta = {};
//             //console.log("servicio exploracion" + exploracion);
//             //Object.assign(exploracionCompleta, exploracion._doc);

//             servicioArea.getAreaById(exploracion.idArea).then((area) => {
//                 let areaExploracion = {};
//                 //console.log("servicio exploracion Area: " + area)
//                 //Object.assign(areaExploracion, area._doc);
//                 //exploracionCompleta.areaExploracion = areaExploracion;
//                 exploracionCompleta.areaExploracion = area;
//                 const ids = exploracion.idExcavaciones;
//                 const excavacionesCompletas = [];

//                 for (const id of ids) {
//                     Excavacion.findById(id).then((excavacion) => {
//                         if (excavacion) {
//                             console.log(excavacion);
//                             excavacionesCompletas.push(excavacion)
//                         }
//                     });
//                 }
//                 console.log(excavacionesCompletas);
//                 exploracionCompleta.excavaciones = excavacionesCompletas;

//                 res.status(200).send({ exploracion: exploracionCompleta })


//                 // const excavacionesCompletas = exploracion.idExcavaciones.map(

//                 //     (excavacionId) => {
//                 //         Excavacion.findById(excavacionId).then((excav) => {
//                 //             //console.log(excav)
//                 //             return excav
//                 //         });
//                 //     }
//                 // );
//                 // Promise.all(excavacionesCompletas).then((todas) => {
//                 //     exploracionCompleta.excavaciones = todas;
//                 //     res.status(200).send({ exploracion: exploracionCompleta });
//                 // });
//             });
//         })
//         .catch(() =>
//             res.status(500).send({ message: `Error al realizar la petición` })
//         );
// };

getExploraciones = async(req, res) => {
        try {
            const exploracionesCompletas = []
            const exploraciones = await Exploracion.find();
            //console.log(exploraciones)
            for (const exploracion of exploraciones) {
                //const exploracion = await Exploracion.findById(req.params.exploracionId);
                const exploracionCompleta = {};

                const area = exploracion.idArea ? await servicioArea.getAreaById(exploracion.idArea) : {};

                exploracionCompleta.areaExploracion = area;

                const ids = exploracion.idExcavaciones;
                const excavacionesCompletas = [];

                if (ids != []) {
                    for (const id of ids) {
                        var excavacion = await Excavacion.findById(id);
                        if (excavacion) {
                            //console.log("area de excavacion", excavacion.idArea)
                            var areaExcavacion = {};
                            areaExcavacion = excavacion.idArea ? await Area.findById(excavacion.idArea) : {};
                            //conviero la excavacion a objeto para poder agregar la propiedad areaExcavacion
                            excavacion = excavacion.toObject();
                            excavacion.areaExcavacion = areaExcavacion;
                            excavacionesCompletas.push(excavacion);
                        }
                    }
                }

                exploracionCompleta.excavaciones = excavacionesCompletas;

                //console.log(Object.keys(exploracionCompleta.areaExploracion).length !== 0)
                if (Object.keys(exploracionCompleta.areaExploracion).length !== 0) {
                    //si el area de exploracion es distinta de {} entonces al area le asigno nombre
                    exploracionCompleta.areaExploracion.nombre = exploracion.nombreArea;
                    //convierto el area de exploracion a objeto para agregar fecha
                    exploracionCompleta.areaExploracion = exploracionCompleta.areaExploracion.toObject();
                    exploracionCompleta.areaExploracion.fecha = exploracion.fechaInicio;
                    console.log(exploracionCompleta);
                    exploracionesCompletas.push(exploracionCompleta);
                }
            }

            res.status(200).send({ exploraciones: exploracionesCompletas });
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: `Error al realizar la petición` });
        }
    }
    // getExploraciones = (req, res) => {


//     jwt.verify(req.token, 'museoapigeo21', (error, authData) => {
//         if (error) {
//             res.status(403).send({ msg: 'Acceso no permitido' });
//         } else {

//     return Exploracion.find()
//         .then((exploraciones) => {
//             const exploracionesCompletas = exploraciones.map((exploracion) => {
//                 let exploracionCompleta = {};
//                 Object.assign(exploracionCompleta, exploracion._doc);

//                 if (exploracion.idArea != "") {


//                     return servicioArea.getAreaById(exploracion.idArea).then((area) => {
//                         let areaExploracion = {};
//                         if (area) {
//                             Object.assign(areaExploracion, area._doc);
//                             exploracionCompleta.areaExploracion = areaExploracion;
//                         }

//                         const excavacionesCompletas = exploracion.idExcavaciones.map(
//                             (excavacionId) => getExcavacionById(excavacionId)
//                         );
//                         return Promise.all(excavacionesCompletas).then((todas) => {
//                             exploracionCompleta.excavaciones = todas;
//                             return exploracionCompleta;
//                         });
//                     });

//                 } else {
//                     exploracionCompleta.areaExploracion = {};
//                     const excavacionesCompletas = exploracion.idExcavaciones.map(
//                         (excavacionId) => getExcavacionById(excavacionId)
//                     );
//                     return Promise.all(excavacionesCompletas).then((todas) => {
//                         exploracionCompleta.excavaciones = todas;
//                         return exploracionCompleta;
//                     });


//                 }

//             });

//             Promise.all(exploracionesCompletas).then((exploraciones) => {
//                 res.status(200).send({ exploraciones });
//             });
//         })
//         .catch((error) =>
//             res.status(500).send({ message: `Error al realizar la petición:` + error })
//         );
//     }
//     });
// };

getExploracion = (exploracionId) => {
    return Exploracion.findById(exploracionId)
        .then((exploracion) => {
            const exploracionCompleta = {};
            Object.assign(exploracionCompleta, exploracion._doc);

            return servicioArea.getAreaById(exploracion.idArea).then((area) => {
                let areaExploracion = {};
                Object.assign(areaExploracion, area._doc);
                exploracionCompleta.areaExploracion = areaExploracion;

                return exploracionCompleta;
            });
        })
        .catch((err) =>
            Promise.reject(`Error al recuperar la exploracion: ${err}`)
        );
};

crearAreaExploracion = ({ puntos, nombre }) => {
    return servicioArea
        .crearArea({ puntos, nombre })
        .then((area) => {
            return { areaId: area._id };
        })
        .catch(
            () =>
            new Error(
                "Error al insertar el area de la exploracion en la Base de Datos"
            )
        );
};

modificarAreaExploracion = (req, res) => {
    if (req.body.areaExploracion && req.params.exploracionId) {
        return getExploracion(req.params.exploracionId).then((exploracion) => {
            return servicioArea
                .getAreaById(exploracion.idArea)
                .then((areaExploracion) => {
                    servicioArea
                        .modificarArea(areaExploracion._id, req.body.areaExploracion)
                        .then(() =>
                            res.status(200).send({
                                message: "Area de Exploracion correctamente modificada",
                            })
                        )
                        .catch(() =>
                            res
                            .status(500)
                            .send({ message: "Error al modificar el Area de Exploracion" })
                        );
                })
                .catch((error) => Promise.reject(error));
        });
    }
    return Promise.resolve();
};

setearExcavacion = (exploracion, idExcavacion) => {
    let idExcavaciones = exploracion.idExcavaciones;
    idExcavaciones.push(idExcavacion);

    return Exploracion.update({ _id: exploracion._id }, { $set: { idExcavaciones } });
};

borrarExploraciones = () => Exploracion.remove();

module.exports = {
    crearAreaExploracion,
    getExploracionById,
    getExploraciones,
    getExploracion,
    modificarAreaExploracion,
    setearExcavacion,
    borrarExploraciones,
};