"use strict";

module.exports = (app, passport) => {

    //only log in with twitter, so we just
    //redirect them their
    app.get("/login", (req, res) => {
        res.redirect("/auth/twitter");
    });

    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

    app.get("/auth/twitter", passport.authenticate("twitter"));

    app.get("/auth/twitter/callback", (req, res, next) => {
        /*authenticates the user if their logIn succeeded
        then reads the redirect flash to know where the user was going before they
        logged in*/
        passport.authenticate("twitter",
            (err, user) => {
                if (err) res.redirect("/");
                req.logIn(user, (err) => {
                    if (err) res.redirect("/");
                    const redirect = req.flash("redirect");
                    if (redirect[0])
                        res.redirect(redirect[0]);
                    else
                        res.redirect("/myimages");
                });
            }
        )(req, res, next);
    });

};
