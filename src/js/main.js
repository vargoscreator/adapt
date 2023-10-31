(function ($) {
	'use strict';
	$(document).ready(function () {
		window.addEventListener('scroll', function () {
			let yOffset = window.pageYOffset;
			let parallaxLayers = document.querySelectorAll('.parallax-video');
			parallaxLayers.forEach(function (layer, index) {
				let speed = .1 * (index + .5); // Змініть цей параметр, щоб відрегулювати швидкість ефекту
				let translateValue = yOffset * speed;
				layer.style.transform = `translate3d(0, ${translateValue}px, 0)`;
			});
		});

		const parallaxContainer = document.querySelector(".parallax-container");
		const parallaxVideo = document.querySelector(".parallax-video");
		parallaxContainer.addEventListener("mousemove", (e) => {
			const x = e.clientX / window.innerWidth;
			const y = e.clientY / window.innerHeight;

			parallaxVideo.style.transform = `translate(-${x * 50}px, -${y * 50}px)`;
		});
		//*-------------------- */
		gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);
		const block = document.querySelector(".block");
		const circle = document.querySelector(".circle");
		const motionPath = document.querySelector("#motionPathLine");
		if (window.innerWidth > 1200) {
			gsap.set(circle, { xPercent: -50, yPercent: -50 });
			gsap.to(circle, {
				duration: 100, // Тривалість анімації руху круга
				motionPath: {
					path: motionPath,
					align: motionPath,
				},
				ease: Power0.easeOut, // Встановлюємо тип ефекту
				scrollTrigger: {
					trigger: block,
					start: "top center",
					end: "bottom center",
					scrub: 0.0001, // Зменшена швидкість
				},
			});
		} else {
			gsap.set(circle, { xPercent: -50, yPercent: -50 });
			gsap.to(circle, {
				duration: 10000000, // Тривалість анімації руху круга
				motionPath: {
					path: motionPath,
					align: motionPath,
				},
				scrollTrigger: {
					trigger: block,
					start: "top 150px",
					end: "bottom top",
					scrub: 0.0001, // Зменшена швидкість
					//markers: true, // Відображення маркерів ScrollTrigger для тестування
				},
			});
		}
		/** ------------Open/close accordeon---------------- */
		const accordionItems = document.querySelectorAll('.accordion-item');
		accordionItems.forEach(item => {
			const checkbox = item.querySelector('input[type="checkbox"]');
			const content = item.querySelector('.accordion-content');
			const label = item.querySelector('label');
			checkbox.addEventListener('change', () => {
				if (checkbox.checked) {
					content.style.maxHeight = content.scrollHeight + 'px';
					// Закрити попередні відкриті елементи
					accordionItems.forEach(prevItem => {
						if (prevItem !== item) {
							const prevCheckbox = prevItem.querySelector('input[type="checkbox"]');
							prevCheckbox.checked = false;
							prevItem.querySelector('.accordion-content').style.maxHeight = 0;
							prevItem.querySelector('.accordion-content').style.opacity = 1;
						}
					});
				} else {
					content.style.maxHeight = 0;
				}
			});
		});
		/**------------------- */
		/**--------Visible element--------- */
		function checkVisibility() {
			const elementsToAppear = document.querySelectorAll('.hidden');
			elementsToAppear.forEach((element) => {
				const elementTop = element.getBoundingClientRect().top;
				const windowHeight = window.innerHeight;

				if (elementTop < windowHeight * 0.5) {
					element.classList.remove('hidden');
				}
			});
		}
		window.addEventListener('load', checkVisibility);// Викликати функцію при завантаженні сторінки і при кожному скролі
		window.addEventListener('scroll', checkVisibility);
		/*---------------------*/
		/*---------Visible element right and left------------*/
		function addActiveClass() {
			const elementsToAppear = document.querySelectorAll('.testing__item');
			const leftList = document.querySelector(".left-list");
			const rightList = document.querySelector(".right-list");
			elementsToAppear.forEach((element) => {
				const elementTop = element.getBoundingClientRect().top;
				const windowHeight = window.innerHeight;
				if (elementTop < windowHeight * 0.9 && !element.classList.contains("active")) {
					element.classList.add("active");
					if (!leftList.classList.contains("active")) {
						leftList.classList.add("active");
					}

					if (!rightList.classList.contains("active")) {
						rightList.classList.add("active");
					}
				}
			});
		}
		document.addEventListener("DOMContentLoaded", addActiveClass); // Викликати функцію при завантаженні сторінки і при кожному скролі
		document.addEventListener("scroll", addActiveClass);

		/*---------------------------*/
		$('.nav__mobile-btn').on('click', function (e) {
			e.preventDefault();
			toggleMenu();
		});

		wpmmMobileMenuActive();
		$(window).on('resize load scroll', function () {
			wpmmMobileMenuActive();
		});

		$('.header.header-mobile .nav__list a').on('click', function (e) {
			if (mobileMenuIsActive())
				toggleMenu();
		})

		$("a").on('click', function (event) {
			if (this.hash !== "") {
				event.preventDefault();
				var hash = this.hash;
				$('html, body').animate({
					scrollTop: $(hash).offset().top
				}, 1100, function () {
					// Добавить хэш (#) для URL-адреса после завершения прокрутки (поведение щелчка по умолчанию)
					window.location.hash = hash;
				});

				if (mobileMenuIsActive()) {
					$('header.header-mobile').removeClass('active');
					$('html, body').css('overflow-y', 'visible');
				}
			}
		});
	});

	let mobileMenuIsActive = function () {
		return jQuery('header.header').hasClass('header-mobile');
	};
	function toggleMenu() {
		jQuery('header.header-mobile').toggleClass('active');
		if (jQuery('header.header-mobile').hasClass('active')) {
			$('html, body').css('overflow-y', 'hidden');
		} else {
			$('html, body').css('overflow-y', 'visible');
		}
	}
	// Add mobile class if mobile menu active
	function wpmmMobileMenuActive() {
		let current_width = parseInt($(window).width());
		const responsive_breakpoint = 900;

		if (current_width < (responsive_breakpoint + 1)) {
			if (!mobileMenuIsActive()) {
				$('header.header').addClass('header-mobile');
				if ($('header.header').hasClass('active')) {
					$('html, body').css('overflow-y', 'hidden');
				}
			}
		} else {
			if (mobileMenuIsActive()) {
				$('header.header').removeClass('header-mobile');
				$('html, body').css('overflow-y', 'visible');
			}
		}
	}
	function onEntry(entry) {
		entry.forEach(change => {
			if (change.isIntersecting) {
				change.target.classList.add('element-show');
			}
		});
	}
	let options = { threshold: [0.5] };
	let observer = new IntersectionObserver(onEntry, options);
	let elements = document.querySelectorAll('.element-animation');
	for (let elm of elements) {
		observer.observe(elm);
	}
})(jQuery);








document.addEventListener('DOMContentLoaded', function() {
    let cursor = document.querySelector('.cb-cursor');
    function changeColorToWhite() {
        cursor.style.color = 'white';
    }

    function resetColor() {
        cursor.style.color = '';
    }

    let sections = document.querySelectorAll('.vision, .faq, .footer');
    sections.forEach(section => {
        section.addEventListener('mouseenter', changeColorToWhite);
        section.addEventListener('mouseleave', resetColor);
    });

    function moveCursor(e) {
        let x = e.clientX;
        let y = e.clientY;
        cursor.style.transform = `translate(${x}px, ${y}px)`;
    }

    document.addEventListener('mousemove', moveCursor);

	document.body.style.overflowY = 'hidden';
    setTimeout(function() {
        document.body.style.overflowY = 'auto';
    }, 2000);
});
