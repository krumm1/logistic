$(document).ready(() => {
	"use strict";

	//YandexMetrica begin
	let yaMetricaIndex = "otpravit zayavku";

	$(".menu__phone-link").on("click", () => {
		yaMetricaIndex = "otpravit zayavku";
		ym(61594867, "reachGoal", "zvonok");
		return true;
	});

	$(".menu__back-call-link").on("click", () => {
		yaMetricaIndex = "otpravit_zayavku_oz";
		ym(61594867, "reachGoal", "obratnyi");
		return true;
	});

	$(".main-slider .skew-button").on("click", () => {
		yaMetricaIndex = "otpravit_zayavku_lc";
		ym(61594867, "reachGoal", "luchshie_ceny");
		return true;
	});

	$(".fixed-contacts-btns__btn-item.btn-open-modal").on("click", () => {
		yaMetricaIndex = "otpravit_zayavku_ozl";
		ym(61594867, "reachGoal", "zapros");
		return true;
	});

	$(".fixed-contacts-btns__btn-item.email").on("click", () => {
		yaMetricaIndex = "otpravit zayavku";
		ym(61594867, "reachGoal", "email");
		return true;
	});

	$(".start-work .skew-button").on("click", () => {
		yaMetricaIndex = "otpravit_zayavku_nrs";
		ym(61594867, "reachGoal", "otpravit_zayavku_nr");
		return true;
	});

	$(".contacts .skew-button").on("click", () => {
		yaMetricaIndex = "otpravit zayavku";
		ym(61594867, "reachGoal", "otpravit_zayavku_s");
		return true;
	});

	$(".projects-popup .skew-button").on("click", () => {
		yaMetricaIndex = "otpravit zayavku";
		ym(61594867, "reachGoal", "otpravit_zayavku_pr");
		return true;
	});

	$(".menu__email-link").on("click", () => {
		yaMetricaIndex = "otpravit zayavku";
		ym(61594867, "reachGoal", "email");
		return true;
	});

	$(".menu__tablet-call-back").on("click", () => {
		yaMetricaIndex = "otpravit_zayavku_oz";
		ym(61594867, "reachGoal", "obratnyi");
		return true;
	});

	$(".menu__tablet-button.skew-button").on("click", () => {
		yaMetricaIndex = "otpravit_zayavku_lc";
		ym(61594867, "reachGoal", "luchshie_ceny");
		return true;
	});

	$(".popup-call .skew-button").on("click", () => {
		ym(61594867, "reachGoal", yaMetricaIndex);
		return true;
	});

	//YandexMetrica end

	// clock init start

	function clockInit() {
		let now = new Date();
		let time = document.getElementById("header-time");
		let hours = now.getHours();
		let minutes = now.getMinutes();

		if (hours < 10) hours = "0" + hours;
		if (minutes < 10) minutes = "0" + minutes;
		time.innerHTML = hours + ":" + minutes;
		setTimeout(clockInit, 20000);
	}

	clockInit();

	// clock init end

	$.fn.isInViewport = function () {
		if ($(this).length < 1) return;
		let elementTop = $(this).offset().top + 100;
		let elementBottom = elementTop + $(this).outerHeight();

		let viewportTop = $(window).scrollTop();
		let viewportBottom = viewportTop + $(window).height();

		return elementBottom > viewportTop && elementTop < viewportBottom;
	};

	$(".open-auth-popup").on("click", function (e) {
		e.preventDefault();
		let personalPopup = $(".personal-popup");
		personalPopup.addClass("personal-popup--active");
		personalPopup.find(".popup-call__wrapper").addClass("active");
		$(".content").addClass("active");
		$("body").addClass("overflow");
	});

	$(".personal-popup__button").on("click", function () {
		$(".personal-popup .popup-call__block").toggle();
	});

	$(".feedback-form").submit(function (event) {
		event.preventDefault();
		let $this = $(this);
		$.ajax({
			type: "post",
			url: "/mail.php",
			data: $this.serialize(),
			success: () => {
				$(".content").addClass("active");
				$("#popup-call").addClass("popup-call__open");
				$(".popup-call__wrapper").addClass("active");
				$(".popup-call__success").show();
				grecaptcha.reset();
				$this.trigger("reset");
			},
			error: (res) => {
				alert(res.responseText);
			},
		});
	});

	$(".projects__slider-wrapper").slick({
		dots: false,
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: "linear",
		nextArrow: $(".projects__forward-btn"),
		prevArrow: $(".projects__back-btn"),
	});

	$(".projects__navigation-item-link").click(function (event) {
		let $dataIndex = $(this).attr("data-index");
		$(".projects__slider-wrapper").slick("slickGoTo", $dataIndex - 1);
	});

	$(".projects__slider-wrapper").on("afterChange", function (
		event,
		slick,
		currentSlide
	) {
		let navBtn = $(".projects__navigation-item");
		navBtn.removeClass("active");
		let navBtnActive = $(
			".projects__navigation-item-link[data-index=" + (currentSlide + 1) + "]"
		);
		$(navBtnActive).parents(".projects__navigation-item").addClass("active");
	});

	$(".projects__navigation-item-link").click(function (event) {
		let navBtn = $(".projects__navigation-item");
		navBtn.removeClass("active");
		let $this = $(this);
		$this.parents(".projects__navigation-item").addClass("active");
		event.preventDefault();
		$(".projects__main_wrapper").removeClass("active");
		$(
			".projects__main_wrapper[data-index=" + $this.attr("data-index") + "]"
		).addClass("active");
	});

	$(".start-work .news__all-news").slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		infinite: true,
		nextArrow: $(".news__forward-btn"),
		prevArrow: $(".news__back-btn"),
		swipeToSlide: true,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 768,
				settings: {
					variableWidth: true,
					centerMode: true,
				},
			},
		],
	});

	$("input[type='tel']").mask("+7  9 9 9  9 9 9 9 9 9 9");

	$(".contacts__form-button").click(function (event) {
		let checkboxChecked = $("#form__checkbox-contacts").prop("checked");
		if (!checkboxChecked) {
			$(".form__alert-checkbox").addClass("active");
			return event.preventDefault();
		}
	});

	$(".form__input-text.input-phone").on("paste", function (event) {
		let numberWithTrash = event.originalEvent.clipboardData.getData(
			"text/plain"
		);
		let number = numberWithTrash.replace(/[^+\d]/g, "");
		if (number.length > 10) {
			let sliceIndex = number.length - 10;
			number = number.split("").slice(sliceIndex).join("");
		}
		$(this).val(number);
	});

	$(".form__label-checkbox").click(() => {
		let checkboxChecked = $("#form__checkbox-contacts").prop("checked");
		if (!checkboxChecked) {
			$(".form__alert-checkbox").removeClass("active");
		}
	});

	$("#popup-call__button").click((event) => {
		let checkboxChecked = $("#form__checkbox-popap-call").prop("checked");
		if (!checkboxChecked) {
			$(".form__alert-checkbox.popup-call__alert").addClass("active");
			return event.preventDefault();
		}
	});

	$(".popup-call__form > .form__label-checkbox").click(() => {
		let checkboxChecked = $("#form__checkbox-popup-call").prop("checked");
		if (!checkboxChecked) {
			$(".form__alert-checkbox.popup-call__alert").removeClass("active");
		}
	});

	$(".projects-popup__mobile-form-wrapper .contacts__form-button").click(
		(event) => {
			let checkboxChecked = $("#form__checkbox-popup-projects-mobile").prop(
				"checked"
			);
			if (!checkboxChecked) {
				$(
					".projects-popup__mobile-form-wrapper .form__alert-checkbox"
				).addClass("active");
				return event.preventDefault();
			}
		}
	);

	$(".projects-popup__mobile-form-wrapper .form__label-checkbox").click(() => {
		let checkboxChecked = $("#form__checkbox-popup-projects-mobile").prop(
			"checked"
		);
		if (!checkboxChecked) {
			$(
				".projects-popup__mobile-form-wrapper .form__alert-checkbox"
			).removeClass("active");
		}
	});

	$(".btn-open-modal").click((event) => {
		$(".popup-call").addClass("popup-call__open");
		$(".popup-call__wrapper").addClass("active");
		$(".content").addClass("active");
		$("body").addClass("overflow");
		event.preventDefault();
	});

	$(".open-vl-popup").on("click", function () {
		let popupContent = $(this).siblings(".vl-popup-description").html();
		$("body").addClass("overflow");
		$(".vl-popup__data").html(popupContent);
		$(".vl-popup").addClass("vl-popup--active");
	});

	$(".vl-popup").on("click", ".vl-popup__tab-item", function () {
		let $this = $(this),
			tabContent = $(".vl-popup .vl-popup__tab-content");
		$this.siblings().removeClass("active");
		$this.addClass("active");
		tabContent.removeClass("active");
		tabContent.eq($this.index()).addClass("active");
	});

	document.querySelectorAll(".vl-popup__tab-content").forEach((el) => {
		new SimpleBar(el);
	});

	$(".close-button").click(() => {
		$(".popup-call").removeClass("popup-call__open");
		$(".content").removeClass("active");
		$(".popup-call__wrapper").removeClass("active");
		$(".projects-popup").removeClass("open");
		$(".projects-popup__wrapper").removeClass("active");
		$(".news-popup").removeClass("open");
		$(".news-popup__wrapper").removeClass("active");
		$(".popup-call__success").fadeOut();
		$(".vl-popup").removeClass("vl-popup--active");
		$(".personal-popup").removeClass("personal-popup--active");
		$('.personal-vl-popup').removeClass('personal-vl-popup--active');
		$("body").removeClass("overflow");
	});

	$('.js-open-partner-popup').on('click', function () {
		$('body').addClass('overflow');
		$('.personal-vl-popup')
			.addClass('personal-vl-popup--active')
			.find('.popup-call__wrapper').addClass('active');
	});

	$('.personal-vl-popup').on('click', function (e) {
		if (e.target === this) {
			$('.close-button').trigger('click');
		}
	});

	$('[name="partner-type"]').on('change', function () {
		$('.personal-vl-popup__content').html(getPartnerFormHtml(this.value));
	})

	function getPartnerFormHtml(partnerType = "entity") {
		let html = '';

		if (partnerType == "entity") {
			html = `
			<label for="partner-name" class="personal-vl-text">Наименование организации*</label>
            <input type="text" id="partner-name" class="personal-vl-form__input">

            <label for="partner-INN" class="personal-vl-text">ИНН*</label>
            <input type="text" id="partner-INN" class="personal-vl-form__input">

            <label for="partner-KPP" class="personal-vl-text">КПП*</label>
            <input type="text" id="partner-KPP" class="personal-vl-form__input">

            <label for="partner-address" class="personal-vl-text">Юридический адрес*</label>
            <input type="text" class="personal-vl-form__input" id="partner-address">

            <label for="partner-email" class="personal-vl-text">E-mail*</label>
            <input type="email" class="personal-vl-form__input" id="partner-email">
			`;
		}

		if (partnerType == "individual") {
			html = `
			<label for="partner-name" class="personal-vl-text">ФИО*</label>
            <input type="text" id="partner-name" class="personal-vl-form__input">

			<label for="partner-email" class="personal-vl-text">E-mail*</label>
            <input type="text" id="partner-email" class="personal-vl-form__input">

			<label for="partner-phone" class="personal-vl-text">Контактный телефон*</label>
            <input type="text" id="partner-phone" class="personal-vl-form__input">
			`;
		}

		return html;
	}

	$(".hamburger").click(() => {
		$(".menu__nav-section").addClass("active");
	});

	$(".menu__tablet-close-button").click(() => {
		$(".menu__nav-section").removeClass("active");
	});

	$(".popup-call").click((e) => {
		if (e.target.id === "popup-call") {
			$(".popup-call").removeClass("popup-call__open");
			$(".content").removeClass("active");
			$(".popup-call__wrapper").removeClass("active");
			$("body").removeClass("overflow");
		}
	});

	function initProjectsLightgallery() {
		if ($("#projects__lightgallery").length) {
			$("#projects__lightgallery").lightGallery({
				hideBarsDelay: 600000,
				thumbnail: false,
				pager: true,
				download: false,
				nextHtml: '<span class="projects-popup__next-button">ВПЕРЕД</span>',
				prevHtml: '<span class="projects-popup__prev-button">НАЗАД</span>',
			});
		}
	}

	initProjectsLightgallery();

	function removeFadeInUpMobile() {
		if ($(window).width() < 992) {
			let parent = $(".slider-item");
			parent.find(".slider-heading").css("animation-delay", ".3s");
			parent.find(".slider-text").css("animation-delay", ".3s");
			if (parent.find(".slider-title").hasClass("page-fade-in-up")) {
				parent.find(".slider-title").removeClass("page-fade-in-up");
				parent.find(".slider-title").addClass("fadeInUp");
				parent.find(".slider-heading").removeClass("page-fade-in-up");
				parent.find(".slider-heading").addClass("fadeInUp");
				parent.find(".slider-text").removeClass("page-fade-in-up");
				parent.find(".slider-text").addClass("fadeInUp");
			}
		}
	}

	$(function () {
		let upButton = $(".up-button");
		$(window).scroll(function () {
			if ($(this).scrollTop() != 0) {
				upButton.fadeIn();
			} else {
				upButton.fadeOut();
			}
		});

		upButton.click(function () {
			$("body,html").animate({ scrollTop: 0 }, 800);
		});
	});

	removeFadeInUpMobile();

	initReviewsSlider();
	initTeamSlider();
	lazyLoad();

	if ($(window).width() > 991) {
		setTimeout(initSlider, 100);
	}

	setAccordionToSliders();

	$(window).on("resize", function () {
		if ($(window).width() < 992) {
			setTimeout(function () {
				$(".slider.slick-initialized").slick("unslick");
			}, 100);
		} else {
			setTimeout(initSlider, 100);
		}
	});

	let $fadeInLeft = $(".page-fade-in-left"),
		$fadeInUp = $(".page-fade-in-up"),
		$verticals = $(".border-vertical"),
		$horizontals = $(".border-horizontal"),
		$aboutFeatures = $(".about-features");

	$(window).on("scroll", function () {
		$fadeInLeft.each(function () {
			if ($(this).isInViewport()) {
				$(this).addClass("fadeInLeft");
			}
		});
		$fadeInUp.each(function () {
			if ($(this).isInViewport()) {
				$(this).addClass("fadeInUp");
			}
		});
		$verticals.each(function () {
			if ($(this).isInViewport()) {
				$(this).addClass("active");
			}
		});
		$horizontals.each(function () {
			if ($(this).isInViewport()) {
				$(this).addClass("active");
			}
		});

		if ($aboutFeatures.hasClass("viewed")) return;
		if ($aboutFeatures.isInViewport()) {
			$aboutFeatures.addClass("viewed");
			let $aboutFeaturesBlock = $aboutFeatures.find(".about-features-block");
			$aboutFeaturesBlock.each((i, item) => {
				setTimeout(function () {
					$(item).addClass("active");
					animateNumber($(item).find(".about-number"));
				}, i * 1000);
			});
		}
	});

	function animateNumber(element) {
		let currentValue = 0,
			n = 100,
			totalValue = parseInt(element.text()),
			step = totalValue / n,
			animationInterval = 5;

		let totalValueAnimationIntervalId = setInterval(function () {
			if (currentValue > totalValue) {
				element.innerText = totalValue;
				clearInterval(totalValueAnimationIntervalId);
			} else {
				element.text(Math.round(currentValue));
				currentValue += step;
			}
		}, animationInterval);
	}

	function initSlider() {
		let $slider = $(".slider:not(.slick-initialized)"),
			$parent,
			$pagination = $parent;

		$slider.on("afterChange", function (e, slick, currentSlide) {
			let $sliderTab = $(this).closest(".slider-container").find(".slider-tab");
			$sliderTab.find(".slider-tab-item").removeClass("active");
			$sliderTab.find(".slider-tab-item").eq(currentSlide).addClass("active");
		});

		let $aboutSlider = $("#about-slider");
		$aboutSlider.on("beforeChange", function () {
			$(this).closest(".slider-container").find(".slider-img img").fadeOut();
		});
		$aboutSlider.on("afterChange", function (e, slick, currentSlide) {
			$(this)
				.closest(".slider-container")
				.find(".slider-img img")
				.eq(currentSlide)
				.fadeIn();
		});

		$slider.each(function (i, item) {
			let $thisSlider = $(item);
			$parent = $thisSlider.closest(".slider-container");
			$pagination = $parent.find(".slider-pagination");

			$parent.on("click", ".slider-tab-item", function () {
				if ($(this).hasClass("active")) return;
				$(this)
					.closest(".slider-container")
					.find(".slider-tab-item")
					.removeClass("active");
				$(this).addClass("active");
				$(this)
					.closest(".slider-container")
					.find(".slider")
					.slick("slickGoTo", $(this).index());
			});

			$thisSlider.slick({
				arrows: false,
				fade: true,
				infinite: false,
				dots: true,
				dotsClass: "slider-pagination-list",
				customPaging: function (slick, index) {
					if (slick.slideCount <= 1) return;
					return (
						'<div class="slider-pagination-item">' +
						addZeroToNumber(index + 1) +
						"</div>"
					);
				},
				appendDots: $pagination,
			});
		});
	}

	function initReviewsSlider() {
		let $slider = $(".reviews-slider");
		let isOpened = false;
		$slider.on('click', '.reviews-slider-item__more', function () {
			let $this = $(this);
			$this.closest('.reviews-slider-item').toggleClass('expanded');
			isOpened = !isOpened;
			if (isOpened) {
				$this.find('.projects__more-details-link').text($this.data('hide'));
			} else {
				$this.find('.projects__more-details-link').text($this.data('show'));
			}
		})
		$slider.slick({
			arrows: true,
			prevArrow: $slider.closest(".reviews-slider-container").find(".prev"),
			nextArrow: $slider.closest(".reviews-slider-container").find(".next"),
			centerMode: true,
			// slidesToShow: 3,
			slidesToScroll: 1,
			variableWidth: true,
			focusOnSelect: true,
			responsive: [
				{
					breakpoint: 768,
					settings: {
						variableWidth: false,
						centerMode: false,
					}
				}
			]
		});
	}

	function initTeamSlider() {
		if ($(".team-slider").length) {
			let $slider = $(".team-slider"),
				imgWidth = 330,
				leftContainerPosition = $slider.offset().left;

			$slider.slick({
				// slidesToShow: 7,
				swipe: false,
				nextArrow: $(".team-slider-button.next"),
				prevArrow: $(".team-slider-button.prev"),
				// mobileFirst: true,
				variableWidth: true,
				swipeToSlide: true,
				touchThreshold: 30,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							// slidesToShow: 5
						},
					},
					{
						breakpoint: 992,
						settings: {
							// slidesToShow: 4,
							swipe: true,
						},
					},
					{
						breakpoint: 768,
						settings: {
							// slidesToShow: 2,
							swipe: true,
						},
					},
				],
			});

			let clickedSlide, slideWidth, closeBtn;
			$slider.on("click", ".team-slider-element", function (e) {
				clickedSlide = $(this);
				if (window.outerWidth >= 992) {
					let containerWidth = $slider.outerWidth();
					closeBtn = clickedSlide.find(".close-btn");
					$(".team-slider-header").addClass("disabled");

					if (
						clickedSlide.hasClass("active") &&
						!$(e.target).hasClass("close-btn")
					)
						return;

					let content = clickedSlide.find(".team-slider-element-content"),
						contentInner = content.find(".team-slider-element-inner"),
						position = clickedSlide.offset().left;

					if ($(e.target).hasClass("close-btn")) {
						$(".team-slider-header").removeClass("disabled");
						clickedSlide.removeClass("active");
						clickedSlide.css({
							width: slideWidth + "px",
							transform: "none",
						});
						$(".team-slider-element").removeClass("hidden");
						closeBtn.hide();
						content.css({ width: 0 });
						setTimeout(function () {
							content.hide();
						}, 800);
						contentInner.hide();
						return;
					}

					slideWidth = clickedSlide.outerWidth();

					$(".team-slider-element").addClass("hidden");
					clickedSlide.addClass("active");
					position -= leftContainerPosition;
					clickedSlide.removeClass("hidden");

					clickedSlide.removeClass("hidden").css({
						transform: "translateX(-" + position + "px)",
					});
					setTimeout(function () {
						clickedSlide.css({ width: imgWidth + "px" });
						content.show();
						content.css({ width: containerWidth - imgWidth + "px" });
						setTimeout(function () {
							contentInner.show();
							closeBtn.show();
						}, 500);
					}, 800);
				} else {
					let $popup = $('<div class="team-slider-popup"></div>'),
						$img = clickedSlide.find(".team-slider-element-img-wrapper"),
						$content = clickedSlide.find(".team-slider-element-content");
					$popup.append($img);
					$popup.append($content);
					$("body").append($popup);
					$popup.animate({ right: "0" }, () => {
						$popup.find(".close-btn").show();
					});
					$popup.on("click", ".close-btn", function () {
						clickedSlide.append($img, $content);
						$popup.animate({ right: "100%" });
						setTimeout(function () {
							$popup.remove();
						}, 400);
					});
				}
			});
		}
	}

	function setAccordionToSliders() {
		let $slider = $(".slider:not(.slick-initialized)");
		$slider.on("click", ".slider-title", function () {
			$(this).toggleClass("active");
			$(this).closest(".slider-item").toggleClass("expanded");
		});
	}

	$('a[href^="#"]').click(function (e) {
		e.preventDefault();
		let idString = $(this).attr("href");
		if (idString.length === 1 || idString === "#") {
			return;
		}
		$("html, body").animate(
			{
				scrollTop: $(idString).offset().top,
			},
			1000
		);
		$(".menu__nav-section").removeClass("active");
	});

	function lazyLoad() {
		let lazyImages = [].slice.call(document.querySelectorAll("img.lazy")),
			lazyBackgrounds = [].slice.call(
				document.querySelectorAll(".lazy-inline-bg")
			),
			active = false;

		if ("IntersectionObserver" in window) {
			let lazyImageObserver = new IntersectionObserver((entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						let lazyImage = entry.target;
						lazyImage.src = lazyImage.dataset.src;
						lazyImage.classList.remove("lazy");
						lazyImageObserver.unobserve(lazyImage);
					}
				});
			});

			lazyImages.forEach((lazyImage) => {
				lazyImageObserver.observe(lazyImage);
			});

			let lazyBackgroundObserver = new IntersectionObserver(
				(entries, observer) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							entry.target.classList.remove("lazy-inline-bg");
							lazyBackgroundObserver.unobserve(entry.target);
						}
					});
				}
			);

			lazyBackgrounds.forEach((lazyBackground) => {
				lazyBackgroundObserver.observe(lazyBackground);
			});
		} else {
			const lazyLoadPolyfill = function () {
				if (!active) {
					active = true;

					setTimeout(function () {
						lazyImages.forEach((lazyImage) => {
							if (
								lazyImage.getBoundingClientRect().top <= window.innerHeight &&
								lazyImage.getBoundingClientRect().bottom >= 0 &&
								getComputedStyle(lazyImage).display !== "none"
							) {
								lazyImage.src = lazyImage.dataset.src;
								lazyImage.classList.remove("lazy");
								lazyImages = lazyImages.filter((image) => image !== lazyImage);
							}
						});

						lazyBackgrounds.forEach((lazyBackground) => {
							if (
								lazyBackground.getBoundingClientRect().top <=
								window.innerHeight &&
								lazyBackground.getBoundingClientRect().bottom >= 0 &&
								getComputedStyle(lazyBackground).display !== "none"
							) {
								lazyBackground.classList.remove("lazy-inline-bg");
								lazyBackgrounds = lazyBackgrounds.filter(
									(lazyBackground) => lazyBackground !== lazyBackground
								);
							}
						});

						if (lazyImages.length === 0 && lazyBackground.length === 0) {
							document.removeEventListener("scroll", lazyLoadPolyfill);
							document.removeEventListener("resize", lazyLoadPolyfill);
							document.removeEventListener(
								"orientationchange",
								lazyLoadPolyfill
							);
						}

						active = false;
					}, 200);
				}
			};

			document.addEventListener("scroll", lazyLoadPolyfill);
			document.addEventListener("resize", lazyLoadPolyfill);
			document.addEventListener("orientationchange", lazyLoadPolyfill);
		}
	}

	// instagram
	$.instagramFeed({
		'username': 'vlogistic.ru',
		'host': 'https://images' + ~~(Math.random() * 3333) + '-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=https://www.instagram.com/',
		'callback': function (data) {
			const instaData = data.edge_owner_to_timeline_media.edges;
			const container = $('#inst-container');
			let html = '';

			instaData.forEach(post => {
				const postData = {
					img: post.node.thumbnail_src,
					likesCount: post.node.edge_liked_by.count,
					commentsCount: post.node.edge_media_to_comment.count,
					text: post.node.edge_media_to_caption.edges[0].node.text,
					url: `https://instagram.com/p/${post.node.shortcode}/`
				};

				html += `<a href="${postData.url}" class="inst__item" target="_blank">
					<img class="inst__img" src="${postData.img}" alt="">
					<div class="inst__content">
						<div class="top">
							<span>${postData.likesCount}</span>
							<span>${postData.commentsCount}</span>
						</div>
						<div class="bottom">${postData.text}</div>
					</div>
				</a>`;
			});
			container.html(html);
			container.slick({
				slidesToShow: 3,
				arrows: false,
				infinite: false,
				swipeToSlide: true,
				responsive: [
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 2
						}
					},
					{
						breakpoint: 475,
						settings: {
							slidesToShow: 1
						}
					}
				]
			});
			// console.log(JSON.stringify(data, null, 2))
		}
	});
});

