"use strict";

const async = require("async");
const Image = require("../models/images.js");

module.exports = {
    //shows new image form
    showNew: (req, res) => {
        res.render("images/new");
    },
    //has image id form route declaration
    show: (req, res) => {
        Image.findById(req.params.id, (err, image) => {
            if (err) return res.redirect("/images");
            res.render("images/show", {image: image, owned: isOwned(image._id, req.user)});
        });
    },
    //deletes img (only if user owns it)
    delete: (req, res) => {
        if (isOwned(req.params.id, req.user)) {
            async.parallel([
                (done) => {
                    Image.remove({_id: req.params.id}, (err) => {
                        done(err);
                    });
                },
                (done) => {
                    removeImageId(req.user, req.params.id, done);
                }
            ], (err) => {
                res.redirect("/myimages");
            });
        } else {
            req.flash("errorMessages", "Can't delete an image you don't own");
            res.redirect("/images");
        }
    },
    /* verify that the form was filled out
    then create image with that info
    then we push its id into the user and save it */
    new: (req, res) => {
        if (req.body && req.body.url && req.body.title) {
            //overload the req.body for simplicity in creating image
            req.body.date = new Date();
            Image.create(req.body, (err, img) => {
                if (err) return res.redirect("/myimages");
                req.user.images.push(img._id);
                req.user.save((err) => {
                    res.redirect("/myimages");
                });
            });
        } else {
            res.redirect("/myimages");
        }
    }
};

/* deletes an image id from a users array of images
and saves it in the database */
function removeImageId(user, id, done) {
    for (let i = 0; i < user.images.length; i++) {
        if (user.images[i].equals(id)) {
            user.images.splice(i, 1);
            return user.save(done);
        }
    }
}

/* tells if a img is owned by a user by comparing all of the users
image ids to the images using .equals() (so can't use .includes())*/
function isOwned(imgId, user) {
    if (!user || !imgId) return false;

    for (let i = 0; i < user.images.length; i++) {
        if (user.images[i].equals(imgId)) {
            return true;
        }
    }
    return false;
}
