    

   // $("#boxscroll").niceScroll({cursorborder:"",cursorcolor:"#555",boxzoom:true}); 
   
         $('#boxscroll').niceScroll({
      cursorcolor: "#ccc",
      cursoropacitymax: 1, 
      touchbehavior: false, 
      cursorwidth: "5px",
      cursorborder: "0",
      cursorborderradius: "5px",
      autohidemode: false 
     });     


   
$(document).ready(function() {

 $("#container").niceScroll();  
 $("#boxscroll2").niceScroll({cursorborder:"",cursorcolor:"#555",boxzoom:true});  
    
    $("#boxscroll3").niceScroll({cursorborder:"",cursorcolor:"#555",boxzoom:true}); 

     
$("ul#topnav li").hover(function() { 
    $(this).css({ 'background' : '#ff9933'}); 
    $(this).find("span").show(); 
} , function() { 
    $(this).css({ 'background' : 'none'}); 
    $(this).find("span").hide(); 
});
    
});