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



	$('#modal-votar').on('shown.bs.modal', function(e) {
		$('body').addClass('modal-open');
		$('.ui-widget.ui-widget-content.ui-autocomplete').css('max-width', $('#modal-votar #cmp12 + .custom-combobox').width() + 'px');
	});

	$('#modal-votar').on('show.bs.modal', function(e) {
		var selected = $('.list-camisas .item.selected');
		$(this).find('input[name="prodId"]').val(selected.data("id"));
		$(this).find('input[name="prodName"]').val(selected.data("name").replace("<span>", "").replace("</span>", ""));
		$(this).find('.img-modal').attr("src", selected.find("img").attr("src-modal"));
	});

	$('#modal-votar form select#cmp12').combobox();

	$('#modal-votar form .custom-combobox input').attr('placeholder', '*Qual time brasileiro você torce?');

	$('#modal-votar form').on('submit', function(event) {
		event.preventDefault();

		var form = $(this);
		var formData = form.serialize();
		var url = 'https://apiinfra.futfanatics.app/voto-top10';
		// var url = 'http://localhost/api-infra/voto-top10';

		form.find('.msg-resp').html('').removeClass('text-success text-danger text-info').slideUp();

		if (!form.find('select').val()) {
			form.find('.msg-resp').html('Escolha o seu time.').addClass('text-info').slideDown();
			return false;
		}
	
		$.post(url, formData, function(response) {
			if (response.status) {
				form.find('.msg-resp').html('Boa jogada, e-mail cadastrado com sucesso!').addClass('text-success').slideDown();

				setTimeout(function() {
					var selected = $('.list-camisas .item.selected');

					$('#modal-votar').modal('hide');
					$('.parte1').addClass('d-none');

					$('.parte2').find('img').attr('src', selected.find('img').attr('src-modal')).attr('alt', selected.find('img').attr('alt'));
					$('.parte2').find('.cupom').html('TOPCAMISAS5<i class="sprite-top10 copy"></i>');
					$('.parte2').find('.btn-ver').attr('href', selected.data('link'));
					$('.parte2').removeClass('d-none');
					$('html, body').animate({
                		scrollTop: ($('#voto-concluido').offset().top - $('#header').height() - $('.header-nav').height() - 50)
                		// scrollTop: 0
            		}, 800);
				}, 1000);
			} else {
				form.find('.msg-resp').html('Desculpe-nos, ocorreu um erro ao cadastrar.').addClass('text-danger').slideDown();
				console.log('Error form dinamize: ' + response.error_msg.result);
			}
		}).fail(function(response) {
			form.find('.msg-resp').html(response.responseJSON.errorMsg).addClass('text-danger').slideDown();
		});

		return false;
	});

	$('.voto-concluido .btn').on('mouseenter', function() {
		$(this).find('i').addClass('white');
	}).on('mouseleave', function() {
		$(this).find('i').removeClass('white');
	});

	function copyToClipboard(element) {
		var $temp = $("<input>");
		$("body").append($temp);
		$temp.val($(element).text()).select();
		document.execCommand("copy");
		$temp.remove();
	}

	$('.voto-concluido .cupom').on('click', function() {
		var $el = this
		copyToClipboard($el);
		$($el).addClass('copied');
		setTimeout(function() {
			$($el).removeClass('copied');
		}, 3000);
	});

	$(document).on('click', '.btn-face', function() {
		FB.ui({
			method: 'share',
			href: 'https://www.futfanatics.com.br/top10camisas2021'
		}, function(response){});
	});

	window.fbAsyncInit = function() {
		FB.init({
			appId            : '1765676850403624',
			autoLogAppEvents : true,
			xfbml            : true,
			version          : 'v3.2'
		});
	};

	(function(d, s, id){
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "https://connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));


})(jQuery);

