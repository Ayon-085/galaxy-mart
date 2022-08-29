const dotenv = require('dotenv');

//const { response } = require('express');
// const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
//const cors = require('cors');
// const data = require('./data.js');
const http = require('http');
const app = require('./app.js');

const server = http.createServer(app);
dotenv.config();
const port = process.env.PORT || 3333;

server.listen(port);

// process.once('SIGUSR2', function () {
    // process.kill(process.pid, 'SIGUSR2');
// });
//   
//   process.on('SIGINT', function () {
    /////this is only called on ctrl+c, not restart
    // process.kill(process.pid, 'SIGINT');
//   });
  

mongoose.connection.on('error', (err)=> {
    console.log(err);
});

mongoose.connection.once('open', () => {
    console.log('Database Connection Established');
});

mongoose.connect("mongodb://localhost/galaxy-mart-db",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
   .then(() => console.log('connection successful'))
   .catch((err) => console.log(err));

