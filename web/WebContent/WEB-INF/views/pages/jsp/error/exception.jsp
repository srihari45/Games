<%@ page isErrorPage="true"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="java.io.StringWriter"%>
<%@page import="java.io.PrintWriter"%>
<style>
	.detail-content img {
		display: initial;
	}
</style>
         
<div class="detail">
	<div class="container">
		<div class="row">
			<div class="col s12 24 detail-content">

				<div class="content-header">
					<h4>Error</h4>
				</div>
			
				<section class="aside-section">
					<div class="materialize-red-text">
					<img border="0" src="${pageContext.request.contextPath}/images/icon_exclamation.gif" width="40" height="35" alt="Exclamation image" align="absmiddle"/>
						<span style="margin-left: 20px;">An error occurred while processing your request.&nbsp;Please try again.&nbsp;&nbsp;Sorry for the inconvenience.</span>
					</div>
				</section>

				${exception}
			</div>
		</div>
	</div>
</div>