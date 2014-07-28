<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/common/taglibs.jsp" %>
<%-- <%@taglib uri="/struts-tags" prefix="s"%> --%>
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
		url: "${ctx}/information/info.do?bid=",
		height: 500,
		width: 700,
		isResize:true,
		isHidden:false,
		title:'添加基本信息',
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
	var id = grid.getSelectedRow().bid; 
	dialog = $.ligerDialog.open({
		name:'infoFrame',
		url: '${ctx}/information/info.do?bid='+id,
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
}


//删除操作
	function doDel() {
		doLogicDeleteDate(grid, "${ctx}/information/del.do", 'bid', 'bid');
	} //end of doDel
	
	
	//还原数据操作
	function doRcv() {
		doRecoverDate(grid, "organization/recoverOrganization.do", 'id', 'param.ids');
	} //end of doRcv
	
	//彻底删除（清除）操作
	function doClr() {
		doDeleteDate(grid, "organization/deleteOrganization.do", 'id', 'param.ids');
	} //end of doClr
	
var grid;
$(function () {
   grid = $("#organizationGrid").ligerGrid({
   		checkbox: true,
   		parms: [{name: 'keyword', value:$('#keyword2').val()}],
        columns: [
     
			{
				display : '设备名称',
				name : 'facilityName',
				align : 'center',
				width : 100
			}, {
				display : '设备号',
				name : 'deviceNumber',
				align : 'center',
				width : 100
			}, {
				display : '设备坐标',
				name : 'point',
				align : 'center',
				width : 150
			}, {
				display : '设备状态',
				name : 'state',
				align : 'center',
				width : 70,
				render : function(item) {
					if(item.state==0){
						return '已连接'
					}else{
						return '未连接'
					}
				}
			}, {
				display : '安装地址',
				name : 'installAddress',
				align : 'center',
				width : 200
			}, {
				display : '安装时间',
				name : 'installTime',
				align : 'center',
				width : 100
			}, {
				display : '联系人',
				name : 'contact',
				align : 'center',
				width : 100
			}, {
				display : '联系电话',
				name : 'contactTel',
				align : 'center',
				width : 150
			}, {
				display : '图片',
				name : 'picture',
				align : 'center',
				width : 200
			},
			{
				display : '安装方式',
				name : 'installModel',
				align : 'center',
				width : 100,
				render : function(item) {
					if(item.installModel==0) return '有线'
					return '无线'
				}
			}, {
				display : '显示屏',
				name : 'screen',
				align : 'center',
				width : 100
			} ],
			width : 'auto',
			height : '100%',
			url : '${ctx}/information/queryAll.do',
			dataAction : 'server', //服务器分页和排序
			//         usePager: false,   
			heightDiff : -6,
			toolbar : getToolbarBtn(),
			// 		tree: { columnName: 'name' },
			// 		autoExtendColumn:'status',
			keyId : "bid",
			sortName : 'installTime',
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
function f_search() {
var keyword = $('#keyword2').val();
	grid.set('parms',{"keyword":keyword});//设置搜索参数
    //按查询条件导入到grid中
   	grid.loadData();
	
}
$('#searchForm').submit(function(){
	f_search();return false;
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
<form name="searchForm" id="searchForm">
   <span>设备名称：<input type="text" name="keyword2" id="keyword2"/></span>
   <span><input type="button" value="搜索" class="button" onclick="f_search();"/></span>
</form>
</div>

<div class="l-loading" style="display:block" id="pageloading"></div> 
<div id="organizationGrid" style="margin:3px; padding:0"></div>


  <div style="display:none;">
</div>
</body>
</html>
