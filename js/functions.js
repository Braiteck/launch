$(() => {
	// Проверка браузера
	if (!supportsCssVars()) {
		$('body').addClass('lock')
		$('.supports_error').addClass('show')
	}


	// Есть ли поддержка тач событий или это apple устройство
	if (!is_touch_device() || !/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) $('html').addClass('custom_scroll')


	// Ленивая загрузка
	setTimeout(() => {
		observer = lozad('.lozad', {
			rootMargin : '200px 0px',
			threshold  : 0,
			loaded     : (el) => el.classList.add('loaded')
		})

		observer.observe()
	}, 200)


	// Установка ширины стандартного скроллбара
	$(':root').css('--scroll_width', widthScroll() + 'px')


	// Маска ввода
	$('input[type=tel]').inputmask('+7 (999) 999-99-99')


	// Плавная прокрутка к якорю
	$('.scroll_link').click(function(e) {
		e.preventDefault()

		const href      = $(this).data('anchor'),
			  addOffset = 0

		if ($(this).data('offset')) addOffset = $(this).data('offset')

		$('html, body').stop().animate({ scrollTop: $(href).offset().top - addOffset }, 1000)

		if ($(window).width() < 1024) {
			$('header .mob_menu_btn').removeClass('active')
			$('header .menu, .overlay').fadeOut(300)
		}
	})


	// Табы
	$('.tabs button').click(function(e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			const $parent           = $(this).closest('.tabs_container'),
				  activeTab         = $(this).data('content'),
				  $activeTabContent = $(activeTab),
				  level             = $(this).data('level')

			$parent.find('.tabs:first button').removeClass('active')
			$parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			$activeTabContent.addClass('active')
		}
	})


	// Fancybox
	$.fancybox.defaults.hash             = false
	$.fancybox.defaults.backFocus        = false
	$.fancybox.defaults.autoFocus        = false
	$.fancybox.defaults.animationEffect  = 'zoom'
	$.fancybox.defaults.transitionEffect = 'slide'
	$.fancybox.defaults.speed            = 500
	$.fancybox.defaults.gutter           = 40
	$.fancybox.defaults.i18n             = {
		'en': {
			CLOSE       : "Закрыть",
			NEXT        : "Следующий",
			PREV        : "Предыдущий",
			ERROR       : "Запрошенный контент не может быть загружен.<br /> Пожалуйста, повторите попытку позже.",
			PLAY_START  : "Запустить слайдшоу",
			PLAY_STOP   : "Остановить слайдшоу",
			FULL_SCREEN : "На весь экран",
			THUMBS      : "Миниатюры",
			DOWNLOAD    : "Скачать",
			SHARE       : "Поделиться",
			ZOOM        : "Увеличить"
		}
	}

	// Всплывающие окна
	$('body').on('click', '.modal_link', function(e) {
		e.preventDefault()

		$.fancybox.close(true)

		$.fancybox.open({
			src   : $(this).data('content'),
			type  : 'inline',
			touch : false
		})
	})


	// Моб. версия
	if ($(window).width() < 360) $('meta[name=viewport]').attr('content', 'width=360, user-scalable=no')


	// Моб. меню
	$('header .mob_menu_btn').click((e) => {
		e.preventDefault()

		let _self = $('header .mob_menu_btn')

		if(!_self.hasClass('active')) {
			_self.addClass('active')
			$('header .menu, .overlay').fadeIn(300)
		} else {
			_self.removeClass('active')
			$('header .menu, .overlay').fadeOut(300)
		}
	})

	$('.overlay').click((e) => {
		e.preventDefault()

		$('header .mob_menu_btn').removeClass('active')
		$('header .menu, .overlay').fadeOut(300)
	})
})



$(window).resize(() => {
	// Моб. версия
	$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')

	if ($(window).width() < 360) $('meta[name=viewport]').attr('content', 'width=360, user-scalable=no')
})



// Вспомогательные функции
const is_touch_device = () => !!('ontouchstart' in window)


const widthScroll = () => {
	let div = document.createElement('div')

	div.style.overflowY  = 'scroll'
	div.style.width      = '50px'
	div.style.height     = '50px'
	div.style.visibility = 'hidden'

	document.body.appendChild(div)

	let scrollWidth = div.offsetWidth - div.clientWidth
	document.body.removeChild(div)

	return scrollWidth
}


const supportsCssVars = () => {
	let s = document.createElement('style'),
		support

	s.innerHTML = ":root { --tmp-var: bold; }"

	document.head.appendChild(s)

	support = !!(window.CSS && window.CSS.supports && window.CSS.supports('font-weight', 'var(--tmp-var)'))
	s.parentNode.removeChild(s)

	return support
}