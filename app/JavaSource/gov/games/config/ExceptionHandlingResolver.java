package gov.games.config;

import java.io.IOException;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.support.DefaultHandlerExceptionResolver;

import gov.games.utils.UIFormConstants;

public class ExceptionHandlingResolver extends DefaultHandlerExceptionResolver {

	private Logger log = LogManager.getLogger(this.getClass().getName());

	@Override
	protected ModelAndView handleHttpMediaTypeNotSupported(HttpMediaTypeNotSupportedException ex,
			HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
		log.debug("Handling 405 error, showing custom error page");
		HashMap<String, Object> errorMessageMap = new HashMap<>();
		errorMessageMap.put("errorMessage", "You cannot access this url directly from the browser.");
		return new ModelAndView(UIFormConstants.TILES_STATUS_ERROR_PAGE, errorMessageMap);
	}

	@Override
	protected ModelAndView handleNoHandlerFoundException(NoHandlerFoundException ex, HttpServletRequest request,
			HttpServletResponse response, Object handler) throws IOException {
		log.debug("Handling 404 error, showing custom error page");
		HashMap<String, Object> errorMessageMap = new HashMap<>();
		errorMessageMap.put("errorMessage", "The url you are trying to access is invalid.");
		return new ModelAndView(UIFormConstants.TILES_STATUS_ERROR_PAGE, errorMessageMap);
	}

	@Override
	protected ModelAndView doResolveException(HttpServletRequest request, HttpServletResponse response, Object handler,
			Exception ex) {
		return super.doResolveException(request, response, handler, ex);
	}

}
