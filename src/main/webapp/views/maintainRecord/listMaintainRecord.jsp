<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/common/taglibs.jsp" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE>
<html>
<head>
<title>基本信息</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link href="${ctx}/js/ligerUI/skins/Aqua/css/ligerui-all.css" rel="stylesheet" type="text/css" />
 <link href="${ctx}/css/newqt.list.css" rel="stylesheet" type="text/css" /> 
    <script src="${ctx}/js/jquery-1.7.2.js" type="text/javascript"></script>
	<script src="${ctx}/js/comm.js" type="text/javascript"></script>
    <script src="${ctx}/js/ligerUI/js/core/base.js" type="text/javascript"></script>
    <script src="${ctx}/js/ligerUI/js/plugins/ligerGrid.js" type="text/javascript"></script> 
    <script src="${ctx}/js/ligerUI/js/plugins/ligerToolBar.js" type="text/javascript"></script>
    <script src="${ctx}/js/ligerUI/js/plugins/ligerDrag.js" type="text/javascript"></script> 
    <script src="${ctx}/js/ligerUI/js/plugins/ligerDialog.js" type="text/javascript"></script>
    <script src="${ctx}/js/ligerUI/js/plugins/ligerButton.js" type="text/javascript"></script>
	<script src="${ctx}/js/ligerUI/js/plugins/ligerMenu.js" type="text/javascript"></script>
<script src="${ctx}/js/newqt.list.extend.js" type="text/javascript"></script>
<script src="${ctx}/js/newqt.dictionary.js" type="text/javascript"></script>

<script type="text/javascript">

var organizationList = [];

var toolbarButtons = { items: [
	   { text: '增加', click: f_new, img: '${ctx}/js/ligerUI/skins/icons/add.gif', id:'addBtn'},
	   { line: true },
	   { text: '修改', click: f_mod, img: '${ctx}/js/ligerUI/skins/icons/edit.gif', id:'modBtn' },
	   { line: true },
	   { text: '删除', click: f_del, img: '${ctx}/js/ligerUI/skins/icons/delete.gif', id:'delBtn' }
   ]
};

//工具栏按钮集
	function getToolbarBtn() {
		return { items: [
			{ id:'btnAdd', text: '新建', click: f_new, img: '${ctx}/js/ligerUI/skins/icons/add.gif' },
			{ id:'btnMod', text: '编辑', img: '${ctx}/js/ligerUI/skins/icons/edit.gif'},
			{ line: true },
			{ id:'btnDel', text: '删除', img: '${ctx}/js/ligerUI/skins/icons/delete.gif'},
			{ id:'btnRcv', text: '还原', img: '${ctx}/js/ligerUI/skins/icons/refresh.gif'},
			{ id:'btnClr', text: '彻底删除', img: '${ctx}/js/ligerUI/skins/icons/lgcdel.gif' }
		]};
	} //end of getToolbarBtn()
	
	//根据参数情况设置各个按钮
	function setToolbarBtn() {
		var rows = grid.getSelectedRows();
		var isDel = $("#vIsDel") && $("#vIsDel").attr("checked")=='checked';
		setModifyBtn(rows, 'btnMod', f_mod);	//设置编辑按钮
		setLogicDelBtn(isDel, rows, 'btnDel', doDel);	//设置删除按钮
		setRecoverBtn(!isDel, rows, 'btnRcv', doRcv);	//设置还原按钮
		setDeleteBtn(!isDel, rows, 'btnClr', doClr); 	//设置彻底删除按钮
	} //end of setToolbarBtn()
	
	
	
