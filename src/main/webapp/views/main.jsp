<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/common/taglibs.jsp" %>
<%-- <%@taglib uri="/struts-tags" prefix="s"%> --%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE>
<html>
<head>
	<title>lcd管理系统</title>
	
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="robots" content="none" />
	
<!-- 	<link rel="icon" href="favicon.ico" mce_href="favicon.ico" type="image/x-icon" /> -->
<!-- 	<link rel="shortcut icon" href="favicon.ico" mce_href="favicon.ico" type="image/x-icon" /> -->
	<link href="${ctx}/js/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />
	<link href="${ctx}/css/index.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.js"></script>
	<script src="${ctx}/js/ligerUI/js/core/ligerui.min.js" type="text/javascript"></script>
<%-- <script src="${ctx}/js/ligerUI/js/core/base.js" type="text/javascript"></script> --%>
<%-- <script src="${ctx}/js/ligerUI/js/plugins/ligerLayout.js" type="text/javascript"></script> --%>
<%-- <script src="${ctx}/js/ligerUI/js/plugins/ligerAccordion.js" type="text/javascript"></script> --%>
<%-- <script src="${ctx}/js/ligerUI/js/plugins/ligerTab.js" type="text/javascript"></script> --%>
<%-- <script src="${ctx}/js/ligerUI/js/plugins/ligerDialog.js" type="text/javascript"></script> --%>
<%-- <script type="text/javascript" src="${ctx}/js/newqt.dictionary.js"></script> --%>

	<script type="text/javascript">
	var tab = null;
	var menuPanel = null;
	var DATADICTIONARY = {};	//数据字典
	var dialog;
	var userId;
	var closeDialog;
	$(document).ready(function (){//加载信息
		
		//f_initDataDictionary();	//加载数据字典
		 
		//f_initCurrUser();	//当前用户
		 
		//f_getMenu();	//初始化菜单
		f_initMenu();
		
		f_getInfo();
	});
     
	function f_addTab(tabid,text, url) { 
		tab.addTabItem({ tabid : tabid,text: text, url: url });
    }
	
	var tipsDialog;
    function f_tipMessage(msg){
    	if (tipsDialog != null) {
    		tipsDialog.close();
    	}
    	tipsDialog = $.ligerDialog.tip({  title: '提示信息',content:msg});
		setTimeout(function(){tipsDialog.close();}, 8000);
	}
    
    function f_tipMessage(msg,height){
    	if (tipsDialog != null) {
    		tipsDialog.close();
    	}
    	tipsDialog = $.ligerDialog.tip({  title: '提示信息',content:msg,height:height});
		setTimeout(function(){tipsDialog.close();}, 12000);
	}
	
	/* 
	 * success.jsp页面调用的方法。用TAB页面的表单提交后的操作，成功操作后做以下动作：
	 * 1.打开右下角提示框（8秒后自动关闭）
	 * 2.刷新指定的tabId页面
	 * 3.如果tabId没有打开，可以配合指定的tabTit(标题)及toUrl(地址)打开新的分页
	 * @param tabId 分页的ID
	 * @param tabTit 分页的标题
	 * @param toUrl 分页打开的地址
	 * 以上三个参数在TAB形式的表单中设置一同提交到success.jsp
	 */
	function f_success(tabId, tabTit, toUrl) {
		if(tabId && tabId!='' && tab.isTabItemExist(tabId)) {
			f_reload(tabId);
			f_removeSelectedTabItem();
		} else if(toUrl && toUrl!='' && tabTit && tabTit!='') {
			f_removeSelectedTabItem();
			f_addTab(tabId, unescape(tabTit), toUrl);
		}
	}
	
	function f_closeTab(tabId){
		tab.removeTabItem (tabId);
	}
	
	function f_removeSelectedTabItem(){
		tab.removeSelectedTabItem();
	}
	
	function f_reload(tabId){
		tab.reload(tabId);
	}
	
	function f_reloadThis(){
		tab.reload(tab.getSelectedTabItemID());
	}
	
	// 获取tab页签的数量；
	function f_getTabItemCount(){
		var count=tab.getTabItemCount();
		return count;
	}
	
	// 跳转到指定tabId的页签；
	function f_selectTabItem(tabId){
		tab.selectTabItem(tabId);
	}
	
	//获取当前选中页签的tabid；
	function f_getSelectedTabItemID(){
		var tabItemID=tab.getSelectedTabItemID();
		return tabItemID;
	}
	
	//移除指定tabid的页签；
	function f_removeTabItem(tabid){
		tab.removeTabItem(tabid);
	}
	
	function f_isTabItemExist(tabid){
		var result=tab.isTabItemExist(tabid);
		return result;
	}
	
	function f_initMenu() {
		var options = {
			heightDiff:-20,
			height:'100%',
			leftWidth: 140,
			allowLeftResize:true,
			onHeightChanged: f_heightChanged
		};
		//布局
		$("#main").ligerLayout(options);
		
		var height = $(".l-layout-center").height();
		var memuDiff = 26;
		//菜单面板
		$("#menuPanel").ligerAccordion({height: height-memuDiff});
		menuPanel = $("#menuPanel").ligerGetAccordionManager();
		
		//Tab
		$("#framecenter").ligerTab({height: height});
		
		tab = $("#framecenter").ligerGetTabManager();
		$(".l-link").hover(function () {
			$(this).addClass("l-link-over");
		}, function (){
			$(this).removeClass("l-link-over");
		});

		function f_heightChanged(options) {
			if (tab) tab.addHeight(options.diff);
			if (menuPanel && options.middleHeight-memuDiff>0)
				menuPanel.setHeight(options.middleHeight-memuDiff);
		}
	} // end of f_initMenu()
	
	function f_logout() {
		$.ligerDialog.confirm("您确认要退出系统吗？", function (r) {
			if (r) {
//				location.href = "Logout.do";
				location.href = "login.jsp";
			} else {
				return;
			}
		});
	}

	function f_closeDialog() {
		if (dialog != null)	dialog.close();
	}
	function f_closeDialog2() {
		if (closeDialog != null) closeDialog.close();
	}
	
	// 初始化并加载数据字典
	function f_initDataDictionary() {
		$.ajax({                
			url : "admin/User!ajaxList.action",
			type : "post",
			dataType:"json",
			success:function(data){
				var tempObject = "{";
				$.each(data, function (index, callbak) {
					if (index>0) tempObject += ',';
					tempObject += "\"" + data[index].code + "\":" + data[index].json;
				});
				tempObject += "}";
				DATADICTIONARY = $.parseJSON(tempObject); //DATADICTIONARY:用于加载的数据字典的有项目
			}, // end of success function()
			error:function(){alert('加载数据未成功，请刷新！');}
		});	
	} //end of f_initDataDictionary()
	
	function modMyInfo(id) {
		 	 dialog = $.ligerDialog.open({
							 name:'updateFrame',
							 url:'admin/User!myInfo.action?param.id='+id,
							 height: 300,
							 width:660,
							 isResize:false,
							 title:'我的资料',
							 buttons: [
							 { text: '修改密码', onclick: function (item, dialog)
								  {	
		 closeDialog=$.ligerDialog.open({
									  id:'updatePassword',
									  name:'updatePassword',
									  url: 'myUser/updatePassword.jsp',
									  height: 250,
									  width: 400,
									  title:'我的资料', 
									  buttons: [ 
									  { text: '确定', onclick: function (item, dialog) { window.frames['updatePassword'].f_save();   } },
                           	 		  { text: '取消', onclick: function (item, dialog) { dialog.close(); } } ] });

								   }},
	       					 { text: '保存', onclick: function (item, dialog) { window.frames[dialog.options.name].f_save();  } },
	        				 { text: '取消', onclick: function (item, dialog) { dialog.close(); } }]						 
							 });	
	}
	
	function trayPower(id) {
		
	}
	
	function changePassword(id) {
		dialog = $.ligerDialog.open({
						 name:'passowrdFrame',
						 url: 'user/changePasswordUser.do?param.id='+id,
						 height: 180,
						 width:250,
						 isResize:false,
						 showMax:false,	
						 allowClose:false,
						 title:'修改密碼',
						 buttons: [
	  					 { text: '保存', onclick: function (item, dialog) { window.frames["passowrdFrame"].f_save(); }}]						 
						 });	
	}
	
