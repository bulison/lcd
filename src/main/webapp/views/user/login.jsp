<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%-- <%@taglib uri="/struts-tags" prefix="s"%> --%>
<%@include file="/common/taglibs.jsp" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%-- 	<base href="<%=basePath%>" /> --%>
	<title>LCD管理系统</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="robots" content="none" />
	
	<link rel="icon" href="favicon.ico" mce_href="favicon.ico" type="image/x-icon" />
	<link rel="shortcut icon" href="favicon.ico" mce_href="favicon.ico" type="image/x-icon" />
	<link rel="stylesheet" type="text/css" href="${ctx}/css/login.css" />
	
	<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.js"></script>
	<script src="${ctx}/js/ligerUI/js/core/base.js" type="text/javascript"></script>
	<script src="${ctx}/js/jquery.validate.min.js" type="text/javascript"></script> 
	<script src="${ctx}/js/jquery.metadata.js" type="text/javascript"></script>
	<script src="${ctx}/js/messages_cn.js" type="text/javascript"></script>
	
	<script type="text/javascript">
		$(document).ready(function () {
			$.metadata.setType("attr", "validate");
			
			$("#loginForm").validate({
				errorPlacement: function (lable, element) {
					element.addClass('inputerror');
					element.attr('title', lable.html());
					var t = '请输入用户登录密码';
					if ($('#vCode').length>0) t += '及验证码'
					$('#errInfo').html(t+'！');
				},
				success: function (lable) {
					var element = $('#' + lable.attr('for'));
					if (element.hasClass('inputerror')) {
						element.removeClass('inputerror');
					}
					element.attr('title', '');
					$('#errInfo').html('');
				}
			}); // end of $("loginForm").validate()
			
			resizeUI();
			
			$('#vSavePw').click(function(){
				if ($(this).attr('checked')=='checked') {
					$('#vSaveId').attr('checked', true);
				}
			});
			
			$('#vSaveId').click(function(){
				if ($(this).attr('checked')!='checked') {
					$('#vSavePw').attr('checked', false);	
				}
			});
			getInfo();
		});  // end of $(document).ready()
		
		$(window).resize(resizeUI);
		
		function resizeUI() {
			$('#mainCon').css('margin-top', ($(window).height()-$('#mainCon').height())/2).fadeIn();
			var ofs = $('#mainCon').offset();
			$('#loginFormBg').css({'top' : ofs.top+110, 'left' : ofs.left+500}).fadeIn();
			$('#loginForm').css({'top' : ofs.top+110, 'left' : ofs.left+500}).fadeIn();
			if ($('#vCode').length>0) {
				$('#loginForm #tit').addClass('showCodeTit');
				$('#barUserId').addClass('showCode');
				$('#barPw').addClass('showCode');
				$('#btnSubmit').addClass('showCode');
			}
		}
		
	</script>
</head>
  
<body>
<div id="mainCon">
<div id="nav">
</div>
<img id="banner" src="${ctx}/img/login-banner.jpg" width="800" height="400" />


<div id="loginFormBg"></div>
<form action="${ctx}/user/check.do" method="post" name="loginForm" id="loginForm">
	<div id="tit">系统用户登录</div>
	<div id="barUserId">
		<label id="lbUserId" for="vUserId">用户名</label><br />
		<input name="username" type="text" id="vUserId" value='' tabindex="1"  validate="{required:true}" />
	</div>
	<div id="barPw">
		<label id="lbPw" for="vPw">密码</label><br />
		<input name="password" type="password" id="vPw" maxlength="20" onfocus="" tabindex="2" validate="{required:true}" value=''/>
	<input type="submit" name="btnSubmit" id="btnSubmit" value="" tabindex="4" />
	<div id="errInfo" class="red"><s:property value="errorMsg" /></div>
</form>
</div>
</body>
</html>
