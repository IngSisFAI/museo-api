module.exports = {
    port: process.env.port || 3001,
    //3001,
	  
	   db:process.env.MONGODB || 'mongodb://luciano:Lzuniga84@ds155596.mlab.com:55596/museo',
   // db:process.env.MONGODB || 'mongodb://localhost:27017/museo',
    //'mongodb://<museoadmin>:<MuseoAdmin+2018>@ds135747.mlab.com:35747/museonqn',
    
}