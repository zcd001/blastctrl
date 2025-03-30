function tsites_site_mobile_list(p) 
{
		var _this = this;
		//是否预览
		_this.ispreview = p.ispreview?p.ispreview:"false";
		_this.callbackFun = p.callbackFun?p.callbackFun:"";
		//内容容器id
		_this.lineId = p.lineId?p.lineId:"";
		//栏目id
		_this.treeId = p.treeID?p.treeID:0;
		_this.lang = p.lang?p.lang:"zh_CN";
		//教师点赞初始值
    	_this.basenum = p.basenum?p.basenum:0;
		//学院id
		_this.collegeId = p.collegeId?p.collegeId:0;
		//学科id
		_this.disciplineId = p.disciplineId?p.disciplineId:0;
		//荣誉
		_this.honorId = p.honorId?p.honorId:0;
		//拼音字母
		_this.pinYin = p.pinYin?p.pinYin:"";
		//组件类型
		_this.comType = p.comType?p.comType:"";
		//requestUrl
		_this.requestUrl = p.requestUrl?p.requestUrl:"";
		//加载更多按钮ID
		_this.moreButtonId = p.moreButtonId?p.moreButtonId:"";
		//当前组件模式，是访问还是样式配置
		_this.viewMode = p.viewMode?p.viewMode:8;
		_this.viewid = p.viewId?p.viewId:0;
		_this.siteOwner = p.siteOwner?p.siteOwner:0;
		_this.viewUniqueId = p.viewUniqueId?p.viewUniqueId:0;
		//每页显示条数
		_this.pageNumber = p.pageNumber?p.pageNumber:10;
		//当前是第几页,默认是第一页
		_this.currentPage = 0;
		//是否已经加载过数据
		_this.alreadQuest = false;
		//是否加载中
		_this.querydata = false;
		//当前资料源下一共有多少条数据
		_this.totalNum = 0;
		_this.start = 0;
		_this.end = 0;
		//加载的json数据
		_this.contentJSONData ;
		_this.nomore = p.nomore?p.nomore:"没有更多内容了";
		_this.loading = p.loading?p.loading:"加载中";
		_this.uid = "u_" + p.viewUniqueId + "_";
		_this.oldhtml = "";
		//找到模板
		_this.oldtemplatehtml = jQuery("#"+_this.lineId);
		//创建一个模板的html结构
		_this.templatehtml = jQuery(_this.oldtemplatehtml).clone(true);
		//把最原始的模板干掉
		_this.containerobj = _this.oldtemplatehtml.parent();
		_this.containerobj.empty();
		//图片宽度
		_this.imageWidth = p.imageWidth?p.imageWidth:85;
		//图片高度
		_this.imageHeight = p.imageHeight?p.imageHeight:128;
		_this.imageScale =  new ImageScale(_this.uid,_this.imageWidth,_this.imageHeight,true,true);
		//设置模板的样式
		_this.templatehtml.css("display","");
		//创建模板对象
		_this.template = _this.templatehtml[0]?jQuery.templates(_this.templatehtml[0].outerHTML):"";
		//设置加载更多的点击事件
		if(_this.moreButtonId!="")
		{
			jQuery("#"+_this.moreButtonId).bind("click",function(){
				_this.loadMore();
			});
		}
		//_this.tsitesClickUtil = new TsitesClickUtil();
		//加载内容
		_this.loadMore = function()
		{
			if(_this.querydata)
			{
				return;
			}
			_this.oldhtml = jQuery("#"+_this.moreButtonId).html();
			jQuery("#"+_this.moreButtonId).html(_this.loading);
			jQuery.when(_this.loadData()).then(
					function(){
						_this.showContent();
					}
			);
		}
		
		//显示内容
		_this.showContent = function()
		{
				if(_this.contentJSONData.length<=0)
				{
					jQuery("#"+_this.moreButtonId).unbind("click");
					jQuery("#"+_this.moreButtonId).html(_this.nomore);
				}else
				{
					jQuery("#"+_this.moreButtonId).html(_this.oldhtml);
				}
				for(var i=0; _this.contentJSONData && i< _this.contentJSONData.length;i++)
				{
					var onedata = _this.contentJSONData[i];
					_this.totalNum = onedata.totalCount;
					var htmlOutput = _this.template.render(onedata);
					_this.containerobj.append(htmlOutput);
					//_this.tsitesClickUtil.getClicks(_this.viewUniqueId,_this.teacherId,_this.contentType,onedata.id);
					//调用回调方法
					if(_this.callbackFun)
					{
						_this.callbackFun.call(this,onedata);
					}
					if(_this.end>=_this.totalNum)
					{
						//到头了，直接修改加载更多按钮隐藏
						jQuery("#"+_this.moreButtonId).unbind("click");
						jQuery("#"+_this.moreButtonId).html(_this.nomore);
					}
					if(_this.imageScale)
					{
						_this.imageScale.addimg(onedata.picUrl,onedata.url,onedata.name,onedata.teacherId);
					}
				}
				_this.currentPage++;
		}
		
		//加载第一页
		_this.loadFirstPage = function()
		{
			_this.oldhtml = jQuery("#"+_this.moreButtonId).html();
			jQuery("#"+_this.moreButtonId).html(_this.loading);
			jQuery.when(_this.loadData()).then(
					function(){
						_this.showContent();
					}
			);
		}
		//加载数据
		_this.loadData = function()
		{
			//如果数据加载过了，直接跳过
			if(_this.querydata)
			{
				return;
			}else
			{
				jQuery("#"+_this.moreButtonId).html(_this.loading);
			}
			_this.querydata = true;
			_this.start = _this.currentPage*_this.pageNumber;
			_this.end = _this.currentPage*_this.pageNumber + _this.pageNumber;
			//异步请求加载json数据
			if(!jQuery)return;
			var url = "/system/resource/tsites/getsitelistcontent.jsp";
			jQuery.ajax(
				url,
				{
					dataType:"json",
					async:false,
					data:"collegeId="+_this.collegeId+
					"&disciplineId="+_this.disciplineId+
					"&honorId="+_this.honorId+
					"&pinYin="+_this.pinYin+
					"&requestUrl="+encodeURIComponent(_this.requestUrl)+
					"&comType="+_this.comType+
					"&treeid="+_this.treeId+
					"&ispreview="+_this.ispreview+
					"&lang="+_this.lang+
					"&viewmode="+_this.viewMode+
					"&viewid="+_this.viewid+
					"&siteOwner="+_this.siteOwner+
					"&start="+_this.start+
					"&end="+_this.end+
					"&startnum="+_this.start+
					"&endnum="+_this.end+
					"&basenum="+_this.basenum+
					"&viewUniqueId="+_this.viewUniqueId,
				 	success: function(data)
				 	{
				 		_this.contentJSONData = data;
				 		_this.querydata = false;
				   }
				}
			);
		}
		
		_this.clearContainer = function()
		{
			_this.containerobj.empty();	
		}
		
		_this.reset = function()
		{
			jQuery("#"+_this.moreButtonId).html(_this.oldhtml);
        	_this.currentPage = 0;
			jQuery("#"+_this.moreButtonId).bind("click",function(){
				_this.loadMore();
			});
		}
		
		 //重新设置学院id
        _this.setCollegeID = function(cid)
        {
        	_this.collegeId = cid;
        	_this.reset();
        }
        
        //重新设置学院id
        _this.setDisciplineID = function(did)
        {
        	_this.disciplineId = did;
        	_this.reset();
        }
        
        //重新设置学院id
        _this.setHonorID = function(hid)
        {
        	_this.honorId = hid;
        	_this.reset();
        }
        
        //设置拼音
        _this.setPinYin = function(py)
        {
        	_this.pinYin = py;
        	_this.reset();
        }
        
}