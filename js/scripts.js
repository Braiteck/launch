$(() => {
	// Нам доверяют
	$('.clients .slider').owlCarousel({
		nav             : false,
		dots            : false,
		loop            : true,
		smartSpeed      : 500,
		autoplay        : true,
		autoplayTimeout : 3000,
		mouseDrag       : false,
		responsive      : {
	        0 : {
				items  : 2,
				margin : 20
	        },
	        1240 : {
	            items  : 3,
				margin : 24
	        }
		}
	})


	// Параллакс эффект
	parallax()
})



$(window).on('load', () => {
	// Отзывы
	$('.reviews .wheelSlider-container').wheelSlider({
		controls     : true,
		dots         : true,
		items        : 5,
		onSliderLoad : ($el, currentIndex, totalSlides) => {
			const arrowOffset = $el.find('.dots').width() / -2 - 60

			$el.find('.wheelSlider-arrow[data-action="prev"]').css('margin-left', arrowOffset +'px')
			$el.find('.wheelSlider-arrow[data-action="next"]').css('margin-right', arrowOffset +'px')
		}
	})
})



$(window).scroll(() => {
	// Параллакс эффект
	parallax()
})



// Параллакс эффект
function parallax(){
	$('.parallax.speed1').each(function(){
		let parent = $(this).closest('section')
		let parentOffset = parent.offset()

		$(this).css('transform', 'translate3d(0px, '+ ($(window).scrollTop() - parentOffset.top)/-2 +'px, 0px)')
	})

	$('.parallax.speed2').each(function(){
		let parent = $(this).closest('section')
		let parentOffset = parent.offset()

		$(this).css('transform', 'translate3d(0px, '+ ($(window).scrollTop() - parentOffset.top)/-3 +'px, 0px)')
	})

	$('.parallax.speed3').each(function(){
		let parent = $(this).closest('section')
		let parentOffset = parent.offset()

		$(this).css('transform', 'translate3d(0px, '+ ($(window).scrollTop() - parentOffset.top)/-6 +'px, 0px)')
	})
}