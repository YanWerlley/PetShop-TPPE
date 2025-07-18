package com.petshop.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        // Permitir credenciais
        config.setAllowCredentials(true);
        
        // Permitir origens - ajuste conforme necessário para o frontend
        config.addAllowedOrigin("http://localhost:3000"); // Para React
        config.addAllowedOrigin("http://localhost:4200"); // Para Angular
        config.addAllowedOrigin("http://localhost:8080"); // Para desenvolvimento local
        config.addAllowedOrigin("*"); // Para desenvolvimento - remover em produção
        
        // Permitir todos os cabeçalhos e métodos
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
