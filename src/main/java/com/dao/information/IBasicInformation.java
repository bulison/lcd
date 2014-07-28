package com.dao.information;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import base.util.Page;

import com.domain.information.BasicInformation;

public interface IBasicInformation {
	public BasicInformation selectByID(int id);

	public List<BasicInformation> selectAll(@Param(value = "param") Map<String,String> param);

	public void add(BasicInformation info);

	public void update(BasicInformation info);

	public void delete(int id);
	/**
	 * 获取记录总数
	 * @return
	 */
	public int totalCount(@Param(value = "param") Map<String,String> param);
	
	public List<BasicInformation> selectByName();
}
