package gov.games.config;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

@WebListener
public class SessionListner implements HttpSessionListener {

	@Override
	public void sessionCreated(HttpSessionEvent se) {
		System.out.println("Session Created");
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent se) {
		System.out.println("Session destroyed");
	}
}
