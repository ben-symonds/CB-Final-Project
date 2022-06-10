"use strict";

// Import the Needed node_modules.
const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');

// Import the Needed Endpoint Handlers
const {
    postUser,
    postCluster,
    getCluster,
    postClusterItem,
    getUserClusters,
    deleteClusterItem,
    deleteCluster,
    getPublicClusters,
    getPublicClustersByTag,
    getFeaturedTags
} = require('./handlers');

express()
    //Express Methods
    .use(morgan('tiny'))
    .use(express.json())

    // Any requests for static files will go into the public folder
    .use(express.static('public'))
    .use(fileUpload())

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

    //this endpoint retrieves all public clusters
    .get('/get-public-clusters', getPublicClusters)

    //this endpoint retrieves public clusters by tag
    .get('/get-public-clusters/:tag', getPublicClustersByTag)

    //this endpoint retrieves 5 random tags from public clusters
    .get('/get-featured-tags', getFeaturedTags)

    .post('/post-cluster-image', (req, res) => {

        if(req.files === null){
            res.status(400).json({status: 400, message: 'Could Not Upload File'});
        }

        const file = req.files.file;

        const path = Date.now() + file.name.replace(/\s/g, '');

        file.mv(`../client/public/images/${path}`, err => {
            if(err) {
                console.error(err);
                res.status(500).json({status: 500, message: 'Could Not Find File Path'});
            }

            res.status(200).json({status: 200, data: {name: file.name, path: `/images/${path}`} ,  message: 'New Cluster Added to Database'})
        })
    })


    // Endpoint to Catch Unhandled Errors
    .get('*', (req, res) => {
        res.status(404).json({
        status: 404,
        message: 'This is obviously not what you are looking for.',
        });
    })

    // Node Starts Server and console.logs Port 
    .listen(8000, () => console.log(`Listening on port 8000`));