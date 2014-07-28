package com.dao.user;

import java.util.List;

import com.domain.user.User;

public interface IUserDao {

	public User selectByID(int id);

	public List<User> selectAll();

	public void add(User user);

	public void update(User user);

	public void delete(int userId);
	
	public User checkUser(User user);
}
