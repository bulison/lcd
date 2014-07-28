package com.controller.information;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import base.BaseAction;
import base.util.Page;

import com.domain.information.BasicInformation;
import com.service.information.BasicInformationMaranger;

/**
 * 基本信息：控制类
 * 
 * @author cwz
 * 
 */
@Controller
@RequestMapping("/information")
public class InformationController extends BaseAction {

	@Resource
	private BasicInformationMaranger informationManager;
	@RequestMapping("queryAll")
	public void queryAll(HttpServletResponse response,Page page){
		System.out.println("information queryAll");
		List<BasicInformation> list = informationManager.selectAll(page.param);
		int totalCount = informationManager.totalCount(page.param);//获取总记录数
		Map<String,Object>map = new HashMap<String, Object>();
		map.put("Rows", list);
		map.put("Total", totalCount);
		JSONObject json = JSONObject.fromObject(map);
		jsonWrite(response, json);
	}
	@RequestMapping("queryMapItem")
	public void queryMapItem(HttpServletResponse response){
		System.out.println("information queryMapItem");
		List<BasicInformation> list = informationManager.selectAll(new HashMap<String, String>());
		Map<String,Object>map = new HashMap<String, Object>();
		map.put("list", list);
		JSONObject json = JSONObject.fromObject(map);
		jsonWrite(response, json);
	}
	 
	@RequestMapping("info")
	public String info(@RequestParam("bid") String bid,Model model){
		System.out.println("information info");
		if(!bid.equals("")){
			BasicInformation info = informationManager.selectInformationByID(Integer.valueOf(bid));
			model.addAttribute("info",info);
		}
		return "information/InfoInformation";
				
	}
	@RequestMapping("save")
	public String save(HttpServletResponse response,BasicInformation info){
		System.out.println("information save ande update");
		Map<String,Object>map = new HashMap<String, Object>();
		if(info!=null){
			if(info.getBid()==null||info.getBid()==0){
				try {
					System.out.println("execute add");
					informationManager.add(info);
					map.put("msg", "保存成功！");
				} catch (Exception e) {
					e.printStackTrace();
					map.put("msg", "操作失败！");
				}
				JSONObject json = JSONObject.fromObject(map);
				jsonWrite(response, json);
				return "success";
			}else{
				try {
					System.out.println("execute update");
//					info.setBid(Integer.valueOf(info.getBid()));
					informationManager.update(info);
					map.put("msg", "保存成功！");
				} catch (Exception e) {
					e.printStackTrace();
					map.put("msg", "操作失败！");
				}
				JSONObject json = JSONObject.fromObject(map);
				jsonWrite(response, json);
				return "success";
			}
		}
		return "";
		
	}
	
	@RequestMapping("del")
	public void del(HttpServletResponse response,@RequestParam("bid") String bid){
		System.out.println("information del");
		if(!bid.equals("")){
			try {
				informationManager.delete(Integer.valueOf(bid));
				printMsg("{\"msg\":\"删除成功！\"}",response);
			} catch (NumberFormatException e) {
				e.printStackTrace();
				printMsg("{\"msg\":\"删除失败！\"}",response);
			}
		}
	}

}
