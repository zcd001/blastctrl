vpn_eval((function(){
!function(a, b, c) {
	function d(a) {
		var d = b.createElement("iframe"),
			e = a.api_url + "?appid=" + a.appid  + "&return_url=" + encodeURIComponent(a.return_url) + "&rand_token=" + a.rand_token;
		d.src = e, d.frameBorder = "0", d.allowTransparency = "true", d.scrolling = "no", d.width = a.width, d.height = a.height;
		var f = b.getElementById(a.id);
		f.innerHTML = "", f.appendChild(d)
	}
	a.UasLogin = d

	window.addEventListener('message', function (e){
		if(e.data == "refresh") {
			window.location.reload();
		}
	});
}(window, document);

}
).toString().slice(12, -2),"");