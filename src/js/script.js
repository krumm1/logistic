$(document).ready(() => {

    "use strict"

    $.fn.isInViewport = function () {
        let elementTop = $(this).offset().top + 100;
        let elementBottom = elementTop + $(this).outerHeight();

        let viewportTop = $(window).scrollTop();
        let viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    $('form').submit(function (event) {
        event.preventDefault();
        let $this = $(this);
        $.ajax({
            type: 'post',
            url: 'mail.php',
            data: $this.serialize(),
            success: () => {
                $('.content').addClass('active');
                $('#popup-call').addClass('popup-call__open');
                $('.popup-call__wrapper').addClass('active');
                $('.popup-call__success').show();
                grecaptcha.reset();
                $this.trigger("reset");
            },
            error: (res) => {
                alert(res.responseText);
            }
        });
    });

    $('.projects__slider-wrapper').slick({
        dots: false,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        nextArrow: $(".projects__forward-btn"),
        prevArrow: $(".projects__back-btn")
    });

    $('.projects__navigation-item-link').click(function (event) {
        let $dataIndex = $(this).attr('data-index');
        $('.projects__slider-wrapper').slick('slickGoTo', $dataIndex - 1);
    });

    $('.projects__slider-wrapper').on('afterChange', function (event, slick, currentSlide) {
        let navBtn = $('.projects__navigation-item');
        navBtn.removeClass('active');
        let navBtnActive = $('.projects__navigation-item-link[data-index=' + (currentSlide + 1) + ']');
        $(navBtnActive).parents('.projects__navigation-item').addClass('active');
    });

    $('.projects__navigation-item-link').click(function (event) {
        let navBtn = $('.projects__navigation-item');
        navBtn.removeClass('active');
        let $this = $(this)
        $this.parents('.projects__navigation-item').addClass('active');
        event.preventDefault();
        $(".projects__main_wrapper").removeClass('active');
        $(".projects__main_wrapper[data-index=" + $this.attr('data-index') + "]").addClass('active');
    })

    $('.news__all-news').slick({
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
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    variableWidth: true,
                    centerMode: true
                }
            }
        ]
    });

    $('.input-phone').mask('+7  9 9 9  9 9 9 9 9 9 9');

    $('.contacts__form-button').click(function (event) {
        let checkboxChecked = $('#form__checkbox-contacts').prop('checked');
        if (!checkboxChecked) {
            $('.form__alert-checkbox').addClass('active');
            return event.preventDefault();
        }
    });

    $('.form__input-text.input-phone').on('paste', function (event) {
        let numberWithTrash = event.originalEvent.clipboardData.getData('text/plain');
        let number = numberWithTrash.replace(/[^+\d]/g, '');
        if (number.length > 10) {
            let sliceIndex = (number.length - 10);
            number = number.split('').slice(sliceIndex).join('');
        }
        $(this).val(number);
    })

    $('.form__label-checkbox').click(() => {
        let checkboxChecked = $('#form__checkbox-contacts').prop('checked');
        if (!checkboxChecked) {
            $('.form__alert-checkbox').removeClass('active');
        }
    });

    $('#popup-call__button').click((event) => {
        let checkboxChecked = $('#form__checkbox-popap-call').prop('checked');
        if (!checkboxChecked) {
            $('.form__alert-checkbox.popup-call__alert').addClass('active');
            return event.preventDefault();
        }
    });

    $('.popup-call__form > .form__label-checkbox').click(() => {
        let checkboxChecked = $('#form__checkbox-popup-call').prop('checked');
        if (!checkboxChecked) {
            $('.form__alert-checkbox.popup-call__alert').removeClass('active');
        }
    });

    $('.projects-popup__mobile-form-wrapper .contacts__form-button').click((event) => {
        let checkboxChecked = $('#form__checkbox-popup-projects-mobile').prop('checked');
        if (!checkboxChecked) {
            $('.projects-popup__mobile-form-wrapper .form__alert-checkbox').addClass('active');
            return event.preventDefault();
        }
    });

    $('.projects-popup__mobile-form-wrapper .form__label-checkbox').click(() => {
        let checkboxChecked = $('#form__checkbox-popup-projects-mobile').prop('checked');
        if (!checkboxChecked) {
            $('.projects-popup__mobile-form-wrapper .form__alert-checkbox').removeClass('active');
        }
    });

    $('.btn-open-modal').click((event) => {
        $('.popup-call').addClass('popup-call__open');
        $('.popup-call__wrapper').addClass('active');
        $('.content').addClass('active');
        $('body').addClass('overflow');
        event.preventDefault();
    });

    $('.close-button').click(() => {
        $('.popup-call').removeClass('popup-call__open');
        $('.content').removeClass('active');
        $('.popup-call__wrapper').removeClass('active');
        $('.projects-popup').removeClass('open');
        $('.projects-popup__wrapper').removeClass('active');
        $('.news-popup').removeClass('open');
        $('.news-popup__wrapper').removeClass('active');
        $('.popup-call__success').fadeOut();
        $('body').removeClass('overflow');
    });

    $('.hamburger').click(() => {
        $('.menu__nav-section').addClass('active');
    });

    $('.menu__tablet-close-button').click(() => {
        $('.menu__nav-section').removeClass('active');
    });

    $('.popup-call').click((e) => {
        if (e.target.id === 'popup-call') {
            $('.popup-call').removeClass('popup-call__open');
            $('.content').removeClass('active');
            $('.popup-call__wrapper').removeClass('active');
            $('body').removeClass('overflow');
        }
    });

    $('.projects__more-details-link').click((event) => {
        $('.projects-popup').addClass('open');
        $('.projects-popup__wrapper').addClass('active');
        $('body').addClass('overflow');
        event.preventDefault();
    });

    $('.news__open-popup').click(function (event) {
        $('.news-popup').addClass('open');
        $('.news-popup__wrapper').addClass('active');
        $('body').addClass('overflow');
        let $this = $(this);
        let $imgLink = $this.find('.news__image').attr('src');
        let $titleText = $this.find(".news__title-one-news").text();
        let $descriptionText = $this.find('.news__description-one-news').html();
        $('.news-popup__image').removeAttr('src');
        $('.news-popup__image').attr('src', $imgLink);
        $('.news-popup__column-title').text($titleText);
        $('.news-popup__column-text').html($descriptionText);
        event.preventDefault();
    });

    function simleBar() {
        let simpleBarElement = $('#projects-popup__photo-column');
        if (simpleBarElement.length) {
            new SimpleBar(simpleBarElement[0], {
                autoHide: false,
                scrollbarMaxSize: 50
            });
        }
    };

    $("#lightgallery").lightGallery({
        hideBarsDelay: 600000,
        thumbnail: false,
        pager: true,
        download: false,
        nextHtml: '<span class="projects-popup__next-button">ВПЕРЕД</span>',
        prevHtml: '<span class="projects-popup__prev-button">НАЗАД</span>'
    });


    function removeFadeInUpMobile() {
        if ($(window).width() < 992) {
            let parent = $('.slider-item');
            parent.find('.slider-heading').css('animation-delay', '.3s');
            parent.find('.slider-text').css('animation-delay', '.3s');
            if (parent.find('.slider-title').hasClass('page-fade-in-up')) {
                parent.find('.slider-title').removeClass('page-fade-in-up');
                parent.find('.slider-title').addClass('fadeInUp');
                parent.find('.slider-heading').removeClass('page-fade-in-up');
                parent.find('.slider-heading').addClass('fadeInUp');
                parent.find('.slider-text').removeClass('page-fade-in-up');
                parent.find('.slider-text').addClass('fadeInUp');
            }
        }
    };

    $(function () {
        let upButton = $('.up-button');
        $(window).scroll(function () {
            if ($(this).scrollTop() != 0) {
                upButton.fadeIn();
            } else {
                upButton.fadeOut();
            }
        });

        upButton.click(function () {
            $('body,html').animate({ scrollTop: 0 }, 800);
        });
    });

    removeFadeInUpMobile();




    // $('.hamburger').on('click', function () {
    //     $(this).toggleClass('open');
    // });

    // $(window).on('resize scroll', function () {
    //     if ($('#services').isInViewport()) {
    //         $(document.body).addClass('overflow');
    //         $('#services').addClass('active');
    //     }
    // });


    initReviewsSlider();
    initTeamSlider();
    lazyLoad();
    simleBar()

    if ($(window).width() > 991) {
        setTimeout(initSlider, 100)
    }

    setAccordionToSliders();

    $(window).on('resize', function () {
        if ($(window).width() < 992) {
            setTimeout(function () {
                $('.slider.slick-initialized').slick('unslick');
            }, 100)
        } else {
            setTimeout(initSlider, 100);
        }
    });

    let $fadeInLeft = $('.page-fade-in-left'),
        $fadeInUp = $('.page-fade-in-up'),
        $verticals = $('.border-vertical'),
        $horizontals = $('.border-horizontal'),
        $aboutFeatures = $('.about-features');

    $(window).on('scroll', function () {
        $fadeInLeft.each(function () {
            if ($(this).isInViewport()) {
                $(this).addClass('fadeInLeft');
            }
        });
        $fadeInUp.each(function () {
            if ($(this).isInViewport()) {
                $(this).addClass('fadeInUp')
            }
        })
        $verticals.each(function () {
            if ($(this).isInViewport()) {
                $(this).addClass('active');
            }
        });
        $horizontals.each(function () {
            if ($(this).isInViewport()) {
                $(this).addClass('active');
            }
        });

        if ($aboutFeatures.hasClass('viewed')) return;
        if ($aboutFeatures.isInViewport()) {
            $aboutFeatures.addClass('viewed');
            let $aboutFeaturesBlock = $aboutFeatures.find('.about-features-block');
            $aboutFeaturesBlock.each((i, item) => {
                setTimeout(function () {
                    $(item).addClass('active');
                    animateNumber($(item).find('.about-number'));
                }, i * 1000);
            })
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
        }, animationInterval)
    }







    function initSlider() {
        let $slider = $('.slider:not(.slick-initialized)'),
            $parent,
            $pagination = $parent;

        // $slider.closest('.slider-container').on('click', '.slider-tab-item', function (e) {
        //     if ($(this).hasClass('active')) return;
        //     $slider.slick('slickGoTo', $(this).index());
        //     $(this).closest('.slider-tab').find('.slider-tab-item').removeClass('active');
        //     $(this).addClass('active');
        // })

        $slider.on('afterChange', function (e, slick, currentSlide) {
            let $sliderTab = $(this).closest('.slider-container').find('.slider-tab');
            $sliderTab.find('.slider-tab-item').removeClass('active');
            $sliderTab.find('.slider-tab-item').eq(currentSlide).addClass('active');
        })


        const flashlightCoords = [
            "transform: translate(-3%, 3%)",
            "transform: translate(-15%, -6%)",
            "transform: translate(4%, -5%)",
            "transform: translate(-6%, 10%)",
        ],
            flashlight = $('.flashlight');

        $('#services .slider').on('afterChange', function (e, slick, currentSlide) {
            flashlight.attr('style', flashlightCoords[currentSlide]);
        });

        let $aboutSlider = $('#about-slider');
        $aboutSlider.on('beforeChange', function () {
            $(this).closest('.slider-container').find('.slider-img img').fadeOut();
        })
        $aboutSlider.on('afterChange', function (e, slick, currentSlide) {
            $(this).closest('.slider-container').find('.slider-img img').eq(currentSlide).fadeIn();
        });

        $slider.each(function (i, item) {
            let $thisSlider = $(item);
            $parent = $thisSlider.closest('.slider-container');
            $pagination = $parent.find('.slider-pagination');

            $parent.on('click', '.slider-tab-item', function () {
                if ($(this).hasClass('active')) return;
                $(this).closest('.slider-container').find('.slider-tab-item').removeClass('active');
                $(this).addClass('active');
                $(this).closest('.slider-container').find('.slider').slick('slickGoTo', $(this).index());
            });

            $thisSlider.slick({
                arrows: false,
                fade: true,
                infinite: false,
                dots: true,
                dotsClass: 'slider-pagination-list',
                customPaging: function (slick, index) {
                    return '<div class="slider-pagination-item">' + addZeroToNumber(index + 1) + '</div>'
                },
                appendDots: $pagination,
            });
        })

        // $slider.on('wheel', (function (e) {
        //     e.preventDefault();

        //     if (e.originalEvent.deltaY < 0) {
        //         $(this).slick('slickPrev');
        //     } else {
        //         $(this).slick('slickNext');
        //     }
        // }));
    }

    function initReviewsSlider() {
        let $slider = $('.reviews-slider');
        $slider.slick({
            arrows: true,
            prevArrow: $slider.closest('.reviews-slider-container').find('.prev'),
            nextArrow: $slider.closest('.reviews-slider-container').find('.next'),
            centerMode: true,
            // slidesToShow: 3,
            slidesToScroll: 1,
            variableWidth: true,
            focusOnSelect: true
        });
    }

    function initTeamSlider() {
        if ($('.team-slider').length) {
            let $slider = $('.team-slider'),
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
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            // slidesToShow: 4,
                            swipe: true
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            // slidesToShow: 2,
                            swipe: true
                        }
                    }
                ]
            });

            let clickedSlide, slideWidth, closeBtn;
            $slider.on('click', '.team-slider-element', function (e) {
                clickedSlide = $(this);
                if (window.outerWidth >= 992) {
                    let containerWidth = $slider.outerWidth();
                    closeBtn = clickedSlide.find('.close-btn');
                    $('.team-slider-header').addClass('disabled');

                    if (clickedSlide.hasClass('active') && !$(e.target).hasClass('close-btn')) return;

                    let content = clickedSlide.find('.team-slider-element-content'),
                        contentInner = content.find('.team-slider-element-inner'),
                        position = clickedSlide.offset().left;

                    if ($(e.target).hasClass('close-btn')) {
                        $('.team-slider-header').removeClass('disabled');
                        clickedSlide.removeClass('active');
                        clickedSlide.css({
                            "width": slideWidth + "px",
                            "transform": "none"
                        });
                        $('.team-slider-element').removeClass('hidden');
                        closeBtn.hide();
                        content.css({ "width": 0 });
                        setTimeout(function () {
                            content.hide()
                        }, 800);
                        contentInner.hide();
                        return;
                    }

                    slideWidth = clickedSlide.outerWidth();

                    $('.team-slider-element').addClass('hidden');
                    clickedSlide.addClass('active');
                    position -= leftContainerPosition;
                    clickedSlide.removeClass('hidden');

                    clickedSlide
                        .removeClass('hidden')
                        .css({
                            "transform": "translateX(-" + position + "px)"
                        });
                    setTimeout(function () {
                        clickedSlide.css({ "width": imgWidth + "px" });
                        content.show();
                        content.css({ "width": containerWidth - imgWidth + "px" })
                        setTimeout(function () {
                            contentInner.show();
                            closeBtn.show();
                        }, 500)
                    }, 800)
                } else {
                    let $popup = $('<div class="team-slider-popup"></div>'),
                        $img = clickedSlide.find('.team-slider-element-img-wrapper'),
                        $content = clickedSlide.find('.team-slider-element-content');
                    $popup.append($img);
                    $popup.append($content);
                    $('body').append($popup);
                    $popup.animate({ "right": "0" }, () => {
                        $popup.find('.close-btn').show()
                    });
                    $popup.on('click', '.close-btn', function () {
                        clickedSlide.append($img, $content);
                        $popup.animate({ "right": "100%" });
                        setTimeout(function () {
                            $popup.remove();
                        }, 400)
                    })
                }
            });
        };

    }

    function setAccordionToSliders() {
        let $slider = $('.slider:not(.slick-initialized)');
        $slider.on('click', '.slider-title', function () {
            $(this).toggleClass('active');
            $(this).closest('.slider-item').toggleClass('expanded');
        })
    }


    $('a[href^="#"]').click(function (e) {
        e.preventDefault();
        let idString = $(this).attr('href');
        if (idString.length === 1 || idString === "#") {
            return
        };
        $('html, body').animate({
            scrollTop: $(idString).offset().top
        }, 1000);
        $('.menu__nav-section').removeClass('active');
    });

    function lazyLoad() {
        let lazyImages = [].slice.call(document.querySelectorAll("img.lazy")),
            lazyBackgrounds = [].slice.call(document.querySelectorAll('.lazy-inline-bg')),
            active = false;

        if ("IntersectionObserver" in window) {
            let lazyImageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        let lazyImage = entry.target;
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImage.classList.remove("lazy");
                        lazyImageObserver.unobserve(lazyImage);
                    }
                })
            });

            lazyImages.forEach(lazyImage => {
                lazyImageObserver.observe(lazyImage);
            });

            let lazyBackgroundObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.remove('lazy-inline-bg');
                        lazyBackgroundObserver.unobserve(entry.target);
                    }
                });
            });

            lazyBackgrounds.forEach(lazyBackground => {
                lazyBackgroundObserver.observe(lazyBackground);
            })
        } else {
            const lazyLoadPolyfill = function () {
                if (!active) {
                    active = true;

                    setTimeout(function () {
                        lazyImages.forEach(lazyImage => {
                            if (
                                (lazyImage.getBoundingClientRect().top <= window.innerHeight
                                    && lazyImage.getBoundingClientRect().bottom >= 0)
                                && getComputedStyle(lazyImage).display !== 'none'
                            ) {
                                lazyImage.src = lazyImage.dataset.src;
                                lazyImage.classList.remove("lazy");
                                lazyImages = lazyImages.filter(image => image !== lazyImage);
                            }
                        });

                        lazyBackgrounds.forEach(lazyBackground => {
                            if (
                                (lazyBackground.getBoundingClientRect().top <= window.innerHeight
                                    && lazyBackground.getBoundingClientRect().bottom >= 0)
                                && getComputedStyle(lazyBackground).display !== 'none'
                            ) {
                                lazyBackground.classList.remove("lazy-inline-bg");
                                lazyBackgrounds = lazyBackgrounds.filter(lazyBackground => lazyBackground !== lazyBackground)
                            }
                        })

                        if (lazyImages.length === 0 && lazyBackground.length === 0) {
                            document.removeEventListener("scroll", lazyLoadPolyfill);
                            document.removeEventListener("resize", lazyLoadPolyfill);
                            document.removeEventListener("orientationchange", lazyLoadPolyfill);
                        }

                        active = false;
                    }, 200);
                }
            };

            document.addEventListener("scroll", lazyLoadPolyfill);
            document.addEventListener("resize", lazyLoadPolyfill);
            document.addEventListener("orientationchange", lazyLoadPolyfill);
        }
    };

})

