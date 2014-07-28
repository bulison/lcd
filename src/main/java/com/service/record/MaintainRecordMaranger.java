package com.service.record;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import com.dao.record.IMaintainRecordDao;
import com.domain.record.MaintainRecord;
@Service
public class MaintainRecordMaranger {
	@Resource private IMaintainRecordDao maintainRecordDao;

	public IMaintainRecordDao getMaintainRecordDao() {
		return maintainRecordDao;
	}

	public void setMaintainRecordDao(IMaintainRecordDao maintainRecordDao) {
		this.maintainRecordDao = maintainRecordDao;
	}
	
	public  MaintainRecord selectByID(int id){
		return maintainRecordDao.selectByID(id);
	}

	public  List<MaintainRecord> selectAll(@Param(value = "param") Map<String,String> param){
		 List<MaintainRecord> list = maintainRecordDao.selectAll(param);
		return list;
	}

	public void add(MaintainRecord info){
		maintainRecordDao.add(info);
	}

	public void update(MaintainRecord info){
		maintainRecordDao.update(info);
	}

	public void delete(int id){
		maintainRecordDao.delete(id);
	}
	/**
	 * 获取记录总数
	 * @return
	 */
	public int totalCount(@Param(value = "param") Map<String,String> param){
		return maintainRecordDao.totalCount(param);
		
	}

}
