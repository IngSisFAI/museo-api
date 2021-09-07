"use strict";

const express = require("express");
const personaCtrl = require("../controllers/persona");
const excavacionCtrl = require("../controllers/excavacion");
const exploracionCtrl = require("../controllers/exploracion");
const bochonCtrl = require("../controllers/bochon");
const piezaCtrl = require("../controllers/pieza");
const ejemplarCtrl = require("../controllers/ejemplar");
//const homeCtrl = require("../controllers/home");
const paisCtrl = require("../controllers/pais");
const provinciaCtrl = require("../controllers/provincia");
const ciudadCtrl = require("../controllers/ciudad");
const areaCtrl = require("../controllers/area");
const acidosCtrl = require("../controllers/acidos");
const tiposPreparacionCtrl = require("../controllers/tipoPreparacion");
const coleccionCtrl = require("../controllers/coleccion");
const fileCtrl = require("../controllers/files");
const usuarioCtrl = require("../controllers/usuario");
const documentacionCtrl = require("../controllers/documentacion");

const api = express.Router();

//api.get("/info", homeCtrl.getHome); // obtiene todos los datos del Home unico documento
//api.get("/obtenerArchivos");

//Personas
api.get("/personas", verifyToken, personaCtrl.getPersonas);
api.delete("/persona/:personaId", verifyToken, personaCtrl.deletePersona); 
api.get("/personaDni/:personaId", verifyToken, personaCtrl.getPersonaDni);
api.post("/persona", verifyToken, personaCtrl.savePersona);
api.put("/persona/:personaId", verifyToken, personaCtrl.updatePersona);
api.get("/personaId/:personaId", verifyToken, personaCtrl.getPersonaId);


//Exploracion
api.get("/exploracion", verifyToken, exploracionCtrl.getAllExploraciones);
api.post("/exploracion", verifyToken, exploracionCtrl.saveExploracion);
api.get("/exploracionId/:exploracionId", verifyToken, exploracionCtrl.getExploracionId);
api.put("/exploracion/:exploracionId", verifyToken, exploracionCtrl.updateExploracion); 
api.delete("/exploracion/:exploracionId",verifyToken, exploracionCtrl.deleteExploracion);

//archivos
api.post("/uploadArchivo", verifyToken, fileCtrl.uploadFile);
api.get("/deleteArchivo", verifyToken, fileCtrl.deleteFile);
api.get("/deleteDirectorio", verifyToken,fileCtrl.deleteDirectory);


//Documentacion
api.get("/documentacion", verifyToken,documentacionCtrl.getDocumentacion);
api.post("/saveDocumentacion", verifyToken,documentacionCtrl.saveDocumentacion);
api.get("/documentacionId/:documentacionId", verifyToken, documentacionCtrl.getDocumentacionId);
api.put("/updateDocumentacion/:documentacionId", verifyToken, documentacionCtrl.updateDocumentacion);
api.delete("/documentacion/:documentacionId",verifyToken, documentacionCtrl.deleteDocumentacion);


// Excavacion
api.post("/excavacion",  verifyToken, excavacionCtrl.saveExcavacion);
api.get("/excavacion", verifyToken, excavacionCtrl.getAllExcavaciones);
api.get("/excavacionId/:excavacionId", verifyToken, excavacionCtrl.getExcavacionId);
api.put("/excavacion/:excavacionId", verifyToken, excavacionCtrl.updateExcavacion);


//Ejemplares
api.get("/ejemplares", verifyToken, ejemplarCtrl.getejemplares);
api.get("/ejemplarExca/:excavacionId", verifyToken,ejemplarCtrl.getejemplarExca);
api.put("/ejemplar/:ejemplarId",  verifyToken, ejemplarCtrl.updateEjemplar);
api.delete("/ejemplar/:ejemplarId", verifyToken, ejemplarCtrl.deleteEjemplar);
api.post("/ejemplar", verifyToken,ejemplarCtrl.saveEjemplar);




