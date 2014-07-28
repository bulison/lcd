package base.util;

import java.util.HashMap;
import java.util.Map;

public class Page {
	/* 翻页的 */
	private String sortName;
	private String sortOrder;
	private Integer pageSize;
	private Integer currentPage;
	private String keyword;//搜索框
	

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		param.put("keyword", keyword);
		this.keyword = keyword;
	}

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

}
