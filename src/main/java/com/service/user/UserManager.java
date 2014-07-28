package com.service.user;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.dao.user.IUserDao;
import com.domain.user.User;

@Service
public class UserManager {

	@Resource private IUserDao userDao;

	public IUserDao getUserDao() {
		return userDao;
	}

	public void setUserDao(IUserDao userDao) {
		this.userDao = userDao;
	}
	public User checkUser(User user){
		return userDao.checkUser(user);
		
	}
	public User selectUserByID(int id){
		return userDao.selectByID(id);
		
	};

	public List<User> selectAllUser(){
		return userDao.selectAll();
		
	};

	public void addUser(User user){
		userDao.add(user);
	};

	public void updateUser(User user){
		userDao.update(user);
	};

	public void deleteUser(int userId){
		userDao.delete(userId);
	};
}
