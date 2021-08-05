'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, { reconnectTries: 5 }) 
  .then(db => {
        // boot 
       app.listen(config.port, ()=> {
        console.log('API REST corriendo en: '+ config.db +' puerto: ' + config.port)
       })
  })
 .catch(dbErr => { 
                 console.log("DB Connection Error: ", dbErr.message); 
                 process.exit(1); 
  });


