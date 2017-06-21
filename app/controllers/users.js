"use strict";

const async = require("async");
const Image = require("../models/images.js");
const User = require("../models/users.js");

module.exports = {

    //gets a usesr images using async
    getImages: (req, res) => {
        User.findOne({"twitter.username": req.params.id}, (err, user) => {
            if (err) return res.redirect("/images");
            let images = [];
            //iterates through each of the user's images and finds them in the db
            async.eachSeries(user.images, (imgId, done) => {
                Image.findById(imgId, (err, img) => {
                    images.push(img);
                    done();
                });
            }, (err) => {
                //reverse images so they are in order by recent
                res.render("images", {images: images.reverse()});
            });
        });
    },

    //redirects the user to their user page
    userImages: (req, res) => {
        res.redirect(`/users/${req.user.twitter.username}`);
    }
};
