$(function(){
	
	$('.navbox li').hover(function(){
		$(this).children('ul').stop().slideDown();
		$(this).addClass('active');		
	},function(){
		$(this).children('ul').stop().slideUp();
		$(this).removeClass('active');
	});
	
	
	$('.lagcg').hover(function(){
		$(this).children('.cgbox').fadeIn();		
	},function(){
		$(this).children('.cgbox').fadeOut();	
	});
	
	
	$('.shwork .shworklist').hover(function(){
		$(this).addClass('active');		
	},function(){
		$(this).removeClass('active');
	});
	

	//选择
	$('[name="nice-select"]').click(function(e){
	    $('[name="nice-select"]').find('ul').hide();
	    $(this).addClass('on');
	    $(this).find('ul').show();
		e.stopPropagation();
	});
	$('[name="nice-select"] li').hover(function(e){
		$(this).toggleClass('on');
		e.stopPropagation();
	});
	$('[name="nice-select"] li').click(function(e){
		var val = $(this).text();
		$(this).parents('[name="nice-select"]').find('input').val(val);
		$('[name="nice-select"] ul').hide();
		$('[name="nice-select"]').removeClass('on');
		e.stopPropagation();
	});
	$(document).click(function(){
		$('[name="nice-select"] ul').hide();
	});
	
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

	
	
	
	
	
	
})
