<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<table cellpadding="0" cellspacing="0">
<%
    int i=0;
    java.util.HashMap hashmap = new java.util.HashMap(10);
    while(i<10){
        double baserandom = java.lang.Math.random();
        baserandom = baserandom*10;
        //out.println("baserandom["+i+"]="+baserandom);
        String rn = String.valueOf(baserandom).substring(0, 1);
        //out.println("rn["+i+"]="+rn);
        if(Integer.parseInt(rn)>=0 && Integer.parseInt(rn)<=9){
            if(hashmap.isEmpty() || !hashmap.containsValue(rn)){
                hashmap.put(String.valueOf(i),rn);
                i++;
            }
        }
    }
    for(i=0;i<hashmap.size();i++){
        String idx = (String)hashmap.get(String.valueOf(i));
        if(i%3==0){
            if(i/3>0){
%>
                </tr>
<%
            }
%>
            <tr>
<%
        }
%>
        <td><div class="num" onClick="enter_Num('<%=idx%>');return false;"><p><%=idx%></p>
        </div></td>
<%
		if(i/3==3){
%>
	<td><div class="num num11" onclick="processReturn();return false;"><p>確認</p></div></td>
	<td><div class="num num12" onClick="enter_Num('clear');return false;"><p>清除</p></div></td>
	</tr>
<%
		}
    }
%>
</table>