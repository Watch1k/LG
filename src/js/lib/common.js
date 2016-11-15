/* Common JS */
$(document).ready(function () {

	initValidator();
	initPhoneMask();

	// Clear placeholder
	(function () {
		var el = $('input, textarea');
		el.focus(function () {
			$(this).data('placeholder', $(this).attr('placeholder'));
			$(this).attr('placeholder', '');
		});
		el.blur(function () {
			$(this).attr('placeholder', $(this).data('placeholder'));
		});
	})();

	// Ajax Form
	(function () {
		var subForm = $('.js-form');

		subForm.submit(function (e) {
			e.preventDefault();
			var post_data = subForm.serialize();

			// Ajax post data to server
			$.post('mail.php', post_data, function(response){
				if (response.type == 'error'){
					// your code here
				} else {
					// your code here
					$.get('modals/modal_notify.html', function (data) {
						$('body').addClass('is-locked').append(data);
						$('.js-modal').fadeIn();
						initModalClose();
					});
					setTimeout(function () {
						$('.js-modal').fadeOut(function () {
							$(this).remove();
						});
						$('body').removeClass('is-locked');
						subForm.trigger('reset');
					},5000);
				}
			}, 'json');
		});
	})();

	function initModalClose() {
		var modal = $('.js-modal'),
			closeBtn = $('.js-modal-close');

		closeBtn.on('click', function () {
			$(this).closest(modal).fadeOut(function () {
				$('body').removeClass('is-locked');
				$(this).remove();
			});
		});

		modal.on('click', function (e) {
			if (!$(this).is(e.target)) {
				//code here
			} else {
				$(this).fadeOut(function () {
					$('body').removeClass('is-locked');
					$(this).remove();
				});
			}
		});

		return false;
	}

	function initValidator(){
		$.validate({
			validateOnBlur : true,
			showHelpOnFocus : false,
			addSuggestions : false,
			scrollToTopOnError: false,
			borderColorOnError : '#FF0000'
		});
	}

	function initPhoneMask(){
		var phoneInput = $(".js-phone-mask");

		phoneInput.mask("+9(999)999-99-99");

		//SET CURSOR POSITION
		$.fn.setCursorPosition = function(pos) {
			this.each(function(index, elem) {
				if (elem.setSelectionRange) {
					elem.setSelectionRange(pos, pos);
				} else if (elem.createTextRange) {
					var range = elem.createTextRange();
					range.collapse(true);
					range.moveEnd('character', pos);
					range.moveStart('character', pos);
					range.select();
				}
			});
			return this;
		};

		phoneInput.on('focus', function(){
			var _this = $(this);

			setTimeout(function() {
				_this.setCursorPosition(1);
			},100);
		});
	}

	(function () {
		var counter = $('.js-counter');

		var clock = counter.FlipClock({
			autoStart: false
		});

		clock.setTime(22288);
		clock.setCountdown(true);
		clock.start();
	})();

	(function () {
		var header = $('.js-header');

		$(document).scroll(function () {
			if ($(window).scrollTop() > 10) {
				header.addClass('is-active');
			} else {
				header.removeClass('is-active');
			}
		});
	})();

	(function () {
		var commentsBtn = $('.js-comments-btn'),
			commentsItem = $('.js-comments').children();

		commentsBtn.on('click', function (e) {
			e.preventDefault();
			var text = $(this).text();
			$(this).text(text == "показать еще" ? "скрыть" : "показать еще");
			commentsItem.each(function () {
				if ($(this).index() > 1) {
					$(this).slideToggle();
				}
			});
		})
	})();

	(function () {
		var toggleBtn = $('.js-hamburger'),
			nav = $('.js-nav'),
			screenBtn = $('.js-screen-btn');

		nav.onePageNav({
			currentClass: 'is-active',
			changeHash: false,
			scrollSpeed: 750,
			scrollThreshold: 0.5,
			filter: '',
			easing: 'swing',
			begin: function() {
				//I get fired when the animation is starting
			},
			end: function() {
				//I get fired when the animation is ending
			},
			scrollChange: function($currentListItem) {
				//I get fired when you enter a section and I pass the list item of the section
			}
		});

		screenBtn.on('click', function () {
			var scrollDistance = $(this).closest('section').next('section').offset().top;
			$("html, body").animate({scrollTop: scrollDistance}, 1000);
		});

		toggleBtn.on('click', function () {
			$(this).toggleClass('is-active');
			nav.toggleClass('is-active');
		});

		$(window).resize(function () {
			toggleBtn.removeClass('is-active');
			nav.removeClass('is-active');
		})
	})();
});