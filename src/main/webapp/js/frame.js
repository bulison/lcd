//总框架对象
var oTabbed;
//对话框对象
var oDialog;
//提示框对象
var oPrompt;

//初始化加载
$(document).ready(function(){
	//设置框架页面的布局
	reSetUI();
	oDialog = new $.NqtDialog();
	oPrompt = new $.NqtPrompt();
	
	//总体布局
	oTabbed = new $.DynamicTabbed({
		tabBar:'#mainTabed',
		conBar:'#mainCon'
	});
	oTabbed.openTab({href:'welcome.jsp', width:100, fixed:true});
	
	//移交链接
	$('a').click(doHref);
	//退出登录
	$('#btnLogout').click(function() {
		return confirm('您确定要退出登录吗？');					  
	});
	//重新登录
	$('#btnReLogin').click(function() {
		relogin(true, function(){
			document.location.reload();					   
		});
		return false;
	});
	//加载菜单
	$('#identifier').hoverAccordion({
		onClickOnly : true 
	});
	
});
//重设框架页面
$(window).resize(reSetUI);

//重设框架页面
function reSetUI() {
	$('#menuBar').height($(window).height()-63);
	$('#mainCon').height($(window).height()-63);
	$('#mainCon').width($(window).width()-180);
	$('#mainTabed').width($(window).width()-180);
}

/* 处理链接 用于把锚点A或其它有链接属性的对象被点击时在框架中的动作
 * 任何对象可以设置以下属性后利用该方法处理成为链接：
 * target：打开的窗口名称
 * href: 链接的页面地址
 */
function doHref() {
	var target = $(this).attr('target');
	if(!target) target = '';
	var tHref = $(this).get(0).href;//$(this).attr('href');
	if(!tHref || tHref=='#') tHref ='';
	//以Tabbed形式打开
	if (tHref.length>0 && target=='_tabbed') {
		oTabbed.openTab({href:tHref, canClose:true});
		return false;		
	}
	//在指定的窗口中打开
	if (tHref.length>0 && '_blank,_top,_self,_parent'.indexOf(target)<0) {
		if($('#tab_'+target).length>0) {
			oTabbed.setCurTab(target);
			//$('#frm_'+target).attr('src', tHref).contents(window).get(0).location.reload(true);;
		} else {
			oTabbed.openTab({href:tHref, id:target, canClose:true});
		}
		return false;
	}
}

//打开重新登录对话话
function relogin(cClose, callback) {
	oDialog.show({
		href:'login.asp?r='+Math.random(), 
		name:'login',
		model:true, 
		canClose:cClose, 
		w:276, 
		h:165, 
		callback:callback
	});
}	   

//显示操作信息
function prompt(htm) {
	oPrompt.show({html:htm, doLink:doHref});
}


