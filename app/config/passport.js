"use strict";

const TwitterStrategy = require("passport-twitter").Strategy;
const User = require("../models/users");
const configAuth = require("./auth");

module.exports = (passport) => {
    //default passport
    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });

    //finds the user by id when it needs to be loaded
    passport.deserializeUser((id, cb) => {
        User.findById(id, (err, user) => {
            cb(err, user);
        });
    });

    //twtter strategy
    passport.use(new TwitterStrategy(configAuth.twitterAuth, (token, refresh, profile, cb) => {
        process.nextTick(() => {
            /*attempt to find a user, but if there isnt't one,
            we create a new user*/
            User.findOne({"twitter.id": profile.id}, (err, user) => {
                if (err) return cb(err);
                if (user) return cb(null, user);
                else {
                    const newUser = new User({
                        twitter: {
                            id: profile.id,
                            username: profile.username,
                            displayName: profile.displayName
                        },
                        images: []
                    });

                    newUser.save((err) => {
                        if (err) throw err;
                        return cb(null, newUser);
                    });
                }
            });
        });
    }));
};
