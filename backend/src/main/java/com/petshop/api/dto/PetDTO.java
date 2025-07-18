package com.petshop.api.dto;

import com.petshop.api.modelo.Pet;

public class PetDTO {
    private Long id;
    private String nome;
    private String raca;
    private Integer idade;
    private String doencas;
    private Long donoId;

    // Construtores
    public PetDTO() {
    }

    public PetDTO(Pet pet) {
        this.id = pet.getId();
        this.nome = pet.getNome();
        this.raca = pet.getRaca();
        this.idade = pet.getIdade();
        this.doencas = pet.getDoencas();
        
        if (pet.getDono() != null) {
            this.donoId = pet.getDono().getId();
        }
    }

    // Converter DTO para entidade
    public Pet toEntity() {
        Pet pet = new Pet();
        pet.setId(this.id);
        pet.setNome(this.nome);
        pet.setRaca(this.raca);
        pet.setIdade(this.idade);
        pet.setDoencas(this.doencas);
        
        return pet;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getRaca() {
        return raca;
    }

    public void setRaca(String raca) {
        this.raca = raca;
    }

    public Integer getIdade() {
        return idade;
    }

    public void setIdade(Integer idade) {
        this.idade = idade;
    }

    public String getDoencas() {
        return doencas;
    }

    public void setDoencas(String doencas) {
        this.doencas = doencas;
    }

    public Long getDonoId() {
        return donoId;
    }

    public void setDonoId(Long donoId) {
        this.donoId = donoId;
    }
}
