package com.exam.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;



@Configuration
public class MySecurityConfig {
		@Autowired
	    private JwtAuthenticationEntryPoint point;
	    @Autowired
	    private JwtAuthenticationFliter filter;

	    @Bean
	    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

//	        http.csrf(csrf -> csrf.disable())
//	                .authorizeRequests().
//	                requestMatchers("/test").authenticated().requestMatchers("/auth/login").permitAll()
//	                .anyRequest()
//	                .authenticated()
//	                .and().exceptionHandling(ex -> ex.authenticationEntryPoint(point))
//	                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

	        http.csrf(csrf->csrf.disable())
	                .cors(cors->cors.disable())
	                .authorizeHttpRequests(
	                        auth ->
	                                auth.requestMatchers("/home/**").authenticated()
	                            .requestMatchers( "/generate-token", "/user/","/user/test").permitAll()
	                            .requestMatchers(HttpMethod.OPTIONS).permitAll()
	                        .anyRequest().authenticated())
	                .exceptionHandling(ex-> ex.authenticationEntryPoint(point))
	                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

	        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
	        return http.build();
	    }
	    
	    @Bean
	    public AuthenticationManager authenticationManager(AuthenticationConfiguration builder) throws Exception {
	        return builder.getAuthenticationManager();
	    }
	    
	    @Bean
	    public BCryptPasswordEncoder passwordEncoder() {
	        return new BCryptPasswordEncoder();
//	        return NoOpPasswordEncoder.getInstance();
	    }

}
