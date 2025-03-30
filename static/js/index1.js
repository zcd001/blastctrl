$(function(){

	var exp = $('.sec-tab'),
    	exp_menu = exp.find('.sec-menu a'),
    	exp_wp = exp.find('.sec-wp'),
    	exp_con = exp_wp.find('.sec-con');

    exp_wp.height(exp_con.eq(0).outerHeight());
    exp_menu.eq(0).addClass('on');
    exp_con.eq(0).css('display','block');

    exp_menu.click(function(){
    	var Index = $(this).index()/2;
    	$(this).addClass('on').siblings().removeClass('on');
    	exp_wp.height(exp_con.eq(Index).outerHeight());
    	exp_con.css('display','none');
    	exp_con.eq(Index).fadeIn();
    });

    var tab = $('.tab-wp'),
    	tab_ul = tab.find('ul'),
    	tab_li = tab_ul.children('li'),
    	tab_c = tab_li.length,
    	prev = $('.tab-prev'),
    	next = $('.tab-next'),
    	tab_num = 0;

    tab_li.eq(tab_c-1).css('margin-right',0);
    tab_ul.css('width',130*tab_c+30*(tab_c-1));
    prev.addClass('tab-disabled');

    next.click(function(){
    	if(!tab_ul.is(':animated')){
    		if(tab_num<tab_c-7){
    			tab_num++;
    			prev.removeClass('tab-disabled');
    			tab_ul.animate({left:-tab_num*160+'px'},300);
    		}else{
    			next.addClass('tab-disabled');
    		}
    		
    	};
    });
    prev.click(function(){
    	if(!tab_ul.is(':animated')){
    		if(tab_num>0){
    			tab_num--;
    			next.removeClass('tab-disabled');
    			tab_ul.animate({left:-tab_num*160+'px'},300);
    		}else{
    			prev.addClass('tab-disabled');
    		}
    	};
    });

    var Search = $(".hd-search form input");
    var Value = Search.val();
    Search.focus(function(){
        if($(this).val()==Value){
            $(this).val('');
        }  
    });
    Search.blur(function(){
        if($(this).val()==''){
            $(this).val(Value);
        }
    });
});