function f_new() {
	dialog = $.ligerDialog.open({
		name:'infoFrame',
		url: "${ctx}/maintainRecord/info.do?mid=",
		height: 500,
		width: 700,
		isResize:true,
		isHidden:false,
		title:'添加维护信息',
		buttons: [{text: '保存', onclick: function (item, dialog) {
			window.frames["infoFrame"].f_submit();
// 			dialog.hide();
			//window.parent.f_reload("jbxx");
		} 	
		}, 
		{ text: '取消', onclick: function (item, dialog) { 
			dialog.close(); 
		} }]
	});
}
function f_mod() {
	if (grid.getSelectedRow() == null) {
		$.ligerDialog.tip({  title: "提示",content:"请先选择行！"});
		return;	
	}
	var id = grid.getSelectedRow().mid; 
	dialog = $.ligerDialog.open({
		name:'infoFrame',
		url: '${ctx}/maintainRecord/info.do?mid='+id,
		height: 500,
		width: 700,
		isResize:true,
		isHidden:false,
		title:'修改基本信息',
		buttons: [{ text: '保存', onclick: function (item, dialog) {
			window.frames["infoFrame"].f_submit();
			} 
		}, 
		{ text: '取消', onclick: function (item, dialog) { dialog.close(); } }]
	});
}
function f_del() {
	var rowdata = grid.getCheckedRows();
	var  ids = getIdStr(rowdata,"id");
	if(rowdata.length == 0){ $.ligerDialog.warn("请选择要删除的数据项");return;}	
	$.ligerDialog.confirm("您确定要删除数据项？", function (r) 
	{ 
		if(r){	
			$.ajax({                
				url : "admin/Bzfl!delete.do?param.ids="+ids,
				type : "post",
				dataType:"json",
				data: "",		
				success:function(data){
					f_showTips("提示",data.msg);
					f_search();
				},
				error:function(){
					f_showTips("提示","链接错误，请检查网络设置！");
				}
			});
		}else{
			return;
		}
	});
}


//删除操作
	function doDel() {
		doLogicDeleteDate(grid, "${ctx}/maintainRecord/del.do", 'mid', 'mid');
	} //end of doDel
	
	
	//还原数据操作
	function doRcv() {
		doRecoverDate(grid, "organization/recoverOrganization.do", 'id', 'param.ids');
	} //end of doRcv
	
	//彻底删除（清除）操作
	function doClr() {
		doDeleteDate(grid, "organization/deleteOrganization.do", 'id', 'param.ids');
	} //end of doClr
	
function f_search() {
	var manager = $("#organizationGrid").ligerGetGridManager();
    grid.setOptions({
        parms: [
        {name: 'keyword', value:$('#vKeyword').val() }]});
    //按查询条件导入到grid中
   	grid.loadData();
	
}
var grid;
$(function () {
   grid = $("#organizationGrid").ligerGrid({
   		checkbox: true,
   		//parms: [{name: 'param.status', value: '1'}],
	columns : [
			{
				display : '设备名称',
				name : 'bid.facilityName',
				align : 'left',
				width : 200,
				render:function(o,i)
				{
					return o.bid.facilityName
					}

			}, {
				display : '故障来源',
				name : 'faultSource',
				align : 'left',
				width : 200
			}, {
				display : '故障现场',
				name : 'faultScene',
				align : 'left',
				width : 200
			}, {
				display : '处理情况及结果',
				name : 'result',
				align : 'left',
				width : 200
			}, {
				display : '客户反馈',
				name : 'clientFeedback',
				align : 'left',
				width : 200
			}, {
				display : '维护时间',
				name : 'maintenanceTime',
				align : 'left',
				width : 200
			} ],
			width : 'auto',
			height : '100%',
			url : '${ctx}/maintainRecord/queryAll.do',
			dataAction : 'server', //服务器分页和排序
			//         usePager: false,   
			heightDiff : -6,
			toolbar : getToolbarBtn(),
			// 		tree: { columnName: 'name' },
			// 		autoExtendColumn:'status',
			keyId : "mid",
			sortName : 'maintenanceTime',
			pageParmName : 'currentPage',
			pagesizeParmName : 'pageSize',
			sortnameParmName : 'sortName',
			sortorderParmName : 'sortOrder',

			onCheckRow : function(checked, data, rowindex, rowobj) {
				setToolbarBtn();
			},
			onAfterShowData : function() {
				setTimeout(setToolbarBtn, 50);
			},
			onDblClickRow : function(rowdata, rowindex, rowDomElement) {
				f_mod();
			}
		});
		$("#pageloading").hide();

		//f_search();
	});

	var dialog;

	function f_closeDialog() {
		if (dialog != null) {
			dialog.close();
			f_search();
		}
	}

	function f_showTips(title, content) {
		$.ligerDialog.tip({
			title : title,
			content : content
		});
	}
</script>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head>
  
<body>
<div class="searchBar">
   <span>设备名称：<input type="text" name="keyword" id="vKeyword"/></span>
   <span><input type="button" value="搜索" class="button"  onclick="f_search()"/></span>
</div>

<div class="l-loading" style="display:block" id="pageloading"></div> 
<div id="organizationGrid" style="margin:3px; padding:0"></div>


  <div style="display:none;">
</div>
</body>
</html>