//bochones
api.post("/bochon", verifyToken, bochonCtrl.saveBochon);
api.get("/bochon", verifyToken, bochonCtrl.getbochones);
api.get("/bochonExca/:excavacionId", verifyToken, bochonCtrl.getBochonesExcavacion);
api.delete("/bochon/:bochonId", verifyToken, bochonCtrl.deleteBochon);
api.get("/bochonId/:bochonId", verifyToken,bochonCtrl.getbochonId);
api.put("/bochon/:bochonId", verifyToken, bochonCtrl.updateBochon);
api.get("/bochonEjemplar/:ejemplarId", verifyToken, bochonCtrl.getbochonEjemplar);



//Usuarios
api.get("/validaUsuario", usuarioCtrl.validaUsuario);
api.get("/usuarios", verifyToken, usuarioCtrl.getUsuarios);
api.delete("/deleteUsuario", verifyToken, usuarioCtrl.deleteUsuario);
api.get("/existeUsuario", verifyToken, usuarioCtrl.existeUsuario);
api.post("/saveUsuario", verifyToken,usuarioCtrl.saveUsuario);
api.get("/getUsuario", verifyToken, usuarioCtrl.getUsuarioId);
api.put("/editUsuario", verifyToken, usuarioCtrl.updateUsuario);


//colecciones
api.get("/coleccion", verifyToken, coleccionCtrl.getColecciones);

//Piezas
api.post("/pieza", verifyToken,piezaCtrl.savePieza);
api.get("/piezasEjemplar/:ejemplarId", verifyToken, piezaCtrl.getPiezasEjemplar);
api.delete("/pieza/:piezaId", verifyToken,piezaCtrl.deletePieza);
api.get("/piezaId/:piezaId", verifyToken, piezaCtrl.getpiezaId);
api.put("/pieza/:piezaId", verifyToken,piezaCtrl.updatePieza);
api.get("/ejemplarId/:ejemplarId", verifyToken, ejemplarCtrl.getejemplarId);




//entradas a revisar!!!!!



api.get("/areaExcavacion/:excavacionId", excavacionCtrl.getAreaExcavacion);
api.get("/areasExcavaciones", excavacionCtrl.getExcavaciones);
api.put("/areaExcavacion/:excavacionId", excavacionCtrl.modificarAreaExcavacion);

api.delete("/excavacion/:excavacionId", excavacionCtrl.deleteExcavacion);
api.delete("/excavacion", excavacionCtrl.borrarExcavaciones);


//api.get("/excavacion/:excavacionId", excavacionCtrl.getExcavacion);
//api.put("/excavacion", excavacionCtrl.modificarExcavacion);
//api.delete('/excavacion', excavacionCtrl.removeExcavacion)
//Se usaran para los mapas???




api.get("/excavacionNombre/:excavacionId", excavacionCtrl.getExcavacionNombre);
api.get("/excavacionHome/:excavacionId", excavacionCtrl.getExcavacionesHome);

api.get("/excavacionDirector/:excavacionId", excavacionCtrl.getExcavacionesDirector);
api.get("/excavacionPaleontologo/:excavacionId", excavacionCtrl.getExcavacionesPaleontologo);
api.get( "/excavacionColector/:excavacionId", excavacionCtrl.getExcavacionesColector);
api.post("/areaExcavacion", excavacionCtrl.crearExcavacion);

api.get("/excavacionFiltro/:unCodigo&:unNombre",excavacionCtrl.getExcavacionesFiltro);
api.get("/excavacionFiltroCode/:unCodigo", excavacionCtrl.getExcavacionesFiltroCode);
api.get("/excavacionFiltroName/:unNombre",excavacionCtrl.getExcavacionesFiltroName);
api.put("/excavacionBochon/:excavacionId", excavacionCtrl.updateExcavacionBochones);

api.get("/bochonCampo/:bochonId", bochonCtrl.getbochonCampo);

api.post("/bochon", bochonCtrl.saveBochon);
api.get("/bochonNombre/:nombre", bochonCtrl.getBochonNombre);
api.get("/bochonUnNombre/:nombre", bochonCtrl.getBochonUnNombre);

