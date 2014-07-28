 //去掉字符两端的空白字符
    String.prototype.trim = function()
    {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }
//String.prototype.trim = function(mod) 
//{  
//        var str = this,  str = str.replace(/^\s\s*/, ''),  ws = /\s/,  i = str.length;  
//        whil (ws.test(str.charAt(--i)));  
//        return str.slice(0, i + 1);
//}

//公用Modal窗口
function popModalDialog(url,width,height)
{
    var ret=window.showModalDialog("..\\close.html?"+url,ret,"dialogWidth="+width.toString()	+"px;dialogHeight="+height.toString()+"px;center=yes;help=no;status=no;");
    return ret;
}
//公用open弹窗
function windowOpen(src,width,height)
{
  var win=window.open(src,"","width="+width+",height="+height+",top="+(screen.height-height)/2+",left="+(screen.width-width)/2+",scrollbars=yes,resizable=1");	   	   
  return win;
}

//弹出一个居中窗口
function winOpen(url,width,height,id)
{
    var left = Math.ceil((window.screen.width - width) / 2 );     
    var top =  Math.ceil((window.screen.height - height) / 2 )-20; 
    id+=""; 
    if(left<0)
        left=0;
    if(top<0)
        top=0;
    if(!id || id==-1)
        id="";
   var win= window.open(url,id.replace("-1",""), "width="+width+", height="+height+", left="+left+", top="+top+", toolbar=no, menubar=no, scrollbars=yes, resizable=yes,location=no, status=yes");
   return win;
}
//把返回的结果格式化
var Column_Count=0;
function setValue(strRes)
{
   if(strRes=="") return "";
   var getValue=new Array();
   Column_Count=0;
   try{
        var str=strRes.split('$');
        for(var i=0;i<str.length;i++)
         {
            getValue[i]=new Array();
            var str1 = str[i].split('|');
            for(var j=0;j<str1.length;j++)
            {
                if(str1[j].toString()!="")
                {
                  var ary = str1[j].toString().split(',');
                  getValue[i][ary[0].toString()]=ary[1].toString();
                  Column_Count++;
                }
            }
        }
        return getValue;
      }
      catch (e){return "";}
}
function getCookieVal (offset) //取得项名称为offset的cookie值
{  
    var endstr = document.cookie.indexOf (";", offset); 
    if (endstr == -1) 
    endstr = document.cookie.length; 
    return unescape(document.cookie.substring(offset, endstr)); 
} 

function GetCookie (name) //取得名称为name的cookie值 
{ 
    var arg = name + "="; 
    var alen = arg.length; 
    var clen = document.cookie.length; 
    var i = 0; 
    while (i < clen) { 
    var j = i + alen; 
    if (document.cookie.substring(i, j) == arg) 
    return getCookieVal (j); 
    i = document.cookie.indexOf(" ", i) + 1; 
    if (i == 0) break; 
    } 
    return null; 
}  
function SetCookie (name, value) 
{ //设置名称为name,值为value的Cookie 
    var argc = SetCookie.arguments.length; 
    var argv = SetCookie.arguments; 
    var path = (argc > 3) ? argv[3] : null; 
    var domain = (argc > 4) ? argv[4] : null; 
    var secure = (argc > 5) ? argv[5] : false; 

    var mm=365*3600*1000*24;
  var date =new Date();
  date.setTime(date.getTime()+mm);


    document.cookie = name + "=" + escape(value) + 
    ((path == null) ? "" : ("; path=" + path)) + 
    ((domain == null) ? "" : ("; domain=" + domain)) + 
    ((secure == true) ? "; secure" : "")+";expires="+date.toGMTString(); 
 } 
