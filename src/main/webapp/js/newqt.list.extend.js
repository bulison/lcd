//列表操作按钮图片集
var _btnImg = {
	read :  'js/ligerUI/skins/icons/read.gif',	//查看
	add : 'js/ligerUI/skins/icons/add.gif',		//新建
	mod : 'js/ligerUI/skins/icons/edit.gif',	//编辑
	cnl : 'js/ligerUI/skins/icons/zhuxiao.gif',	//注销
	rgn : 'js/ligerUI/skins/icons/feifu.gif',	//恢复
	del : 'js/ligerUI/skins/icons/delete.gif',	//删除
	rcv : 'js/ligerUI/skins/icons/refresh.gif',	//还原
	clr : 'js/ligerUI/skins/icons/lgcdel.gif',	//彻底删除
	sqg : 'js/ligerUI/skins/icons/souquag.gif'	//授权（仅用户列表）
};

//列表操作按键集
var _btnSet = {
	read : {id:'btnRead', text:'查看', img:_btnImg.read},	//新建
	add : {id:'btnAdd', text: '新建', img:_btnImg.add},		//查看
	mod : {id:'btnMod', text: '编辑', img:_btnImg.mod},		//编辑
	cnl : {id:'btnCnl', text: '注销', img: _btnImg.cnl},		//注销
	rgn : {id:'btnRgn', text: '恢复', img: _btnImg.rgn},		//恢复
	del : { id:'btnDel', text: '删除', img: _btnImg.del},	//删除
	rcv : { id:'btnRcv', text: '还原', img: _btnImg.rcv},	//还原
	clr : { id:'btnClr', text: '彻底删除', img: _btnImg.clr },	//彻底删除
	sqg : {id:'btnSqg', text:'授权', img:_btnImg.sqg},		//授权（仅用户列表）
	line : { line: true }
};

/*
 * 设置工具栏中查看按钮的可用性
 * @oGridRows ligerGrid.getSelectedRows()得到的行对象
 * @btnReadId 查看按钮ID，在ligerGrid.toolbar.items中设置的ID
 * @doRead 查看操作方法
 */
function setReadBtn(oGridRows, btnReadId, doRead) {
	_setBtnActive((oGridRows.length==1), btnReadId, doRead);
} //end of setReadBtn()

/*
 * 设置工具栏中编辑按钮的可用性
 * @oGridRows ligerGrid.getSelectedRows()得到的行对象
 * @btnModId 编辑按钮ID，在ligerGrid.toolbar.items中设置的ID
 * @doMod 编辑操作方法
 */
function setModifyBtn(oGridRows, btnModId, doMod) {
	_setBtnActive((oGridRows.length==1), btnModId, doMod);
} //end of setModifyBtn()

/*
 * 设置工具栏中注销按钮的可用性
 * @oGridRows ligerGrid.getSelectedRows()得到的行对象
 * @isHide 显示注销按钮的基本条件
 * @btnCnlId 注销按钮ID，在ligerGrid.toolbar.items中设置的ID
 * @doCnl 注销操作方法
 */
function setCancelBtn(isHide, oGridRows, btnCnlId, doCnl) {
	_setBtnWidthHide(isHide, oGridRows, btnCnlId, doCnl);
} //end of setCancelBtn()

/*
 * 设置工具栏中恢复按钮的可用性
 * @oGridRows ligerGrid.getSelectedRows()得到的行对象
 * @isHide 显示恢复按钮的基本条件
 * @btnRgnId 恢复按钮ID，在ligerGrid.toolbar.items中设置的ID
 * @doRgn 恢复操作方法
 */
function setRegainBtn(isHide, oGridRows, btnRgnId, doRgn) {
	_setBtnWidthHide(isHide, oGridRows, btnRgnId, doRgn);
} //end of setRegainBtn()

/*
 * 设置工具栏中删除按钮的可用性
 * @oGridRows ligerGrid.getSelectedRows()得到的行对象
 * @isHide 显示删除按钮的基本条件
 * @btnDelId 删除按钮ID，在ligerGrid.toolbar.items中设置的ID
 * @doDel 删除操作方法
 */
function setLogicDelBtn(isHide, oGridRows, btnDelId, doDel) {
	_setBtnWidthHide(isHide, oGridRows, btnDelId, doDel);
} //end of setLogicDelBtn()

/*
 * 设置工具栏中还原按钮的可用性
 * @oGridRows ligerGrid.getSelectedRows()得到的行对象
 * @isHide 显示还原按钮的基本条件
 * @btnRcvId 还原按钮ID，在ligerGrid.toolbar.items中设置的ID
 * @doRcv 还原操作方法
 */
function setRecoverBtn(isHide, oGridRows, btnRcvId, doRcv) {
	_setBtnWidthHide(isHide, oGridRows, btnRcvId, doRcv);
} //end of setRecoverBtn()

