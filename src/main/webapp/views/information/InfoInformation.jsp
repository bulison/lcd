<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%-- <%@taglib uri="/struts-tags" prefix="s"%> --%>
<%@include file="/common/taglibs.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>新增用户信息</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="robots" content="none" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/newqt.form.css" />
<link href="${ctx}/css/form.css" rel="stylesheet" type="text/css" />
<link href="${ctx}/js/ligerUI/skins/Aqua/css/ligerui-all.css"
	rel="stylesheet" type="text/css" />
<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.js"></script>
<script src="${ctx}/js/ligerUI/js/core/base.js" type="text/javascript"></script>
<%--<script src="js/ligerUI/js/core/ligerui.all.js" type="text/javascript"></script>--%>
<script src="${ctx}/js/ligerUI/js/plugins/ligerGrid.js"
	type="text/javascript"></script>
<script src="${ctx}/js/ligerUI/js/plugins/ligerTextBox.js"
	type="text/javascript"></script>
<script src="${ctx}/js/ligerUI/js/plugins/ligerToolBar.js"
	type="text/javascript"></script>
<script src="${ctx}/js/ligerUI/js/plugins/ligerDialog.js"
	type="text/javascript"></script>
<script src="${ctx}/js/ligerUI/js/plugins/ligerButton.js"
	type="text/javascript"></script>
<script src="${ctx}/js/ligerUI/js/plugins/ligerComboBox.js"
	type="text/javascript"></script>

<script src="${ctx}/js/jquery.validate.min.js" type="text/javascript"></script>
<script src="${ctx}/js/jquery.metadata.js" type="text/javascript"></script>
<script src="${ctx}/js/messages_cn.js" type="text/javascript"></script>
<script type="text/javascript" src="${ctx}/js/newqt.form.extend.js"></script>

<script src="${ctx}/js/newqt.list.extend.js" type="text/javascript"></script>
<script src="${ctx}/js/newqt.dictionary.js" type="text/javascript"></script>

<!-- 日历控件 -->
<script type="text/javascript" src="${ctx}/js/DatePicker/WdatePicker.js"></script>
<script>
	
// 	function f_save() {
// 		$("#form1").submit();
// 	}

	function f_close() {
		window.close();
	}

	$(document).ready(function() {
		$.metadata.setType("attr", "validate");
		$('#form1').validate({
			errorPlacement : function(lable, element) {
				element.addClass('inputerror');
				element.attr('title', lable.html());
			}, // end of errorPlacement
			success : function(lable) {
				var element = $('#' + lable.attr('for'));
				if (element.hasClass('inputerror')) {
					element.removeClass('inputerror');
				}
				element.attr('title', '');
			}, // end of success
			messages : {
			//'number':{remote : $.format('这个车牌的车辆被已登记(可能放入回收站)！')}
			}
		});
		initForm();
	});

	/******************************************************/
	/*用户树*/
	var zNodes = [];

	var setting = {
		view : {
			dblClickExpand : false,
			showLine : true,
			selectedMulti : false
		},
		data : {
			simpleData : {
				enable : true,
				pIdKey : "parentId"
			}
		},
		callback : {
			onClick : onCheck
		}
	};
	function onCheck(e, treeId, treeNode) {

		if (treeNode.id != -1) {
			return;
		}
		$("#surveyorName").attr("value", treeNode.name);

		$("#surveyor").attr("value", treeNode.userId);

		hideMenu();
	}

	//点击上级分组树的处理
	function doShowMenu() {
		if ($("#menuContent").is(':hidden'))
			showMenu();
		else
			hideMenu();
	} //end of doShowMenu()

	function showMenu() {
		var cityObj = $("#surveyorName");
		var cityOffset = $("#surveyorName").offset();
		$("#menuContent").css({
			left : cityOffset.left + "px",
			top : cityOffset.top + cityObj.outerHeight() - 1 + "px"
		}).slideDown("fast");

		$("body").bind("mousedown", onBodyDown);
	}
	function hideMenu() {
		$("#menuContent").fadeOut("fast");
		$("body").unbind("mousedown", onBodyDown);
	}
	function onBodyDown(event) {
		if (!(event.target.id == "dept" || event.target.id == "menuContent" || $(
				event.target).parents("#menuContent").length > 0)) {
			hideMenu();
		}
	}
	$(function() {
		var bzflName = $('#bzflName').val();
		var bzccName = $('#bzccName').val();
		$("#bzfl").ligerComboBox({
			url : 'admin/Bzsx!bzflList.action',
			valueField : 'id',
			textField : 'name',
			selectBoxWidth : 200,
			autocomplete : true,
			width : 200,
			initText : bzflName,//初始化值
			onSelected : function(newvalue) {
				var bzfl = $('#bzfl_val').val()
				//  alert(bzfl);
				$('#bzfl2').val(bzfl)

				var bzflName = $('#bzfl').val()
				$('#bzflName').val(bzflName)
			}
		});
		$("#bzcc").ligerComboBox({
			url : 'admin/Bzsx!bzccList.action',
			valueField : 'id',
			textField : 'name',
			selectBoxWidth : 200,
			autocomplete : true,
			width : 200,
			initText : bzccName, //初始化值 
			onSelected : function(newvalue) {
				var bzcc = $('#bzcc_val').val()
				$('#bzcc2').val(bzcc)

				var bzccName = $('#bzcc').val()
				$('#bzccName').val(bzccName)
			}
		});
	})
	function checkUsername() {
		var username = $('#username').val();
		var result = true;
		$.ajax({
			url : "admin/User!checkUsername.action?username=" + username,
			type : "json",
			async : false,//同步
			success : function(data) {
				if (data != null && data != "") {
					window.top.f_tipMessage(data);
					result = false;
				}
			}
		});
		return result;
	}
	function f_submit() {
// 		action="${ctx}/information/save.do"
// 		alert(123);
		$("#form1").attr("action", "${ctx}/information/save.do");
		$("#form1").submit();
// 		window.parent.parent.f_reload("jbxx");
	}
