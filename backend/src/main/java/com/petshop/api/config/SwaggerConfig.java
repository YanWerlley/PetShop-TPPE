package com.petshop.api.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI petShopOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("PetShop API")
                        .description("API REST para o sistema de PetShop")
                        .version("1.0")
                        .contact(new Contact()
                                .name("Equipe PetShop")
                                .email("contato@petshop.com"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("http://www.apache.org/licenses/LICENSE-2.0.html")))
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Servidor Local"),
                        new Server().url("http://petshop-backend:8080").description("Servidor Docker")
                ));
    }
}