/*
 * 设置工具栏中彻底删除按钮的可用性
 * @oGridRows ligerGrid.getSelectedRows()得到的行对象
 * @isHide 显示彻底删除按钮的基本条件
 * @btnClrId 彻底删除按钮ID，在ligerGrid.toolbar.items中设置的ID
 * @doClr 彻底删除操作方法
 */
function setDeleteBtn(isHide, oGridRows, btnClrId, doClr) {
	_setBtnWidthHide(isHide, oGridRows, btnClrId, doClr);
} // end setDeleteBtn()

/*
 * 从ligerGrid中获取要查看详细的数据项Id的通用方法，如果有特殊的操作你就自己写吧！！
 * @oGrid ligerGrid对象
 * @sourceId String 列表中ID的标识
 * @return 选中的项的ID，如果多个或没有选返回null
 */
function getReadyDateId(oGrid, sourceId) {
	return _getOnlyOneDateId(oGrid, sourceId, 
			'选择了多项个数据，无法同时编辑！', '请选择要编辑数据项！');
}

/*
 * 从ligerGrid中获取要编辑的数据项Id的通用方法，如果有特殊的操作你就自己写吧！！
 * @oGrid ligerGrid对象
 * @return 选中的项的ID，如果多个或没有选返回null
 */
function getModifyDateId(oGrid, sourceId) {
	return _getOnlyOneDateId(oGrid, sourceId, 
			'选择了多项个数据，无法同时编辑！', '请选择要编辑数据项！');
} // end of getModifyDateId()

/*
 * 从ligerGrid中注销选择的数据项的通用方法，如果有特殊的操作你就自己写吧！！
 * @oGrid ligerGrid对象
 * @dUrl 执行注销的action路径
 * @sourceId 列表中原来的ID
 * @paramId 写入传递参数中的ID标识
 */
function doCancelDate(oGrid, dUrl, sourceId, paramId) {
	var rowdata = oGrid.getCheckedRows();
	var ids = getIdStr(rowdata, sourceId);
	if (rowdata.length == 0) { 
		$.ligerDialog.warn("请选择要注销的数据项");
		return false;
	} // end of if (rowdata.length == 0)
	$.ligerDialog.confirm("您确认要注销选中的数据项吗？", function (r) { 
		if(r) request(dUrl, paramId, ids);
	}); //end of ligerDialog.confirm()
}

/*
 * 从ligerGrid中恢复选择的数据项的通用方法，如果有特殊的操作你就自己写吧！！
 * @oGrid ligerGrid对象
 * @dUrl 执行恢复的action路径
 * @sourceId 列表中原来的ID
 * @paramId 写入传递参数中的ID标识
 */
function doRegainDate(oGrid, dUrl, sourceId, paramId) {
	var rowdata = oGrid.getCheckedRows();
	var ids = getIdStr(rowdata,sourceId);
	if(rowdata.length == 0){ 
		$.ligerDialog.warn("请选择要恢复的数据项");
	} else { 
		request(dUrl, paramId, ids);
	};
}

/*
 * 从ligerGrid中删除选择的数据项的通用方法，如果有特殊的操作你就自己写吧！！
 * @oGrid ligerGrid对象
 * @dUrl 执行删除的action路径
 * @sourceId 列表中原来的ID
 * @paramId 写入传递参数中的ID标识
 */
function doLogicDeleteDate(oGrid, dUrl, sourceId, paramId) {
	var rowdata = oGrid.getCheckedRows();
	var ids = getIdStr(rowdata, sourceId);
	if (rowdata.length == 0) { 
		$.ligerDialog.warn("请选择要删除的数据项");
		return false;
	} // end of if (rowdata.length == 0)
	$.ligerDialog.confirm("您确认要删除选中的数据项吗？", function (r) { 
		if(r) request(dUrl, paramId, ids);
	}); //end of ligerDialog.confirm()
} //end of doLogicDeleteDate()

/*
 * 从ligerGrid中还原选择的数据项的通用方法，如果有特殊的操作你就自己写吧！！
 * @oGrid ligerGrid对象
 * @dUrl 执行还原的action路径
 * @sourceId 列表中原来的ID
 * @paramId 写入传递参数中的ID标识
 */
function doRecoverDate(oGrid, dUrl, sourceId, paramId) {
	var rowdata = oGrid.getCheckedRows();
	var ids = getIdStr(rowdata,sourceId);
	if(rowdata.length == 0){ 
		$.ligerDialog.warn("请选择要还原的数据项");
	} else { 
		request(dUrl, paramId, ids);
	};
} // end of doRecoverDate()

/*
 * 从ligerGrid中彻底删除（清除）选择的数据项的通用方法，如果有特殊的操作你就自己写吧！！
 * @oGrid ligerGrid对象
 * @dUrl 执行彻底删除的action路径
 * @sourceId 列表中原来的ID
 * @paramId 写入传递参数中的ID标识
 */
