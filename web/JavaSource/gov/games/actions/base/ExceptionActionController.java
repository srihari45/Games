package gov.games.actions.base;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Date;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;

public class ExceptionActionController extends SimpleMappingExceptionResolver {

	private Logger log = LogManager.getLogger(ExceptionActionController.class);

	@Override
	protected ModelAndView doResolveException(HttpServletRequest request, HttpServletResponse response, Object handler,
			Exception ex) {

		log.debug(ex.getClass());
		if (ex.getClass().getName().equalsIgnoreCase("org.apache.catalina.connector.ClientAbortException")) {
			return null;
		}
		String subject = (ex.getLocalizedMessage() == null) ? (ex.getMessage() == null ? "Exception" : ex.getMessage())
				: ex.getLocalizedMessage();

		StringWriter writer = new StringWriter();
		ex.printStackTrace(new PrintWriter(writer));

		StringBuffer sb = new StringBuffer("<br/><br/>");

		sb.append("<u><h3>Request Header Names </h3></u>").append("<br/>");
		Enumeration<String> enm = request.getHeaderNames();
		while (enm.hasMoreElements()) {
			String header = enm.nextElement().toString();
			String value = request.getHeader(header);
			sb.append("<b>").append(header).append("</b> ").append(value).append("<br/>");
			log.debug(header + "=" + value);
		}
		sb.append("<br/>").append("<br/>");

		log.info("getting request Parameters");
		sb.append("<u><h3>Request parameters for this request </h3></u>").append("<br/>");
		Map<String, String[]> requestParms = request.getParameterMap();
		if (requestParms != null && requestParms.keySet() != null) {
			Iterator<String> it = requestParms.keySet().iterator();
			while (it.hasNext()) {
				String key = (String) it.next();
				String value = request.getParameter(key);
				log.debug(key + " --------- " + value);
				sb.append("<b>").append(key).append("</b> ").append(value).append("<br/>");
				// sb.append(" Key :: "+key+" *=* Value ::
				// "+value).append(lineSeperator);
			}
		}

		sb.append("<br/>").append("<br/>");

		log.info("getting request attributes ");
		Enumeration<String> requestAttrs = request.getAttributeNames();
		sb.append("<u><h3>Request Attributes for this request </h3></u>").append("<br/>");
		if (requestAttrs != null) {
			while (requestAttrs.hasMoreElements()) {
				String key = requestAttrs.nextElement().toString();
				Object value = request.getAttribute(key);
				// log.debug(key + " = " + value);
				sb.append("<b>").append(key).append("</b> ").append(value).append("<br/>");
				// sb.append(" Key :: "+key+" *=* Value ::
				// "+value.toString()).append(lineSeperator);
			}
		}
		sb.append("<br/>").append("<br/>");

		log.info("getting request attributes ");
		HttpSession session = request.getSession();
		sb.append("<u><h3>Session Creation Time </h3></u>").append(new Date(session.getCreationTime())).append("<br/>");
		sb.append("<u><h3>Session Last Accessed Time </h3></u>").append(new Date(session.getLastAccessedTime()))
				.append("<br/>");
		Enumeration<String> sessionAttrs = session.getAttributeNames();
		sb.append("<u><h3>Session Attributes for this request </h3></u>").append("<br/>");
		if (requestAttrs != null) {
			while (sessionAttrs.hasMoreElements()) {
				String key = sessionAttrs.nextElement().toString();
				Object value = session.getAttribute(key);
				log.debug(key + " = " + value);
				sb.append("<b>").append(key).append("</b> ").append(value).append("<br/>");
				// sb.append(" Key :: "+key+" *=* Value ::
				// "+value.toString()).append(lineSeperator);
			}
		}
		sb.append("<br/>").append("<br/>");

		String viewName = "exception";
		ModelAndView modelAndView = new ModelAndView(viewName);
		modelAndView.addObject("exception", ex);
		return modelAndView;
	}

}
