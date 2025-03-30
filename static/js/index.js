// JavaScript Document
	//通知公告
	function AutoScroll(obj) {
				$(obj).find("ul:first").animate({
					marginTop: "-50px"
				}, 500, function() {
					$(this).css({
						marginTop: "0px"
					}).find("li:first").appendTo(this);
				});
			}
			$(document).ready(function() {
				setInterval('AutoScroll("#s1")', 3000);
			});

 //导航效果
     $(function(){
 		$(".meun_icon").click(function(){
 			$("#navbg").fadeIn(300);
 			$('.mob_nav').animate({right:'0px'},"fast");
 			})
 		//关闭展开导航	
 		$(".colsebtn").click(function(){
 			$("#navbg").hide();
 			$('.mob_nav').animate({right:'-80%'},"fast");
 			})
     });
	 
	 //团队检索 
	 function selectXl(e) {
	 	    event.stopPropagation();
	         var checkVal;
	         if(!$(e).hasClass("xl_open")){
	             $(e).addClass("xl_open");
	             var ul_list = $(e).siblings(".select_area").find("ul.select_list");
	             var ul_li = ul_list.children("li");
	             ul_list.slideDown();
	 			 $(document).on("click", function() { 
	 			            $(e).siblings(".select_area").find("ul.select_list").slideUp();
	 			            $(e).removeClass("xl_open");
	 			        });
	             for(var i=0;i<ul_li.length;i++){
	                 ul_li[i].onclick = function(){
	                     var _this = $(this);
	                     checkVal = _this.text();
	                     console.log(checkVal);
	                     $(e).siblings(".select_area").children(".select_tit").text(checkVal);
	                     $(e).removeClass("xl_open");
	                     $(e).siblings(".select_area").find("ul.select_list").slideUp();
	                 };
	             }
	         }else {
	             $(e).removeClass("xl_open");
	             $(e).siblings(".select_area").find("ul.select_list").slideUp();
	         }
	         $(e).parents(".select-type").siblings().find('.select_xl').removeClass("xl_open");
	             $(e).parents(".rank_index").siblings().find('.select_xl').removeClass("xl_open");
	             $(e).parents(".select-type").siblings().find('.select_area').find("ul.select_list").slideUp();
	             $(e).parents(".rank_index").siblings().find('.select_area').find("ul.select_list").slideUp();
	     }
		 
		  