function doDeleteDate(oGrid, dUrl, sourceId, paramId) {
	var rowdata = oGrid.getCheckedRows();
	var ids = getIdStr(rowdata, sourceId);
	if (rowdata.length == 0) { 
		$.ligerDialog.warn("请选择要彻底删除的数据项");
		return false;
	} // end of if (rowdata.length == 0)
	$.ligerDialog.confirm('<font color="red"><b>彻底删除数据将无法还原！</b></font>' +
			'<p>您确认要彻底删除选中的数据项吗？</p>', function (r) { 
		if(r) request(dUrl, paramId, ids);
	}); //end of ligerDialog.confirm()
} //end of doDeleteDate()

/*
 * 提交操作 只用于删除、彻底删除及还原
 * @dUrl 执行的action路径
 * @paramId 写入传递参数中的ID标识
 * @ids 要操作的数据id集全, 以","隔开
 */
function request(dUrl, paramId, ids) {
	$.ajax({                
		url : dUrl+'?'+paramId+'='+ids,
		type : "post",
		dataType : "json",
		success : showResponse,
		error : showResponseErr
	});
} //end of request()

/*
 * 显示操作返回的数据
 * @data 返回的json数据
 */
function showResponse(data) {
	if (data.err && data.err===1) {
		$.ligerDialog.error(data.msg);
	} else {
		window.parent.parent.f_tipMessage(data.msg);
		f_search();
	}
} //end of showResponse()

/*
 * 显示操作错误提示
 */
function showResponseErr(data) {
	$.ligerDialog.error("操作失败，请联系管理员！");
} // end of showResponseErr()

/*
 * 设置工具栏通用方法 内部方法 不建议调用
 * @isHide 是否隐藏
 * @oGridRows ligerGrid.getSelectedRows()得到的行对象
 * @strBtnId 受控按钮ID，在ligerGrid.toolbar.items中设置的ID
 * @doFunction 受控按钮操作方法
 */
function _setBtnWidthHide(isHide, oGridRows, strBtnId, doFunction) {
	if (isHide) $('div[toolbarid="'+strBtnId+'"]').hide();
	else _setBtnActive((oGridRows.length>0), strBtnId, doFunction);
} // end of _setBtnWidthHide()

/*
 * 设置按钮的可控性 内部方法 不建议调用
 * @isActive 是否可用
 * @strBtnId 受控按钮ID，在ligerGrid.toolbar.items中设置的ID
 * @doFunction 受控按钮操作方法
 */
function _setBtnActive(isActive, strBtnId, doFunction) {
	if (isActive) {
		if (!$('div[toolbarid="'+strBtnId+'"]').data('events')['click']) 
			$('div[toolbarid="'+strBtnId+'"]').btnActive(true).click(doFunction);
	} else {
		$('div[toolbarid="'+strBtnId+'"]').btnActive(false).unbind('click', doFunction);
	}
}

/*
 * 控制列表工具栏中按钮的可用性 内部方法 不建议调用
 * eg: object.btnActive(true)
 * @b:boolean true为可用，false为不可用
 */
(function ($) {
	$.fn.btnActive = function(b) {
		if (b) $(this).fadeTo("fast",1).css('cursor', 'pointer');
		else $(this).fadeTo("fast",0.25).css('cursor', 'default');
		return $(this);
	};
})(jQuery);

/*
 * 从ligerGrid中获取唯一选中的数据项Id的通用方法，如果有特殊的操作你就自己写吧！！
 * 内部方法 不建议调用
 * @oGrid ligerGrid对象
 * @sourceId String 列表中ID的标识
 * @return 选中的项的ID，如果多个或没有选返回null
 */
function _getOnlyOneDateId(oGrid, sourceId, tipsM, tipsN) {
	var rows = oGrid.getSelectedRows();
	if (rows.length==1){
		return rows[0][sourceId];
	} else if (rows.length>1) {
		$.ligerDialog.warn(tipsM); 
		return null;
	} else {
		$.ligerDialog.warn(tipsN); 
		return null;
	}
}

/*
 * 在对话框中打开新的对话框选择器
 * @option 对话框参数 指定打开大少及访问选择器的路径
 * @callback 选择结果处理的回调函数
 * 注意在选择器界面中必须有f_doSelect()方法并返回选择数据
 */
function openChoser(option, callback) {
	var options = $.extend({
		name:'_defaultChoserFrame',
		choserCallback : callback,
		buttons: [
			{ text: '选择', onclick: doChoseItem },
			{ text: '取消', onclick: doCloseChoser }
		]					 
	}, option);
	var choser = $.ligerDialog.open(options);
} // end of openChoser()

//转调选择操作方法
function doChoseItem(item, choser) {
	if(typeof(choser.options.choserCallback)!='function') return false;
	var rItem = window.frames[choser.options.name].f_doSelect();
	if (rItem) {
		choser.options.choserCallback(rItem);
		choser.close();
	} else alert('请选择数据！');						
}

//关闭打开的转调选择窗口
function doCloseChoser(item, choser) {
	choser.close();
}