package com.service.information;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import base.util.Page;

import com.dao.information.IBasicInformation;
import com.domain.information.BasicInformation;

@Service
public class BasicInformationMaranger {
	@Resource private IBasicInformation informationDao;

	public IBasicInformation getInformationDao() {
		return informationDao;
	}
	public int totalCount(Map<String,String>param){
		return informationDao.totalCount(param);
		
	}
	public void setInformationDao(IBasicInformation informationDao) {
		this.informationDao = informationDao;
	}
	public BasicInformation selectInformationByID(int id){
		return informationDao.selectByID(id);
		
	};

	public List<BasicInformation> selectAll(Map<String,String>param){
		if(!param.isEmpty()){
			int currentPage =Integer.valueOf(param.get("currentPage")); 
			int pageSize =Integer.valueOf(param.get("pageSize")); 
			param.put("startCount",(currentPage-1)*pageSize+"");
		}
		List<BasicInformation> selectAll = informationDao.selectAll(param);
		return selectAll;
		
		
	};

	public void add(BasicInformation info){
		informationDao.add(info);
	};

	public void update(BasicInformation info){
		informationDao.update(info);
	};

	public void delete(int id){
		informationDao.delete(id);
	};

	public List<BasicInformation> selectByName(){
		return informationDao.selectByName();
	};
}
