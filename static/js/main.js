$(function() {

    "use strict";

    /*================*/
    /* 01 - VARIABLES */
    /*================*/
    var swipers = [], winW, winH, winScr, _isresponsive, smPoint = 767, mdPoint = 992,
        lgPoint = 1200, addPoint = 1600,
        _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i),
        tabFinish = 0;


    /*========================*/
    /* 02 - page calculations */
    /*========================*/
    function pageCalculations(){
        winW = $(window).width();
        winH = $(window).height();
        if($('.menu-button').is(':visible')) _isresponsive = true;
        else _isresponsive = false;
    }

    /*=================================*/
    /* 03 - function on document ready */
    /*=================================*/
    pageCalculations();

    /*============================*/
    /* 04 - WINDOW LOAD */
    /*============================*/
    $(window).load(function(){
        $('#loader').fadeOut();
        initSwiper();
        if($('.container-masonry').length) {
            $('.container-masonry').masonry({
                itemSelector: '.item-masonry',
                columnWidth: '.item-masonry'
            });
        };
    });

    /*============================*/
    /* 04 - WINDOW SCROLL */
    /*============================*/
    $(window).on('scroll load', function () {
        if( $('.time-line').length) {
            $('.time-line').not('.animated').each(function(){
                if($(window).scrollTop() + $(window).height() > $(this).offset().top){
                    $(this).addClass('animated').find('.count-amount').countTo();
                }
            });
        }
        if( $('.progress-item').length) {
            $('.progress-item').not(".progress-animate").each(function () {
                var elmentPosition = $(this).offset().top,
                    topOfWindow = $(window).scrollTop(),
                    progressTo = $(this).find('.progress-to').data('to');

                if (topOfWindow + $(window).height() > elmentPosition) {
                    $(this).addClass("progress-animate").find('.progress-to').countTo();
                    $(this).find('.progress-line-current').width(progressTo + '%');
                }
            });
        }
        if( $('.chart-box').length) {
            $('.chart-box').each(function () {
                var elmentPosition = $(this).offset().top,
                    topOfWindow = $(window).scrollTop();
                if (topOfWindow + $(window).height() > elmentPosition) {
                    $(this).find('.chart').easyPieChart({
                        easing: 'easeOutBounce',
                        barColor: '#dc3c4b',
                        trackColor: '#f7f7f7',
                        lineWidth: 5,
                        scaleColor: 'transparent',
                        onStep: function (from, to, percent) {
                            $(this.el).find('.percent').text(Math.round(percent));
                        }
                    });
                }
            });
        }
        if($(window).scrollTop() > 500) {
            $('.scroll-top').addClass('active');
        }else {
            $('.scroll-top').removeClass('active');
        }

        if($(window).scrollTop() > 80) {
            $('.header').addClass('fixed');
        }else {
            $('.header').removeClass('fixed');
        }

    });


    /*==============================*/
    /* 05 - function on page resize */
    /*==============================*/
    function resizeCall(){
        pageCalculations();

        $('.swiper-container.initialized[data-slides-per-view="responsive"]').each(function(){
            var thisSwiper = swipers['swiper-'+$(this).attr('id')], $t = $(this), slidesPerViewVar = updateSlidesPerView($t), centerVar = thisSwiper.params.centeredSlides;
            thisSwiper.params.slidesPerView = slidesPerViewVar;
            thisSwiper.reInit();
            if(!centerVar){
                var paginationSpan = $t.find('.pagination span');
                var paginationSlice = paginationSpan.hide().slice(0,(paginationSpan.length+1-slidesPerViewVar));
                if(paginationSlice.length<=1 || slidesPerViewVar>=$t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
                else $t.removeClass('pagination-hidden');
                paginationSlice.show();
            }
        });
    }
    if(!_ismobile){
        $(window).resize(function(){
            resizeCall();
        });
    } else{
        window.addEventListener("orientationchange", function() {
            resizeCall();
        }, false);
    }

    /*=====================*/
    /* 07 - swiper sliders */
    /*=====================*/
    function initSwiper(){
        var initIterator = 0;
        $('.swiper-container').each(function(){
            var $t = $(this);

            var index = 'swiper-unique-id-'+initIterator;

            $t.addClass('swiper-'+index + ' initialized').attr('id', index);
            $t.find('.pagination').addClass('pagination-'+index);

            var autoPlayVar = parseInt($t.attr('data-autoplay'));
            var centerVar = parseInt($t.attr('data-center'));
            var simVar = ($t.closest('.circle-description-slide-box').length)?false:true;

            var slidesPerViewVar = $t.attr('data-slides-per-view');
            if(slidesPerViewVar == 'responsive'){
                slidesPerViewVar = updateSlidesPerView($t);
            }
            else slidesPerViewVar = parseInt(slidesPerViewVar);

            var loopVar = parseInt($t.attr('data-loop'));
            var speedVar = parseInt($t.attr('data-speed'));

            swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
                speed: speedVar,
                pagination: '.pagination-'+index,
                loop: loopVar,
                paginationClickable: true,
                autoplay: autoPlayVar,
                slidesPerView: slidesPerViewVar,
                keyboardControl: true,
                calculateHeight: true,
                simulateTouch: simVar,
                centeredSlides: centerVar,
                roundLengths: true,
				onInit: function(swiper){
				   var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
				   if($t.closest('.testi-slider').length){
					   $t.css({
						height: $t.find('.swiper-slide').eq(activeIndex).height()
					  });
					}
				},
                onSlideChangeEnd: function(swiper){
                    var activeIndex = (loopVar===1)?swiper.activeLoopIndex:swiper.activeIndex;
                    var qVal = $t.find('.swiper-slide-active').attr('data-val');
                    $t.find('.swiper-slide[data-val="'+qVal+'"]').addClass('active');
                },
                onSlideChangeStart: function(swiper){
					var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
                    $t.find('.swiper-slide.active').removeClass('active');
					if($t.closest('.testi-slider').length){
					   $t.css({
						height: $t.find('.swiper-slide').eq(activeIndex).height()
					  });
					}
					  
                },
                onSlideClick: function(swiper){

                }
            });
            swipers['swiper-'+index].reInit();
            if(!centerVar){
                if($t.attr('data-slides-per-view')=='responsive'){
                    var paginationSpan = $t.find('.pagination span');
                    var paginationSlice = paginationSpan.hide().slice(0,(paginationSpan.length+1-slidesPerViewVar));
                    if(paginationSlice.length<=1 || slidesPerViewVar>=$t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
                    else $t.removeClass('pagination-hidden');
                    paginationSlice.show();
                }
            }
            initIterator++;
        });

    }

    function updateSlidesPerView(swiperContainer){
        if(winW>=addPoint) return parseInt(swiperContainer.attr('data-add-slides'));
        else if(winW>=lgPoint) return parseInt(swiperContainer.attr('data-lg-slides'));
        else if(winW>=mdPoint) return parseInt(swiperContainer.attr('data-md-slides'));
        else if(winW>=smPoint) return parseInt(swiperContainer.attr('data-sm-slides'));
        else return parseInt(swiperContainer.attr('data-xs-slides'));
    }

    //swiper arrows
    $('.swiper-arrow-left').click(function(){
        swipers['swiper-'+$(this).parent().attr('id')].swipePrev();
    });

    $('.swiper-arrow-right').click(function(){
        swipers['swiper-'+$(this).parent().attr('id')].swipeNext();
    });

    //swiper arrows
    $('.portfolio-prev').click(function(){
        swipers['swiper-'+$(this).closest('.section').find('.swiper-container').attr('id')].swipePrev();
    });

    $('.portfolio-next').click(function(){
        swipers['swiper-'+$(this).closest('.section').find('.swiper-container').attr('id')].swipeNext();
    });


    /*==============================*/
    /* 08 - buttons, clicks, hovers */
    /*==============================*/

    //Menu mobile
    $('.open-menu').on('click', function (e) {
        e.preventDefault();
        $('.nav').addClass('active');
    });

    $('.close-menu').on('click', function (e) {
        e.preventDefault();
        $('.nav').removeClass('active');
    });

    $('.open-minimal-menu').on('click', function (e) {
        e.preventDefault();
        $('.minimal-nav').addClass('active');
    });

    $('.open-sb-menu').on('click', function () {
        $(this).next('.sb').slideToggle();
        $(this).closest('li').toggleClass('mobile-active');
    });

    $('.open-sbw-menu').on('click', function () {
        $(this).parent().next('.sbw').slideToggle();
        $(this).parent().toggleClass('mobile-active-title');
    });

    $('.close-mini-menu').on('click', function (e) {
        e.preventDefault();
        $('.minimal-nav').removeClass('active');
    });

    //CLOSE MESSAGE BOX
    $('.close-message').on('click', function (e) {
        e.preventDefault();
        $(this).parent().fadeOut();
    });


    //ADD MORE INFO
    $('.add-more').on('click', function (e) {
        e.preventDefault();
        var $this = $(this),
            parent =  $this.closest('.a-info-container'),
            elements = parent.find('.clone').clone();

        parent.find('.row').append(elements);
    });

    //ADD MORE WORK
    $('.btn-more').on('click', function (e) {
        e.preventDefault();

        var parent = $(this).parent().prev(),
            clone = parent.find('.mix').clone();

        parent.append(clone);
    });

    $('.append-button').on( 'click', function(e) {
        e.preventDefault();
        // create new item elements
        var $items = $('.item-masonry').clone();
        // append items to grid
        $('.container-masonry').append( $items ).masonry( 'appended', $items );
    });

    //HIDE INFO
    $('.hide-info').on('click', function () {
		if ($('.hide-block').hasClass('act')){
		    $('.hide-block').removeClass('act');
			$(this).removeClass('active');
			$(this).find('span').text($(this).attr('data-hide'));
		}else{
		    $('.hide-block').addClass('act');
		    $(this).addClass('active');
			$(this).find('span').text($(this).attr('data-show'));
		}
		return false;
		
//        $(this).closest('.a-info-container').find('.hide-block').addClass('act');
    });

    //SEARCH AREA
    $('.search-icon').on('click', function (e) {
        e.preventDefault();
        $('.search-panel').addClass('active');
    });

    $('.close-search').on('click', function (e) {
        e.preventDefault();
        $('.search-panel').removeClass('active');
    });

    $('.soc-icon').on('click', function (e) {
        e.preventDefault();
        $('.social-area').addClass('active');
    });

    $('.close-social').on('click', function (e) {
        e.preventDefault();
        $('.social-area').removeClass('active');
    });


    //SCROLL TOP
    $('.scroll-top').on('click', function (e) {
        e.preventDefault();
        $('body, html').animate({'scrollTop': 0}, 800);
    });

    //SCROLL TO
    $('.scroll-to').on('click', function (e) {
        e.preventDefault();
        $('html,body').stop().animate({ scrollTop: $('.start-block').offset().top - 60 }, 800);
    });

    $('.minimal-scroll').on('click', function (e) {
        e.preventDefault();
        $('html,body').stop().animate({ scrollTop: $('.start-block-minimal').offset().top }, 800);
    });


    //Play video
    $('.play').on('click', function (e) {
        e.preventDefault();
        var src = $(this).data('src');
        $(this).hide();
        $('.video').attr('src', src).fadeIn();
        setTimeout(function() {
            $('.poster').addClass('hideposter');
        },2500);

    });

	

       $(document).on('click', '.open-m-popup' , function () {
		   var popupContent = $(this).parent().find('.popup-content');
		   
			 $('.popup-content').each(function(){
                 popupContent.clone().appendTo('.medical-popup');
		         $('.medical-popup').addClass('act');
			 });
		    return false; 	        
	   });
	
	   $(document).on('click', '.close-medical',  function () {
		   $('.medical-popup').removeClass('act');
		   $('.medical-popup').find('.popup-content').remove();
	   });
                

    /*==============================*/
    /* 09 - interface */
    /*==============================*/
    //Accordion
    $('.accordion-title').on('click', function () {
        var $this = $(this);

        $this.toggleClass('active');
        $this.next('.accordion-content').stop().slideToggle();

    });

    //TABS
    $('.nav-tab-item').on('click', function(){
        var $this = $(this),
            parent = $this.closest('.tab-wrapper'),
            index = parent.find('.nav-tab-item').index(this);

        if(tabFinish || $this.hasClass('active')) return false;
        tabFinish = 1;
        $this.closest('.nav-tab').find('.nav-tab-item').removeClass('active');
        $this.addClass('active');
        parent.find('.tab-info:visible').fadeOut(300, function() {
            parent.find('.tab-info').eq(index).fadeIn(300, function() {
                tabFinish = 0;
            });
        });
    });



    /*==============================*/
    /* 10 - PLUGINS INIT */
    /*==============================*/
    //FILTER INIT
    if($('.container-mix').length) {
        $('.container-mix').mixItUp(
            {
                animation: {
                    duration: 400,
                    effects: 'fade translateZ(-360px) stagger(34ms)',
                    easing: 'ease'
                }
            }
        );};

    //AUDIO PLAYER INIT
    if($('audio').length) {
        $('audio').mediaelementplayer();
    }


    //SLIDER
    if($( "#slider-range").length) {
        $( "#slider-range" ).slider({
            range: true,
            min: 0,
            max: 500,
            values: [ 75, 300 ],
            slide: function( event, ui ) {
                $( "#amount" ).val( "€" + ui.values[ 0 ] + " - €" + ui.values[ 1 ] );
            }
        });
        $( "#amount" ).val( "€" + $( "#slider-range" ).slider( "values", 0 ) +
            " - €" + $( "#slider-range" ).slider( "values", 1 ) );
    }

});