</script>
</head>
<body>
	<form method="post" name="form1" id="form1">
		<input type="hidden" id="id" name="bid" value='${info.bid}' />
		<div style="float: left;">
			<div class="captionContainer">
				<div class="caption">基本信息</div>
			</div>
			<table width="100%" border="0" cellpadding="0" cellspacing="0"
				class="contenttable">
				<tr>
					<td class="title"><font color="red">*</font>设备名称：</td>
					<td class="content">
						<input type="text" name="facilityName" id="facilityName"
								maxlength="50" style="width: 200px;" ltype="text" value='${info.facilityName}'
								validate="{required:true}" />
					</td>
					<td class="title"><font color="red">*</font>安装地址：</td>
					<td class="content">
						<input type="text" name="installAddress" id="installAddress"
								maxlength="50" style="width: 200px;" ltype="text" value='${info.installAddress}'
								validate="{required:true}" />
					</td>
				</tr>

				<tr>
					<td class="title">联系人：</td>
					<td class="content">
						<input type="text" name="contact"
							id="contact" maxlength="50" style="width: 200px;" ltype="text" value='${info.contact}' />
					</td>
					<td class="title">联系电话：</td>
					<td class="content">
						<input type="text" name="contactTel"
						id="contactTel" maxlength="11" style="width: 200px;" ltype="text"
						class="required:true" value='${info.contactTel}'
						onkeyup="this.value=this.value.replace(/\D/g,'')"
						onafterpaste="this.value=this.value.replace(/\D/g,'')" />
						
					</td>
				</tr>
				<tr>
					<td class="title">图片：</td>
					<td class="content">
						<input type="text" name="picture"
							id="picture" maxlength="50" style="width: 200px;" ltype="text" value='${info.picture}' />
					</td>
					<td class="title">安装方式：</td>
					<td class="content">
						<input type="radio" name="installModel" id="status0" value="0"
						 <c:if test="${info.installModel==0}"> checked="checked"</c:if> />
						 <label for="kind1">有线</label>
						<input type="radio" name="installModel" id="status1" value="1" 
						<c:if test="${info.installModel==1}"> checked="checked"</c:if> />
						<label for="kind1">无线</label>
					</td>
				</tr>
				<tr>
					<td class="title">显示屏：</td>
					<td class="content">
						<input type="text" name="screen"
						id="screen" maxlength="50" style="width: 200px;" ltype="text" value='${info.screen}' />
					</td>
					<td class="title">设备号：</td>
					<td class="content">
						<input type="text" name="deviceNumber"
						id="deviceNumber" maxlength="50" style="width: 200px;" ltype="text" value='${info.deviceNumber}' />
					</td>
				</tr>
				<tr>
					<td class="title">设备坐标：</td>
					<td class="content">
						<input type="text" name="point"
							id="point" maxlength="50" style="width: 200px;" ltype="text" value='${info.point}' />
					</td>
					<td class="title">设备状态：</td>
					<td class="content">
						<input type="radio" name="state" id="status0" value="0"
						 <c:if test="${info.state==0}"> checked="checked"</c:if> />
						 <label for="kind1">已连接</label>
						<input type="radio" name="state" id="status1" value="1" 
						<c:if test="${info.state==1}"> checked="checked"</c:if> />
						<label for="kind1">未连接</label>
					</td>
				</tr>
				<tr>
					<td class="title"><font color="red">*</font>安装时间：</td>
					<td class="content">
						<input type="text" style="width:200px;"
							name="installTime" id="installTime" value='${info.installTime}'
							validate="{required:true}" onclick="WdatePicker();"
							readonly="readonly" class="smchoser date" />
					</td>
				</tr>
			</table>
		</div>
		<br />

	</form>
</body>
</html>