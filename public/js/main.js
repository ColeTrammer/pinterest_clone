$(document).ready(() => {
    $(".img-grid").imagesLoaded(() => {
       $(".img-grid").masonry({
            itemSelector: ".img",
            gutter: 2
       });
    });
});