api.get("/pieza", piezaCtrl.getpiezas);


//api.get("/excavacionId/:excavacionId", excavacionCtrl.getExcavacionId);
//api.post("/excavacion", excavacionCtrl.saveExcavacion);
//api.put("/excavacion/:excavacionId", excavacionCtrl.updateExcavacion);


//api.get("/excavacionPorFoto/:fotoId", excavacionCtrl.getExcavacionPorIdFoto);










api.get(
  "/ejemplarNroColeccion/:ejemplarId",
  ejemplarCtrl.getejemplarNroColeccion
);
api.get("/ejemplarHome/:ejemplarId", ejemplarCtrl.getejemplarHome);
api.get("/ejemplarPorFoto/:fotoId", ejemplarCtrl.getEjemplarPorIdFoto);
//api.post('/ejemplar', ejemplarCtrl.saveEjemplar)

// Exploracion

api.get("/areaExploracion/:exploracionId", exploracionCtrl.getExploracionById);
api.get("/areaExploracion", exploracionCtrl.getExploraciones);
api.post("/areaExploracion", exploracionCtrl.crearAreaExploracion);
api.delete("/exploracion", exploracionCtrl.borrarExploraciones);
api.put(
  "/areaExploracion/:exploracionId",
  exploracionCtrl.modificarAreaExploracion
);

// Area
// api.get('/area', areaCtrl.getAreaById)
// api.put('/area', areaCtrl.updateArea)
// api.delete('/area', areaCtrl.removeArea)

//Exploracion


api.get(
  "/exploracionesFiltro/:unNombre",
  exploracionCtrl.getExploracionesFiltro
);



//pais
api.get("/pais", paisCtrl.getPaises);

//provincia
api.get("/provincia", provinciaCtrl.getProvincias);
api.get("/provinciaIdPais/:paisId", provinciaCtrl.getProvinciaIdPais);

//Ciudad
api.get("/ciudad", ciudadCtrl.getCiudades);
api.get("/ciudadIdProv/:provId", ciudadCtrl.getCiudadIdProv);

// Area
api.get("/area", areaCtrl.getAreas);

//Ejemplar




api.get(
  "/ejemplarFiltro/:unNroColeccion&:unNombre&:unaUbicacion",
  ejemplarCtrl.getEjemplaresFiltro
);
api.get(
  "/ejemplarFiltroNroColNom/:unNroColeccion&:unNombre",
  ejemplarCtrl.getEjemplaresNroColNom
);
api.get(
  "/ejemplarFiltroUbicacionNom/:unaUbicacion&:unNombre",
  ejemplarCtrl.getEjemplaresUbicacionNom
);
api.get(
  "/ejemplarFiltroUbicacionNroCol/:unaUbicacion&:unNroColeccion",
  ejemplarCtrl.getEjemplaresUbicacionNroCol
);
api.get(
  "/ejemplarFiltroNroColeccion/:unNroColeccion",
  ejemplarCtrl.getEjemplaresNroColeccion
);
api.get("/ejemplarFiltroNombre/:unNombre", ejemplarCtrl.getEjemplaresNombre);
api.get(
  "/ejemplarFiltroUbicacion/:unaUbicacion",
  ejemplarCtrl.getEjemplaresUbicacion
);

//acidos
api.get("/acido", acidosCtrl.getAcidos);

//tipos preparacion
api.get("/tipoPreparacion", tiposPreparacionCtrl.getTiposPreparacion);

//acidos






// Authorization: Bearer <token>
function verifyToken(req, res, next){

         const bearerHeader =  req.headers['authorization'];

     if(typeof bearerHeader !== 'undefined'){
         const bearerToken = bearerHeader.split(" ")[1];
          req.token  = bearerToken;
        //console.log('TOKEN:::: ',bearerToken);
          next();    
          
     }else{
         res.sendStatus(403);
     }
}

module.exports = api;
