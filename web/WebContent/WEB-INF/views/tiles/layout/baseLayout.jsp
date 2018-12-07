<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>

<!DOCTYPE html>
<html>

<!-- Header Section starts -->
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  
  <meta name="author" content="Benchmark"/>
  <meta name="description" content="<tiles:insertAttribute name="description" ignore="true"/>"/>
  <link rel="icon" href="${pageContext.request.contextPath}/images/favicon.ico" type="image/x-icon">
  
  <meta name="_csrf" content="${_csrf.token}"/>
  <meta name="_csrf_header" content="${_csrf.headerName}"/>
  
  <!-- Insert dynamically page titles -->
  <title><tiles:insertAttribute name="title" ignore="true" /></title>
  <tiles:insertAttribute name="cssInclude" ignore="true" />
  <tiles:insertAttribute name="jsInclude" ignore="true" />
 </head>
 <!-- Header Section Ends -->
 
 <!-- Body Section starts -->
 <body class="full-page">
          <%-- <tiles:insertAttribute name="accountHeader" ignore="true"/> --%>
			<tiles:insertAttribute name="header" ignore="true"/>
			<tiles:insertAttribute name="body" ignore="true"/>
			<tiles:insertAttribute name="footer" ignore="true"/>
 </body>
<!-- Body Section ends -->
</html>