function addZeroToNumber(number) {
    return number < 10 ? '0' + number : number;
};

function appendNumberstoSliderPagination($pagination, number) {
    $pagination.find('.slider-pagination-left').text('01');
    $pagination.find('.slider-pagination-right').text(addZeroToNumber(number));
};


function initMainSlider() {
    let i = 0;
    let $video = $('.video-js'),
        $pagination = $video.parents('.main-slider-container').find('.slider-pagination'),
        duration = 0;

    function initPagination() {
        duration = $($video).get(i).duration;
        // $($video).on('canplaythrough', function () {
        //     $video.play();
        // });
        if ($video[i].readyState > 3) {
            $video[i].play();
        };

        $video.on('timeupdate', function () {
            let currentPagination = $('.main-slider-pagination-item div').get(i);
            $(currentPagination).css('width', $($video).get(i).currentTime / duration * 100 + '%');
        });
    }

    if ($video) {
        initPagination();
    }

    appendNumberstoSliderPagination($pagination, $video.length);

    // $video[i].play();
    $video.on('ended', function () {
        $('.main-slider-item')[i].classList.remove('active');
        $('.main-slider-pagination-item div').css('width', 0);
        if (i === $video.length - 1) {
            i = -1;
        }
        setTimeout(function () {
            $('.main-slider-item')[++i].classList.add('active');
            initPagination();
            $video[i].play();

        }, 400)
    });
    let $slides = $('.main-slider-item');
    $('.main-slider-button').on('click', function () {

        if ($(this).hasClass('prev')) {
            if (!$($slides.get(i)).hasClass('active')) {
                return
            }
            $video[i].pause();
            $slides[i].classList.remove('active');
            setTimeout(function () {
                $video[i].currentTime = 0;
                if (i === 0) {
                    i = $video.length;
                }
                $('.main-slider-pagination-item div').css('width', 0);
                $slides[--i].classList.add('active');
                initPagination();
                $video[i].play();
            }, 400)

        } else if ($(this).hasClass('next')) {
            if (!$($slides.get(i)).hasClass('active')) {
                return
            }
            $video[i].pause();
            $slides[i].classList.remove('active');
            setTimeout(function () {
                $video[i].currentTime = 0;
                if (i === $video.length - 1) {
                    i = -1;
                }
                $('.main-slider-pagination-item div').css('width', 0);
                $slides[++i].classList.add('active');
                initPagination();
                $video[i].play();
            }, 400)
        }
    });

    /*document.querySelectorAll('.video-js').forEach( (item) => {
        videojs(item, {
            controls: false,
            autoplay: false,
            preload: 'auto',
            readyState: 4,
            muted: true,
            // videoWidth: 1920,
            // videoHeight: 1080
        });
    });

    let $slider = $('.main-slider'),
        $parent = $slider.closest('.main-slider-container'),
        $pagination = $parent.find('.main-slider-footer');

    $slider.on('init', function (e, slick) {
        appendNumberstoSliderPagination($pagination, slick);
    })

    $slider.on('init reinit afterChange', function (event, slick, currentSlide = 0) {
        let $slide = $slider.find('.slick-current'),
            $video = $slide.find('video').get(0),
            duration = 0;
        if ($video) {
            duration = $video.duration;
            // $($video).on('canplaythrough', function () {
            //     $video.play();
            // });
            if ($video.readyState > 3) {
                $video.play();
              };

            $($video).on('timeupdate', function () {
                let currentPagination = $('.main-slider-pagination-item div').get(currentSlide);
                $(currentPagination).css('width', $video.currentTime / duration * 100 + '%');
            });
        }
    });
    $slider.on('beforeChange', function (event, slick) {
        let $slide = $slider.find('.slick-current'),
            $video = $slide.find('video').get(0);

        if ($video) {
            $video.pause();
            $video.currentTime = 0;
        }
    })

    $slider.slick({
        speed: 850,
        dots: true,
        fade: true,
        lazyLoad: "progressive",
        swipe: false,
        dotsClass: 'slider-pagination-list',
        appendDots: $pagination.find('.main-slider-pagination'),
        customPaging: function (slick, index) {
            return '<div class="main-slider-pagination-item"><div></div></div>'
        },
        arrows: false,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    swipe: true
                }
            }
        ]
    });
    $slider.find('video').each(function (index, item) {
        $(item).on('ended', function () {
            // $slider.slick('slickNext');
            $pagination.find('.next').trigger('click');
        })
    })
    $pagination.on('click', '.main-slider-button', function () {
        let $this = $(this);
        setTimeout(function () {
            if ($this.hasClass('prev')) {
                $slider.slick('slickPrev');
            }
            if ($this.hasClass('next')) {
                $slider.slick('slickNext');
            }
        }, 0)
    })*/
};

