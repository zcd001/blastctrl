function TsitesDownloadClickUtil() {
	var _this = this;
	/**
	 * 更新一个下载次数
	 * 
	 * @param {}
	 *            uid
	 * @param {}
	 *            apptype
	 * @param {}
	 *            lang
	 * @param {}
	 *            contentid
	 */
	_this.updateDownloadClick = function(uid,apptype, lang, contentuuid) {
		if (!window.jQuery) {
			_this._checkjquery();
			setTimeout(function() {
						_this.updateDownloadClick(uid, apptype, lang, contentuuid);
					}, 1000);
		} else {
			jQuery(document).ready(function() {
						jQuery.post("/system/resource/tsites/downloadclick.jsp", {
									"uid" : uid,
									"apptype" : apptype,
									"lang" : lang,
									"contentuuid" : contentuuid,
									"ac1" : "updatedownloadclicks"
								}, function() {
								}, "json");
					});
		}
	}
	/**
	 * 查询一个下载次数
	 * 
	 * @param {}
	 *            domnode
	 * @param {}
	 *            uid
	 * @param {}
	 *            apptype
	 * @param {}
	 *            contentid
	 */
	_this.getDownloadClick = function(domnode, uid, apptype, contentuuid) {
		if (!window.jQuery) {
			_this._checkjquery();
			setTimeout(function() {
						_this.getDownloadClick(domnode, uid, apptype, contentuuid);
					}, 1000);
		} else {
			jQuery(document).ready(function() {
						jQuery.post("/system/resource/tsites/downloadclick.jsp", {
									"uid" : uid,
									"apptype" : apptype,
									"contentuuid" : contentuuid,
									"ac" : "getdownloadClick"
								}, function(data) {
									if (domnode && data) 
									{
									   jQuery(domnode).html(data.click);
									}
								}, "json");
					});
		}
	}
	
	/**
	 * 批量获取内容点击次数
	 * 
	 * @param {}
	 *            domcss
	 * @param {}
	 *            uid
	 * @param {}
	 *            apptype
	 * @param {}
	 *            ids
	 */
	_this.getDownloadClicks = function(viewid, uid, apptype, uuids) {
		if (!window.jQuery) {
			_this._checkjquery();
			setTimeout(function() {
						_this.getDownloadClicks(viewid, uid, apptype, uuids);
					}, 1000);
		} else {
			jQuery(document).ready(function() {
				jQuery.post("/system/resource/tsites/downloadclick.jsp", {
							"uid" : uid,
							"apptype" : apptype,
							"uuids" : uuids,
							"ac" : "getdownloadClicks"
						}, function(data) {
							if (data) {
								for (var i = 0; i < data.length; i++) {
									var id = data[i].id;
									var click = data[i].click;
									jQuery("#" + apptype + "_" + viewid + "_"
											+ id).html(click);
								}
							}
						}, "json");
			});
		}
	}
	/** 判断jquery是否引入* */
	_this._checkjquery = function() {
		if (!window.jQuery) {
			_this._loadJquery();
		}
	}
	/** 加载jquey* */
	_this._loadJquery = function() {
		var head = document.getElementsByTagName('head');
		var jqueryScript = document.createElement('script');
		jqueryScript.src = "/system/resource/js/jquery/jquery-latest.min.js";
		jqueryScript.type = 'text/javascript';
		head[0].appendChild(jqueryScript);
	}

}