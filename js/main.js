;(function () {
	
	'use strict';



	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	// Main Menu Superfish
	var mainMenu = function() {

		$('#fh5co-primary-menu').superfish({
			delay: 0,
			animation: {
				opacity: 'show'
			},
			speed: 'fast',
			cssArrows: true,
			disableHI: true
		});

	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};


	// Offcanvas and cloning of the main menu
	var offcanvas = function() {

		var $clone = $('#fh5co-menu-wrap').clone();
		$clone.attr({
			'id' : 'offcanvas-menu'
		});
		$clone.find('> ul').attr({
			'class' : '',
			'id' : ''
		});

		$('#fh5co-page').prepend($clone);

		// click the burger
		$('.js-fh5co-nav-toggle').on('click', function(){

			if ( $('body').hasClass('fh5co-offcanvas') ) {
				$('body').removeClass('fh5co-offcanvas');
			} else {
				$('body').addClass('fh5co-offcanvas');
			}
			// $('body').toggleClass('fh5co-offcanvas');

		});

		$('#offcanvas-menu').css('height', $(window).height());

		$(window).resize(function(){
			var w = $(window);


			$('#offcanvas-menu').css('height', w.height());

			if ( w.width() > 769 ) {
				if ( $('body').hasClass('fh5co-offcanvas') ) {
					$('body').removeClass('fh5co-offcanvas');
				}
			}

		});	

	}

	

	// Click outside of the Mobile Menu
	var mobileMenuOutsideClick = function() {
		$(document).click(function (e) {
	    var container = $("#offcanvas-menu, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('fh5co-offcanvas') ) {
				$('body').removeClass('fh5co-offcanvas');
			}
	    }
		});
	};


	// Animations

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							el.addClass('fadeInUp animated');
							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};
	

	// Document on load.
	$(function(){
		mainMenu();
		parallax();
		offcanvas();
		mobileMenuOutsideClick();
		contentWayPoint();
		

	});


	//navbar transition.
//    window.onscroll = () => {
//        const nav = document.querySelector('#fh5co-header-section');
//        if(window.scrollY <= 10) nav.className = ''; else nav.className = 'scroll';
//    };
//
//    var nav = $('.content-nav');
    // Hide Header on on scroll down

//    var didScroll;
//    var lastScrollTop = 0;
//    var delta = 5;
//    const nav = document.querySelector('#fh5co-header-section');
//    var navbarHeight = $('header').outerHeight();
//    
//
//    $(window).scroll(function(event){
//        didScroll = true;
//    });
//
//    setInterval(function() {
//        if (didScroll) {
//            hasScrolled();
//            didScroll = false;
//        }
//    }, 250);
//
//    function hasScrolled() {
//        var st = document.documentElement.scrollTop;
//        //console.log(st, lastScrollTop, navbarHeight);
//        // Make sure they scroll more than delta
//        if(Math.abs(lastScrollTop - st) <= delta)
//            return;
//        
//
//        // If they scrolled down and are past the navbar, add class .nav-up.
//        // This is necessary so you never see what is "behind" the navbar.
////        console.log('has scroll');
//        if (st > lastScrollTop && st > navbarHeight){
//            // Scroll Down
////            $('header').addClass('nav-up');
//            nav.className = 'nav-up';
//        } else {
//            // Scroll Up
//            if(st + $(window).height() < $(document).height()) {
//                nav.className = '';
//                nav.style.background = 'white';
//                //$('header').removeClass('nav-up');
//            }   
//        }
//
//        lastScrollTop = st;
//    }
    

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(window).scrollTop();
    
    console.log(st, lastScrollTop, navbarHeight);
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
         console.log("add class");
        $('header').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
             console.log("remove class");
            $('header').removeClass('nav-up').addClass('nav-down');
        }
    }
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta) {
        console.log("return");
        return;
    }
    
    lastScrollTop = st;   
    
}

    //smooth page scroll.
    $(document).ready(function(){
        // Add smooth scrolling to all links
        $("a").on('click', function(event) {

            // Make sure this.hash has a value before overriding default behavior
            if (this.hash !== "") {
                // Prevent default anchor click behavior
                //event.preventDefault();

                // Store hash
                var hash = this.hash;

                // Using jQuery's animate() method to add smooth page scroll
                // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area


                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 800, function(){

                    // Add hash (#) to URL when done scrolling (default click behavior)
                    window.location.hash = hash;
                });

                /*if (nav.length) {
                    var contentNav = nav.offset().top;


                }*/

            } // End if
        });
    });


}());