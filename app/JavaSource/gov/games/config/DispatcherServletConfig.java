package gov.games.config;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.WebApplicationInitializer;

public class DispatcherServletConfig implements WebApplicationInitializer {

	private Logger log = LogManager.getLogger(this.getClass().getName());

	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {

		servletContext.addListener(new SessionListner());
		log.debug("Dispatcher Servlet");
	}

}
