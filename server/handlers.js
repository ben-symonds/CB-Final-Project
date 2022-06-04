"use strict";

const getImage = (req, res) => {
    res.render('upload')
}

const postImage = (req, res) => {
    res.send('Image Uploaded');
}

module.exports = {
    getImage,
    postImage
}