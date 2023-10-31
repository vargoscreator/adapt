(function ($) {
    'use strict';
    $(document).ready(function () {

        var elements = document.getElementsByClassName("contact__item");

        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', function(event) {
                if (event.target === this || event.target.classList.contains('contact__text')) {
                    this.classList.toggle('active');
                    console.log("active checkbox");
                }
            });
        }

        $('#input__file').on('change', function () {
            if ($(this).get(0).files.length !== 0) {
                $('.input__file-button').addClass('selected');
            }
            else {
                $('.input__file-button').removeClass('selected');
            }
        });

        function selectFile() {
            // Знаходимо елемент вводу файлу за його ID
            var fileInput = document.getElementById('input__file');
            // Спрацьовуємо клік на ньому
            fileInput.click();

            // Додаємо обробник події change для вибору файлу
            fileInput.addEventListener('change', function () {
                var selectedFileName = document.querySelector('.main__desc');
                selectedFileName.textContent = fileInput.files[0].name;
            });
        }

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




    function handleMouseMove(e) {
        let block = e.currentTarget;
        let blockRect = block.getBoundingClientRect();
        let blockCenterX = blockRect.left + blockRect.width / 2;
        let blockCenterY = blockRect.top + window.scrollY + blockRect.height / 2;
    
        let distanceX = (e.pageX - blockCenterX) / blockRect.width;
        let distanceY = (e.pageY - blockCenterY) / blockRect.height;
    
        let depth = 1; 
        let translateX = distanceX * depth * 20; 
        let translateY = distanceY * depth * 20;

        const scaleValue = block.classList.contains('active') ? '1.03' : '1';
        block.style.transform = 'translate3d(' + translateX + 'px,' + translateY + 'px, 0) scale(' + scaleValue + ')';
    }
    

      let blocks = document.querySelectorAll('.contact__item');

      blocks.forEach(function(block) {
        
        block.addEventListener('mouseover', function() {
            block.addEventListener('mousemove', handleMouseMove);
        });

        block.addEventListener('mouseout', function() {
            block.removeEventListener('mousemove', handleMouseMove);
            const scaleValue = block.classList.contains('active') ? '1.03' : '1';
            block.style.transform = 'translate3d(0px, 0px, 0px) scale(' + scaleValue + ')';
        });
    });


    let sectionItem = document.querySelectorAll('.contact__item, .contact__form-button');
    sectionItem.forEach(section => {
        section.addEventListener('mouseenter', changeSize);
        section.addEventListener('mouseleave', resetSize);
    });

    function changeSize() {
        let cursor = document.querySelector('.cb-cursor');
        cursor.classList.add('cb-cursor-hover');
    }
    
    function resetSize() {
        let cursor = document.querySelector('.cb-cursor');
        cursor.classList.remove('cb-cursor-hover');
    }


    document.body.style.overflowY = 'hidden';
    setTimeout(function() {
        document.body.style.overflowY = 'auto';
    }, 2000);
    
});


