// Instafeed Website: http://instafeedjs.com/
// Inspiration: http://codepen.io/markmurray/pen/dtseB


// pagination buttons
var more = $("#more");
var nomore = $("#nomore");

// feed settings
var feed = new Instafeed({
    get: 'user',
    userId: 179155871,
    accessToken: '179155871.1677ed0.b8a4e970285d40829ea76c2e3235ed20',
    target: 'instafeed',
    limit: 15, // max 60
    sortBy: 'most-recent',
    resolution: 'standard_resolution',
    // when each set of images are loaded... *
    after: function () {
        // * show pagination button
        more.show();
        // * check for more images
        if (!this.hasNext()) {
            more.hide();
            nomore.show();
        }
        // * animate new set of images and add class to each image
        $('.image').not('.animated').velocity('transition.slideUpIn', { stagger: 150 }).addClass('animated');
        // * cache location name
        var loc = $(".location");
        // * hide location if not set
        loc.each(function () {
            if ($(this).is(':empty')) {
                var locParent = $(this).parent();
                locParent.css('visibility', 'hidden').insertAfter(locParent.next());
            }
        });
    },
   

// pagination binding
more.on('click', function () {
    feed.next();
});

// initialize feed
feed.run();