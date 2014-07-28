/**
 * 
 */
package base;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

/**
 * @author LiZhouQiang
 * @since 2012-9-16上午12:38:25
 */
public class BaseAction{
	/**
	 * 
	 */
	private static final long serialVersionUID = 9078487433834458058L;
	
	public static String AjaxSuccessMsg = "{\"result\":true,\"msg\":\"保存成功!\"}";
	
	public static String AjaxFailedMsg = "{\"result\":false,\"msg\":\"保存失败!\"}";
	
	public String errorMsg;
	
	

	public String getErrorMsg() {
		return errorMsg;
	}

	/*翻页的*/
	public String sortName;
	public String sortOrder;
	public Integer pageSize;
	public Integer currentPage;	
	
	public Map<String, String> param = new HashMap<String, String>();
	
	public Map<String, String> getParam() {
		return param;
	}

	public String getSortName() {		
		return sortName;
	}

	public void setSortName(String sortName) {
		param.put("sortName", sortName);
		this.sortName = sortName;
	}

	public String getSortOrder() {
		return sortOrder;
	}

	public void setSortOrder(String sortOrder) {
		param.put("sortOrder", sortOrder);
		this.sortOrder = sortOrder;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		param.put("pageSize", pageSize.toString());
		this.pageSize = pageSize;
	}

	public Integer getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(Integer currentPage) {
		param.put("currentPage", currentPage.toString());
		this.currentPage = currentPage;
	}
	/***************/
	
	/**
	 * 向客户端返回信息，当Ajax方法调用struts方法时会用到
	 * @param msg
	 */
	protected void printMsg(String msg,HttpServletResponse response)
	{
//		HttpServletResponse response = ServletActionContext.getResponse();
		response.setCharacterEncoding("utf-8");
		PrintWriter pw;
		try {
			pw = response.getWriter();
			pw.print(msg);
			pw.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	protected void jsonWrite(HttpServletResponse response,JSONObject jsonObject){
		try {
//			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(jsonObject.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	/**
	 * 返回自定義的成功語句
	 * @param msg
	 * @return
	 */
	public static String returnSuccessMsg(String msg) {
		return "{\"result\":true,\"msg\":\"" + msg + "\"}";
	}
	/**
	 * 返回自定义的失败语句
	 * @param msg
	 * @return
	 */
	public static String returnFailedMsg(String msg) {
		return "{\"result\":false,\"msg\":\"" + msg + "\"}";
	}

}
