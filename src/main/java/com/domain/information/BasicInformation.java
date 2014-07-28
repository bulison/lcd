package com.domain.information;

import java.io.Serializable;

/**
 * 基本信息
 * 
 * @author cwz
 * 
 */
public class BasicInformation implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer bid;// 基本信息标识
	private String installAddress;// 安装地址
	private String installTime;// 安装时间
	private String contact;// 联系人
	private String contactTel;// 联系电话
	private String picture; // 显示屏安装图片
	private String installModel;// 安装方式
	private String screen;// 显示屏
	private String facilityName;//设备名称
	private String deviceNumber;//设备号
	private int state;//设备状态（0：已连接；1：未连接）
	private String point ;//设备坐标
	
	
	public String getDeviceNumber() {
		return deviceNumber;
	}

	public void setDeviceNumber(String deviceNumber) {
		this.deviceNumber = deviceNumber;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public String getPoint() {
		return point;
	}

	public void setPoint(String point) {
		this.point = point;
	}

	public String getFacilityName() {
		return facilityName;
	}

	public void setFacilityName(String facilityName) {
		this.facilityName = facilityName;
	}

	public String getContactTel() {
		return contactTel;
	}

	public void setContactTel(String contactTel) {
		this.contactTel = contactTel;
	}

	
	public Integer getBid() {
		return bid;
	}

	public void setBid(Integer bid) {
		this.bid = bid;
	}

	public String getInstallAddress() {
		return installAddress;
	}

	public void setInstallAddress(String installAddress) {
		this.installAddress = installAddress;
	}

	public String getInstallTime() {
		return installTime;
	}

	public void setInstallTime(String installTime) {
		this.installTime = installTime;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	public String getInstallModel() {
		return installModel;
	}

	public void setInstallModel(String installModel) {
		this.installModel = installModel;
	}

	public String getScreen() {
		return screen;
	}

	public void setScreen(String screen) {
		this.screen = screen;
	}

}
