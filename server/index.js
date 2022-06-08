"use strict";

// Import the Needed node_modules.
const express = require('express');
const morgan = require('morgan');

// Import the Needed Endpoint Handlers
const {
    postUser,
    postCluster,
    getCluster,
    postClusterItem,
    getUserClusters,
    deleteClusterItem,
    deleteCluster
} = require('./handlers');

express()
    //Express Methods
    .use(morgan('tiny'))
    .use(express.json())

    // Any requests for static files will go into the public folder
    .use(express.static('public'))

    // Endpoints for Users mongoDB Collection
    .post('/post-user', postUser)


    //Endpoints for Clusters mongoDB Collection

    //this endpoint posts a new cluster
    .post('/post-cluster', postCluster)
  
    //this endpoint retrieves a cluster based on its id
    .get('/get-cluster/:id', getCluster)

    //this endpoint adds a a new cluster item to an existing cluster
    .post('/post-cluster-item/:id', postClusterItem)

    //this endpoint retrieves all cluster belonging to current user
    .get('/get-user-clusters/:id', getUserClusters) 

    //this endpoint deletes a single cluster item based on its id
    .delete('/delete-cluster-item/:clusterId/:itemId', deleteClusterItem)

    //this endpoint deletes a single cluster based on its id
    .delete('/delete-cluster/:id', deleteCluster)

    // Endpoint to Catch Unhandled Errors
    .get('*', (req, res) => {
        res.status(404).json({
        status: 404,
        message: 'This is obviously not what you are looking for.',
        });
    })

    // Node Starts Server and console.logs Port 
    .listen(8000, () => console.log(`Listening on port 8000`));