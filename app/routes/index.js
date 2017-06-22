"use strict";

const mw = require("../middlewares");
const user = require("../controllers/users.js");
const image = require("../controllers/images.js");

module.exports = (app, passport) => {

    //default shows images
    app.get("/", (req, res) => {
        res.redirect("/images");
    });

    //get all users
    app.get("/users", user.all);

    //gets a user's images
    app.get("/users/:id", user.getImages);

    //users images
    app.get("/myimages", mw.forceLogIn, user.userImages);

    //route for viewing all images
    app.get("/images", image.all);

    //routes for new images
    app.get("/images/new", mw.forceLogIn, image.showNew);
    app.post("/images/new", mw.forceLogIn, mw.parseForm, image.new);

    //shows image
    app.get("/images/:id", image.show);

    //deletes image
    app.get("/images/:id/delete", mw.forceLogIn, image.delete);

    //calling all of the routes for logging in
    require("./auth.js")(app, passport);

    //catches any bad paths
    app.get("*", (req, res) => {
        res.status("404")
        res.send(`<a href="/">Not Found</a>`);
    });

};
