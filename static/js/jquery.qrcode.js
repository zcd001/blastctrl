﻿(function( $ ){
	$.fn.qrcode = function(options) {
		// if options is string, 
		if( typeof options === 'string' ){
			options	= { text: options };
		}
		//对中文的处理
        options.text = utf16to8(options.text);
		// set default values
		// typeNumber < 1 for automatic calculation
		options	= $.extend( {}, {
			render		: "canvas",
			width		: 256,
			height		: 256,
			typeNumber	: -1,
			correctLevel	: QRErrorCorrectLevel.H,
            background : "#ffffff",
            foreground : "#000000",
            logo : ""
		}, options);

		var createCanvas	= function(){
			// create the qrcode itself
			var qrcode	= new QRCode(options.typeNumber, options.correctLevel);
			qrcode.addData(options.text);
			qrcode.make();

			// create canvas element
			var canvas	= document.createElement('canvas');
			canvas.width	= options.width;
			canvas.height	= options.height;
			var ctx		= canvas.getContext('2d');

			// compute tileW/tileH based on options.width/options.height
			var tileW	= options.width  / qrcode.getModuleCount();
			var tileH	= options.height / qrcode.getModuleCount();

			// draw in the canvas
			for( var row = 0; row < qrcode.getModuleCount(); row++ ){
				for( var col = 0; col < qrcode.getModuleCount(); col++ ){
					ctx.fillStyle = qrcode.isDark(row, col) ? options.foreground : options.background;
					var w = (Math.ceil((col+1)*tileW) - Math.floor(col*tileW));
					var h = (Math.ceil((row+1)*tileW) - Math.floor(row*tileW));
					ctx.fillRect(Math.round(col*tileW),Math.round(row*tileH), w, h);  
				}	
			}
            if(options.logo != "")
		   {
		            var lx = options.width * 0.2;
                    var ly = options.height * 0.2;
                    var image = new Image();
                image.onload = function() {
                           ctx.drawImage(image,(options.width-lx)/2,(options.height-ly)/2,lx,ly);
                } 
                image.src = options.logo;
		   }
			// return just built canvas
			return canvas;
		}

		// from Jon-Carlos Rivera (https://github.com/imbcmdth)
		var createTable	= function(){
			// create the qrcode itself
			var qrcode	= new QRCode(options.typeNumber, options.correctLevel);
			qrcode.addData(options.text);
			qrcode.make();
			
			// create table element
			var $table	= $('<table></table>')
				.css("width", options.width+"px")
				.css("height", options.height+"px")
				.css("border", "0px")
				.css("border-collapse", "collapse")
				.css('background-color', options.background);
			// compute tileS percentage
			var tileW	= options.width / qrcode.getModuleCount();
			var tileH	= options.height / qrcode.getModuleCount();

			// draw in the table
			for(var row = 0; row < qrcode.getModuleCount(); row++ ){
				var $row = $('<tr></tr>').css('height', tileH+"px").appendTo($table);
				
				for(var col = 0; col < qrcode.getModuleCount(); col++ ){
					$('<td></td>')
						.css('width', tileW+"px")
						.css('background-color', qrcode.isDark(row, col) ? options.foreground : options.background)
						.appendTo($row);
				}	
			}
			// return just built table
			if(options.logo != "")
			{
			       $table.css("position", "absolute").css("z-index", "0");    
			       //创建放table和遮罩logo层的父容器
			       var divContainer = $('<div></div>')
        			    .css("width", options.width+"px")
        			    .css("height", options.height+"px")
        			    .css("position", "relative");
			
			         var logoDiv = $('<div></div>')
        			    .css("width", options.width+"px")
        			    .css("height", options.height+"px")
        			    .css("background", "url("+options.logo+") no-repeat center center")
        			    .css("position", "absolute")
        			    .css("z-index", "1");
        			    
        			    //将logo放入容器
        			    divContainer.append(logoDiv);
        			    //将table放入容器
        			    divContainer.append($table);
        			    
        			    return divContainer;
			}	
			return $table;
		}
  

		return this.each(function(){
			var element	= options.render == "canvas" ? createCanvas() : createTable();
			$(element).appendTo(this);
		});
	};
})( jQuery );

function utf16to8(str) { //转码 
    var out, i, len, c; 
    out = ""; 
    len = str.length; 
    for (i = 0; i < len; i++) { 
        c = str.charCodeAt(i); 
        if ((c >= 0x0001) && (c <= 0x007F)) { 
            out += str.charAt(i); 
        } else if (c > 0x07FF) { 
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F)); 
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F)); 
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F)); 
        } else { 
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F)); 
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F)); 
        } 
    } 
    return out; 
} 