function DelCookie(name)
{   //删除名称为name的Cookie  
    var ThreeDays=3*24*60*60*1000;
    var expDate = new Date();
    expDate.setTime(expDate.getTime()-ThreeDays);
    document.cookie=name+"=;expires="+expDate.toGMTString();
}  
//获取窗口大小,返回页面宽度，页面高度，屏幕宽度，屏幕高度 数组
function getPageSize()
{ 
	var xScroll, yScroll; 
	if (window.innerHeight && window.scrollMaxY) { 
	xScroll = document.body.scrollWidth;
	yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
	xScroll = document.body.scrollWidth;
	yScroll = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
	xScroll = document.body.offsetWidth;
	yScroll = document.body.offsetHeight;
	}

	var windowWidth, windowHeight;
	if (self.innerHeight) { // all except Explorer
	windowWidth = self.innerWidth;
	windowHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
	windowWidth = document.documentElement.clientWidth;
	windowHeight = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
	windowWidth = document.body.clientWidth;
	windowHeight = document.body.clientHeight;
	} 

	// for small pages with total height less then height of the viewport
	if(yScroll < windowHeight){
	pageHeight = windowHeight;
	} else { 
	pageHeight = yScroll;
	}

	if(xScroll < windowWidth){ 
	pageWidth = windowWidth;
	} else {
	pageWidth = xScroll;
	}

	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight) 
	return arrayPageSize;
}
var flag=false;
var img_CostomWidth,img_CostomHeight;
function DrawImage(ImgD)
{
	var image=new Image();
	var iwidth = 640; //定义允许图片宽度
	var iheight = 480; //定义允许图片高度
	if(img_CostomWidth)
	{
	    iwidth=img_CostomWidth;
	}
	if(img_CostomHeight)
	{
	    iheight=img_CostomHeight;
	}
	image.src=ImgD.src;
	if(image.width>0 && image.height>0)
	{
		flag=true;
		if(image.width/image.height>= iwidth/iheight)
		{
			if(image.width>iwidth)
			{ 
				ImgD.width=iwidth;
				ImgD.height=(image.height*iwidth)/image.width;
			}else
			{
				ImgD.width=image.width; 
				ImgD.height=image.height;
			}

			ImgD.alt="双击鼠标左键可查看原图大小，Ctrl+鼠标双击可以恢复。Alt+滚动鼠标可自由放大缩小图片。";
		}
		else
		{
			if(image.height>iheight)
			{ 
				ImgD.height=iheight;
				ImgD.width=(image.width*iheight)/image.height; 
			}else
			{
				ImgD.width=image.width; 
				ImgD.height=image.height;
			}
			ImgD.alt="双击鼠标左键可查看原图大小，Ctrl+鼠标双击可以恢复。Alt+滚动鼠标可自由放大缩小图片。";
		}
		ImgD.attachEvent("ondblclick",dbclick);
		function dbclick()
		{
			if(event.ctrlKey)
			{
			   ImgD.style.zoom="100%";
               DrawImage(ImgD);
	           return true;
	        }
	        ImgD.style.zoom="100%";
		    ImgD.width=image.width;
		    ImgD.height=image.height;
		    return false;
		}
	}
} 
function imgzoom(o)
{
	//仅IE 6.0或以上版本
	if(!event.altKey)
	{return true;}
	var zoom = parseInt(o.style.zoom, 10) || 100;
	zoom -= event.wheelDelta / 10;
	if(zoom > 5 && zoom <=800) {
		o.style.zoom = zoom + '%';
	}
	return false;
}

