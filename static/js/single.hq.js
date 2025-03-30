$(function(){
	
	$('.user-opr .item').on({
		'mouseover':function(){
			$(this).children('.dropdown').stop().slideDown();
			$(this).addClass('active');
		},
		'mouseout':function(){
			$(this).children('.dropdown').stop().slideUp();
			$(this).removeClass('active');
		}
	});
	
	$('.navbox li').on({
		'mouseover':function(){
			$(this).find('.dropdwon').stop().slideDown();
			$(this).addClass('active');
		},
		'mouseout':function(){
			$(this).find('.dropdwon').stop().slideUp();
			$(this).removeClass('active');
		}
	});
	
	$('.menu li.fNiv').hover(function(){
		$(this).children('ul').stop().slideDown();
		$(this).addClass('active');		
	},function(){
		$(this).children('ul').stop().slideUp();
		$(this).removeClass('active');
	});
	
	$('.groupul li').hover(function(){
		$(this).children().children('.bg').animate({'bottom':'0'},300);		
	},function(){
		$(this).children().children('.bg').animate({'bottom':'-34px'},300);
	});
	
	$('.lagcg').hover(function(){
		$(this).children('.cgbox').fadeIn();		
	},function(){
		$(this).children('.cgbox').fadeOut();	
	});
	
	$('.tit li').click(function() {
	   	var i = $(this).index();
	    $(this).addClass('on').siblings().removeClass('on');
	    $('.edu-tab .content').eq(i).fadeIn().siblings().hide();
	});
	
	$('.f-qrcode .ico-qrcode').on({
		'mouseover':function(){
			$(this).children('.imgw').stop().fadeIn();
		},
		'mouseout':function(){
			$(this).children('.imgw').fadeOut();
		}
	});
	
	$('.leftside li').click(function() {
	   var i = $(this).index();
	    $(this).addClass('cur').siblings().removeClass('cur');
	    $('.mainprofs .profswrap').eq(i).fadeIn().siblings().fadeOut();
	});
})