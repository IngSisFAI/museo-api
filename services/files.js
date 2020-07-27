var multer = require("multer");
var fs = require("fs");

const http = require('http');
const url = require('url');
const path = require('path');


//************************ Subir archivo *********************************
uploadFile = (req, res) => {
	
	
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    var name = req.headers.path;
    console.log('Ruta:',req.headers.path);
   console.log('Archivo: ',file.originalname);
    fs.mkdir(name, () => {
      cb(null, name);
    });
  },
  filename: function(req, file, cb) {
	var fileUp= file.originalname.replace(/\s+/g, "_");
    fileUp= reemplazar(fileUp)	
    cb(null, fileUp);
  }
});

function reemplazar(cadena)
{
		var chars={

		"á":"a", "é":"e", "í":"i", "ó":"o", "ú":"u",

		"à":"a", "è":"e", "ì":"i", "ò":"o", "ù":"u", "ñ":"n",

		"Á":"A", "É":"E", "Í":"I", "Ó":"O", "Ú":"U",

		"À":"A", "È":"E", "Ì":"I", "Ò":"O", "Ù":"U", "Ñ":"N", 
		
		"ä": "a", "ë": "e", "ï": "i", "ö": "o", "ü": "u", 
        
		"Ä": "A", "Ä": "A", "Ë": "E","Ï":"I","Ö": "O", "Ü": "U" }

	var expr=/[áàéèíìóòúùñäëïöü]/ig;

	var res=cadena.replace(expr,function(e){return chars[e]});

	return res;
		  
}

var upload = multer({ storage: storage }).array("file");

upload(req, res, function(err) {
  if (err instanceof multer.MulterError) {
    return res.status(500).json(err);
    // A Multer error occurred when uploading.
  } else if (err) {
    return res.status(500).json(err);
    // An unknown error occurred when uploading.
  }

  return res.status(200).send(req.file);
  // Everything went fine.
});

}


//*****************Borrar Archivo **********************************************
deleteFile = (req, res) => {

let pathname=req.headers.path;
var curPath = pathname;
fs.unlink(curPath, function (err) {
   if(err == null)
   {
      console.log('Archivo Borrado.');
                  
   } else if(err.code == 'ENOENT') {
                console.log('No Existe Archivo', err.code);
				
          } else {
                         console.log('Some other error: ', err.code);
						// return res.status(500).send('Some other error');
                 }
});   

  return res.status(200).send('OK');
}	

//*****************Borrar Directorio **********************************************


deleteDirectory = (req, res) => {

let pathname=req.headers.path

console.log(pathname)

var curPath = pathname;
 fs.readdir(pathname,function(err1,files){ 
    if(err1 == null)
    { 
        files.forEach(function(file){
        var curPath = pathname + "\\" + file;
        fs.unlink(curPath, function (err2) {
        if(err2 == null)
        {
                console.log('File Delete');
                fs.rmdir(pathname, function (err3) { 
                if (err3==null) {
                            console.log('Directorio Borrado');
                  } else if(err3.code == 'ENOENT') {
                            // file does not exist
                           console.log('No Existe ', err3.code);
						  // return res.status(404).send('File Not Found');
                    } else {
                                console.log('Some other error: ', err3.code);
								// return res.status(500).send('Some other error');
                       } 
                          
                });
        } else if(err2.code == 'ENOENT') {
                        console.log('No Existe ', err2.code);
               } else {
                         console.log('Some other error: ', err2.code);
						 // return res.status(500).send('Some other error');
                   }
              });  
        });
        if (files.length==0)
        {
           fs.rmdir(pathname, function (err3) {
               if (err3==null) {
                      console.log('Directorio Borrado');
					  
                 } else if(err3.code == 'ENOENT') {
                      // file does not exist
                     console.log('No Existe ', err3.code);
					 //return res.status(404).send('File Not Found');
                    } else {
                          console.log('Some other error: ', err3.code);
						 //  return res.status(500).send('Some other error');
                    }    
              });

        }
    } else if(err1.code == 'ENOENT') {
                    // file does not exist
                    console.log('No Existe ', err1.code);
					//return res.status(404).send('File Not Found');
       } else {
                    console.log('Some other error: ', err1.code);
					// return res.status(500).send('Some other error');
              } 
  });
  return res.status(200).send('OK');
}


module.exports = { 
  uploadFile,
  deleteFile,
  deleteDirectory
};