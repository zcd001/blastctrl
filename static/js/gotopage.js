function _simple_list_gotopage_fun(totle_page, topage_input_obj, pub_mode) {
	if (!window) {
		return;
	}
	var _totle_num = totle_page;
	var _cur_site_pub_mode = pub_mode;
	if (_cur_site_pub_mode == 2) {
		if (window.totalPages) {
			_totle_num = window.totalPages;
		}
	}
	var _topage_input_value = document.getElementById(topage_input_obj).value;
	var _win_location_url = window.location.href;
	var _topage_num = parseInt(_topage_input_value);
	if (isNaN(_topage_num)) {
		_topage_num = 1;
	} else {
		if (_topage_num > _totle_num) {
			_topage_num = _totle_num;
		} else if (_topage_num <= 0) {
			_topage_num = 1;
		}
	}
	if (_win_location_url != null && _win_location_url != undefined && _win_location_url.indexOf(".htm") > 0) 
	{
		var _last_sepactor = _win_location_url.lastIndexOf("/");
		var _first_part_url = _win_location_url.substr(0, _last_sepactor + 1);
		var _second_part_url = _win_location_url.substring(_last_sepactor + 1,
				_win_location_url.lastIndexOf((".")));
		var _new_win_url = "";
		_new_win_url = _first_part_url + _topage_num + ".htm";
		window.location = _new_win_url;
	}
	if (_win_location_url != null && _win_location_url != undefined && _win_location_url.indexOf(".jsp") > 0) 
	{
		var  _new_win_url = "";
		if(_win_location_url.indexOf("&PAGENUM=")>0)
		{
			var _last_sepactor = _win_location_url.indexOf("&PAGENUM=")+9;
			var _first_part_url = _win_location_url.substr(0, _last_sepactor );
			var flag = _last_sepactor;
			while(_win_location_url.charAt(flag)!='&' && flag<_win_location_url.length)
			{
				flag++;
			}
			if(flag>=_win_location_url.length)
			{
				_new_win_url = _first_part_url + _topage_num;
			}else
			{
				var _second_part_url = _win_location_url.substring(flag,_win_location_url.length);
				_new_win_url = _first_part_url + _topage_num + _second_part_url;
			}
		}else
		{
			_new_win_url = _win_location_url+"&PAGENUM="+_topage_num;
		}
		
		if(_new_win_url.indexOf("&pageid=")>0)
		{
			var _last_sepactor = _new_win_url.indexOf("&pageid=")+8;
			var _first_part_url = _new_win_url.substr(0, _last_sepactor );
			var flag = _last_sepactor;
			while(_new_win_url.charAt(flag)!='&' && flag<_new_win_url.length)
			{
				flag++;
			}
			if(flag>=_new_win_url.length)
			{
				_new_win_url = _first_part_url + _topage_num;
			}else
			{
				var _second_part_url = _new_win_url.substring(flag,_new_win_url.length);
				_new_win_url = _first_part_url + _topage_num + _second_part_url;
			}
		}else
		{
			_new_win_url = _new_win_url+"&pageid="+_topage_num;
		}
		
		window.location = _new_win_url;
	}
}
