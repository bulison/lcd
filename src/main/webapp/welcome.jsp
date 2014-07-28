<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@include file="/common/taglibs.jsp"%>

<!DOCTYPE>
<html>
<head>
<title>百度地图</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
<script type="text/javascript" src="${ctx}/js/jquery-1.7.2.js"></script>
<script type="text/javascript"
	src="http://api.map.baidu.com/api?v=2.0&ak=6vPzmYqVAcinUzLA5mgRsh0m"></script>
<style type="text/css">
body, html, #allmap {
	width: 100%;
	height: 100%;
	overflow: hidden;
	margin: 0;
}
body p {
	font-size: 13px;
	font-family: fantasy;
}
</style>
</head>

<body>
	<div id="allmap"></div>
</body>
</html>
<script type="text/javascript">
var map = new BMap.Map("allmap"); // 创建Map实例
	$(function() {
		$.ajax({
			type : "POST",
			url : "${ctx}/information/queryMapItem.do",
			data : "name=John&location=Boston",
			success : function(msg) {
				// 百度地图API功能
				// var point = new BMap.Point('佛山');    // 创建点坐标
				map.centerAndZoom('佛山', 13); // 初始化地图,设置中心点坐标和地图级别。
				map.enableScrollWheelZoom(); //启用滚轮放大缩小
				// map.addControl(new BMap.ZoomControl());          //添加地图缩放控件
				map.addControl(new BMap.ScaleControl()); // 添加比例尺控件
				var data = eval("(" + msg + ")");
// 				var point = new Array(); //存放标注点经纬信息的数组  
// 				var marker = new Array(); //存放标注点对象的数组  
// 				var info = new Array(); //存放提示信息窗口对象的数组  
			

	for (var i = 0; i < data["list"].length; i++) {
							(function(x) {
								var state = data["list"][i].state;
								var zt = '';
								if (state == 0) {
									zt = '<span style="font-weight: bold;">已连接</span>';
								} else {
									zt = '<span style="color:red;font-weight: bold;">未连接</span>';
								}
								var pointItem = data["list"][i].point
								var p0 = pointItem.split(",")[0];
								var p1 = pointItem.split(",")[1];
								var point = new window.BMap.Point(p0, p1); //循环生成新的地图点  
								var icon = new BMap.Icon('img/icon.png',
										new BMap.Size(20, 32), {
											anchor : new BMap.Size(10, 30)
										});
								/* 地图标注点 */
								var marker = new BMap.Marker(point); //按照地图点坐标生成标记
								if (state == 1) {
									marker.setIcon(icon);
								}
								var opts = {
									width : 250, // 信息窗口宽度  
									height : 100, // 信息窗口高度  
									title : '<span style="font-size:15px;color:#0A8021">'
											+ data["list"][i].facilityName
											+ '</span>' // 信息窗口标题  
								}
								var content = "<p style=’font-size:12px;lineheight:1.8em;’>设备名称："
										+ data["list"][i].facilityName
										+ "</br>设备号："
										+ data["list"][i].deviceNumber
										+ "</br> 状态：" + zt + "</br></p>";
								// 创建信息窗口对象  
								var info_Window = new window.BMap.InfoWindow(
										content, opts);
								marker.addEventListener("click", function() {
									this.openInfoWindow(info_Window);
								});
								map.addOverlay(marker); // 将标注添加到地图中
							})(i);
						}

					}
				});
	});
</script>
