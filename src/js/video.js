$(document).ready(function() {
    let i = 0;
    let $video = $('.video-js')
    $video[i].play();
    $video.on('ended', function () {
        $('.main-slider-item')[i].classList.remove('active');
        if (i === $video.length-1) {
            i = -1;
        }
        setTimeout( function() {
            $('.main-slider-item')[++i].classList.add('active');
            $video[i].play();
        
        }, 400)
    });
    
    $('.main-slider-button').on('click', function () {
        if($(this).hasClass('prev')) {
            $video[i].pause();
            $('.main-slider-item')[i].classList.remove('active');
            setTimeout( function() {
                $video[i].currentTime = 0;
                if (i === 0) {
                    i = $video.length;
                }
                $('.main-slider-item')[--i].classList.add('active');
                $video[i].play();
            }, 400)

        } else if ($(this).hasClass('next')) {
            $video[i].pause();
            $('.main-slider-item')[i].classList.remove('active');
            setTimeout( function() {
                $video[i].currentTime = 0;
                if (i === $video.length-1) {
                    i = -1;
                }
                $('.main-slider-item')[++i].classList.add('active');
                $video[i].play();
            }, 400)
        }
    })
});