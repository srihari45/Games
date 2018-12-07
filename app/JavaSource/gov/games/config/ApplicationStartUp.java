package gov.games.config;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Component;

@Component
public class ApplicationStartUp {

	@PostConstruct
	public void applicationGetStarted() {
		System.out.println("**************** Application execution started ****************");
	}
}
