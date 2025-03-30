// JavaScript Document

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
	 

		 
		  