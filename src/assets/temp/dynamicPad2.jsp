<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ include file="/include/common.jsp" %>
<%@page import="java.util.*" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title><fmt:message key="common.dynamicPad_PlzIptPswd" bundle="${viewMsg}"/></title>
	<script src="<%=root %>/jsfile/jquery.js"></script>
<%-- <LINK HREF='<%=root %>/css/pad.css' REL='stylesheet' TYPE='text/css'> --%></head>
<%    int pwdlength=0;%>
<BODY BGCOLOR=#dce6ef  >
	<form name="formPad" method="post">
	<input type="hidden" name="clickflag" value="">
	<!-- ImageReady Slices (home.psd - Slices: 05, 06) -->		
			<table width="165" border="0" align="left" cellpadding="3" cellspacing="0">
				<tr>
					<td >
						<div align="center">
							<div  class="dynamic-pad-e" style="display:none">								<h5 class="dynaPadTitle">請輸入密碼</h5>								<div class="input ">									<input class="key-hint" name="PIN" type="password" size="13" maxlength="12" readonly>								</div>
								<p class="key-hint">(已輸入密碼:<span id="pwdLen" style="font-size: 9pt;" >0</span>位)</p>								<div class="key">
									<%@ include  file="/include/keybord2.jsp" %>								</div>
							</div>
						</div>					</td>				</tr>			</table>
	<!-- End ImageReady Slices -->	</form></BODY>
<script language="JavaScript" type="text/JavaScript">
	var textId;
	var padId;
	
	$(function() {
		length = '<%=StringEscapeUtils.escapeHtml((String) request.getParameter("length"))%>';
		textId= '<%=StringEscapeUtils.escapeHtml((String) request.getParameter("textId"))%>';
		padId= '<%=StringEscapeUtils.escapeHtml((String) request.getParameter("padId"))%>';
		dofocus(document.forms["formPad"].PIN, length);
		
		shiftToRightPlace(textId);
		
		$(".dynamic-pad-e").show();
	});
	
	
	function shiftToRightPlace(textId){
		var ipt = $("#" + textId);
		
		var leftCoodinateOfPad=ipt.offset().left + ipt.width() + 20;
		var topCoodinateOfPad=ipt.offset().top + ipt.height()- $(".dynamic-pad-e").height();
		topCoodinateOfPad=topCoodinateOfPad<0?0:topCoodinateOfPad;
		
		$(".dynamic-pad-e").css({
			"left" : leftCoodinateOfPad,
			"top" : topCoodinateOfPad
		});
	}

	function processReturn() {
		var rtn = $("form[name='formPad'] input[name='PIN']").val();
		$("#" + textId).val(rtn);
		$("#" + padId).fadeOut();

	}

	// ====================== DynamicPad ===========================

	var obj;
	var maxlength;
	var length;

	function dofocus(obj1, maxLen) {
		obj = obj1;
		maxlength = maxLen;
	}

	// v1.1 跨瀏覽器調整

	function enter_Num(enterValue) {
		if (maxlength == null || maxlength == "")
			maxlength = 0;
		var pswd = obj.value;
		if (pswd != null && pswd.length < maxlength) {
			obj.value = pswd + enterValue;
			jQuery(document.getElementById("pwdLen")).text(pswd.length + 1);
		}

		if (enterValue == "clear") {
			obj.value = "";
			jQuery(document.getElementById("pwdLen")).text(0);
		}
	}

	// =========================================================

	function MM_reloadPage(init) { //reloads the window if Nav4 resized
		if (init == true)
			with (navigator) {
				if ((appName == "Netscape") && (parseInt(appVersion) == 4)) {
					document.MM_pgW = innerWidth;
					document.MM_pgH = innerHeight;
					onresize = MM_reloadPage;
				}
			}
		else if (innerWidth != document.MM_pgW
				|| innerHeight != document.MM_pgH)
			location.reload();
	}

	MM_reloadPage(true);

	function MM_preloadImages() { //v3.0
		var d = document;
		if (d.images) {
			if (!d.MM_p)
				d.MM_p = new Array();
			var i, j = d.MM_p.length, a = MM_preloadImages.arguments;
			for (i = 0; i < a.length; i++)
				if (a[i].indexOf("#") != 0) {
					d.MM_p[j] = new Image;
					d.MM_p[j++].src = a[i];
				}
		}
	}

	function MM_swapImgRestore() { //v3.0
		var i, x, a = document.MM_sr;
		for (i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++)
			x.src = x.oSrc;
	}

	function MM_findObj(n, d) { //v4.01
		var p, i, x;
		if (!d)
			d = document;
		if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
			d = parent.frames[n.substring(p + 1)].document;
			n = n.substring(0, p);
		}
		if (!(x = d[n]) && d.all)
			x = d.all[n];
		for (i = 0; !x && i < d.forms.length; i++)
			x = d.forms[i][n];
		for (i = 0; !x && d.layers && i < d.layers.length; i++)
			x = MM_findObj(n, d.layers[i].document);
		if (!x && d.getElementById)
			x = d.getElementById(n);
		return x;
	}

	function MM_swapImage() { //v3.0
		var i, j = 0, x, a = MM_swapImage.arguments;
		document.MM_sr = new Array;
		for (i = 0; i < (a.length - 2); i += 3)
			if ((x = MM_findObj(a[i])) != null) {
				document.MM_sr[j++] = x;
				if (!x.oSrc)
					x.oSrc = x.src;
				x.src = a[i + 2];
			}
	}

	function MM_openBrWindow(theURL, winName, features) { //v2.0
		window.open(theURL, winName, features);
	}
</script></HTML>

