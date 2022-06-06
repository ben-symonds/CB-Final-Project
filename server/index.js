"use strict";

// Import the Needed node_modules.
const express = require('express');
const morgan = require('morgan');

// Import the Needed Endpoint Handlers
const {
    // postUpload
} = require('./handlers');

express()
    //Express Methods
    .use(morgan('tiny'))
    .use(express.json())

    // Any requests for static files will go into the public folder
    .use(express.static('public'))

    // Endpoints for Users mongoDB Collection
    // .post('/api/upload', postUpload)  

    //Endpoints for Clusters mongoDB Collection
  
    // Endpoint to Catch Unhandled Errors
    .get('*', (req, res) => {
        res.status(404).json({
        status: 404,
        message: 'This is obviously not what you are looking for.',
        });
    })

    // Node Starts Server and console.logs Port 
    .listen(8000, () => console.log(`Listening on port 8000`));