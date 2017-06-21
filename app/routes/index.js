"use strict";

const mw = require("../middlewares");
const user = require("../controllers/users.js");
const image = require("../controllers/images.js");

module.exports = (app, passport) => {

    app.get("/", (req, res) => {
        res.render("index");
    });

    app.get("/myimages", mw.forceLogIn, user.userImages);

    app.get("/images/new", mw.forceLogIn, image.showNew);
    app.post("/images/new", mw.forceLogIn, mw.parseForm, image.new);

    app.get("/images/:id", image.show);

    app.get("/images/:id/delete", mw.forceLogIn, image.delete);

    //calling all of the routes for logging in
    require("./auth.js")(app, passport);

    //catches any bad paths
    // app.get("*", (req, res) => {
    //     res.redirect("/");
    // });

};
