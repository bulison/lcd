<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/common/taglibs.jsp" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html>
<head>
    
    <title>保存成功</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="robots" content="none" />    
	<link rel="icon" href="favicon.ico" mce_href="favicon.ico" type="image/x-icon" />
	<link rel="shortcut icon" href="favicon.ico" mce_href="favicon.ico" type="image/x-icon" />
	<link href="js/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />
	<link href="css/index.css" rel="stylesheet" type="text/css" />
	
	<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.js"></script>
<script src="js/ligerUI/js/core/base.js" type="text/javascript"></script>
<script src="js/ligerUI/js/plugins/ligerLayout.js" type="text/javascript"></script>
<script src="js/ligerUI/js/plugins/ligerAccordion.js" type="text/javascript"></script>
<script src="js/ligerUI/js/plugins/ligerTab.js" type="text/javascript"></script>
<script src="js/ligerUI/js/plugins/ligerDialog.js" type="text/javascript"></script>
<script type="text/javascript" src="js/newqt.dictionary.js"></script>
	<script src="js/ligerUI/js/core/ligerui.min.js" type="text/javascript"></script>
    <script src="js/jquery-1.7.2.js" type="text/javascript"></script>
	<script type="text/javascript">
	$(document).ready(function(){
		var tips = '${msg}';
		if (tips=='') tips = '操作成功！';
		try {
			window.top.f_tipMessage(tips);
			window.parent.f_closeDialog(); 
// 			window.top.f_success('<s:property value="redirect.tabId" escape="false" />', 
// 					'<s:property value="redirect.tabTit" escape="false" />', 
// 					'<s:property value="redirect.toUrl" escape="false" />');
		} catch (e) {
			window.parent.f_closeDialog2();
		};
	});
	$(function(){
// 		window.parent.f_reload("bzxx");
// 		if(result=="addbzxx"){
// 			window.parent.f_reload("bzxx");
// 			window.parent.f_closeTab("updatebzsx");
// 			}
	
		});
	</script>
</head>
  
<body>
  
</body>
</html>
