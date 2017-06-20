"use strict";

const mongoose = require("mongoose");

/* user model that stores all info about the user */
const User = new mongoose.Schema({
    twitter: {
        id: String,
        displayName: String,
        username: String
    }
});

module.exports = mongoose.model("User", User);