function addZeroToNumber(number) {
	return number < 10 ? "0" + number : number;
}

function appendNumberstoSliderPagination($pagination, number) {
	$pagination.find(".slider-pagination-left").text("01");
	$pagination.find(".slider-pagination-right").text(addZeroToNumber(number));
}

function initMainSlider() {
	let i = 0;
	let $video = $(".video-js"),
		$pagination = $video
			.parents(".main-slider-container")
			.find(".slider-pagination"),
		duration = 0,
		$slides = $(".main-slider-item");

	function playVideo() {
		$video[i].play();
	}

	function playVideoAndSetPaginationWidth() {
		duration = $($video).get(i).duration;

		$video.on("timeupdate", function () {
			let currentPagination = $(".main-slider-pagination-item div").get(i);
			$(currentPagination).css(
				"width",
				($($video).get(i).currentTime / duration) * 100 + "%"
			);
		});
	}

	if ($video.length > 0) {
		$slides[i].classList.add("active");
		playVideoAndSetPaginationWidth();
		playVideo();
	}

	appendNumberstoSliderPagination($pagination, $video.length);

	// $video[i].play();
	$video.on("ended", function () {
		$slides[i].classList.remove("active");
		$(".main-slider-pagination-item div").css("width", 0);
		if (i === $video.length - 1) {
			i = -1;
		}
		setTimeout(function () {
			$slides[++i].classList.add("active");
			playVideoAndSetPaginationWidth();
			playVideo();
		}, 400);
	});

	$(".main-slider-button").on("click", function () {
		if ($(this).hasClass("prev")) {
			if (!$($slides.get(i)).hasClass("active")) {
				return;
			}
			$video[i].pause();
			$slides[i].classList.remove("active");
			setTimeout(function () {
				$video[i].currentTime = 0;
				if (i === 0) {
					i = $video.length;
				}
				$(".main-slider-pagination-item div").css("width", 0);
				$slides[--i].classList.add("active");
				playVideoAndSetPaginationWidth();
				playVideo();
			}, 400);
		} else if ($(this).hasClass("next")) {
			if (!$($slides.get(i)).hasClass("active")) {
				return;
			}
			$video[i].pause();
			$slides[i].classList.remove("active");
			setTimeout(function () {
				$video[i].currentTime = 0;
				if (i === $video.length - 1) {
					i = -1;
				}
				$(".main-slider-pagination-item div").css("width", 0);
				$slides[++i].classList.add("active");
				playVideoAndSetPaginationWidth();
				playVideo();
			}, 400);
		}
	});

	function deleteMap() {
		map.remove();
	}

	function createMapContainer() {
		$(".contacts-page__city-map-wrapper").append(
			'<div id="map" style="width: 100%; height: 100%;"></div>'
		);
	}

	function initMapNakhodka() {
		var map;

		if ($("#map").length) {
			DG.then(function () {
				map = DG.map("map", {
					center: [42.841316, 132.891993],
					zoom: 17,
					scrollWheelZoom: false,
				});

				DG.marker([42.841316, 132.891993]).addTo(map);
				// DG.control.location({ position: 'bottomright' }).addTo(map);
				DG.control.scale().addTo(map);
				DG.control.ruler({ position: "bottomleft" }).addTo(map);
				DG.control.traffic().addTo(map);
			});
		}
	}

	function initMapVladivostok() {
		var map;

		DG.then(function () {
			map = DG.map("map", {
				center: [43.097315, 131.864826],
				zoom: 17,
				scrollWheelZoom: false,
			});

			DG.marker([43.097315, 131.864826]).addTo(map);
			// DG.control.location({ position: 'bottomright' }).addTo(map);
			DG.control.scale().addTo(map);
			DG.control.ruler({ position: "bottomleft" }).addTo(map);
			DG.control.traffic().addTo(map);
		});
	}

	initMapNakhodka();

	function changeCityMap() {
		let $city = $(".contacts-page__city-map--city");
		$city.on("click", function () {
			if ($(this).hasClass("active")) {
				return;
			}
			$city.removeClass("active");
			$(this).addClass("active");
			if ($(this).hasClass("nakhodka")) {
				if (
					$(".contacts-page__city-map-information-content.nakhodka").hasClass(
						"active"
					)
				) {
					return;
				} else {
					$(".contacts-page__city-map-information-content").removeClass(
						"active"
					);
					$(".contacts-page__city-map-information-content.nakhodka").addClass(
						"active"
					);
					deleteMap();
					createMapContainer();
					initMapNakhodka();
				}
			} else if ($(this).hasClass("vladivostok")) {
				if (
					$(
						".contacts-page__city-map-information-content.vladivostok"
					).hasClass("active")
				) {
					return;
				} else {
					$(".contacts-page__city-map-information-content").removeClass(
						"active"
					);
					$(
						".contacts-page__city-map-information-content.vladivostok"
					).addClass("active");
					deleteMap();
					createMapContainer();
					initMapVladivostok();
				}
			}
		});
	}

	changeCityMap();


	function changeClassActive() {
		let hash = document.location.hash;
		let page = document.location.pathname;
		if (page === "/about-us/" && (hash === "#advantages" || hash === "#working-conditions" || hash === "#partners" || hash === "#documents")) {
			$(hash).trigger('click');
			$(window).trigger('scroll');
		}
	}

	changeClassActive();

	$('.menu-footer__list-item a').on('click', function () {
		setTimeout(function () {
			let hash = document.location.hash;
			let page = document.location.pathname;
			if (page === "/about-us/" && (hash === "#advantages" || hash === "#working-conditions" || hash === "#partners" || hash === "#documents")) {
				$(hash).trigger('click');
				$(window).trigger('scroll');
			}
		}, 10)
	});

	function animateServices() {
		let page = window.location.pathname;
		let index = page.split('/');
		let serviceIndex = index[1];
		if (serviceIndex === "services") {
			$(window).scroll()
		}
	}

	animateServices();

	$('.close-infobanner').on('click', function () {
		$('.infobanner').fadeOut();
	});

	$('.vl-datepicker').datepicker();
}
