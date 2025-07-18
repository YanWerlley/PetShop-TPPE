package com.petshop.api.dto;

// Classe base para demonstrar polimorfismo
public abstract class AnimalDTO {
    private String nome;
    private Integer idade;
    private String raca;
    
    // Método abstrato para demonstrar polimorfismo
    public abstract String getTipoAnimal();
    
    // Getters e Setters
    public String getNome() {
        return nome;
    }
    
    public void setNome(String nome) {
        this.nome = nome;
    }
    
    public Integer getIdade() {
        return idade;
    }
    
    public void setIdade(Integer idade) {
        this.idade = idade;
    }
    
    public String getRaca() {
        return raca;
    }
    
    public void setRaca(String raca) {
        this.raca = raca;
    }
}
