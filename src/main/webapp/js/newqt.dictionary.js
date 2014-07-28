/*
 * 从数据字典中读取数据项生成下拉列表,这个方法必须结合在首页中已加载的数据字典所有项目
 * option.code 数据项的代码
 * option.noSelText 下拉列表没有选中项时显示的文字
 * option.sValue 默认选中的项的value值
 * fn selete下拉列表对象
 * eg: $('#seleteObjId')._getSeleteForDictionary({code:'D0007_CLLX', noSelText:'请选择', sValue:$('#vType').val()});
 */
(function ($) {
	$.fn._getSeleteForDictionary = function (opt) {
		$('#vType').empty(); //清空原来的项
		var tHtml = '<option value="">'
		if (opt.noSelText && opt.noSelText!='') tHtml += opt.noSelText
		else tHtml += '请选择';
		tHtml += '</option>';
		if (opt.code && opt.code!='') {
			//DATADICTIONARY:首页已加载的数据字典的有项目
			var dArr = window.top.DATADICTIONARY[opt.code]; 
			if (dArr!=null) {
				for (var i=0; i<dArr.length; i++) {
					tHtml += '<option value="'+dArr[i].name+'"';
					if (opt.sValue && opt.sValue==dArr[i].name) tHtml += ' selected';
					tHtml += '>'+dArr[i].name+'</option>';
				}// end of for
			} // end of if (dArr!=null)
		} else {
			alert('在数据字典中找不到指定代码:'+opt.code+'的数据项！');
		}
		$(tHtml).appendTo($(this));
	} // end of _getSeleteForDictionary()
})(jQuery);