'use-strict';

const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// const postUpload = (req, res) => {
//     if(req.files === null) {
//         return res.status(400).json({status: 400,  message: 'No file uploaded'})
//     }

//     const file = req.files.file;

//     file.mv(`../client/public/uploads/${file.name}`, err => {
//         if(err) {
//             console.error(err);
//             return res.status(500).json({status: 500,  message: 'Path does not exist'})
//         }

//         res.status(200).json({status: 200, data:file.name,  message: 'Path does not exist'})
//     })
// }

const postUser = async (req, res) => {
    
    const client = new MongoClient(MONGO_URI, options);

    const newUser = req.body;

    try {

        await client.connect();
        
        const db = client.db('Cluster');

        const result = await db.collection('Users').insertOne(newUser);

        result
        ? res.status(200).json({status: 200, message: 'New User Added to Database'})

        : res.status(400).json({status: 400, message: 'Could Not Add User to Database'});

        client.close();
    }
    catch(error){
        console.log(error.stack)
    }

}

module.exports = {
    postUser
}