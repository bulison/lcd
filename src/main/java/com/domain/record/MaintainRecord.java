package com.domain.record;

import java.io.Serializable;

import com.domain.information.BasicInformation;

/**
 * 维护记录
 * @author cwz
 *
 */
public class MaintainRecord implements Serializable {

	private Integer mid;	//维护记录标识
	private BasicInformation bid;//基本信息id
	private String faultSource;//故障来源	
	private String faultScene;//故障现场
	private String result;//处理情况及结果
	private String clientFeedback;//客户反馈	
	private String maintenanceTime;//维护时间
	
	public String getMaintenanceTime() {
		return maintenanceTime;
	}
	public void setMaintenanceTime(String maintenanceTime) {
		this.maintenanceTime = maintenanceTime;
	}
	
	public BasicInformation getBid() {
		return bid;
	}
	public void setBid(BasicInformation bid) {
		this.bid = bid;
	}
	public String getFaultSource() {
		return faultSource;
	}
	
	public Integer getMid() {
		return mid;
	}
	public void setMid(Integer mid) {
		this.mid = mid;
	}
	public void setFaultSource(String faultSource) {
		this.faultSource = faultSource;
	}
	public String getFaultScene() {
		return faultScene;
	}
	public void setFaultScene(String faultScene) {
		this.faultScene = faultScene;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public String getClientFeedback() {
		return clientFeedback;
	}
	public void setClientFeedback(String clientFeedback) {
		this.clientFeedback = clientFeedback;
	}
	
	
}
