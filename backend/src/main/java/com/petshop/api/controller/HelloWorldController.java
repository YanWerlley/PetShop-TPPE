package com.petshop.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controlador simples para testes e verificação de saúde da aplicação
 */
@RestController
public class HelloWorldController {

    @GetMapping("/")
    public String hello() {
        return "Hello World! Salvee";
    }
    
    @GetMapping("/docs-info")
    public String docsInfo() {
        return "algo aqui";
    }
    
    // Os endpoints /swagger-ui.html e /api-docs são geralmente
    // fornecidos automaticamente pelo Spring Fox ou SpringDoc
    // quando configurados corretamente
}
