$(function () {

  $('a[href^="#"]').click(function( ) {
      $('html, body').animate({
          'scrollTop': $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top
      }, 500);
      $('html, body').animate({
          'scrollLeft': $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().left
      }, 500);

      return false;
  });







/* prófa næst f section anchor :
        function moveTo(sectionAnchor, slideAnchor){
            var destiny = getSectionByAnchor(sectionAnchor);

            if (typeof slideAnchor !== 'undefined'){
                scrollPageAndSlide(sectionAnchor, slideAnchor);
            }else if(destiny != null){
                scrollPage(destiny);
            }
        }
*/







/*
bætti þessu að neðan við til að taka linkinn í vinstra niðri horninu sem er sjukt pirrandi,
veit ekki hversu sniðugt þetta er samt.
curserinn breyttist við þetta allavega
Æ ekki gott því þá virkar ekki að hoppa á milli útgáfa t.d.
*/
/*
$("body").on('mouseover', 'a', function (e) {
    var $link = $(this),
        href = $link.attr('href') || $link.data("href");

    $link.off('click.chrome');
    $link.on('click.chrome', function () {
        window.location.href = href;
    })
    .attr('data-href', href) //keeps track of the href value
    .removeAttr('href'); // <- this is what stops Chrome to display status bar
});
*/


/*

function prevEdition( ) {
    var leftScroll = $(window).scrollLeft();
    var columnIndex = Math.round( leftScroll / $( window ).width( ) ) - 1;
    $( 'html,body' ).animate( { 'scrollLeft': columnIndex * $( window ).width( ) + 'px' }, 100 );

}

function nextEdition( ) {
    var leftScroll = $(window).scrollLeft();
    var columnIndex = Math.round( leftScroll / $( window ).width( ) ) + 1;

    $( 'html,body' ).animate( { 'scrollLeft': columnIndex * $( window ).width( ) + 'px' }, 100 );

}

$( 'html, body' ).swipeLeft( prevEdition )
                 .swipeRight( nextEdition );


*/



  var $document = $(document),
      left = 0,
      scrollTimer = 0;
  
  // Detect horizontal scroll start and stop.
  // Detect horizontal scroll start and stop.
  $document.on("scroll", function ( e ) {

    var docLeft = $document.scrollLeft();

    if(left !== docLeft) {
      var self = this, args = arguments;

      if(!scrollTimer) {
        // We've not yet (re)started the timer: It's the beginning of scrolling.
        startHScroll.apply(self, args);
      }

      window.clearTimeout(scrollTimer);

      scrollTimer = window.setTimeout(function () {
        scrollTimer = 0;

        // Our timer was never stopped: We've finished scrolling.
        stopHScroll.apply(self, args);
      }, 100);

      left = docLeft;
    }
  });
  
  // Horizontal scroll started - Make div's absolutely positioned.
  function startHScroll () {
    console.log("Scroll Start");

    $(".fastAUtgafu")
    // Clear out any left-positioning set by stopHScroll.
    .css("left","")
    .each(function () {
      var $this = $(this),
          pos = $this.offset();
      // Preserve our current vertical position...
      $this.css("top", pos.top)
    })
    // ...before making it absolutely positioned.
    .css("position", "absolute");
  }
  
  // Horizontal scroll stopped - Make div's float again.
  function stopHScroll () {
    var leftScroll = $(window).scrollLeft();
    console.log("Scroll Stop");

//    var columnIndex = Math.round( leftScroll / $( window ).width( ) );
//    $( 'html,body' ).animate( { 'scrollLeft': columnIndex * $( window ).width( ) + 'px' }, 100 );

    $(".fastAUtgafu")
      // Clear out any top-positioning set by startHScroll.
      .css("top","")
      .each(function () {
        var $this = $(this), 
          pos = $this.position();
        // Preserve our current horizontal position, munus the scroll position...
        $this.css("left", pos.left-leftScroll);
      })
      // ...before making it fixed positioned.
      .css("position", "fixed");
  }
});


document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImages;  

  if ("IntersectionObserver" in window) {
    lazyloadImages = document.querySelectorAll(".lazy");
    var imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      });
    });

    lazyloadImages.forEach(function(image) {
      imageObserver.observe(image);
    });
  } else {  
    var lazyloadThrottleTimeout;
    lazyloadImages = document.querySelectorAll(".lazy");
    
    function lazyload () {
      if(lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }    

      lazyloadThrottleTimeout = setTimeout(function() {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
            }
        });
        if(lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
          window.removeEventListener("load", lazyload);
        }
      }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
    window.addEventListener("load", lazyload);
  }
});
