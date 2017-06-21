"use strict";

const mongoose = require("mongoose");

/* image model to store link and other info */
const Image = new mongoose.Schema({
    url: String,
    title: String,
    date: Date
});

module.exports = mongoose.model("Image", Image);
