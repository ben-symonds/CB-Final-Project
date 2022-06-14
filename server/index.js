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
    deleteCluster,
    getPublicClusters,
    getPublicClustersByTag,
    getFeaturedTags,
    getUsername,
    getPublicClustersById,
    patchClusterVisibility,
    patchClusterTags,
    patchUserInfo,
    deleteUser
} = require('./handlers');

express()
    //Express Methods
    .use(morgan('tiny'))
    .use(express.json())

    // Any requests for static files will go into the public folder
    .use(express.static('public'))

    // Endpoints for Users mongoDB Collection
    .post('/post-user', postUser)

    //this endpoint retrieves the username asscociated with user id
    .get('/get-username/:id', getUsername)

    .patch('/patch-user-info/:id/:newUsername', patchUserInfo)

    .delete('/delete-user/:id', deleteUser)

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

    .get('/get-public-user-clusters/:id', getPublicClustersById)

    .patch('/patch-cluster-visibility/:id/:visibility', patchClusterVisibility)

    .patch('/patch-cluster-tags/:id/:tags', patchClusterTags)


    // Endpoint to Catch Unhandled Errors
    .get('*', (req, res) => {
        res.status(404).json({
        status: 404,
        message: 'This is obviously not what you are looking for.',
        });
    })

    // Node Starts Server and console.logs Port 
    .listen(8000, () => console.log(`Listening on port 8000`));