//限制输入字符
    function on_keyup()
    {
        try
        {
            var obj=window.event.srcElement;
	        if(obj.value.match(/^[%|_| |　].*$/)!=null)
	        {
		        alert("不能以百分号、下划线、空格开头。")
		        obj.value=obj.value.substring(1,obj.value.length);
		        obj.focus();
	        }
	        else
	        {
		         if(obj.value.match(/'/)!=null)
		         {
		           alert("这里不能输入单引号。");
		           obj.value=obj.value.replace(/'/,"");
		           obj.focus();
		         }
	        }
	    }catch(e){}
    }
    
// 调整弹出对话框的大小;
// 判断是否对话框调用
// iDiv为对话框大小基准的层的ID号
function adjustDialog()
{
    var w = parseInt(window.dialogWidth);
    if(isNaN(w))
    {
       alert("非法打开窗口,此窗口将会闭");
       window.close();
    }
	var h = document.getElementById("iDiv").scrollHeight ;
	if(window.navigator.appVersion.indexOf("MSIE 6.0")>0)
	{
	   w+=9;
	   h+=60;
	   window.dialogWidth = w + "px";
	}
	else
	{
	   h+=15;
	}
	
    
	window.dialogHeight = h + "px" ;
	window.dialogTop = (window.screen.height - h) / 2; 
	window.dialogLeft = (window.screen.width - w) / 2; 
}
//移动DIV窗口 onmousedown="dargit(this,event,false,true);alpha:是否透明，inform：是否只能在窗口内移动"
function dargit(me,evt,alpha,inform)
{
   evt = evt?evt:window.event;
   if (evt.button==2 || evt.button==3 )
   { return false;}
   //window.status=evt.srcElement.type
    if(evt.srcElement.type=="submit"||evt.srcElement.type=="textarea" ||evt.srcElement.type=="input" ||evt.srcElement.type=="list" ||  evt.srcElement.type=="image" || evt.srcElement.type=="button" || evt.srcElement.type=="file" ||  evt.srcElement.type=="checkbox" || evt.srcElement.type=="select-one" || evt.srcElement.type=="radio"|| evt.srcElement.type=="text"|| evt.srcElement.type==""|| evt.srcElement.nomove )
    {return ;}
        var bodyWidth=document.body.clientWidth;//表单宽度
        var bodyHeight=document.body.clientHeight;//表单宽度
		var detlaX = evt.clientX - parseInt(me.style.left);
		var detlaY = evt.clientY - parseInt(me.style.top);
		var filters="";
		if(me.style.filter)
	        filters=me.style.filter;
		if(document.all){
			me.attachEvent("onmousemove",move);
			me.attachEvent("onmouseup",up);
			me.setCapture();
		}else{
			document.addEventListener("mousemove",move,true);
			document.addEventListener("mouseup",up,true);
			evt.stopPropagation();
			evt.preventDefault();
		}
		function move(evt){
		    var newX=0,newY=0;
		    newX=evt.clientX - detlaX;
		    newY=evt.clientY - detlaY;
		    //如果只能在窗口移动
		    if(inform)
		    {
		        if(newX<0)
		            me.style.left = "0px";
		        else
		        {
		            if(newX+me.clientWidth+10>=bodyWidth)
                        me.style.left = bodyWidth-me.clientWidth-10 + "px";
                    else
			            me.style.left = newX + "px";
			    }  
			     if(newY<0)
		            me.style.top = "0px";
		        else
		        {  
		            if(newY+me.clientHeight>=bodyHeight)
                        me.style.top = bodyHeight-me.clientHeight + "px";
                    else
    			        me.style.top = newY + "px";
    		    }	
    		}
    		else
    		{
    		    me.style.left = newX + "px";
    		    me.style.top = newY + "px";
    		}
    		
			if(document.all){
				if(alpha){
				me.style.filter = "Alpha(Opacity=60)";
				}
			}else{
				me.style.opacity = 0.5;
				evt.stopPropagation();
			}
		}
		function up(evt){
			if(document.all){
				if(alpha)
				{
				    if(filters=="")
				        me.style.filter = "Alpha(Opacity=100)";
				    else
				        me.style.filter=filters;
				}
				me.detachEvent("onmousemove",move);
				me.detachEvent("onmouseup",up);
				me.releaseCapture();
			}else{
				if(alpha)
				{me.style.opacity = 1;}
				document.removeEventListener("mousemove",move,true);
				document.removeEventListener("mouseup",up,true);
				evt.stopPropagation();
			}
		}
}
//判断手机号码格式
//str为手机号码串,splitor
//正确返回true,错误返回false
function checkMobileStr(str,splitor)
{
   var strP=/\d+/;
   var i=0;
   var j=0;
   if(splitor=="")
   {
     splitor=",";
   }
   var numberArray = str.split(splitor);
   for(i=0;i<numberArray.length;i++)
   {
      if(!strP.test(numberArray[i]))
      {    
          j=1;
          break;
      }
   }
   if(j==1)
   {
      return false;
   }
   return true;   
}
//两个相加的精确结果
function accAdd(arg1,arg2){
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2))
    return (arg1*m+arg2*m)/m
}
Number.prototype.add = function (arg){
	return accAdd(arg,this);
}
//比较两个日期中日期部分的大小，日期的格式为：yyyy-MM-dd 00:00:00,则比较yyyy-MM-dd部分
//如果s>d，返回1；如果s=d返回0，如果s<d，返回-1
function dateDiff(s,d)
{
    var sd = new Date(s.replace('-','/'));
    var dd = new Date(d.replace('-','/'));
    var sdnew = new Date(sd.getFullYear(), sd.getMonth()+1, sd.getDate());
    var ddnew = new Date(dd.getFullYear(), dd.getMonth()+1, dd.getDate());
    if(Date.parse(sdnew) - Date.parse(ddnew) > 0)
    {
        return 1;
    }
    else if(Date.parse(sdnew) - Date.parse(ddnew) == 0)
    {
        return 0;
    }
    else
    {
        return -1;
    }
}
//比较开始时间和结束时间，如果开始时间大于等于结束时间则返回False
function compareDate(beginTm,endTm)
{
     var begin=beginTm.replace(/-/g, "/");   
     var end=endTm.replace(/-/g, "/");              
     var b_date=new Date(Date.parse(begin));   
     var e_date=new Date(Date.parse(end));   
     if(b_date >=  e_date)        
        return false;
     return true;
}
//判断是否为空
function isEmpty(id,name,focus)
{
    if(document.getElementById(id).value.replace(/(^\s*)|(\s*$)/g, "") == '')
    {
        alert(name+'不能为空');
        if(focus != false)
        {
            document.getElementById(id).focus();
        }
        return true;
    }
    return false;
}
function showProgress()
{
    var div = document.createElement("div");
    div.className = "cover";
    div.style.height = document.documentElement.clientHeight;
    div.id = "cover";
    //div.innerHTML = "<iframe width=\"100%\" height=\"100%\" frameborder=\"0\"></iframe>";
    var div2 = document.createElement("div");
    div2.className = "dlgshadow";
    div2.innerHTML = "&nbsp;正在处理中......";
    div2.id = "dlgshadow";
    document.body.appendChild(div);
    document.body.appendChild(div2);
}
function hideProgress()
{
    document.body.removeChild(document.getElementById("dlgshadow"));
    document.body.removeChild(document.getElementById("cover"));
} 
//获取控件的顶点坐标
function getTop(e)
{ 
    var offset=e.offsetTop; 
    if(e.offsetParent!=null) offset+=getTop(e.offsetParent); 
    return offset; 
} 
//获取控件的左坐标
function getLeft(e)
{ 
    var offset=e.offsetLeft; 
    if(e.offsetParent!=null) offset+=getLeft(e.offsetParent); 
    return offset; 
}  

//检测浏览器版本号
 function Browser() {
   var ua, s, i;
   this.isIE     = false;   // Internet Explorer
   this.isNS     = false;   // Netscape
   this.version = 0;
   this.ver=0;
   ua = navigator.userAgent;

   s = "MSIE";
   if ((i = ua.indexOf(s)) >= 0) {
     this.isIE = true;
     this.version = this.ver = parseFloat(ua.substr(i + s.length));
     return;
   }

   s = "Netscape6/";
   if ((i = ua.indexOf(s)) >= 0) {
     this.isNS = true;
     this.version = this.ver = parseFloat(ua.substr(i + s.length));
     return;
   }
   s = "Gecko";
   if ((i = ua.indexOf(s)) >= 0) {
     this.isNS = true;
     this.version = this.ver = 6.1;
     return;
   }
}
//转换指定Ie版本高度，heig(IE7标准)指定传入来的高度        
function cHeight(heig)
{
   var browser = new Browser();
   var myHeight=heig;
   if(browser.version<7)
   {
        myHeight+=45;
   }
   return myHeight;
}
//转换指定Ie版本高度，heigheig(IE6标准)指定传入来的高度        
function cHeight6(heig)
{
   var browser = new Browser();
   var myHeight=heig;
   if(browser.version>=7)
   {
        myHeight-=45;
   }
   return myHeight;
}
//时间格式化 楼 2009-10-16
Date.prototype.format = function(format){
 /*
  * eg:format="YYYY-MM-dd hh:mm:ss";
  */
 var o = {
  "M+" :  this.getMonth()+1,  //month
  "d+" :  this.getDate(),     //day
  "h+" :  this.getHours(),    //hour
      "m+" :  this.getMinutes(),  //minute
      "s+" :  this.getSeconds(), //second
      "q+" :  Math.floor((this.getMonth()+3)/3),  //quarter
      "S"  :  this.getMilliseconds() //millisecond
   }
  
   if(/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
   }
 
   for(var k in o) {
    if(new RegExp("("+ k +")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
    }
   }
 return format;
}
//获取地址栏里的参数值
function QueryString(name) 
{     
    var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");       
    if (reg.test(location.href)) 
    {
        return unescape(RegExp.$2.replace(/\+/g, " ")); 
    }
    return "";
}
// 加载 XML 字符串
function loadXmlStr(xmlString)
{
  var _xmlDoc = null;
  if (!window.DOMParser && window.ActiveXObject)
  {
    var xmlDomVersions = ['MSXML2.DOMDocument.6.0','MSXML2.DOMDocument.3.0','Microsoft.XMLDOM'];
    for (var i = 0; i < xmlDomVersions.length; i++)
    {
      try
      {
        _xmlDoc = new ActiveXObject(xmlDomVersions[i]);
        _xmlDoc.async = false;
        _xmlDoc.loadXML(xmlString);
        break;
      }
      catch(e){}
    }
  }
  else if (window.DOMParser && document.implementation && document.implementation.createDocument)
  {
    try
    {
      domParser = new  DOMParser();
      _xmlDoc = domParser.parseFromString(xmlString, 'text/xml');
    }
    catch(e){}
  }

  return _xmlDoc;
}
//获取页面滚动条位置
function getbodyScrollTop()
{
    var bodyScrollTop; 
    if (typeof window.pageYOffset != 'undefined') { 
       bodyScrollTop = window.pageYOffset; 
    } 
    else if (typeof document.compatMode != 'undefined' && 
         document.compatMode != 'BackCompat') { 
       bodyScrollTop = document.documentElement.scrollTop; 
    } 
    else if (typeof document.body != 'undefined') { 
       bodyScrollTop = document.body.scrollTop; 
    }
    return bodyScrollTop;
}

//pwdStrength函数     
//当用户放开键盘或密码输入框失去焦点时,根据不同的级别显示不同的颜色     
function pwdStrength(pwd)
{     
    var O_color="#e0f0ff";     
    var L_color="#FF0000";     
    var M_color="#FF9900";     
    var H_color="#33CC00";    
    var Lcolor='',Mcolor='', Hcolor='';
    if (pwd==null||pwd==''){     
        Lcolor=Mcolor=Hcolor=O_color;     
    }     
    else  
    {     
        S_level=getPasswordLevel(pwd);
       
        /*var strength = passwordScore(pw);
						var width = (100/32)*strength;*/
        switch(S_level)    
        {     
            case 0:     
            Lcolor=Mcolor=Hcolor=O_color;     
            case 1:     
            Lcolor=L_color;     
            Mcolor=Hcolor=O_color;     
            break;     
            case 2:     
            Mcolor=M_color;     
            Lcolor=Hcolor=O_color;     
            break;     
            default:     
            Hcolor=H_color;   
            Lcolor=Mcolor=O_color;  
        }     
    }     

    document.getElementById("strength_L").style.backgroundColor=Lcolor;     
    document.getElementById("strength_M").style.backgroundColor=Mcolor;     
    document.getElementById("strength_H").style.backgroundColor=Hcolor;     
    return;     
}
//获取密码安全等级
function getPasswordLevel(pwd)
{
	var level=0;
	var score=passwordScore(pwd);
	if(score>23 && pwd.length<10)
	    score=23;

	if(score<=10)
		level=1;
	else if(score>10 && score<=23)
		level=2;
	else if(score>23)
		level=3;
	return level;
}
//验证密码得到最终分数,最高32分
function passwordScore(pwd) 
{
    intScore = 0;                
    if (pwd.match(/[a-z]/)) // 验证小写字母                        
    {                        
	  intScore = (intScore+2)                        
    } 
    if (pwd.match(/[A-Z]/)) // 验证大写字母                        
    {                       
	   intScore = (intScore+5)                        
    } // NUMBERS                       
    if (pwd.match(/\d+/)) // 验证数字                        
    {                       
		intScore = (intScore+5)                       
    } 
    if (pwd.match(/(\d.*\d.*\d)/)) // 验证数字                        
    {                      
	    intScore = (intScore+5)          
    } // SPECIAL CHAR                        
    if (pwd.match(/[!,@#$%^&*?_~]/)) // 验证特殊字符                       
    {                        
	    intScore = (intScore+5)                       
    } 
    if (pwd.match(/([!,@#$%^&*?_~].*[!,@#$%^&*?_~])/)) //验证特殊字符                       
    {                        
	    intScore = (intScore+5)                        
    } // COMBOS                        
    if (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/)) //验证大小写字母                        
    {                        
	    intScore = (intScore+2)                        
    } 
    if (pwd.match(/\d/) && pwd.match(/\D/)) // 验证混合数字                       
    {                        
	    intScore = (intScore+2)                        
    }                       
    if (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/) && pwd.match(/\d/) && pwd.match(/[!,@#$%^&*?_~]/))                      
    {            
	    intScore = (intScore+2)                        
    }                        
	  return intScore;
  }
  
  //生成Guid 
function newGuid()
{
    var guid = "";
    for (var i = 1; i <= 32; i++){
      var n = Math.floor(Math.random()*16.0).toString(16);
       guid +=    n;
      if((i==8)||(i==12)||(i==16)||(i==20))
         guid += "-";
     }
    return guid;    
}
var istopLay=false;//最顶层显示，优先级最高
var browser = new Browser();  //浏览器信息
//让对话窗口运行于独占模式
function OverLay(newid,opts)
{
    if(!opts)
    {
        opts={mode:0,index:990};
    }
    if(!newid)
        newid=10000;
    var index=990;
    if(opts.index)
        index=opts.index;
    isrun=true;
    chooseTab=true;  //防止弹出窗口会造成解除锁定 
    if(document.getElementById("ifm_"+newid))
    {
         document.getElementById("ifm_"+newid).style.display="block";
    }
    else
    {                
        var wwidth=getBodyWidth()+"px";
        var wheight=getBodyHeight()+"px";
        //browser.ver>6 ||
        if(browser.ver>6 || (opts.mode && opts.mode==1))//模式1，应用于页面不使用W3c标准时
        {
            wwidth="100%";
           // wheight="100%";
        }
        
        var newifm=document.createElement("div");   
        newifm.id="ifm_"+newid;
        newifm.style.zIndex=index;
        newifm.style.background = "#333";
        newifm.style.width = wwidth;
        newifm.style.height = wheight;
        newifm.style.position = "absolute";
        newifm.style.top = "0";
        newifm.style.left = "0";
//        newifm.style.zIndex = "500";
        newifm.style.opacity = "0.4";
        newifm.style.filter = "Alpha(opacity=40)";
        if(istopLay || browser.ver<7)//最顶层显示，优先级最高
            newifm.innerHTML="<iframe frameborder=\"0\" style=\"z-index:100;background-color:#696969;position:absolute;top:0;left:0;width:100%;height:100%;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=40);\" hideFocus='true' src='about:blank'></iframe>";

        if(document.getElementById("rightTd"))        
            document.getElementById("rightTd").appendChild(newifm);
        else
            document.body.appendChild(newifm);       
          //OverLay(newid);
    }
    //document.body.scroll="no";
}
//隐藏对话窗口
function HideOverLay(newid)
{
    if(!newid)
        newid=10000;
    if(document.getElementById("ifm_"+newid))
    {
         document.getElementById("ifm_"+newid).style.display="none";
    }
}
//获取Body宽度
function getBodyWidth()
{
 var strWidth,clientWidth,bodyWidth;
 clientWidth = document.documentElement.clientWidth;
 bodyWidth = document.body.clientWidth;
 if(bodyWidth > clientWidth){
  strWidth = bodyWidth ;
 } else {
  strWidth = clientWidth;
 }
 return strWidth;
}
//获取Body高度
function getBodyHeight()
{
    var strHeight,clientHeight,bodyHeight,scrollHeight;
    clientHeight = document.documentElement.clientHeight;
    scrollHeight=document.documentElement.scrollHeight;
    if(scrollHeight>clientHeight)
        clientHeight=scrollHeight;
        
    bodyHeight = document.body.clientHeight;
    scrollHeight=document.body.scrollHeight;
    if(scrollHeight>bodyHeight)
        bodyHeight=scrollHeight;
        
    if( bodyHeight > clientHeight){
        strHeight = bodyHeight ;
    } else {
        strHeight = clientHeight;
    }
    return strHeight;
}
var _tipwidths;
//显示提示框
function showTipTxt(txt,width,noaddevent,offsetX,offsetY)
{
    var swidth=width;
     if(_tipwidths)
        swidth=_tipwidths;
     if(!swidth)
        swidth=320;
    if(!offsetX)
        offsetX=0;
    if(!offsetY)
        offsetY=0;
    var left=0;
    var top=0;
    if(event.pageY||event.pageX)
    {
       //火狐
       top = eve.pageY +5;
       left = eve.pageX +5;
    }
    else
    {
       //IE
       left = event.clientX + document.body.scrollLeft+ document.documentElement.scrollLeft + 5 + offsetX;
       top = event.clientY + document.body.scrollTop + document.documentElement.scrollTop + 5 + offsetY;
    }
    var bodywidth=document.body.clientWidth;
    var bodyheight=document.documentElement.clientHeight;
    
    var obj=document.getElementById("tiptxtdiv");
        //自动调整坐标
    if(bodywidth-left<=swidth)
        left=left-swidth-5;       
    if(!obj)
    {
        var div = document.createElement("div");
        div.id="tiptxtdiv";
        div.style.position="absolute";
        div.style.display="none";
        div.style.backgroundColor="#E4E4E4";
        div.style.margin="8px auto";
        div.style.left=left;
        div.style.top=top;
        div.style.width = swidth;
        div.style.zIndex=9999;

        var div2 = document.createElement("div");    
        div2.style.textAlign='Left';        
        div2.innerHTML = unescape(txt);
        div2.id="tiptxtdivContent";
        div2.style.backgroundColor="#ffffe1";
        div2.style.border="1px solid #666";
        div2.style.position="relative";
        div2.style.padding="10px 5px";
        div2.style.top="-4px";
        div2.style.left="-4px";
        div.appendChild(div2);    
        document.body.appendChild(div);
        div.style.display="";
        var obj=document.getElementById("tiptxtdiv");
        if(bodyheight-top<=obj.clientHeight+10)         
            obj.style.top=top-obj.clientHeight-5;
    }
    else
    {
        var txtobj=document.getElementById("tiptxtdivContent");
        txtobj.innerHTML=unescape(txt);
        if(bodyheight-top<=obj.clientHeight+10)         
            top=top-obj.clientHeight-5;
        obj.style.width = swidth;
        obj.style.left=left;
        obj.style.top=top;
        obj.style.display="";
    }
   
    var thisobj=event.srcElement;
    if(!noaddevent && thisobj)
        addEvent(thisobj,'mouseout',hideTipTxt);
}
//隐藏提示框
function hideTipTxt()
{
    var obj=document.getElementById("tiptxtdiv");
    if(!obj)
        return;
    obj.style.display="none";
    document.getElementById("tiptxtdivContent").innerHTML="";
}
//指定控件添加指定事件执行addEvent(document,"click",clearSelect);
function addEvent(obj, evType, fun)   
{   
    if (obj.addEventListener)
    {   
        obj.addEventListener(evType, fun, false);   
        return true;   
    }
    else if (obj.attachEvent)//适合IE
    {   
        var r = obj.attachEvent("on"+evType, fun);   
        return r;   
    }
    else
    {   
       return false;   
    }   
}
//限制只输入数字   
function checkNumber(obj)
{
    if(event.keyCode==46 && (obj.value=="" || obj.value.indexOf('.')>-1) )
    {
        event.keyCode = 0;
        return false;      
    }
    if ((event.keyCode > 47 && event.keyCode < 58) || event.keyCode==46)
        return true;
    else 
    {
        event.keyCode = 0;
        return false;
     }
  
}
//获取控件光标位置
function getCursorPosition(obj)
{
   obj.focus(); 
   var cursurPosition=-1;
    if(obj.selectionStart)
    {//非IE浏览器
         cursurPosition= obj.selectionStart;
    }else
    {//IE
          var rngSel = document.selection.createRange();//建立选择域
          var rngTxt = obj.createTextRange();//建立文本域
          var flag = rngSel.getBookmark();//用选择域建立书签
          rngTxt.collapse();//瓦解文本域到开始位,以便使标志位移动
          rngTxt.moveToBookmark(flag);//使文本域移动到书签位
          rngTxt.moveStart('character',-obj.value.length);//获得文本域左侧文本
          str = rngTxt.text.replace(/\r\n/g,'');//替换回车换行符
          cursurPosition=str.length;
          /*
           var workRange=document.selection.createRange(); 
   　　    obj.select(); 
   　　    var allRange=document.selection.createRange(); 
   　　    workRange.setEndPoint("StartToStart",allRange); 
   　　    cursurPosition=workRange.text.length; 
   　　    workRange.collapse(false); 
   　　    workRange.select(); 
          */}
    if(cursurPosition<1)
	   cursurPosition=obj.value.length;
    obj.cursurPosition=cursurPosition;
}
//设置控件光标位置
function setCursorPosition(obj,i)
{
    var cursurPosition=-1;
    if(obj.selectionStart){//非IE浏览器
        obj.selectionStart=i;
    }else{//IE
        var range = obj.createTextRange();
        range.move("character",i);
        range.select();
    }
}
//指定控件光标位置插入字符串
function InsertString(tbid, str){  
    var tb ;
    tb= document.getElementById(tbid);  
    tb.focus();  
    if (document.selection)
    { 
        if(tb.cursurPosition)
        {
            setCursorPosition(tb,tb.cursurPosition);
            tb.cursurPosition=undefined;
        }
        var r =document.selection.createRange(); 
        document.selection.empty();  
        r.text = str;  
        r.collapse();  
        r.select();   
    }  
    else{  
        var newstart = tb.selectionStart+str.length;  
        tb.value=tb.value.substr(0,tb.selectionStart)+str+tb.value.substring(tb.selectionEnd);  
        tb.selectionStart = newstart;  
        tb.selectionEnd = newstart;  
    }  
} 
//判断参数1的字符串分成数组，再对比参数2，判断参数1其中一个值是否包含在参数2中
function CheckStringArr(source, target)
{
    var arr = source.split(',');
    for (var i=0;i<arr.length;i++)
    {
        if (target.indexOf(arr[i])>-1)
            return true;
    }
    return false;
}
//隐藏、显示指定控件，多个用逗号分开,idStr:控件Id串,show：是否显示
function setControlDisplay(idStr,show)
{
    var idarr=idStr.split(',');
    for(var i=0;i<idarr.length;i++)
    {
        if(idarr!="")
        {
            if(show)
                document.getElementById(idarr[i]).style.display="";
            else
                document.getElementById(idarr[i]).style.display="none";                
        }    
    }
}
//判断 ListBox是否有选中项
function isListSelected(id)
{
    var lst=document.getElementById(id);
    for (var i = 0; i < lst.options.length; i++) 
    {  
        var item = lst.options[i];  
        if (item.selected) 
            return true;          
    }
    return false; 
}

//根据单选列表控件(checkboxlist,radiobuttonlist)Id去获取选中的值
function getListChooseValue(id,more,isvalue)
{
    var temp='0_-1';//路径索引_路径Id
    var radioList=document.getElementById(id);
    if(!radioList) 
       return temp;
    var options = radioList.getElementsByTagName('input'); 
    var lab=radioList.getElementsByTagName('label'); 
    for(i=0;i<options.length;i++) 
    { 
	     var opt = options[i]; 
	     if(opt.checked)
	     {
	        if(temp=='0_-1')
	            temp="";
	        if(!isvalue)//是否只读取值，不读取索引
                temp+=","+opt.id.substr(opt.id.indexOf('_')+1)+'_'+opt.value;
            else
                temp+=","+opt.value;
            if(!more)//是否多选
                break;
	     }
    }
    if(temp.substring(0,1)==",")
        temp=temp.substr(1);
    return temp;
}

function OpenDivModalDialog(title,id,content,dialogWidth,dialogHeight,cover,resize,drag,max,min,button,icon)
{
    dialogObj=new $.dialog({
	        title: title,
		    id: id,
		    content: content,
		    width: dialogWidth,
		    height: dialogHeight,
		    cover:cover,
		    autoPos:true,
		    resize:false,
		    drag:drag,
		    max:max,
		    min:min,
		    button:button,
		    icon:icon,
		    esc:false
	        });
            
}

function getIdStr(row,keyId)
{
	if(row.length==0)
	{
		return "";
	}
	else
	{
		var idStr="";
		for(var i=0;i<row.length;i++)
		{
			if(idStr!="")
				{
				idStr+=",";
				}
			idStr+= row[i][keyId];
		}
		return idStr;
	}
}