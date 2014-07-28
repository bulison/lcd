package com.dao.record;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.domain.record.MaintainRecord;

public interface IMaintainRecordDao {

	public MaintainRecord selectByID(int id);

	public List<MaintainRecord> selectAll(@Param(value = "param") Map<String,String> param);

	public void add(MaintainRecord info);

	public void update(MaintainRecord info);

	public void delete(int id);
	/**
	 * 获取记录总数
	 * @return
	 */
	public int totalCount(@Param(value = "param") Map<String,String> param);
}
