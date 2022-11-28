(function($){

	// new Progressive({
	// 	el: '.copa-do-mundo',
	// 	lazyClass: 'lazy',
	// }).fire();

	var containerinstruction= $('.instruction__slick')
	var containerArtilheiros = $('.artilheiros-slick')
	var navArtilheiros = $('.artilheiros-nav')


	containerinstruction.slick({
		autoplay: false,
		autoplaySpeed: 4000,
		pauseOnFocus: false,
		pauseOnHover: false,
		arrows: false,
		dots: false,
		adaptiveHeight: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,

						}
			
			}]
	})




	

	navArtilheiros.find('.item-option').on('click', function(){
		var index = $(this).data('index');
		navArtilheiros.find('.item-option').each(function(i, el){
			$(el).removeClass('item-active');
		})
		$(this).addClass('item-active')
		containerArtilheiros.slick('slickGoTo', index);
	});

	$('body').on('click', '.seemore-button', function(){
            
		$(this).parents('.seemore-container').toggleClass('seemore-close');
		multiSlideAdaptiveHeight($('.container-slick'))

		if ($(this).parents('.seemore-container').hasClass('seemore-close')) {
			$(this).html('Ver mais +');
		} else {
			$(this).html('Ver menos -');
		}
		return false;
	});

	setInterval(function(){
		new Progressive({
			el: '.champions-league',
			lazyClass: 'lazy',
		}).fire();
	}, 1000);

	function multiSlideAdaptiveHeight(slider) {

        var activeSlides = [];
        var tallestSlide = 0;
        
        setTimeout(function() {
        
            $('.slick-track .slick-active', slider).each(function(item) {
                activeSlides[item] = $(this).outerHeight();
            });
        
            activeSlides.forEach(function(item) {
            	if (item > tallestSlide) {
					tallestSlide = item;
				}
			});
        
			$('.slick-list', slider).height(tallestSlide);
        }, 10);
    }

	$('.icon_pesquisa').on('click', function(){

		var modalId = $(this).attr('data-target');

		if ($(this).hasClass('icon_gomo') == true) {
			showBolaModal($(modalId), true);
		} else {
			showGomoModal($(modalId), true);
		}
	})	

	$(".next-modal").click(function() {
		showBolaModal($(this));
	});

	$(".prev-modal").click(function() {
		showGomoModal($(this));
	});

	function showBolaModal($el, $parent = false) {
		var $modal = $el.parents('.modal');

		if ($parent) {
			var $modal = $el;
		} else {
			var $modal = $el.parents('.modal');
		}

		console.log($modal);

		$modal.find(".box-bola").removeClass('active');
		$modal.find(".box-goma").addClass('active');
		$modal.find(".next-modal").removeClass("active");
		$modal.find(".prev-modal").addClass('active');
	}

	function showGomoModal($el, $parent = false) {
		if ($parent) {
			var $modal = $el;
		} else {
			var $modal = $el.parents('.modal');
		}

		console.log($modal);

		$modal.find(".box-bola").addClass('active');
		$modal.find(".box-goma").removeClass('active');
		$modal.find(".prev-modal").removeClass('active');
		$modal.find(".next-modal").addClass('active');
	}
})(jQuery);

