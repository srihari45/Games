package gov.games.config;

import java.util.List;
import java.util.Properties;

import javax.servlet.MultipartConfigElement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;
import org.springframework.web.servlet.view.tiles3.TilesConfigurer;
import org.springframework.web.servlet.view.tiles3.TilesViewResolver;

import gov.games.actions.base.AuthenticateIntercepter;
import gov.games.actions.base.ExceptionActionController;
import gov.games.utils.UIFormConstants;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = { "gov.games.config", "gov.games.utils", "gov.games.actions.base",
		"gov.games.actions.controller", "gov.games.forms.snakeNladder", "gov.games.utils.snakeNladder",
		"gov.games.beans.snakeNladder" })
public class WebMvcConfig implements WebMvcConfigurer {

	@Autowired
	private AuthenticateIntercepter authenticateIntercepter;

	@Bean
	public TilesConfigurer tilesConfigurer() {
		TilesConfigurer tilesConfigurer = new TilesConfigurer();
		tilesConfigurer.setDefinitions("/WEB-INF/views/**/tiles-public.xml",
				"/WEB-INF/views/**/snakeNladder-tiles.xml");
		tilesConfigurer.setCheckRefresh(true);
		return tilesConfigurer;
	}

	@Override
	public void configureViewResolvers(ViewResolverRegistry registry) {
		TilesViewResolver tilesViewResolver = new TilesViewResolver();
		registry.viewResolver(tilesViewResolver);
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/css/**").addResourceLocations("/css/");
		registry.addResourceHandler("/images/**").addResourceLocations("/images/");
		registry.addResourceHandler("/js/**").addResourceLocations("/js/");
		registry.addResourceHandler("/fonts/roboto/**").addResourceLocations("/fonts/roboto/");
	}

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(authenticateIntercepter);
	}

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/").setViewName(UIFormConstants.TILES_INDEX);
		registry.addStatusController("/pub/403.html", HttpStatus.FORBIDDEN);
	}

	@Bean
	public MultipartConfigElement multipartConfigElement() {
		return new MultipartConfigElement("");
	}

	/**
	 * Pre-defining the max-size of file to be allowed for uploading
	 * 
	 */

	@Bean
	public MultipartResolver multipartResolver() {
		org.springframework.web.multipart.commons.CommonsMultipartResolver multipartResolver = new org.springframework.web.multipart.commons.CommonsMultipartResolver();
		multipartResolver.setMaxUploadSize(1000000000);
		return multipartResolver;
	}

	/*
	 * Configure MessageSource to provide internationalized messages
	 *
	 */

	@Bean
	public MessageSource messageSource() {
		ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
		messageSource.setBasename("messages");
		messageSource.setCacheSeconds(5);
		return messageSource;
	}

	/**
	 * 
	 * Extending SimpleMappingExceptionResolver with ExceptionActionController
	 * for overriding default exception resolver
	 */
	@Bean
	public SimpleMappingExceptionResolver exceptionResolver() {
		ExceptionActionController exceptionResolver = new ExceptionActionController();
		Properties exceptionMappings = new Properties();
		exceptionMappings.put("org.springframework.web.HttpSessionRequiredException", "exception");
		exceptionResolver.setExceptionMappings(exceptionMappings);
		exceptionResolver.setDefaultErrorView("exception");
		return exceptionResolver;
	}

	@Override
	public void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> resolvers) {
		resolvers.add(new ExceptionHandlingResolver());
	}
}
