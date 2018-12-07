package gov.games.actions.base;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

@Component
public class AuthenticateIntercepter extends HandlerInterceptorAdapter {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		System.out.println("Request URL : " + request.getRequestURL());
		System.out.println("Http Method : " + request.getMethod());
		System.out.println("Remote User : " + request.getRemoteUser());

		return true;
	}
}
