$(function() {
    jQuery(document).ready(function() {

        var totalwidth = jQuery(".shao-nav").width();
        var allliwidth = 0;
        var othernavary = new Array();
        var znmb1_other_navul = jQuery(".duo-nav")[0];
        var zwmbdh_nav = jQuery("#yiji_menu_ul");

        var navliobjlist = jQuery("#yiji_menu_ul > li");

        for (var i = 0; i < navliobjlist.length; i++) {
            var liobj = navliobjlist.get(i);
            if (liobj) {
                var jliobj = jQuery(liobj);
                var liwidth = jliobj.width();
                allliwidth += liwidth;
                if (allliwidth >= totalwidth) {
                    var templiobj = jliobj[0];
                    othernavary.push(templiobj);
                    zwmbdh_nav[0].removeChild(jliobj[0]);
                }
            }
        }

        if (allliwidth > totalwidth) {
            jQuery(".more-nav").attr("style", '');

            for (var i = 0; i < othernavary.length; i++) {
                jQuery(othernavary[i]).find("ul").css("top", "0px");
                jQuery(othernavary[i]).find("ul").css("left", "-200px");

                znmb1_other_navul.appendChild(othernavary[i]);
            }
        } else {
            jQuery(".more-nav").attr("style", 'display:none');
        }
        jQuery("#yiji_menu_ul").css("visibility", "visible");

    });
    $(".shao-nav>ul>li").hover(function() {
        if ($(this).children("div").html()) {
            $(this).addClass("on");
            $(this).children("div").stop(false, true).slideDown()
        }
    }, function() {
        $(this).removeClass("on");
        $(this).children("div").stop(false, true).slideUp()
    });
    $(".more-nav span").click(function() {
            $(".duo-nav").stop().slideToggle()
        })
        //手机导航效果
    $(".nav-icon").click(function() {
            $("#navbg").fadeIn();
            $('.navlist').animate({ right: '0px' });
            // $(this).siblings('.navlist').show();
        })
        //按钮点击事件
    $(".navlist li i").click(function() {
            $(this).next('.ejnav').slideToggle();
            $(this).parent().siblings().children('.ejnav').slideUp();
            if ($(this).next('.ejnav').length > 0) {
                $(this).toggleClass("icon");
            }
            $(this).parent().siblings().children('i').removeClass("icon");
        })
        //关闭展开导航	
    $(".closebtn").click(function() {
        $("#navbg").hide();
        $("#monile_nav").animate({ right: '-1024px' });
        // $('.navlist').hide();
    })



})