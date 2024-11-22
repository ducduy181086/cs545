package edu.miu.cs545.project.server.config;

import edu.miu.cs545.project.server.entity.RoleType;
import edu.miu.cs545.project.server.filter.JwtFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtFilter jwtFilter;
    private final UserDetailsService userDetailsService;

    @Bean
    public UserDetailsService userDetailsSvc() {
        return userDetailsService;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOriginPattern("*");
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(httpSecurityCorsConfigurer -> httpSecurityCorsConfigurer.configurationSource(corsConfigurationSource()));
        http.csrf(AbstractHttpConfigurer::disable);
        http.authorizeHttpRequests(request -> {
            request.requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll();
            request.requestMatchers("/api/v1/authenticate/**").permitAll();
            request.requestMatchers("/api/v1/admin/**").hasAnyAuthority(RoleType.ADMIN.name());
            request.requestMatchers("/api/v1/reviews/**").hasAnyAuthority(RoleType.ADMIN.name());
            request.requestMatchers(HttpMethod.GET, "/api/v1/categories/**").permitAll();
            request.requestMatchers("/api/v1/categories/**").hasAnyAuthority(RoleType.ADMIN.name());
            request.requestMatchers(HttpMethod.GET, "/api/v1/products/**").permitAll();
            request.requestMatchers(HttpMethod.POST, "/api/v1/products/*/reviews").hasAnyAuthority(RoleType.BUYER.name());
            request.requestMatchers("/api/v1/products/**").hasAnyAuthority(RoleType.ADMIN.name(), RoleType.SELLER.name());
            request.requestMatchers("/api/v1/cart/**").hasAnyAuthority(RoleType.BUYER.name());
            request.requestMatchers("/api/v1/addresses/**").hasAnyAuthority(RoleType.BUYER.name());
            request.requestMatchers("/api/v1/payment/**").hasAnyAuthority(RoleType.BUYER.name());
            request.requestMatchers(HttpMethod.PUT, "/api/v1/order/change/**").hasAnyAuthority(RoleType.SELLER.name());
            request.requestMatchers("/api/v1/order/**").hasAnyAuthority(RoleType.BUYER.name(), RoleType.SELLER.name());
            request.anyRequest().authenticated();
        });
        http.sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers("/images/**", "/js/**", "/webjars/**");
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(userDetailsSvc());
        var t = passwordEncoder();
        authProvider.setPasswordEncoder(t);

        return authProvider;
    }
}
