// JavaScript Document
(function ($, window) {

    var bcis = {};

    bcis.properties = {
        windowWidth: '',
        isMobile: false,
        isDesktop: false,
        maxWidth: 916
    };

    bcis.utils = {
        preload: function preloadImages(images, callback) {
            var count = images.length;
            if (count === 0) {
                callback();
            }
            var loaded = 0;
            $(images).each(function () {
                $('<img>').attr('src', this).load(function () {
                    loaded++;
                    if (loaded === count) {
                        callback();
                    }
                });
            });
        }
    };

    bcis.environment = {
        mobileCheck: function () {
            var check = false;
            (function (a, b) {
                if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))check = true
            })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        },

        resize: function () {
            bcis.carousel.resize();

        },

        init: function () {
            var self = bcis;

            // window size
            self.properties.windowWidth = $(window).width();

            // device type
            if (self.environment.mobileCheck()) {
                self.environment.isMobile = true;
                $('html').addClass('mobile');
            } else {
                self.environment.isDesktop = true;
                $('html').addClass('desktop');
            }
        }
    };

    bcis.carousel = {
        $html: $('.carousel'),
        $slider: $('#slider', this.$html),
        $controls: $('.slide-btn', this.$html),
        slidesCount: $('.slide', this.$slider).length,
        $dots: $('.dots', this.$html),
        $banners: $('.shout-out', this.$html),
        $slidePos: 0,

        updateNavButtons: function(){
            $('.dot', this.$dots).eq(this.$slidePos).addClass('active').siblings().removeClass('active');
            $('.slide', this.$slider).eq(this.$slidePos).addClass('active').siblings().removeClass('active');

            this.$controls.removeClass('disabled');
            if(this.$slidePos == 0 ){
                this.$controls.eq(0).addClass('disabled');
            }
            if(this.$slidePos == (this.slidesCount-1)){
                this.$controls.eq(1).addClass('disabled');
            }
        },

        slide: function(direction){
            var oldLeftMargin = parseInt(this.$slider.css('margin-left').replace('px','')),
                newLeftMargin;

            this.$slider.addClass('animated');
            if(direction == 'right'){
                newLeftMargin = oldLeftMargin - $(window).width();
                this.$slidePos++;
            } else {
                newLeftMargin = oldLeftMargin + $(window).width();
                this.$slidePos--;
            }
            this.$slider.css('margin-left', newLeftMargin);
        },

        init: function(){
            var carousel = this;

            carousel.$controls.on('click', function(evt){
                evt.preventDefault();

                if($(this).hasClass('slide-right')){
                    if(carousel.$slidePos < (carousel.slidesCount-1)){
                        carousel.slide('right');
                    }
                } else {
                    if(carousel.$slidePos > 0){
                        carousel.slide('left');
                    }
                }
            });

            carousel.$slider.on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
                carousel.updateNavButtons();
            });

            carousel.$html.swipe({
                swipe:function(event, direction) {
                    if(direction == 'right'){
                        $('.slide-left', carousel.$html).trigger('click');
                    }
                    if(direction == 'left'){
                        $('.slide-right', carousel.$html).trigger('click');
                    }
                },
                threshold: 0
            });

            carousel.$controls.eq(0).addClass('disabled');
            $('.slide', carousel.$slider).eq(0).addClass('active');
            carousel.resize();
        },

        resize: function(){
            this.$slider.removeClass('animated');
            this.$slider.width($(window).width() * this.slidesCount).removeClass('hidden');
            $('.slide', this.$slider).width($(window).width());
            $('li', this.$dots).eq(this.$slidePos).addClass('active');

            var newLeftMargin;
            if(this.$slidePos != 0 ){
                newLeftMargin = '-' + (this.$html.width() * parseInt(this.$slidePos)) + 'px';
            } else {
                newLeftMargin = '0px';
            }
            this.$slider.css('margin-left', newLeftMargin);

            // positioning controls
            if ($(window).width() < bcis.properties.maxWidth ){
                $('.left-control').css('left', 0);
                $('.right-control').css('right', 0);
                this.$banners.css('left', 0);
            } else {
                $('.left-control').css('left', ($(window).width() - bcis.properties.maxWidth)/2);
                this.$banners.css('left', ($(window).width() - bcis.properties.maxWidth)/2);
                $('.right-control').css('right', ($(window).width() - bcis.properties.maxWidth)/2);
            }
        }
    };

    bcis.mobileNav = {

        init: function () {
            $("#menu").mmenu({
                "extensions": [
                    "pageshadow",
                    //"theme-dark",
                    "pagedim",
                    "effect-menu-slide",
                    "effect-listitems-slide"
                ],
                "offCanvas": {
                    "position": "right"
                }
                //,"slidingSubmenus": false
            });
        }
    };

    bcis.init = function () {

        // all init
        bcis.environment.init();
        bcis.mobileNav.init();
        bcis.carousel.init();

        // resize triggers
        $(window).on('resize', function () {

            var newWidth = $(window).width(),
                    oldWidth = bcis.properties.windowWidth;

            if (oldWidth != newWidth) {
                bcis.properties.windowWidth = newWidth;
                bcis.resize();
            }
        });

        bcis.resize();
        $(window).trigger('resize');
    };

    // main resize
    bcis.resize = function () {
        bcis.environment.resize();
    };

    // main init
    $(document).ready(function () {
        bcis.init();
    });

}(jQuery, window));