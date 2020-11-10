module.exports = {
    port: process.env.port || 3006,
    //3001,


     db: process.env.MONGODB || 'mongodb://localhost:27017/museoDB'
    //'mongodb://<museoadmin>:<MuseoAdmin+2018>@ds135747.mlab.com:35747/museonqn',

}