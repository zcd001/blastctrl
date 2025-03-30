function Tsites_advance_search() 
{
	    var _this = this;
	_this.nameValueID="";
	_this.reasearchDirectionValueID="";
	//导师类型
		_this.tutorType = "";
        //学院id
        _this.collegeid = 0;
        //学科id
        _this.disciplineid = 0;
        //招生专业id
        _this.enrolldisciplineid = 0;
        //职称id
        _this.rankid = 0;
		//学位id
		_this.degreeid = 0;
        //荣誉id
        _this.honorid = 0;
        //字母
        _this.pinyin = "";
        //教师名称
        _this.teacherName = "";
        //研究方向
        _this.searchDirection = "";
        _this.callbackFun = "";
        _this.decorateCallbackFun = "";
        _this.endBackFun = "";
    	_this.basenum = 0;
        //内容容器id
        _this.lineId = "";
        //当前组件模式，是访问还是样式配置
        _this.viewMode = 8;
        _this.viewid = 0;
        _this.siteOwner = 0;
        _this.viewUniqueId = 0;
        //每页显示条数
        _this.pageNumber = 10;
        //图片宽度
        _this.imageWidth = 100;
        //图片高度
        _this.imageHeight = 100;
        //当前是第几页,默认是第一页
        _this.currentPage = 1;
        //是否已经加载过数据
        _this.loading = false;
        //当前资料源下一共有多少条数据
        _this.totalNum = 0;
        //加载的json数据
        _this.contentJSONData ;
        //产品类型
        _this.productType=99;
        //一共有多少页
        _this.totalpage = 0;
        _this.uid = "";
        _this.imageScale =  null;
        _this.showlang = "";
        _this.profilelen = 100;
        _this.ellipsis = "";
        _this.alignright = false;
        //设置加载更多的点击事件
        _this.tsitesClickUtil = new TsitesClickUtil();
        _this.ispreview = false;
        _this.initParam = function(p)
        {
        	_this.callbackFun = p.callbackFun?p.callbackFun:"";
        	_this.decorateCallbackFun = p.decorateCallbackFun?p.decorateCallbackFun:"";
        	_this.endBackFun = p.endBackFun?p.endBackFun:"";
            //内容容器id
            _this.lineId = p.lineId?p.lineId:"";
            //当前组件模式，是访问还是样式配置
            _this.viewMode = p.viewMode?p.viewMode:8;
            _this.basenum = p.basenum?p.basenum:0;
            _this.viewid = p.viewId?p.viewId:0;
            _this.siteOwner = p.siteOwner?p.siteOwner:0;
            _this.viewUniqueId = p.viewUniqueId?p.viewUniqueId:0;
            _this.profilelen = p.profilelen?p.profilelen:100;
            _this.ellipsis = p.ellipsis?p.ellipsis:"";
            _this.alignright = p.alignright?p.alignright:false;
            _this.uid = "u_" + _this.viewUniqueId + "_";
            //每页显示条数
            _this.pageNumber = p.pageNumber?p.pageNumber:10;
            //图片宽度
            _this.imageWidth = p.imageWidth?p.imageWidth:100;
            //图片高度
            _this.imageHeight = p.imageHeight?p.imageHeight:100;
            _this.showlang = p.showlang?p.showlang:"";
            _this.ispreview = p.ispreview?p.ispreview:false;
            _this.productType=p.productType?p.productType:99;
			_this.nameValueID=p.nameValueID?p.nameValueID:"";
			_this.reasearchDirectionValueID=p.reasearchDirectionValueID?p.reasearchDirectionValueID:"";
			_this.imageScale =  new ImageScale(_this.uid,_this.imageWidth,_this.imageHeight,true,true);
            
            _this.setContainer();
        }
        //模板对象
        _this.template = null;
        //容器对象
        _this.containerobj = null;
        _this.setContainer = function()
        {
        	//找到模板
            _this.oldtemplatehtml = jQuery("#"+_this.lineId);
            if(_this.oldtemplatehtml && _this.oldtemplatehtml[0])
        	{
            	//创建一个模板的html结构
                _this.templatehtml = jQuery(_this.oldtemplatehtml).clone(true);
                
                //把最原始的模板干掉
                _this.containerobj = _this.oldtemplatehtml.parent();
                _this.containerobj.empty();
                //设置模板的样式
                _this.templatehtml.css("display","");
                //创建模板对象
                _this.template = jQuery.templates(_this.templatehtml[0].outerHTML);
        	}
            return null;
        }
        //加载内容
        _this.loadData = function()
        {
        	_this.clearContainer();
            jQuery.when(_this.queryData()).then(
                    function(){
                    	if(_this.contentJSONData)
                    	{
                    		_this.totalNum = _this.contentJSONData.totalnum;
                    		_this.totalpage = _this.contentJSONData.totalpage;
                    		var teacherData = _this.contentJSONData.teacherData;
							if(_this.totalNum==0)
							{
								jQuery("#"+_this.nameValueID).val("");
								jQuery("#"+_this.reasearchDirectionValueID).val("");

							}
							if(teacherData.length==0)
                    		{
                    			_this.currentPage = 0;
                    		}
                    		for(var i=0 ; i< teacherData.length;i++)
                            {
                                var onedata = teacherData[i];
                                if(_this.template)
                                {
                                	var htmlOutput = _this.template.render(onedata);
                                	var htmlOutputObj = jQuery(htmlOutput);
                                	if(_this.decorateCallbackFun!="" && _this.decorateCallbackFun && window[_this.decorateCallbackFun])
                                	{
                                		//var dr = eval("'"+_this.decorateCallbackFun+"("+onedata+","+i+","+htmlOutputObj+")'") 
                                		//_this.decorateCallbackFun.call(this,onedata,i,htmlOutput);
                                		var dr = window[_this.decorateCallbackFun].call(this,onedata,i,htmlOutput);
                                		if(dr)
                                		{
                                			htmlOutput = dr;
                                		}
                                	}
                                    _this.containerobj.append(htmlOutput);
                                    _this.tsitesClickUtil.getClicks(_this.viewUniqueId,onedata.uid,"homepage_total",onedata.a);
                                    //调用回调方法
                                    if(_this.callbackFun!="" && window[_this.callbackFun] && _this.callbackFun)
                                    {
                                    	window[_this.callbackFun].call(this,onedata,i,htmlOutputObj);
                                        //_this.callbackFun.call(this,onedata,i,htmlOutputObj);
                                    	//eval("'"+_this.callbackFun+"("+onedata+","+i+","+htmlOutputObj+")'");
                                    }
                                    //数据加载完毕后重置翻页条
                                }
                                if(_this.imageScale)
                                {
                                	_this.imageScale.addimg(onedata.picUrl,onedata.url,onedata.showName,onedata.a);
                                }
                            }
                    		if(_this.endBackFun !="" && window[_this.endBackFun] && _this.endBackFun)
                    		{
                    			window[_this.endBackFun].call(this,_this.containerobj,teacherData);
                    			//eval("'"+_this.endBackFun+"("+teacherData+")'");
                    		}
                    		_this.changePageBar();
                    	}
                    	_this.loading = false;
                    }
            );
        }
        //加载数据
        _this.queryData = function()
        {
            //如果数据加载过了，直接跳过
            if(_this.loading)
            {
                return;
            }
            //异步请求加载json数据
            if(!jQuery)return;
            var url = "/system/resource/tsites/advancesearch.jsp";
            var param = "collegeid="+encodeURIComponent(_this.collegeid)+"&disciplineid="+encodeURIComponent(_this.disciplineid)+"&enrollid="+encodeURIComponent(_this.enrolldisciplineid)
            +"&pageindex="+_this.currentPage+"&pagesize="+_this.pageNumber
            +"&rankid="+encodeURIComponent(_this.rankid)+"&degreeid="+encodeURIComponent(_this.degreeid)+"&honorid="
            +encodeURIComponent(_this.honorid)+"&pinyin="+encodeURIComponent(_this.pinyin)+"&profilelen="+encodeURIComponent(_this.profilelen)
            +"&teacherName="+encodeURIComponent(_this.teacherName)+"&searchDirection="+encodeURIComponent(_this.searchDirection)
            +"&viewmode="+encodeURIComponent(_this.viewMode)+"&viewid="+encodeURIComponent(_this.viewid)
            +"&siteOwner="+encodeURIComponent(_this.siteOwner)+"&viewUniqueId="+encodeURIComponent(_this.viewUniqueId)+"&showlang="+encodeURIComponent(_this.showlang)
            +"&ispreview="+_this.ispreview
			+"&basenum="+_this.basenum
            +"&ellipsis="+encodeURIComponent(_this.ellipsis)+"&alignright="+encodeURIComponent(_this.alignright)+"&productType="+encodeURIComponent(_this.productType)
			+"&tutorType="+encodeURIComponent(_this.tutorType);
            jQuery.ajax(
                url,
                {
                    dataType:"json",
                    async:false,
                    data:param,
                    success: function(data)
                    {
                        _this.loading = true;
                        _this.contentJSONData = data;
                   }
                }
            );
        }

        //设置导师类型
		_this.setTutorType = function(tutorType)
		{
			_this.currentPage = 1;
			_this.tutorType = tutorType;
			_this.loadData();
		}
		//重置倒是类型
		_this.resetTutor = function(tutorType)
		{
			_this.currentPage = 1;
			_this.tutorType = tutorType;
		}
        //设置学院id
        _this.setCollege = function(collegeid)
        {
        	_this.currentPage = 1;
        	_this.collegeid = collegeid;
        	_this.loadData();
        }
        //重置学院编号
        _this.resetCollege = function(collegeid)
        {
        	_this.currentPage = 1;
        	_this.collegeid = collegeid;
        }
        
        //设置学科id
        _this.setDiscipline = function(id)
        {
        	_this.currentPage = 1;
        	_this.disciplineid = id;
        	_this.loadData();
        }
        //重置
        _this.resetDiscipline = function(id)
        {
        	_this.currentPage = 1;
        	_this.disciplineid = id;
        }
        
        //设置招生专业id
        _this.setEnrollDiscipline = function(id)
        {
        	_this.currentPage = 1;
        	_this.enrolldisciplineid = id;
        	_this.loadData();
        }
        
        _this.resetEnrollDiscipline = function(id)
        {
        	_this.currentPage = 1;
        	_this.enrolldisciplineid = id;
        }
        //设置荣誉id
        _this.setHonor = function(id)
        {
        	_this.currentPage = 1;
        	_this.honorid = id;
        	_this.loadData();
        }
        
        _this.resetHonor = function(id)
        {
        	_this.currentPage = 1;
        	_this.honorid = id;
        }
        
        //设置职称
        _this.setRank = function(id)
        {
        	_this.currentPage = 1;
        	_this.rankid = id;
        	_this.loadData();
        }
        
        _this.resetRank = function(id)
        {
        	_this.currentPage = 1;
        	_this.rankid = id;
        }

		//设置学位
		_this.setDegree = function(id)
		{
			_this.currentPage = 1;
			_this.degreeid = id;
			_this.loadData();
		}

		_this.resetDegree = function(id)
		{
			_this.currentPage = 1;
			_this.degreeid = id;
		}
        //设置拼音
        _this.setPinyin = function(p)
        {
        	_this.currentPage = 1;
        	_this.pinyin = p;
        	_this.loadData();
        }
        
        _this.resetPinyin = function(p)
        {
        	_this.currentPage = 1;
        	_this.pinyin = p;
        }
        //设置教师名称
        _this.setTeacherName = function(n)
        {
        	_this.currentPage = 1;
        	_this.teacherName = n;
        	_this.loadData();
        }
        
        _this.resetTeacherName = function(n)
        {
        	_this.currentPage = 1;
        	_this.teacherName = n;
        }
        
        //设置研究方向
        _this.setSearchDirection = function(s)
        {
        	_this.currentPage = 1;
        	_this.searchDirection = s;
        	_this.loadData();
        }
        
        _this.resetSearchDirection = function(s)
        {
        	_this.currentPage = 1;
        	_this.searchDirection = s;
        }
        
        _this.onlySetTeacherNameAndRd = function(tname,rdvalue)
        {
        	_this.currentPage = 1;
        	_this.teacherName = tname;
        	_this.searchDirection = rdvalue;
        }
        
        _this.setTeacherNameAndRd = function(tname,rdvalue)
        {
        	_this.currentPage = 1;
        	_this.teacherName = tname;
        	_this.searchDirection = rdvalue;
        	_this.loadData();
        }
        //转到第几页
        _this.gotoPage = function(page)
        {
        	_this.currentPage = page;
        	_this.loadData();
        	_this.changePageBar();
        }
        //转到多少页面的绑定事件
        _this.gotoPageBindFunction = function(option)
        {
        	if(option)
        	{
       		var methodAction = option.data.methodAction;
        		if(methodAction=="pre")
        		{
        			_this.currentPage = _this.currentPage-1<=0?1:_this.currentPage-1;
        		}
        		if(methodAction=="next")
        		{
        			_this.currentPage = _this.currentPage+1>_this.totalpage?_this.totalpage:_this.currentPage+1;
        		}
        		if(methodAction=="first")
        		{
        			_this.currentPage = 1;
        		}
        		if(methodAction=="last")
        		{
        			_this.currentPage = _this.totalpage;
        		}
        		if(methodAction=="custom")
        		{
        			if(jQuery("#"+pageBarCustomPageId))
        			{
        				var topage = jQuery("#"+pageBarCustomPageId).val();
        				topage = parseInt(topage);
        				if(topage<=0)
        				{
        					_this.currentPage = 1;
        				}else if(topage>_this.totalpage)
        				{
        					_this.currentPage = _this.totalpage;
        				}else if(isNaN(topage))
        				{
        					_this.currentPage = 1;
        				}
        				else
        				{
        					_this.currentPage = topage;
        				}
        			}
        		}
        		_this.loadData();
            	_this.changePageBar();
        	}
        }
        
        //修改翻页条
        _this.changePageBar = function()
        {
        	if(jQuery("#"+pageBarCustomPageId))
			{
				jQuery("#"+pageBarCustomPageId).val("");
			}
        	if(jQuery("#"+pageBarPageNumberId))
        	{
        		jQuery("#"+pageBarPageNumberId).html(_this.pageNumber);
        	}
        	if(jQuery("#"+pageBarTotalNumberId))
        	{
        		jQuery("#"+pageBarTotalNumberId).html(_this.totalNum);	
        	}
        	if(jQuery("#"+pageBarCurPageId))
        	{
        		jQuery("#"+pageBarCurPageId).html(_this.currentPage);	
        	}
        	if(jQuery("#"+pageBarTotalPageId))
        	{
        		jQuery("#"+pageBarTotalPageId).html(_this.totalpage);	
        	}
        	//设置首页，上一页，下一页，尾页，转到按钮的单击事件
        	//首页
        	if(jQuery("#"+pageBarFirstPageId))
        	{
        		jQuery("#"+pageBarFirstPageId).unbind("click");
                if(_this.currentPage>1) {
                    jQuery("#" + pageBarFirstPageId).bind("click", {"methodAction": "first"}, _this.gotoPageBindFunction);
                }
        	}
        	//上一页
        	if(jQuery("#"+pageBarPrePageId))
        	{
        		jQuery("#"+pageBarPrePageId).unbind("click");
        		if(_this.currentPage>1)
        		{
        			jQuery("#"+pageBarPrePageId).bind("click",{"methodAction":"pre"},_this.gotoPageBindFunction);	
        		}
        	}
        	//下一页
        	if(jQuery("#"+pageBarNextPageId))
        	{
        		jQuery("#"+pageBarNextPageId).unbind("click");
        		if(_this.currentPage<_this.totalpage)
        		{
        			jQuery("#"+pageBarNextPageId).bind("click",{"methodAction":"next"},_this.gotoPageBindFunction);	
        		}
        	}
        	//尾页
        	if(jQuery("#"+pageBarLastPageId))
        	{
        		jQuery("#"+pageBarLastPageId).unbind("click");
        		if(_this.currentPage != _this.totalpage)
        		{
        			jQuery("#"+pageBarLastPageId).bind("click",{"methodAction":"last"},_this.gotoPageBindFunction);	
        		}
        	}
        	//转到
        	if(jQuery("#"+pageBarGotoPageId))
        	{
        		jQuery("#"+pageBarGotoPageId).unbind("click");
        		jQuery("#"+pageBarGotoPageId).bind("click",{"methodAction":"custom"},_this.gotoPageBindFunction);	
        	}
        }
        
        //清空内容区
        _this.clearContainer = function()
        {
        	_this.containerobj.empty();
        }
}