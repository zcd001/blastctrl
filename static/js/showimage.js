function tsites_image_show()
{
	var _this = this;
	_this.showImage = function(jsonparam)
	{
		var imgscalename  = new ImageScale(jsonparam.uid,jsonparam.width,jsonparam.height,true,true);
		imgscalename.addimg(jsonparam.picUrl,jsonparam.url,'',jsonparam.id);
	}
}