$(function () {
    mar_pad();
});


function mar_pad() {
    for(i=1;i<101;i++){
        $(".mt_"+i+"").css("marginTop",i+"px");
        $(".mb_"+i+"").css("marginBottom",i+"px");
        $(".ml_"+i+"").css("marginLeft",i+"px");
        $(".mr_"+i+"").css("marginRight",i+"px");
        $(".pt_"+i+"").css("paddingTop",i+"px");
        $(".pb_"+i+"").css("paddingBottom",i+"px");
        $(".pl_"+i+"").css("paddingLeft",i+"px");
        $(".pr_"+i+"").css("paddingRight",i+"px");
        if(i<11){
            $(".em_"+i*5+"").css("marginRight",i*0.5+"em")
        }
    }
    $(".em_05").css("marginRight",0.5+"em")
}


(function ($) {
    $.fn.extend({
        "violin": function (options) {
            if (!isValid(options))
                return this;
            var opts = $.extend({}, defaluts, options);
            return this.each(function () {
                var $this = $(this);

                var n=$this.find("ul li").size();
                $this.find("ul li").css({"position":"absolute","left":"0","top":"0","width":"100%","text-align":"center"})
                $this.find("ul li a img").css({"display":"block"})
                if(n==0){return this}
                $this.find(".others p").html("")
                $this.find(".more:gt(0)").css("display","none")
                for(i=0;i<n;i++){
                    var $dot=$("<i></i>")
                    if(i==0){
                        $dot=$("<i class='on'></i>")
                    }else{
                        $this.find("ul li").eq(i).hide()
                        $this.find(".others h1").eq(i).hide()
                    }
                    $this.find(".others p").append($dot)
                }
                var x=0,timer=setInterval(loop,5000)

                function loop() {
                    x++;if(x>n-1)(x=0)
                    move()
                }
                $this.hover(function () {
                    clearInterval(timer)
                },function () {
                    clearInterval(timer);
                    timer=setInterval(loop,5000)
                })

                $this.find(".others .rightBtn").click(function () {
                    x++;if(x>n-1)(x=0);
                    move()
                })

                $this.find(".others .leftBtn").click(function () {
                    x--;if(x<0)(x=n-1);
                    move()
                })

                $this.find(".others p i").each(function (i) {
                    $(this).hover(function () {
                        x=i;
                        move()
                    },function () {
                        x=i;
                    })
                })
                function move() {
                    if(!$this.find("ul li").is(":animated")){
                        $this.find("ul li").eq(x).fadeIn(600).siblings("li").fadeOut(600);
                        $this.find(".others h1").eq(x).fadeIn(600).siblings("h1").fadeOut(600);
                        $this.find(".others p i").eq(x).addClass("on").siblings("i").removeClass("on");

                        $this.find(".more").css("display","none")
                        $this.find(".more").eq(x).css("display","block")
                    }

                }
            });
        }
    });
    var defaluts = {
        foreground: 'red'
    };

    function isValid(options) {
        return !options || (options && typeof options === "object") ? true : false;
    }
})(window.jQuery);


(function ($) {
    $.fn.extend({
        "violinSlc": function (options) {
            if (!isValid(options))
                return this;
            var opts = $.extend({}, defaluts, options);
            return this.each(function () {
                var $this = $(this);
                $this.find(""+opts.show+":gt(0)").css("display","none")
                $this.find(opts.btn).eq(0).addClass("on")

                $this.find(opts.btn).each(function (i) {
                    $(this).click(function () {
                        $this.find(opts.btn).removeClass("on")
                        $(this).addClass("on")
                        $this.find(opts.show).css("display","none")
                        $this.find(opts.show).eq(i).css("display","block")
                    })
                })
            });
        }
    });
    var defaluts = {
        btn: ".SlcBtn",
        show:".SlcShow"
    };

    function isValid(options) {
        return !options || (options && typeof options === "object") ? true : false;
    }
})(window.jQuery);