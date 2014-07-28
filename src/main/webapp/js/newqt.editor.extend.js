// kindEditor 默认样式下加载的功能键
var _editorItems = [
	'undo', 'redo', '|', 'cut', 'copy', 'paste', 'plainpaste', 'wordpaste', '|', 
	'justifyleft', 'justifycenter', 'justifyright',	'justifyfull', 'insertorderedlist', 
	'insertunorderedlist', 'indent', 'outdent', 'subscript', 'superscript', 
	'clearhtml', '|', 'source', 'fullscreen', '/',
	'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
	'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 
	'image', 'insertfile', 'table', 'template', 'hr', 'pagebreak', 'link', 'unlink'
];

KindEditor.plugin('ntemplate', function(K) {
	var editor = this, name = 'template';
    editor.clickToolbar(name, function() {
		_openChoser({
			url: 'contenttemp/selectContenttemp.jsp',
			height: 410,
			width:600,
			title:'选择模板'					 
		}, _getChosedTemplate);	
    });
});

KindEditor.lang({
        template : '插入模板'
});

//处理结算单位的选择结果
function _getChosedTemplate(item) {
	if (item && item.id && item.name) {
		if ($('#_vIsReplace').attr('checked')=='checked') { //代替原来内容
			editor.html(item.name);
		} else { //添加
			editor.html(editor.html() + item.name);
		}
	}
} // end of _getChosedTemplate()
		
/*
 * 在对话框中打开新的对话框选择器
 * @option 对话框参数 指定打开大少及访问选择器的路径
 * @callback 选择结果处理的回调函数
 * 注意在选择器界面中必须有f_doSelect()方法并返回选择数据
 */
function _openChoser(option, callback) {
	var options = $.extend({
		name:'_defaultChoserFrame',
		choserCallback : callback,
		buttons: [
			{ text: '选择', onclick: _doChoseItem },
			{ text: '取消', onclick: _doCloseChoser },
			{ html: _getReplaceCheck(), type: 'html'}
		]					 
	}, option);
	var choser = $.ligerDialog.open(options);
	$(".l-dialog-content").css({'padding-top':'0px','padding-bottom':'0px'});
} // end of _openChoser()

//关闭打开的转调选择窗口
function _doCloseChoser(item, choser) {
	choser.close();
}

function _getReplaceCheck() {
	return '<label for="_vIsReplace">' +
		   '<input type="checkbox" name="_vIsReplace" id="_vIsReplace" checked="checked" value="1" style="margin-left:5px" />' +
		   '代替当前内容</label>';
}
	
//转调选择操作方法
function _doChoseItem(item, choser) {
	if(typeof(choser.options.choserCallback)!='function') return false;
	var rItem = window.frames[choser.options.name].f_doSelect();
	if (rItem) {
		choser.options.choserCallback(rItem);
		choser.close();
	} else alert('请选择数据！');						
}