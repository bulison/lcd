//初始化加载
$(document).ready(function(){
	$('#loginForm').submit(function() { 
		$(this).ajaxSubmit({
			beforeSubmit: showRequest,
			success: showResponse
		}); 
		return false; 
	}); 
	
	oLoading = new $.NqtLoading();
	//reSetUI();		//重设登录界面
	chkUserId();	//初始化检测
	chkPw();
	chkVerify();
	
	//登录ID检测
	$('#vUserId').change(chkUserId).keyup(chkUserId)
			.focus(function(){this.select()}).get(0).focus();
	//检测密码
	$('#vPw').change(chkPw).keyup(chkPw)
			.focus(function(){this.select()});
	//检测验证码
	$('#vVerify').change(chkVerify).keyup(chkVerify)
			.focus(function(){this.select()});
});

//窗口大小变化时调整登录页面
//$(window).resize(reSetUI);

//重设登录页面
function reSetUI() {
	if ($('#vVerify').length==0) {
		$('#vUserId').css('top', 40);
		$('#vPw').css('top', 80);
		$('#btnSubmit').css('top', 40);
	} else {
		$('#vUserId').css('top', 25);
		$('#vPw').css('top', 65);
		$('#btnSubmit').css('top', 25);
	}
	if (window.parent.oDialog) {
		$(document.body).css('background', 'none');
		$('#loginForm').css({left:-10, top:-10});
	} else {
		$('#loginForm').css('left', ($(this).width()- 800)/2+290);
		$('#loginForm').css('top', ($(this).height()-600)/2+190);
	}
	$('#loginForm').show();
}

//正在响应提示的对象
var oLoading;

//显示正在响应提示的句柄
var loadingHandle;

//在提交前的验证
function showRequest(formData, jqForm, options) { 
	if (chkForm()) {	//输入验证成功提交登录 响应超过1秒显示正在登录提示
		loadingHandle = setTimeout(function(){oLoading.show('登录中...')}, 1000);
		return true;	//提交
	}
    return false;		//输入验证未通过不予提交
} 
 
//提交登录后结果的处理 
function showResponse(responseText, statusText, xhr, $form)  {
	oLoading.hide();
	clearTimeout(loadingHandle);
	
	var rs = responseText.split('|');
	if (rs[0]==1) {	//登录成功
		$('#errInfo').hide();
		if (window.parent.oDialog) {	//在对话框中打开登录成功后的操作
			//打开对话框时指定的操作成功后的操作
			if (window.parent.oDialog.success)	window.parent.oDialog.success();
			//操作成功后关闭对话框
			window.parent.oDialog.hide();
		} else {	//在最顶窗口打开直接跳转到主页面
			document.location = 'frame.asp';
		}
	} else {	//登录失败
		if ($('#vVerify').length>0) {	//已有显示验证码框
			getChkCode();	//刷新验证码
		} else {	//没有显示验证码框
			$('<input></input>').attr({id:'vVerify', name:'vVerify', type:'text', size:10,tabindex:3})
					.change(chkVerify).keyup(chkVerify).blur(chkVerify)
					.focus(function(){this.select()}).appendTo('#loginForm');
			$('<img>').attr({id:'chkCodeImg', src:'img_chkcode.asp?w=70&h=24&dumy='+Math.random(),
				name:'chkCodeImg', width:70, height:24}).click(getChkCode).appendTo('#loginForm');
			reSetUI();
		} 
		$('#errInfo').html(rs[1]).show();
	}
}

//刷新验证码
function getChkCode() {
	//$('#chkCodeImg').attr('src', 'img_chkcode.asp?w=70&h=24&dumy='+Math.random())
}

//检测表单
function chkForm() {
	return chkUserId() && chkPw() && chkVerify();
}

//检测输入的用户名
function chkUserId() {
	if ($('#vUserId').vlen()>0) {		//this:#vUserId
		$('#vUserId').css('background-position', 'left -162px');
		if ($('#vUserId').safe()) {	//输入没有问题
			$('#errInfo').hide();
			return true;
		} else {				//输入非法字符
			$('#errInfo').html('用户名：不能包含有\'%;等非法字符！').show();
			$('#vUserId').css('background-position', 'left -274px').get(0).focus();
		}
	} else {					//没有输入用户名
		$('#vUserId').css('background-position', 'left -190px').get(0).focus();
		$('#errInfo').html('请输入用户名！').show();
	}
	return false;
}

//检测输入的密码
function chkPw() {
	if ($('#vPw').vlen()>0) {		//this:#vPw
		$('#vPw').css('background-position', 'left -162px');
		if ($('#vPw').safe()) {	//输入没有问题
			$('#errInfo').hide();
			return true;
		} else {				//输入非法字符
			$('#errInfo').html('密码：不能包含包含有\'%;等非法字符！').show();
			$('#vPw').css('background-position', 'left -274px').get(0).focus();
		}
	} else {					//没有输入密码
		$('#vPw').css('background-position', 'left -218px').get(0).focus();
		$('#errInfo').html('请输入密码！').show();
	}
	return false;
}

//检测输入的验证码
function chkVerify() {
	if ($('#vVerify').length==0) return true;
	if ($('#vVerify').vlen()>0) {
		$('#vVerify').css('background-position', 'left -162px');
		return true;
	} else {
		$('#vVerify').css('background-position', 'left -246px').get(0).focus();
		$('#errInfo').html('请输入验证码！').show();
		return false;
	}
	return false;
}

