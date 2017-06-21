"use strict";

const async = require("async");
const Image = require("../models/images.js");

module.exports = {
    //gets all the user's images with async
    userImages: (req, res) => {
        let images = [];
        async.eachSeries(req.user.images, (imgId, done) => {
            Image.findById(imgId, (err, img) => {
                images.push(img);
                done();
            });
        }, (err) => {
            res.render("images", {images: images});
        });
    }
};
