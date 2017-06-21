"use strict";

/* when the url is chaned, it updates the preview image
with the url */
$(document).ready(() => {
    $("#url").on("input", (e) => {
        $("#preview").html(`<img src=${$("#url").val()} onerror="this.onerror=null;this.src='/public/img/noimage.jpg';">`);
    });
});
