<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%-- <%@taglib uri="/struts-tags" prefix="s"%> --%>
<%@include file="/common/taglibs.jsp"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>新增维护服务单</title>
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
		var bid = $('#facilityName').val();
// 		alert(bzflName);
// 		var bzccName = $('#bzccName').val();
		$("#facilityName").ligerComboBox({
			url : '${ctx}/maintainRecord/jbxxList.do',
			valueField : 'bid',
			textField : 'facilityName',
			selectBoxWidth : 200,
			autocomplete : true,
			width : 200,
			initText : bid,//初始化值
			onSelected : function(newvalue) {
				var facilityName = $('#facilityName_val').val()
				//  alert(bzfl);
				$('#facilityName2').val(facilityName)

// 				var bzflName = $('#facilityName').val()
// 				$('#facilityName').val(bzflName)
			}
		});
	})
	function f_submit() {
// 		action="${ctx}/information/save.do"
// 		alert(123);
		$("#form1").attr("action", "${ctx}/maintainRecord/save.do");
		$("#form1").submit();
// 		window.parent.parent.f_reload("jbxx");
	}
</script>
</head>
<body>
	<form method="post" name="form1" id="form1">
		<input type="hidden" id="id" name="mid" value='${info.mid}' />
		<div style="float: left;">
			<div class="captionContainer">
				<div class="caption">维护服务单</div>
			</div>
			<table width="100%" border="0" cellpadding="0" cellspacing="0"
				class="contenttable">
				<tr>
					<td class="title"><font color="red">*</font>设备名称：</td>
					<td class="content">
							<input type="text"  id="facilityName"  validate="{required:true}"
							 value='${ifm.facilityName}'/>
				   	    	<input type="hidden" name="bid.bid" ltype="text" id="facilityName2"/>
					</td>
					<td class="title"><font color="red">*</font>工作时间：</td>
					<td class="content">
						<input type="text" style="width:200px;"
							name="maintenanceTime" id="maintenanceTime" value='${info.maintenanceTime}'
							validate="{required:true}" onclick="WdatePicker();"
							readonly="readonly" class="smchoser date" />
					</td>
				</tr>

				<tr>
					<td class="title">故障来源：</td>
					<td class="content">
						<input type="text" name="faultSource"
							id="faultSource" maxlength="50" style="width: 200px;" ltype="text" value='${info.faultSource}' />
					</td>
					<td class="title">故障现场：</td>
					<td class="content">
						<input type="text" name="faultScene"
							id="faultScene" maxlength="50" style="width: 200px;" ltype="text" value='${info.faultScene}' />
					</td>
				</tr>
				<tr>
				<td class="title">处理情况及结果：</td>
					<td class="content">
						<input type="text" name="result"
						id="result" maxlength="11" style="width: 200px;" ltype="text"
						class="required:true" value='${info.result}' />
					</td>
					<td class="title">客户反馈：</td>
					<td class="content">
						<input type="text" name="clientFeedback"
							id="clientFeedback" maxlength="50" style="width: 200px;" ltype="text" value='${info.clientFeedback}' />
					</td>
				</tr>

			</table>
		</div>
		<br />

	</form>
</body>
</html>