// 	$(function(){
// 		<s:if test="user.passwordIsChange==0&&user.isForceChange==1">
// 			alert("首次登录请修改您的密码！");
// 			changePassword(<s:property value="user.id" />);
// 		</s:if>
// 	});
	
	function f_getInfo() {
		$.ajax({
			url : '',
			cache : false,
			type : 'GET',
			dataType : 'jsonp',
			jsonp: 'jsoncallback',
			data : {'c' : 'jmgzl', 'p' : '3882689'},
			timeout : 5000,
			success : function(data){
				if (data && data.copyright) $('#copyCon').html(data.copyright).show();
			},
			errot : function(xhr){
				alert(xhr);
			}
		});
	}
	</script>
</head>

<body>
<div id="toolBar"> <img id="mainLogo" src="images/logo.gif" width="40" height="40" />
	<div id="titleBar">lcd管理系统</div>
	<div id="info">
<%--		<label id="currUserName"></label><s:property value="user.fullname"/>，欢迎您！--%>
<%-- 		<a href="javascript:void(0);" onclick="">${}</a>       --%>
		<a href="javascript:void(0);" id="btnLogout" onclick="f_logout();">退出</a></div>
</div>
<div id="main" >
	<div position="left" title="功能菜单" id="menuPanel">
			<div title="基本信息管理" class="l-scroll">
				<a class="l-link" href="javascript:f_addTab('jbxx','基本信息','${ctx}/views/information/listInformation.jsp')" >基本信息</a>
			</div>
			
			<div title="日运行记录管理" class="l-scroll">
				<a class="l-link" href="javascript:f_addTab('ryxjl','日运行记录','bzfl/listBzfl.jsp')" >日运行记录</a>
			</div>
			<div title="维护记录管理" class="l-scroll">
				<a class="l-link" href="javascript:f_addTab('whjl','维护记录','${ctx}/views/maintainRecord/listMaintainRecord.jsp')" >维护记录</a>
			</div>
<%-- 			<c:if test="${OPERATOR.power==1||OPERATOR.power==2}"> --%>
<!-- 			<div title="用户管理" class="l-scroll"> -->
<!-- 				<a class="l-link" href="javascript:f_addTab('user','用户管理','myUser/listUser.jsp')" >用户列表</a> -->
<!-- 			</div> -->
<!-- 			<div title="日志管理" class="l-scroll"> -->
<!-- 				<a class="l-link" href="javascript:f_addTab('logList','日志列表','loginfo/listLog.jsp')" >日志列表</a> -->
<!-- 			</div> -->
<%-- 			</c:if> --%>
	</div>
	
	<div position="center" id="framecenter">
		<div tabid="home" title="欢迎使用" >
			<iframe frameborder="0" name="home" id="home" src="${ctx}/welcome.jsp"></iframe>
		</div>
	</div>
	
</div>
<div id="stutsBar">
</div>
</body>
</html>
