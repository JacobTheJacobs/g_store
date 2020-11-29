var Tracking = function() {
    $(".c-nav").on("click", ".c-nav__link--about", function() {
        ga("send", "event", "Nav", "click", "The Story")
    }),
    $(".c-nav").on("click", ".c-nav__link--preorder", function() {
        ga("send", "event", "Nav", "click", "Preorder")
    }),
    $(".c-nav").on("click", ".c-nav__link--list", function() {
        ga("send", "event", "Nav", "click", "Get Updates")
    }),
    $(".c-share").on("click", ".c-share__link", function() {
        ga("send", "event", "Share " + $(this).attr("data-social").toUpperCase(), "click", $(this).attr("data-url"))
    }),
    $(".c-intro").on("click", ".c-intro__button", function() {
        ga("send", "event", "Intro", "click", "CTA Button")
    }),
    $(".c-love-more").on("click", ".c-love-more__product-button", function() {
        ga("send", "event", "Preorder", "click", $(this).attr("data-product"))
    }),
    $(".c-love-more__discount").on("click", ".c-love-more__open-discount", function() {
        ga("send", "event", "Discount", "click", $(this).text())
    }),
    $(".c-love-more__discount").on("click", ".c-love-more__upviral", function() {
        ga("send", "event", "Discount", "click", "Upviral Campaign")
    }),
    $(".c-about__quote-credit").on("click", "a", function() {
        ga("send", "event", "Creator's Note", "click", "Bourn Link")
    }),
    $(".c-instagram").on("click", ".c-instagram__icon", function() {
        ga("send", "event", "Instagram", "click", "Icon")
    }),
    $(".c-instagram").on("click", ".c-instagram__link", function() {
        ga("send", "event", "Instagram", "click", "Follow us on Instagram")
    }),
    $(".c-footer__links").on("click", ".c-instagram__link--instagram", function() {
        ga("send", "event", "Footer", "click", "Instagram")
    }),
    $(".c-footer__links").on("click", ".c-instagram__link--email", function() {
        ga("send", "event", "Footer", "click", "Email")
    })
};
new Tracking;
var Share = function() {
    var t = $(".social-share")
      , e = "MORE by Bourn - Little reminders to do the important things, more. via @madebybourn"
      , o = function() {
        $.each(t, function(t, o) {
            if ("email" === $(o).attr("data-social"))
                "" !== $(o).attr("data-subject") && "" !== $(o).attr("data-message") ? $(o).attr("href", "mailto:?subject=" + encodeURIComponent($(o).attr("data-subject")) + "&body=" + encodeURIComponent($(o).attr("data-message"))) : $(o).attr("href", "mailto:?subject=" + encodeURIComponent("Check this out!") + "&body=" + encodeURIComponent(e + "\n\nVisit: " + shareUrl));
            else {
                var c = $(this).attr("data-url")
                  , a = $(this).attr("data-social")
                  , i = "" !== $(this).attr("data-message") ? $(this).attr("data-message") : e;
                $(o).on("click", function(t) {
                    t.preventDefault(),
                    n(a, i, c)
                })
            }
        })
    }
      , n = function(t, e, o) {
        var n = void 0
          , c = ""
          , a = e;
        "twitter" === t ? c = "https://twitter.com/share?url=" + encodeURIComponent(o) + "&text=" + encodeURIComponent(a) : "facebook" === t && (c = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(o)),
        n = window.open(c, t, "width=500,height=500"),
        n.focus()
    };
    o()
};
new Share;
var LoveMore = function() {
    var t = function() {
        $(".c-instagram__carousel").addClass("init-slick"),
        $(".c-instagram__carousel").slick({
            appendArrows: ".c-instagram__arrows",
            asNavFor: ".c-instagram__captions",
            centerMode: !0,
            centerPadding: "60px",
            dots: !1,
            focusOnSelect: !0,
            infinite: !0,
            nextArrow: '<span class="slick-next"></span>',
            prevArrow: '<span class="slick-prev"></span>',
            slidesToShow: 1,
            speed: 300,
            variableWidth: !0
        }),
        $(".c-instagram__captions").slick({
            arrows: !1,
            asNavFor: ".c-instagram__carousel",
            dots: !1,
            fade: !0,
            slidesToScroll: 1,
            slidesToShow: 1
        })
    }
      , e = function() {
        $(".c-intro__button").on("click", function(t) {
            t.preventDefault(),
            $("html,body").animate({
                scrollTop: $(".c-love-more").offset().top
            })
        })
    }
      , o = function() {
        $(".c-love-more__product-button").on("click", function(t) {
            t.preventDefault(),
            $(this).hasClass("is-disabled") || $(this).parents(".c-love-more__product").find(".c-love-more__product-buy").addClass("is-active")
        }),
        $(".c-love-more__product-buy-close").on("click", function(t) {
            t.preventDefault(),
            $(this).parents(".c-love-more__product-buy").removeClass("is-active")
        })
    };
    e(),
    o(),
    t()
};
new LoveMore;
var headerHeight = $("header").outerHeight()
  , setupNav = function() {
    $(".c-nav__link--about").on("click", function(t) {
        t.preventDefault(),
        $("html,body").animate({
            scrollTop: $(".c-about").offset().top - headerHeight
        })
    }),
    $(".c-nav__link--preorder").on("click", function(t) {
        t.preventDefault(),
        $("html,body").animate({
            scrollTop: $(".c-love-more__products").offset().top
        })
    }),
    $(".c-nav__link--list, .c-love-more__list-link").on("click", function(t) {
        t.preventDefault(),
        $("html,body").animate({
            scrollTop: $(".c-footer").offset().top
        })
    })
}
  , setupScroll = function() {
    var t, e = $(".c-intro"), o = $(".c-love-more");
    $(window).on("scroll", function() {
        t = o[0].getBoundingClientRect().top / o.offset().top,
        e.css({
            opacity: t - .3
        }),
        console.log(t, $(".c-love-more").offset().top, o[0].getBoundingClientRect().top)
    })
};
setupNav();
