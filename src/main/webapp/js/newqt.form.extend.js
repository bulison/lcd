/*
 * 设置一个表单元素是否可用
 * @isDisabled 是否禁用 true为禁用
 */
(function ($) {
	$.fn.disabled = function (isDisabled, title, oldTit) {
		if (isDisabled) {
			$(this).attr('disabled', 'disabled');
			if ($(this).attr('type')=='text' || $(this).attr('type')=='password') 
				$(this).addClass('disabled');
			if (title && title!='') $(this).attr('title', title);
		} else {
			$(this).removeAttr('disabled');
			if ($(this).attr('type')=='text' || $(this).attr('type')=='password') {
				$(this).removeClass('disabled');
			}
			if (oldTit && oldTit!='') $(this).attr('title', oldTit);
			else $(this).attr('title', '');
		}
		return this;
	}// end of disabled(b)
})(jQuery);

function initForm() {
	$('input').each(function() {
		if ($(this).attr('type')=='text' || $(this).attr('type')=='password') {
			$(this).addClass('text');
			if ($(this).attr('disabled')=='disabled') $(this).addClass('disabled');
			if ($(this).attr('readonly')) $(this).addClass('readonly');	
		}
	});
	$('textarea').each(function(){
		if ($(this).attr('readonly')) $(this).addClass('readonly');
	});
}

/*
 * 自适应高度textarea
 */
(function($){
	$.fn.autoTextarea = function(options) {
		var defaults={
			maxHeight:null,//文本框是否自动撑高，默认：null，不自动撑高；如果自动撑高必须输入数值，该值作为文本框自动撑高的最大高度
			minHeight:$(this).height() //默认最小高度，也就是文本框最初的高度，当内容高度小于这个高度的时候，文本以这个高度显示
		};
		var opts = $.extend({},defaults,options);
		return $(this).each(function() {
			$(this).bind("paste cut keydown keyup focus blur",function(){
				var height,style=this.style;
				this.style.height =  opts.minHeight + 'px';
				if (this.scrollHeight > opts.minHeight) {
					if (opts.maxHeight && this.scrollHeight > opts.maxHeight) {
						height = opts.maxHeight;
						style.overflowY = 'scroll';
					} else {
						height = this.scrollHeight;
						style.overflowY = 'hidden';
					}
					style.height = height  + 'px';
				} // end of if (this.scrollHeight > opts.minHeight)
			});//end of $(this).bind()
		});// end of return
	}; // end of $.fn.autoTextarea ()
})(jQuery);

/**
 * ctrl+enter提交表单
 * @param {Function} fn 操作后执行的函数
 * @param {Object} thisObj 指针作用域
 */
(function($){
	$.fn.ctrlSubmit = function(fn,thisObj){
        var obj = thisObj || this;
        var stat = false;
        return this.each(function(){
            $(this).keyup(function(event){
                //只按下ctrl情况，等待enter键的按下
                if(event.keyCode == 17){
                    stat = true;
                    //取消等待
                    setTimeout(function(){
                        stat = false;
                    },300);
                }  
                if(event.keyCode == 13 && (stat || event.ctrlKey)){
                    fn.call(obj,event);
                }  
            });
        });
    }  
})(jQuery);