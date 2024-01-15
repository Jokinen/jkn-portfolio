var mq = window.matchMedia(
    "only screen and (min-device-width : 320px) and (max-device-width : 480px)"
);

function toggleSkills(element) {
    var tmpAtrr = element.attr("data-skill");
    if (typeof tmpAtrr !== typeof undefined && tmpAtrr !== false) {
        var heightOfLi = 0;
        var skillChild = element.find('ul[data-child="true"]');
        if (skillChild.hasClass("hidden")) {
            skillChild
                .removeClass("hidden")
                .addClass("anim-slide-down-fade-in");
            /* force a redraw of the DOM to enable CSS transition effect */
            element.height();
            skillChild.removeClass("anim-slide-down-fade-in");
            element.addClass("open");
            if (!mq.matches) {
                heightOfLi = element.height();
                if (element.next().is("li:nth-child(even)")) {
                    element.next().css("min-height", heightOfLi + 1);
                }
                if (element.next().is("li:nth-child(odd)")) {
                    element.prev().css("min-height", heightOfLi - 1);
                }
            }
            /* force a redraw of the DOM to enable CSS transition effect */
            $(this).height();
            var skillName = element.attr("data-skill");
            $('li[data-skill="' + skillName + '"] .skill-fill').each(
                function () {
                    var attr = $(this).attr("data-level-child");
                    if (typeof attr !== typeof undefined && attr !== false) {
                        animateSkill($(this));
                    }
                }
            );
        } else {
            skillChild.addClass("hidden");
            element.removeClass("open");
            element.next().removeAttr("style");
            element.prev().removeAttr("style");
        }
    }
}

function animateSkill(element) {
    var skillAmount = element.attr("data-level");
    if (!(typeof skillAmount !== typeof undefined && skillAmount !== false)) {
        skillAmount = element.attr("data-level-child");
    }
    element.css("width", skillAmount + "%");
}

function scrollToAnchor(aid) {
    var aTag = $("a[id='" + aid + "']");
    $("html,body").stop().animate({ scrollTop: aTag.offset().top }, "slow");
}

function scrollToImage(aid) {
    var aTag = $("a[id='" + aid + "']");
    $(".image-browser")
        .stop()
        .animate(
            {
                scrollTop:
                    aTag.offset().top -
                    $(".image-browser").offset().top +
                    $(".image-browser").scrollTop(),
            },
            "slow"
        );
}

function buildImages(number) {
    var imgs = [];
    for (i = 1; i <= number; i++) {
        imgs.push('<img src="img/work/wp-index-' + i + '.jpg">');
    }
    return imgs;
}

$(document).ready(function () {
    $(".contact-form label").addClass("js-label");

    $(".skill-fill").each(function () {
        var attr = $(this).attr("data-level");
        if (typeof attr !== typeof undefined && attr !== false) {
            animateSkill($(this));
        }
    });

    $(".skill-list li").click(function () {
        toggleSkills($(this));
    });

    $(".expand").click(function () {
        var icon = $(this).find(".fa");
        if (icon.hasClass("fa-expand")) {
            $(this).html('<i class="fa fa-compress"></i> Close All');
            $(".skill-list .has-child").each(function () {
                if (!$(this).hasClass("open")) {
                    toggleSkills($(this));
                }
            });
        } else {
            $(this).html('<i class="fa fa-expand"></i> Expand All');
            $(".skill-list .has-child").each(function () {
                if ($(this).hasClass("open")) toggleSkills($(this));
            });
        }
    });

    $(".mobile-menu-toggle").click(function () {
        $("nav ul").toggleClass("show");
    });

    $(".top-bar").on("click", ".show li a", function () {
        $("nav ul").toggleClass("show");
    });

    $("nav ul li a").click(function (e) {
        e.preventDefault();
        var scrollId = $(this).attr("href");
        scrollToAnchor(scrollId.slice(1));
    });

    $(".wrap").on(
        "focus",
        '.contact-form input[type="text"], .contact-form textarea',
        function () {
            $(this).prev("label").removeClass("js-label");
        }
    );

    $(".wrap").on(
        "focusout",
        '.contact-form input[type="text"], .contact-form textarea',
        function () {
            if (!$(this).val()) {
                $(this).prev("label").addClass("js-label");
            }
        }
    );

    $(".work-images").click(function () {
        $(".image-browser").addClass("on-focus");
        $("body").css("overflow", "hidden");
        if (!$(".image-container").hasClass("loaded")) {
            $(".image-container").addClass("loaded");
            var imgs = buildImages(7);
            for (i = 0; i < imgs.length; i++) {
                if (i == 0) {
                    $(".image-container .image-" + (i + 1)).append(
                        $(imgs[i]).addClass("current")
                    );
                } else {
                    $(".image-container .image-" + (i + 1)).append($(imgs[i]));
                }
            }
        }
    });

    $(".image-browser .close").click(function () {
        $(".image-browser").removeClass("on-focus");
        $("body").css("overflow", "inherit");
    });

    var next = 2;
    var prev = 7;

    $(".next").click(function () {
        console.log(next + ", " + prev);
        var targetID = "image-" + next;
        scrollToImage(targetID);
        if (next == 7) {
            next = 1;
            prev += 1;
        } else if (next == 2) {
            next += 1;
            prev = 1;
        } else {
            next += 1;
            prev += 1;
        }
    });

    $(".previous").click(function () {
        console.log(next + ", " + prev);
        var targetID = "image-" + prev;
        scrollToImage(targetID);
        if (prev == 6) {
            next = 7;
            prev -= 1;
        } else if (prev == 1) {
            next -= 1;
            prev = 7;
        } else {
            next -= 1;
            prev -= 1;
        }
    });
});
