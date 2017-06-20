"use strict";

const mw = require("../middlewares");

module.exports = (app, passport) => {

    app.get("/", (req, res) => {
        res.render("index");
    });

    //calling all of the routes for logging in
    require("user.js")(app, passport);

    //catches any bad paths
    app.get("*", (req, res) => {
        res.redirect("/");
    });
    
};
