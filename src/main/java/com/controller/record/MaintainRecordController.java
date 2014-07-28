package com.controller.record;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.util.JSONUtils;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import base.BaseAction;
import base.util.Page;

import com.domain.information.BasicInformation;
import com.domain.record.MaintainRecord;
import com.service.information.BasicInformationMaranger;
import com.service.record.MaintainRecordMaranger;

@Controller
@RequestMapping("/maintainRecord")
public class MaintainRecordController extends BaseAction {

	@Resource
	private MaintainRecordMaranger recordMaranger;
	@Resource
	private BasicInformationMaranger information;

	@RequestMapping("queryAll")
	public void qurryAll(HttpServletResponse response, Page page) {
		System.out.println("maintainRecord queryAll");
		List<MaintainRecord> list = recordMaranger
				.selectAll(page.param);
		int totalCount = recordMaranger.totalCount(page.param);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("Rows", list);
		map.put("Total", totalCount);
		JSONObject jsonObject = JSONObject.fromObject(map);
		System.out.println(jsonObject);
		jsonWrite(response, jsonObject);

		
	}

	@RequestMapping("info")
	public String info(Model model,@RequestParam("mid") String mid) {
		System.out.println("maintainRecord info");
		if(!mid.equals("")){
			MaintainRecord info = recordMaranger.selectByID(Integer.valueOf(mid));
			Integer bid = info.getBid().getBid();
			BasicInformation ifm = information.selectInformationByID(bid);
			model.addAttribute("info",info);
			model.addAttribute("ifm",ifm);
		}
		return "maintainRecord/InfoMaintainRecord";

	}

	@RequestMapping("save")
	public String save(HttpServletResponse response, MaintainRecord info) {
		System.out.println("maintainRecord save and update");
		if (info.getMid()==null||info.getMid() == 0) {
			System.out.println("execute maintainRecord add");
			recordMaranger.add(info);
		}else{
			System.out.println("execute maintainRecord update");
			recordMaranger.update(info);
		}
		return "success";
	}

	@RequestMapping("del")
	public void del(HttpServletResponse response,@RequestParam("mid") String mid){
		System.out.println("maintainRecord del");
		if(!mid.equals("")){
			try {
				recordMaranger.delete(Integer.valueOf(mid));
				printMsg("{\"msg\":\"删除成功！\"}",response);
			} catch (NumberFormatException e) {
				e.printStackTrace();
				printMsg("{\"msg\":\"删除失败！\"}",response);
			}
		}
	}

	@RequestMapping("jbxxList")
	public void jbxxList(HttpServletResponse response) {
		List<BasicInformation> list = information.selectByName();
		JSONArray json = new JSONArray();
		for (BasicInformation info : list) {
			JSONObject jo = new JSONObject();
			jo.put("bid", info.getBid());
			jo.put("facilityName", info.getFacilityName());
			json.add(jo);
		}
		try {
			System.out.println(json.toString());
			response.getWriter().write(json.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
