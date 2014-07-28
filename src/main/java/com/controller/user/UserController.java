package com.controller.user;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.domain.user.User;
import com.service.user.UserManager;

/**
 * 用户信息：控制类
 * @author cwz
 *
 */
@Controller
@RequestMapping("user/")
public class UserController {

	@Resource private UserManager userManager;
	
	public String showAllUser(){
		return "";
		
	}
	
	@RequestMapping("check")
	public String checkUser(User user){
		System.out.println("checkUser");
		User checkUser = userManager.checkUser(user);
		if(checkUser!=null){
			System.out.println(checkUser.getUsername()+"-----------"+checkUser.getPassword());
			return "main";
		}else{
			return "user/login";
		}
	}
}
