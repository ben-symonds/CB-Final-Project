"use strict";

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

module.exports = {
    // postUpload
}